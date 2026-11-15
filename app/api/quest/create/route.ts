import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {calculateQuestXp} from "@/modules/progression";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {title , description, difficulty, category, type, dueDate} = body;
        if(!title || title.trim().length < 3) {
            return NextResponse.json(
                {success: false, error: "Title must be atleast 3 characters"},
                {status: 400}
            );
        }
        if(!difficulty || !["Easy", "Medium", "Hard", "Epic"].includes(difficulty)){
            return NextResponse.json(
                { success: false, error: "Invalid difficulty level"},
                {status: 400}
            );
        }
        if(!category || category.trim().length ===0){
            return NextResponse.json(
                {success: false, error: "Category is required"},
                {status: 400}
            );
        }
        const player = await prisma.player.findFirst();
        if(!player){
            return NextResponse.json(
                {success: false, error: "Player not found. Run: npx prisma db seed"},
                {status: 404}
            );
        }
            
        const xpReward = calculateQuestXp(difficulty);
        const quest = await prisma.quest.create({
            data: {
                title: title.trim(),
                description: description?.trim() || null,
                difficulty,
                category: category.trim() || null,
                type: type || "DAILY",
                xpReward,
                status: "ACTIVE",
                playerId: player.id,
                dueDate: dueDate ? new Date(dueDate) : null,
            },
        });
        return NextResponse.json({
            success: true,
            quest,
        });
    } catch(error){
        console.error("Error creating quest: ", error);
        return NextResponse.json(
            {success: false, error: "Failed to create quest"},
            {status: 500}
        );
    }
}