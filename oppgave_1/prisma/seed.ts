import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  try {
    // Eksempeldata for seeding
    const tasks = [
      {
        text: "Skriv resultatet av regneoperasjonen",
        type: "add",
        data: "9+1"
    },
    {
      
        text: "Skriv resultatet av regneoperasjonen",
        type: "subtract",
        data: "12-6"
    },
    {
        
        text: "Skriv resultatet av regneoperasjonen",
        type: "multiply",
        data: "7*2"
    },
    {
       
        text: "Skriv resultatet av regneoperasjonen",
        type: "divide",
        data: "20/5"
    }
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