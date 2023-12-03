import { Goal as PrismaGoal } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";



import { prisma } from "@/lib/prisma";
import { CreateGoalInput, Goal, Result } from "@/types";


const goalMapper = <T extends Goal>(goal: PrismaGoal): T => {
  const { athleteId, id, ...rest } = goal
  return rest as unknown as T
}

export const create = async (
  goalData: CreateGoalInput,
): Promise<NextResponse<Result<Goal>>> => {
  try {
    const question = await prisma.goal.create({ 
        data: goalData,
        include: {
            athlete: true,
        },
     })

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

export const getAllForAthlete = async (
  athleteId: string,
): Promise<NextResponse<Result<Goal[]>>> => {
  try {
    const goals = await prisma.goal.findMany({
      where: {
        athleteId,
      },
    })

    if (!goals) {
      return NextResponse.json({ success: true, data: null }, { status: 404 })
    }

    const goalsMapped = goals.map((goal) => goalMapper(goal))

    return NextResponse.json(
      { success: true, data: goalsMapped },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: JSON.stringify(error) },
      { status: 500 },
    )
  }
}

export const update = async (
  goalId: string,
  goalData: Goal,
): Promise<NextResponse<Result<Goal>>> => {
  // bruker try/catch for å håndtere feil gitt av Prisma
  try {
    const goal = await prisma.goal.update({
      where: {
        id: goalId,
      },
      data: goalData,
    })

    return NextResponse.json(
      { success: true, data: goalMapper(goal) },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `Failed updating athlete goal: \n${JSON.stringify(error)} `,
      },
      { status: 500 },
    )
  }
}