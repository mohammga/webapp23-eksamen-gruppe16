async function getUsers() {
  const response = await fetch("http://localhost:3000/api/users")

  if (!response.ok) {
    throw new Error("Klarte ikke å hente brukere")
  }

  return response
}

export default async function Page() {
  const users = await getUsers()

  return (
    <main className="">
      <ul className="px-6">
        {users.map((user, index) => (
          <li className="py-3" key={user.id}>
            <p>User number {index + 1}</p>
            <p>ID: {user.id}</p>
            <p>User ID: {user.userId}</p>
            <p>Gender: {user.gender}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
