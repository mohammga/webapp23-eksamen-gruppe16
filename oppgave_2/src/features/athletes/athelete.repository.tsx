import { Athlete as PrismaAthlete } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";



import { prisma } from "@/lib/prisma";
import { Athlete, CreateAthleteInput, Result } from "@/types";


const athleteMapper = <T extends Athlete>(athlete: PrismaAthlete): T => {
  const { id, ...rest } = athlete
  return rest as unknown as T
}

export const create = async (
  athleteData: CreateAthleteInput,
): Promise<NextResponse<Result<Athlete>>> => {
  // bruker try/catch for å håndtere feil gitt av Prisma
  try {
    const athlete = await prisma.athlete.create({ data: athleteData })

    return NextResponse.json(
      { success: true, data: athleteMapper(athlete) },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `Failed creating athlete: \n${JSON.stringify(error)}`,
      },
      { status: 500 },
    )
  }
}

export const getById = async (
  userId: string,
): Promise<NextResponse<Result<Athlete>>> => {
  try {
    const athlete = await prisma.athlete.findUnique({
      where: {
        userId,
      },
    })

    if (!athlete) {
      return NextResponse.json({ success: true, data: null }, { status: 404 })
    }

    return NextResponse.json(
      { success: true, data: athleteMapper(athlete) },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: JSON.stringify(error) },
      { status: 500 },
    )
  }
}

export const getAll = async (): Promise<NextResponse<Result<Athlete[]>>> => {
  try {
    const athletes = await prisma.athlete.findMany()

    if (!athletes) {
      return NextResponse.json({ success: true, data: null }, { status: 404 })
    }

    const athletesMapped = athletes.map((athlete) => athleteMapper(athlete))

    return NextResponse.json(
      { success: true, data: athletesMapped },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: JSON.stringify(error) },
      { status: 500 },
    )
  }
}

export const changeById = async (
  userId: string,
  changes: Partial<CreateAthleteInput>,
): Promise<NextResponse<Result<Athlete>>> => {
  try {
    const existingAthlete = await prisma.athlete.findUnique({
      where: {
        userId,
      },
    })

    if (!existingAthlete) {
      return NextResponse.json(
        { success: false, error: "Athlete not found" },
        { status: 404 },
      )
    }

    const updatedAthlete = await prisma.athlete.update({
      where: {
        userId,
      },
      data: changes,
    })

    return NextResponse.json(
      { success: true, data: athleteMapper(updatedAthlete) },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: JSON.stringify(error) },
      { status: 500 },
    )
  }
}