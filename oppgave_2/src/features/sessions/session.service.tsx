import { NextResponse } from "next/server";
import { Session, Result } from "@/types"
import * as sessionRepo from "@/features/sessions/session.repository";


export const create = async (
  sessionData: Session,
): Promise<NextResponse<Result<Session>>> => {
  const { date, name, slug, athleteId } = sessionData

  if (!date || !name || !slug || !athleteId)
    return NextResponse.json(
      {
        success: false,
        error: `
        ${date ? "" : "Missing required field: date\n"}
        ${name ? "" : "Missing required field: name\n"}
        ${slug ? "" : "Missing required field: slug\n"}
        ${athleteId ? "" : "Missing required field: athleteId\n"}"`,
      },
      { status: 400 },
    )

  const createdResponse = await sessionRepo.create({
    date,
    name,
    slug,
    athlete: {
      connect: {
        id: athleteId,
      },
    },
  })

  // feil ved lagring av bruker via ORM
  if (!createdResponse.ok) return createdResponse

  return createdResponse
}