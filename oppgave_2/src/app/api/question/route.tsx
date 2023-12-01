import { NextRequest, NextResponse } from "next/server"

import * as questionContoller from "@/features/questions/question.controller"

export async function POST(request: NextRequest) {
  return questionContoller.createQuestion(request)
}
