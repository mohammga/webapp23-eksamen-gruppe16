import { NextResponse } from "next/server";
import * as goalRepo from "@/features/goals/goal.repository";
import { Goal, Result } from "@/types";

export const create = async (
  goalData: Goal,
): Promise<NextResponse<Result<Goal>>> => {
  const { name, comment, goalTarget, date, athleteId } = goalData

  if (!comment || !goalTarget || !name || !date || !athleteId) {
    return NextResponse.json(
      {
        success: false,
        error: `Missing required fields:\n
        ${!name ? "- name\n" : ""}
        ${!comment ? "- comment\n" : ""}
        ${!goalTarget ? "- goalTarget\n" : ""}
        ${!athleteId ? "- athleteId\n" : ""}
        ${!date ? "- date\n" : ""}`,
      },
      { status: 400 },
    )
  }

  const createdResponse = await goalRepo.create({
    name,
    date,
    goalTarget,
    comment,
    athlete: {
      connect: {
        id: athleteId,
      },
    },
  })

  if (!createdResponse.ok) return createdResponse

  return createdResponse
}

export const getAll = async (): Promise<NextResponse<Result<Goal[]>>> => {
  return await goalRepo.getAll()
}