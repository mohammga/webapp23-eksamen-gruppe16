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