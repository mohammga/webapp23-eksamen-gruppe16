import { Question as PrismaQuestion } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

import {prisma} from "@/lib/prisma"
import { Question, CreateQuestionInput, Result } from "@/types"

const questionMapper = <T extends Question>(question: PrismaQuestion): T => {
  const { id, ...rest } = question
  return rest as unknown as T
}

export const create = async (
  questionData: CreateQuestionInput,
): Promise<NextResponse<Result<Question>>> => {
  try {
    const question = await prisma.question.create({ data: questionData })

    return NextResponse.json(
      { success: true, data: questionMapper(question) },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `Failed creating question: \n${JSON.stringify(error)}`,
      },
      { status: 500 },
    )
  }
}

