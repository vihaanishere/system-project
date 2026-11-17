import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(
    request: Request,
    { params }: { params: Promise<{questId:string}>}
) {
    try {
        const {questId} = await params;
        const quest = await prisma.quest.findUnique({
            where: {id: questId},
        });
        if(!quest){
            return NextResponse.json(
                {success:false, error:"Quest not found"},
                {status:404}
            );
        }
        if(quest.status !== "ACTIVE"){
            return NextResponse.json(
                {success: false, error: "only active quest can be abandoned"},
                {status: 400}
            );
        }
        await prisma.quest.update({
            where: {id: questId},
            data: {status: "ABANDONED"},
        });
        return NextResponse.json({
            success:true,
            message:"Quest abandoned",
        });
    } catch(error){
        console.error("Error abandoning quest:", error);
        return NextResponse.json(
            {success:false, error: "Failed to abandon quest"},
            {status: 500}
        );
    }            
}