import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type UserData = {
  id: string
  userId: string
  gender: string
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
      const existingUser = await prisma.user.findUnique({
        where: {
          userId: userData.userId,
        },
      })

      if (!existingUser) {
        await prisma.user.create({
          data: {
            id: userData.id,
            userId: userData.userId,
            gender: userData.gender,
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

// Call the seed function
main()
