<<<<<<< Updated upstream
import { NextResponse } from "next/server"
import * as athleteRepo from "@/features/athletes/athelete.repository"
import { Athlete, Result } from "@/types"
=======
import { NextRequest, NextResponse } from "next/server";
import * as athleteRepo from "@/features/athletes/athelete.repository";
import { Athlete, CreateAthleteInput, Result } from "@/types";
>>>>>>> Stashed changes

export const create = async (
  athleteData: Athlete,
): Promise<NextResponse<Result<Athlete>>> => {
  const { userId, gender, sportType } = athleteData

  if (!userId || !gender || !sportType)
    return NextResponse.json(
      {
        success: false,
        error: `
        ${userId ? "" : "Missing required field: userId\n"}
        ${gender ? "" : "Missing required field: gender\n"}
        ${sportType ? "" : "Missing required field: sport"}`,
      },
      { status: 400 },
    )

  const searchResponse = (await athleteRepo.getById(userId)) as NextResponse<
    Result<Athlete>
  >

  // feil med hentingen av data fra databasen via ORM
  if (searchResponse.status == 500) return searchResponse

  // bruker finnes hvis respons er 200 OK
  if (searchResponse.status == 200)
    return NextResponse.json(
      { success: false, error: "Athlete already exist" },
      { status: 409 },
    )

  const createdResponse = await athleteRepo.create({
    userId,
    gender,
    sportType,
  })

  if (!createdResponse.ok) return createdResponse
  return createdResponse
}

export const change = async (
  userId: string,
  changes: Partial<CreateAthleteInput>,
): Promise<NextResponse<Result<Athlete>>> => {

  if (!userId || !changes)
    return NextResponse.json(
      {
        success: false,
        error: `
        ${userId ? "" : "Missing required field: userId\n"}
        ${changes.gender ? "" : "Missing required field: gender\n"}
        ${changes.sportType ? "" : "Missing required field: sport"}`,
      },
      { status: 400 },
    )

  const searchResponse = (await athleteRepo.getById(userId)) as NextResponse<
    Result<Athlete>
  >

  // feil med hentingen av data fra databasen via ORM
  if (searchResponse.status == 500) return searchResponse

  // bruker finnes ikke hvis respons er 404 Not Found
  if (searchResponse.status == 404)
    return NextResponse.json(
      { success: false, error: "Athlete does not exist" },
      { status: 404 },
    )

  const updatedResponse = await athleteRepo.changeById(userId, changes)

  if (!updatedResponse.ok) return updatedResponse
  return updatedResponse
}

export const getAll = async (): Promise<NextResponse<Result<Athlete[]>>> => {
  return await athleteRepo.getAll()
}

