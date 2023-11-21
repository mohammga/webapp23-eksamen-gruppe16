import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req, res) {
  try {
    const users = await prisma.user.findMany()

    if (users.length === 0) {
      return new NextResponse(
        JSON.stringify({
          error: "Not Found",
        }),
        {
          status: 404,
        },
      )
    }

    return NextResponse.json(users)
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
      {
        status: 500,
      },
    )
  }
}
