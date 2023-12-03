import { NextRequest, NextResponse } from "next/server";



import { Goal, Result } from "@/types";
import * as goalService from "./goal.service";


export const createGoal = async (
  req: NextRequest,
): Promise<NextResponse<Result<Goal>>> => {
  if (!req.body)
    return NextResponse.json(
      { success: false, error: "No body included in request" },
      { status: 400 },
    )
  try {
    const athleteData = (await req.json()) as Goal
    return await goalService.create(athleteData)
  } catch (error) {
    console.error("Error occurred while creating goal", error)
    return NextResponse.json(
      {
        success: false,
        error: JSON.stringify(error),
      },
      { status: 500 },
    )
  }
}

export const listAllGoalsForAthlete = async (
  req: NextRequest,
  athleteId: string,
): Promise<NextResponse<Result<Goal[]>>> => {
  try {
    return await goalService.getAllForAthlete(athleteId)
  } catch (error) {
    console.error("Error occurred while getting athlete goals", error)
    return NextResponse.json(
      {
        success: false,
        error: JSON.stringify(error),
      },
      { status: 500 },
    )
  }
}

export const updateAthleteGoal = async (
  req: NextRequest,
  goalId: string,
): Promise<NextResponse<Result<Goal>>> => {
  if (!req.body)
    return NextResponse.json(
      { success: false, error: "No body included in request" },
      { status: 400 },
    )
  try {
    const goalData = (await req.json()) as Goal
    return await goalService.updateAthleteGoal(goalId, goalData)
  } catch (error) {
    console.error("Error occurred while updating athlete goal", error)
    return NextResponse.json(
      {
        success: false,
        error: JSON.stringify(error),
      },
      { status: 500 },
    )
  }
}