import { NextRequest, NextResponse } from "next/server";
import { Result, Session } from "@/types";
import * as sessionService from "./session.service";


export const createSession = async (
  req: NextRequest,
): Promise<NextResponse<Result<Session>>> => {
  if (!req.body)
    return NextResponse.json(
      { success: false, error: "No body included in request" },
      { status: 400 },
    )
  try {
    const sessionData = (await req.json()) as Session
    return await sessionService.create(sessionData)
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

export const listAllSessionsForAthlete = async (
  req: NextRequest,
  athleteId: string,
): Promise<NextResponse<Result<Session[]>>> => {
  try {
    return await sessionService.getAllForAthlete(athleteId)
  } catch (error) {
    console.error("Error occurred while getting athlete sessions", error)
    return NextResponse.json(
      {
        success: false,
        error: JSON.stringify(error),
      },
      { status: 500 },
    )
  }
}

export const deleteAthleteSession = async (
  req: NextRequest,
  sessionId: string,
): Promise<NextResponse<Result<Session>>> => {
  try {
    return await sessionService.deleteSession(sessionId)
  } catch (error) {
    console.error("Error occurred while deleting athlete session", error)
    return NextResponse.json(
      {
        success: false,
        error: JSON.stringify(error),
      },
      { status: 500 },
    )
  }
}

export const updateAthleteSession = async (
  req: NextRequest,
  sessionId: string,
): Promise<NextResponse<Result<Session>>> => {
  if (!req.body)
    return NextResponse.json(
      { success: false, error: "No body included in request" },
      { status: 400 },
    )
  try {
    const sessionData = (await req.json()) as Session
    return await sessionService.updateSession(sessionId, sessionData)
  } catch (error) {
    console.error("Error occurred while updating athlete session", error)
    return NextResponse.json(
      {
        success: false,
        error: JSON.stringify(error),
      },
      { status: 500 },
    )
  }
}