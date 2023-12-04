import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  try {
    const tasks = [
      {
        text: "Skriv resultatet av regneoperasjonen",
        type: "add",
        data: "9+1",
      },
      {
        text: "Skriv resultatet av regneoperasjonen",
        type: "subtract",
        data: "12-6",
      },
      {
        text: "Skriv resultatet av regneoperasjonen",
        type: "multiply",
        data: "7*2",
      },
      {
        text: "Skriv resultatet av regneoperasjonen",
        type: "divide",
        data: "20/5",
      },
      {
        text: "Skriv resultatet av regneoperasjonen",
        type: "add",
        data: "3+4",
      },
      {
        text: "Skriv resultatet av regneoperasjonen",
        type: "subtract",
        data: "15-8",
      },
      {
        text: "Skriv resultatet av regneoperasjonen",
        type: "multiply",
        data: "6*3",
      },
      {
        text: "Skriv resultatet av regneoperasjonen",
        type: "divide",
        data: "30/3",
      },
      {
        text: "Skriv resultatet av regneoperasjonen",
        type: "add",
        data: "5+5",
      },
      {
        text: "Skriv resultatet av regneoperasjonen",
        type: "subtract",
        data: "18-9",
      },
    ]

    for (const task of tasks) {
      // Legg til oppgaver i databasen
      await prisma.task.create({
        data: task,
      })
    }

    console.log("Seeding fullført!")
  } catch (error) {
    console.error("Feil under seeding:", error)
  } finally {
    await prisma.$disconnect() // Lukk databasekoblingen
  }
}

main()