import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  try {
    // Eksempeldata for seeding
    const tasks = [
      {
        text: "Skriv resultatet av regneoperasjonen 1",
        type: "add",
        data: "9|4",
      },
      {
        text: "Skriv resultatet av regneoperasjonen 2",
        type: "add",
        data: "7|2",
      },
      // Legg til flere oppgaver etter behov
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