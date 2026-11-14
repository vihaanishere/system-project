import { PrismaClient } from "@prisma/client";
import { title } from "process";
const prisma = new PrismaClient()
async function main(){
    const player = await prisma.player.create({
        data: {
            name: "Vihaan Lawania",
            level: 1,
            totalXp: 0,
            rank: "E-Rank Hunter",
            attributes:{
                create: [
                    {name: "Intelligence", value:10, category: "Mental"},
                    {name: "Strength", value:10, category: "Physical"},
                    {name: "Discipline", value:10, category: "Mental"},
                    {name: "Creativity", value:10, category: "Mental"},
                    {name: "Vitality", value:10, category: "Physical"},
                ],
            },
            quests: {
                create: [
                    {
                        title: "Solve 3 DSA Problems",
                        description: "Compltere 3 Leetcode Problems (Easy or Medium)",
                        difficulty: "Medium",
                        xpReward: 150,
                        category: "DSA",
                        type: "DAILY",
                        status: "ACTIVE"
                    },
                    {
                        title: "Build Feature for SYSTEM",
                        description: "Add a new feature to the SYSTEM project",
                        difficulty: "Hard",
                        xpReward: 300,
                        category: "Full-Stack",
                        type:"MAIN",
                        status: "ACTIVE"
                    },
                    {
                        title: "Build Feaatrue for SYSTEM",
                        description: "Add a new feature to the SYSTEM project",
                        difficulty: "Hard",
                        xpReward: 300,
                        category: "Full-Stack",
                        type: "MAIN",
                        status: "ACTIVE",
                    },
                    {
                        title: "Study for College Exam",
                        description: "2 hours of focused study",
                        difficulty: "Easy",
                        xpReward: 80,
                        category: "College",
                        type: "DAILY",
                        status: "ACTIVE",
                    },

                ],
            },
            goals: {
        create: [
          {
            title: "Master Data Structures & Algorithms",
            description: "Solve 500 LeetCode problems and understand core patterns",
            category: "DSA",
            status: "ACTIVE",
            priority: "HIGH",
            milestones: {
              create: [
                { title: "Solve 100 Easy problems", order: 1 },
                { title: "Solve 50 Medium problems", order: 2 },
                { title: "Learn all DSA patterns", order: 3 },
              ],
            },
          },
          {
            title: "Build Full-Stack Portfolio",
            description: "Create 5 production-ready full-stack projects",
            category: "Full-Stack",
            status: "ACTIVE",
            priority: "HIGH",
            milestones: {
              create: [
                { title: "Complete SYSTEM project", order: 1 },
                { title: "Build e-commerce app", order: 2 },
                { title: "Create social media clone", order: 3 },
              ],
            },
          },
        ],
      },
    },
  });
  console.log("✅ Player created:", player.name);
  console.log("✅ Seed completed successfully!");
}
main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });