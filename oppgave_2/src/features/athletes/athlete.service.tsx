import { NextResponse } from "next/server";



import * as athleteRepo from "@/features/athletes/athelete.repository";
import { Athlete, Result } from "@/types";


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

export const getAll = async (): Promise<NextResponse<Result<Athlete[]>>> => {
  return await athleteRepo.getAll()
}

export const getById = async (
  athleteId: string,
): Promise<NextResponse<Result<Athlete>>> => {
  return await athleteRepo.getById(athleteId)
}

export const updateAthlete = async (
  athleteId: string,
  athleteData: Athlete,
): Promise<NextResponse<Result<Athlete>>> => {
  const { gender, sportType } = athleteData

  if (!gender || !sportType)
    return NextResponse.json(
      {
        success: false,
        error: `
        ${gender ? "" : "Missing required field: gender\n"}
        ${sportType ? "" : "Missing required field: sport"}`,
      },
      { status: 400 },
    )
  const updatedResponse = await athleteRepo.update(athleteId, athleteData)

  return updatedResponse
}