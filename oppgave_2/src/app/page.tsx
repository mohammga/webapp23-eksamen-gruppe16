import type { User } from "@/types"
import type { Metadata } from "next"
import UsersTable from "@/components/tables/UsersTable"

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
      <UsersTable users={users.data} />
    </div>
  )
}
