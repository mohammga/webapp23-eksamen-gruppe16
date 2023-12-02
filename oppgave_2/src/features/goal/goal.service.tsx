import { NextRequest, NextResponse } from "next/server";
import { Goal, Result, CreateGoalInput } from "@/types";
import * as goalRepo from "@/features/goal/goal.repository";

export const create = async (
  goalData: CreateGoalInput
): Promise<NextResponse<Result<Goal>>> => {
  const { name, comment, goalTarget, date, athleteId} = goalData;

  if (!comment || !goalTarget || !name || !date || !athleteId ) {
    return NextResponse.json(
      {
        success: false,
        error: `Missing required fields:\n
        ${!name ? "- name\n" : ""}
        ${!comment ? "- comment\n" : ""}
        ${!date ? "- date\n" : ""}${!goalTarget ? "- goalTarget\n" : ""}
        ${!athleteId? "- athleteId\n" : ""}
        ${!date ? "- date\n" : ""}`,
      },
      { status: 400 }
    );
  }


  const createdResponse = goalRepo.create({ name, date, goalTarget, comment, athleteId})


  if (!createdResponse.ok) return createdResponse

  return createdResponse
};

export const getAll = async (): Promise<NextResponse<Result<Goal[]>>> => {
  return await goalRepo.getAll()
}
