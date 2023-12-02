import { NextRequest, NextResponse } from "next/server"

import { Goal, CreateGoalInput, Result } from "@/types"
import * as goalService from "./goal.service"

export const createAthlete = async (
  req: NextRequest,
): Promise<NextResponse<Result<Goal>>> => {
  if (!req.body)
    return NextResponse.json(
      { success: false, error: "No body included in request" },
      { status: 400 },
    )
  try {
    const athleteData = (await req.json()) as CreateGoalInput
    return await goalService.create(athleteData)
  } catch (error) {
    console.error("Error occurred while creating athlete", error)
    return NextResponse.json(
      {
        success: false,
        error: JSON.stringify(error),
      },
      { status: 500 },
    )
  }
}

export const listAllGoal = async (): Promise<
  NextResponse<Result<Goal[]>>
> => {
  try {
    return await goalService.getAll()
  } catch (error) {
    console.error("Error occurred while creating athlete", error)
    return NextResponse.json(
      {
        success: false,
        error: JSON.stringify(error),
      },
      { status: 500 },
    )
  }
}
