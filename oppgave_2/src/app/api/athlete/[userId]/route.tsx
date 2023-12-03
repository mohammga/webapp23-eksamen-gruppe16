import { NextRequest } from "next/server";
import * as athleteController from "@/features/athletes/athlete.controller";


export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  return athleteController.listAthlete(params.userId)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  return athleteController.updateAthlete(request, params.userId)
}