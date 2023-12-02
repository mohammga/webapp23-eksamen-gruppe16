import { NextRequest, NextResponse } from "next/server"

import * as sessionContoller from "@/features/sessions/session.controller"

export async function POST(request: NextRequest) {
  return sessionContoller.createSession(request)
}
