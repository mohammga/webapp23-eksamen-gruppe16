import { NextRequest, NextResponse } from "next/server"
import { Session, Result } from "@/types"
import * as sessionService from "./session.service"

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

