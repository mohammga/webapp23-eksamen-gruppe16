import { NextRequest, NextResponse } from "next/server";



import { Athlete, Result } from "@/types";
import * as athleteService from "./athlete.service";


export const createAthlete = async (
  req: NextRequest,
): Promise<NextResponse<Result<Athlete>>> => {
  if (!req.body)
    return NextResponse.json(
      { success: false, error: "No body included in request" },
      { status: 400 },
    )
  try {
    const athleteData = (await req.json()) as Athlete
    return await athleteService.create(athleteData)
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

export const listAllAthletes = async (): Promise<
  NextResponse<Result<Athlete[]>>
> => {
  try {
    return await athleteService.getAll()
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

export const listAthlete = async (
  userId: string,
): Promise<NextResponse<Result<Athlete>>> => {
  try {
    return await athleteService.getById(userId)
  } catch (error) {
    console.error("Error occurred while getting athlete", error)
    return NextResponse.json(
      {
        success: false,
        error: JSON.stringify(error),
      },
      { status: 500 },
    )
  }
}

export const updateAthlete = async (
  req: NextRequest,
  userId: string,
): Promise<NextResponse<Result<Athlete>>> => {
  if (!req.body)
    return NextResponse.json(
      { success: false, error: "No body included in request" },
      { status: 400 },
    )
  try {
    const athleteData = (await req.json()) as Athlete
    return await athleteService.updateAthlete(userId, athleteData)
  } catch (error) {
    console.error("Error occurred while updating athlete", error)
    return NextResponse.json(
      {
        success: false,
        error: JSON.stringify(error),
      },
      { status: 500 },
    )
  }
}