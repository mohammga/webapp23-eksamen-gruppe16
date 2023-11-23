import type { Metadata } from "next";
import type { User } from "@/types/User"

export const metadata: Metadata = {
  title: "Users",
  description: "Users",
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
      <ul className="px-6">
        {users.data.map((user, index) => (
          <li className="py-3" key={user.id}>
            <p>User number {index + 1}</p>
            <p>ID: {user.id}</p>
            <p>User ID: {user.userId}</p>
            <p>Gender: {user.gender}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}