import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getXpProgress, getRankFromLevel} from "@/modules/progression";

export async function GET(){
    try{
        const player = await prisma.player.findFirst({
            include: {
                attributes: true,
                quests:{
                    where: {status: "ACTIVE"},
                    orderBy: {createdAt:"desc"},
                },
                xpHistory: {
                    orderBy: {createdAt: "desc"},
                    take: 10,
                },
            },
        });
        if(!player){
            return NextResponse.json(
                {error : "Player not found, Run npx prisma db seed"},
                {status: 404}
            );
        }
        const xpProgress = getXpProgress(player.totalXp, player.level);
        return NextResponse.json({
            player: {
                ...player,
                xpProgress,
            },
        })
    } catch (error){
        console.error("Error fetching player: ", error);
        return NextResponse.json(
            {error: "Failed to fetch player data"},
            {status: 500}
        );
    }
}