import { NextRequest } from "next/server";
import * as goalController from "@/features/goals/goal.controller";

//vis og endre en utøvers mål basert på id
export async function GET(request: NextRequest, { params }: { params: { athleteId: string} }) {
    return goalController.listAllGoalsForAthlete(request, params.athleteId);
}