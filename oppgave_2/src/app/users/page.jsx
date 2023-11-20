async function getUsers() {
  const response = await fetch("https://webapp-api.vercel.app/api/users")

  if (!response.ok) {
    throw new Error("Klarte ikke å hente brukere")
  }

  return response.json()
}

export default async function Page() {
  const users = await getUsers()
  //Begge deler går. Seed kan nok være best
  //Siden dere utvikler nå og kommer til å slette frem og tilbake
  //Normalt sett ville jeg laget et script, enten bash script eller liknede og bare kjørt det som en import
  //Men da har jeg en produksjonsbase som ikke slettes hele tiden mens man utvikler

  return (
    <main className="">
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
    </main>
  )
}
