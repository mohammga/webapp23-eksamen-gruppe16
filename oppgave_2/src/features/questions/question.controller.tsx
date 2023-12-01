import { NextRequest, NextResponse } from "next/server"
import { Question, CreateQuestionInput, Result } from "@/types"
import * as questionService from "./question.service"

export const createQuestion = async (
  req: NextRequest,
): Promise<NextResponse<Result<Question>>> => {
  if (!req.body)
    return NextResponse.json(
      { success: false, error: "No body included in request" },
      { status: 400 },
    )
  try {
    const questionData = (await req.json()) as CreateQuestionInput
    return await questionService.create(questionData)
  } catch (error) {
    console.error("Error occurred while creating athlete", error)
    return NextResponse.json(
      {
        success: false,
        error: JSON.stringify(error),
      },
      { status: 500 },
    )
  }
}

