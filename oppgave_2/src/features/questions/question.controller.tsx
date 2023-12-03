import { NextRequest, NextResponse } from "next/server";
import { CreateQuestionInput, Question, Result } from "@/types";
import * as questionService from "./question.service";


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

export const listAllQuestions = async (): Promise<
  NextResponse<Result<Question[]>>
> => {
  try {
    return await questionService.getAll()
  } catch (error) {
    console.error("Error occurred while fetching questions", error)
    return NextResponse.json(
      {
        success: false,
        error: JSON.stringify(error),
      },
      { status: 500 },
    )
  }
}