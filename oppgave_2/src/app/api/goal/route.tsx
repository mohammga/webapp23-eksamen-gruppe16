import { NextRequest, NextResponse } from "next/server"

import * as goalController from "@/features/goal/goal.controller"

export function GET(request: NextRequest) {
  return goalController.listAllGoal()
}

export async function POST(request: NextRequest) {
  return goalController.createAthlete(request)
}
