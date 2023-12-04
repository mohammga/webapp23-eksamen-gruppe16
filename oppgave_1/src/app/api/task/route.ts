import type { Task } from "@/types"
import type { NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const { attempts, taskId }: { attempts: number; taskId: string } =
    (await request.json()) as { attempts: number; taskId: string }

  if (!attempts || !taskId) {
    return NextResponse.json(
      { success: false, error: "Invalid input" },
      { status: 400 },
    )
  }

  try {
    const task = await prisma.answer.create({
      data: {
        attempts: attempts,
        taskId: taskId,
      },
    })
    return NextResponse.json({ success: true, data: task }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  const count = request.nextUrl.searchParams.get("count")

  if (!count || parseInt(count) < 1 || parseInt(count) > 10) {
    return NextResponse.json(
      { success: false, error: "Invalid count" },
      { status: 400 },
    )
  }

  try {
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
