import { NextRequest, NextResponse } from "next/server";
import * as athleteController from "@/features/athletes/athlete.controller";


//vis og endre en utøver
export function GET(request: NextRequest) {
  return athleteController.listAthlete(request)
}
export async function PATCH(request: NextRequest) {
  return athleteController.updateAthlete(request)
}