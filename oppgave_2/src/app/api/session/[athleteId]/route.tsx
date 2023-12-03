import { NextRequest } from "next/server";
import * as sessionController from "@/features/sessions/session.controller";

export async function GET(request: NextRequest, { params }: { params: { athleteId: string} }) {
    return sessionController.listAllSessionsForAthlete(request, params.athleteId);
}