import { NextRequest } from "next/server"

import * as goalController from "@/features/goals/goal.controller"

export async function POST(request: NextRequest) {
  return goalController.createGoal(request)
}
