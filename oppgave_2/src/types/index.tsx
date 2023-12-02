import { Prisma } from "@prisma/client";





export type User = {
  id: string
  userId: string
  gender: string
  data: User[]
}

export type TemplateFormData = {
  name: string
  tags: string[]
  slug: string
  activityType: string
  questions: string[]
  measurementParameter: string
  intervals: Interval[]
  // Add the rest of the attributes
}

export type Interval = {
  duration: number
  intensityZone: string
}

export type Athlete = {
  userId: string
  gender: "Mann" | "Kvinne"
  sportType:
    | "Løp"
    | "Sykkel"
    | "Ski"
    | "Triathlon"
    | "Svømming"
    | "Styrke"
    | "Annet"
  data: Athlete[]
}

export type Competition = {
  name: string
  date: Date
  location: string
  competitionGoal: string
  priority: string
  comment: string
}

export type Goal = {
  name: string
  date: Date
  goalTarget: number
  comment: string
}

export type Question = {
  text: string
  type: string
}

export type Session = {
  date: Date
  name: string
  slug: string
  athleteId: string
}


export type CreateAthleteInput = Prisma.AthleteCreateInput
export type CreateQuestionInput = Prisma.QuestionCreateInput
export type CreateSessionInput = Prisma.SessionCreateInput
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