import type { User } from "@/types"
import type { Metadata } from "next"
import UsersTable from "@/components/tables/dashboard/AthletesTable"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
}

async function getUsers(): Promise<User> {
  const response = await fetch("https://webapp-api.vercel.app/api/users")

  if (!response.ok) {
    throw new Error("Klarte ikke å hente brukere")
  }

  return response.json() as Promise<User>
}

export default async function Page() {
  const users = await getUsers()

  return (
    <div>
      <h1 className="text-3xl px-6 pt-6 font-bold">Dashboard</h1>
      <UsersTable users={users.data} />
    </div>
  )
}
