import { Question as PrismaQuestion } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";



import { prisma } from "@/lib/prisma";
import { CreateQuestionInput, Question, Result } from "@/types";
import { q } from "msw/lib/glossary-de6278a9";


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

export const getAll = async (): Promise<NextResponse<Result<Question[]>>> => {
  try {
    const questions = await prisma.question.findMany()

    if (!questions) {
      return NextResponse.json({ success: true, data: null }, { status: 404 })
    }

    const questionsMapped = questions.map((question) => questionMapper(question))

    return NextResponse.json(
      { success: true, data: questionsMapped },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: JSON.stringify(error) },
      { status: 500 },
    )
  }
}