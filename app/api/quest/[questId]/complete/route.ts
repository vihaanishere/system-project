import { getAttributeGains } from "@/modules/attribution";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateLevelFromXP, getRankFromLevel } from "@/modules/progression";


export async function POST(
  request: Request,
  { params }: { params: Promise<{ questId: string }> }
) {
  try {
    const { questId } = await params;

    // Find the quest
    const quest = await prisma.quest.findUnique({
      where: { id: questId },
      include: { player: true },
    });

    if (!quest) {
      return NextResponse.json(
        { success: false, error: "Quest not found" },
        { status: 404 }
      );
    }

    if (quest.status === "COMPLETED") {
      return NextResponse.json(
        { success: false, error: "Quest already completed" },
        { status: 400 }
      );
    }

    // Calculate new XP and level
    const newTotalXp = quest.player.totalXp + quest.xpReward;
    const oldLevel = quest.player.level;
    const newLevel = calculateLevelFromXP(newTotalXp);
    const leveledUp = newLevel > oldLevel;
    const newRank = getRankFromLevel(newLevel);

    // Update player, quest, and create records in a transaction
    // Calculate attribute gains
    const attributeGains = getAttributeGains(quest.category, quest.difficulty);

    // Prepare attribute updates for transaction
    const attributeUpdates = attributeGains.map((gain) =>
      prisma.attribute.updateMany({
        where: {
          playerId: quest.playerId,
          name: gain.attributeName,
        },
        data: {
          value: {
            increment: gain.gain,
          },
        },
      })
    );

    // Get current attribute values for response
    const currentAttributes = await prisma.attribute.findMany({
      where: {
        playerId: quest.playerId,
        name: {
          in: attributeGains.map((g) => g.attributeName),
        },
      },
    });

    // Update player, quest, and create records in a transaction
    await prisma.$transaction([
      // Update player XP and level
      prisma.player.update({
        where: { id: quest.playerId },
        data: {
          totalXp: newTotalXp,
          level: newLevel,
          rank: newRank,
        },
      }),

      // Mark quest as completed
      prisma.quest.update({
        where: { id: questId },
        data: { status: "COMPLETED" },
      }),

      // Create quest completion record
      prisma.questCompletion.create({
        data: {
          questId: questId,
          xpAwarded: quest.xpReward,
        },
      }),

      // Create XP transaction record
      prisma.xPTransaction.create({
        data: {
          playerId: quest.playerId,
          amount: quest.xpReward,
          type: "QUEST_COMPLETION",
          sourceId: questId,
          description: `Completed quest: ${quest.title}`,
        },
      }),

      // Update attributes
      ...attributeUpdates,
    ]);

    // Get updated attribute values
    const updatedAttributes = await prisma.attribute.findMany({
      where: {
        playerId: quest.playerId,
        name: {
          in: attributeGains.map((g) => g.attributeName),
        },
      },
    });

    // Build attribute changes for response
    const attributeChanges = attributeGains.map((gain) => {
      const updated = updatedAttributes.find((a) => a.name === gain.attributeName);
      return {
        name: gain.attributeName,
        gain: gain.gain,
        newValue: updated?.value || 0,
      };
    });

    return NextResponse.json({
      success: true,
      xpAwarded: quest.xpReward,
      newTotalXp,
      leveledUp,
      oldLevel,
      newLevel,
      newRank,
      attributeChanges, // NEW: Include attribute changes
    });

  } catch (error) {
    console.error("Error completing quest:", error);
    return NextResponse.json(
      { success: false, error: "Failed to complete quest" },
      { status: 500 }
    );
  }
}
