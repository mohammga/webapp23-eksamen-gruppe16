import { Prisma } from "@prisma/client";

export type Interval = {
  duration: number
  intensityZone: string
}

export type Athlete = {
  id?: string
  userId: string
  gender: string
  sportType: string
}

export type Goal = {
  name: string
  date: Date
  goalTarget: number
  comment: string
  athleteId: string
}

export type Question = {
  text: string
  type: string
}

export type Session = {
  id: string
  date: Date
  name: string
  tags: string
  sportType: string
  athleteId: string
}


export type CreateAthleteInput = Prisma.AthleteCreateInput
export type CreateQuestionInput = Prisma.QuestionCreateInput
export type CreateSessionInput = Prisma.SessionCreateInput
export type CreateGoalInput = Prisma.GoalCreateInput
export type CreateGoal = Prisma.GoalCreateInput


export type Data<T> = {
  success: true
  data: T | null
}

export type ResultError = {
  success: false
  type?: string
  error: string
}

export type Result<T> = Data<T> | ResultError