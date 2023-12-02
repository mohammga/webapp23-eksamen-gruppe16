import { Goal as PrismaGoal } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

import {prisma} from "@/lib/prisma"
import { Goal, CreateGoalInput, Result } from "@/types"

const goalMapper = <T extends Goal>(goal: PrismaGoal): T => {
  const { id, ...rest } = goal
  return rest as unknown as T
}

export const create = async (
  goalData: CreateGoalInput,
): Promise<NextResponse<Result<Goal>>> => {
  try {
    const question = await prisma.goal.create({ data: goalData })

    return NextResponse.json(
      { success: true, data: goalMapper(question) },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `Failed creating goal: \n${JSON.stringify(error)}`,
      },
      { status: 500 },
    )
  }
}


export const getAll = async (): Promise<NextResponse<Result<Goal[]>>> => {
  try {
    const athletes = await prisma.goal.findMany()

    if (!athletes) {
      return NextResponse.json({ success: true, data: null }, { status: 404 })
    }

    const athletesMapped = athletes.map((athlete) => goalMapper(athlete))

    return NextResponse.json(
      { success: true, data: athletesMapped },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: JSON.stringify(error) },
      { status: 500 },
    )
  }
}