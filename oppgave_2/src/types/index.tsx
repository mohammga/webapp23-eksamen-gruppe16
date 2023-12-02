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
  athleteId: string
}

export type Question = {
  text: string
  type: string
}

export type AthleteFormData = {
  goals: {
      goalId: string;
      date: string;
      name: string;
      goalValue: string;
      comment: string;
  }[];
}

export type FormData = {
  name: string;
  tags: string;
  slug: string;
  activityTypes: string[];
  questions: string[];
  measurementParameter: string;
  sessionDate: string;
  selectedTrainingGoal: string;
  selectedCompetition: string;
}


export type CreateAthleteInput = Prisma.AthleteCreateInput
export type CreateQuestionInput = Prisma.QuestionCreateInput
export type CreateCompetitionInput = Prisma.CompetitionCreateInput
export type CreateGoalInput = Prisma.GoalCreateInput


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