import { NextRequest } from "next/server";
import * as athleteController from "@/features/athletes/athlete.controller";


export async function GET(
  request: NextRequest,
  { params }: { params: { athleteId: string } },
) {
  return athleteController.listAthlete(params.athleteId)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { athleteId: string } },
) {
  return athleteController.updateAthlete(request, params.athleteId)
}