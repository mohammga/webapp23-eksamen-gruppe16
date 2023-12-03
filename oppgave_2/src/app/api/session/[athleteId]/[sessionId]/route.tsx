import { NextRequest } from "next/server"
import * as sessionController from "@/features/sessions/session.controller"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { sessionId: string } },
) {
  return sessionController.deleteAthleteSession(request, params.sessionId)
}   

export async function PUT(
    request: NextRequest,
    { params }: { params: { sessionId: string } },
    ) {
    return sessionController.updateAthleteSession(request, params.sessionId)
}



