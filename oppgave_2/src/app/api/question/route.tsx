import { NextRequest } from "next/server"

import * as questionContoller from "@/features/questions/question.controller"

export function GET(request: NextRequest) {
  return questionContoller.listAllQuestions()
}

export async function POST(request: NextRequest) {
  return questionContoller.createQuestion(request)
}
