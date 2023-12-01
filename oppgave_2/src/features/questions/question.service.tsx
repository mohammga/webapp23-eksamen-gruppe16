import { NextRequest, NextResponse } from "next/server"

import { Question, CreateQuestionInput, Result } from "@/types"
import * as questionsRepo from "@/features/questions/question.repository"

export const create = async (
  questionData: CreateQuestionInput,
): Promise<NextResponse<Result<Question>>> => {
  const { text, type } = questionData

  if (!text || !type)
    return NextResponse.json(
      {
        success: false,
        error: `
        ${text ? "" : "Missing required field: text\n"}
        ${type ? "" : "Missing required field: type\n"}`,
      },
      { status: 400 },
    )

  const createdResponse = await questionsRepo.create({ text, type })


  if (!createdResponse.ok) return createdResponse

  return createdResponse
}
