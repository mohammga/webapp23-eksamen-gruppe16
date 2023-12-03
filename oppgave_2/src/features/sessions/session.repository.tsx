import { Session as PrismaSession } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CreateSessionInput, Result, Session } from "@/types";

const sessionMapper = <T extends Session>(session: PrismaSession): T => {
  const { athleteId, id, ...rest } = session
  return rest as unknown as T
}

export const create = async (
  sessionData: CreateSessionInput,
): Promise<NextResponse<Result<Session>>> => {
  // bruker try/catch for å håndtere feil gitt av Prisma
  try {
    const session = await prisma.session.create({
      data: sessionData,
      include: {
        athlete: true,
      },
    })

    return NextResponse.json(
      { success: true, data: sessionMapper(session) },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `Failed creating session: \n${JSON.stringify(error)}`,
      },
      { status: 500 },
    )
  }
}

