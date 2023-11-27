import type { Athlete } from "@/types"
import type { Metadata } from "next"
import ShowReport from "@/components/tables/athlete/ShowReport"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
}

async function getAthletes(): Promise<Athlete> {
  const response = await fetch("http://localhost:3000/api/athlete",
    {
      method: "GET",
      cache: "no-store",
    }
  )

  if (!response.ok) {
    throw new Error("Klarte ikke å hente brukere")
  }

  return response.json() as Promise<Athlete>
}

export default async function Page() {
  const athletes = await getAthletes()

  return (
    <div>
      <h1 className="text-3xl px-6 pt-6 font-bold">Se rapport</h1>
      <ShowReport/>
    </div>
  )
}
