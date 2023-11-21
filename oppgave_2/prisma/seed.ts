import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type UserData = {
  id: string
  userId: string
  gender: string
  sportType: string
  sport: string
}

type UsersResponse = {
  data: UserData[]
}

async function getUsers(): Promise<UsersResponse> {
  const response = await fetch("https://webapp-api.vercel.app/api/users")

  if (!response.ok) {
    throw new Error("Klarte ikke å hente brukere")
  }

  return response.json() as Promise<UsersResponse>
}

async function main() {
  try {
    const users: UsersResponse = await getUsers()

    for (const userData of users.data) {
      const existingUser = await prisma.athlete.findUnique({
        where: {
          userId: userData.userId,
        },
      })

      if (!existingUser) {
        await prisma.athlete.create({
          data: {
            id: userData.id,
            userId: userData.userId,
            gender: userData.gender,
            sportType: userData.sport
          },
        })
      }
    }

    console.log("Seed vellykket!")
  } catch (error) {
    console.error("Seed feilet:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
