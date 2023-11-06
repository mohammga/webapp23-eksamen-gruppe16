import type { Task } from "@/types"
import type { NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function PUT(request: NextRequest) {
  const count = request.nextUrl.searchParams.get("count")
  if (!count) {
    return NextResponse.json(
      { success: false, error: "Invalid count" },
      { status: 400 },
    )
  }

  try {
    // Hent data fra databasen ved hjelp av Prisma
    const tasks = await prisma.task.findMany({
      take: parseInt(count),
    })

    return NextResponse.json({ success: true, data: tasks }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  const count = request.nextUrl.searchParams.get("count")

  if (!count || count === "0") {
    return NextResponse.json(
      { success: false, error: "Invalid count" },
      { status: 400 },
    )
  }

  try {
    // Hent data fra databasen ved hjelp av Prisma
    const tasks = await prisma.task.findMany({
      take: parseInt(count),
    })

    return NextResponse.json({ success: true, data: tasks }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 },
    )
  }
}
