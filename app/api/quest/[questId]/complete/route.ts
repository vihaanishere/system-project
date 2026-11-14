import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { caclulateLevelFromXP, getRankFromLevel } from "@/modules/progression";

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
    const newLevel = caclulateLevelFromXP(newTotalXp);
    const leveledUp = newLevel > oldLevel;
    const newRank = getRankFromLevel(newLevel);

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
    ]);

    return NextResponse.json({
      success: true,
      xpAwarded: quest.xpReward,
      newTotalXp,
      leveledUp,
      oldLevel,
      newLevel,
      newRank,
    });
  } catch (error) {
    console.error("Error completing quest:", error);
    return NextResponse.json(
      { success: false, error: "Failed to complete quest" },
      { status: 500 }
    );
  }
}
