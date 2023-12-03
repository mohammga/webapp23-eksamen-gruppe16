import { NextRequest } from "next/server"

import * as goalController from "@/features/goals/goal.controller"

export async function PUT(
  request: NextRequest,
  { params }: { params: { goalId: string } },
) {
  return goalController.updateAthleteGoal(request, params.goalId)
}