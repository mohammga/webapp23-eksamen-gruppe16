import type { User } from "@/types"

interface UsersTableProps {
  users: User[]
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  return (
      <section className="">
        <table className="mt-4 w-full border-collapse">
          <thead>
            <tr>
              <th className="border bg-black px-4 py-2 text-white">ID</th>
              <th className="border bg-black px-4 py-2 text-white">brukerId</th>
              <th className="border bg-black px-4 py-2 text-white">Kjønn</th>
              <th className="border bg-black px-4 py-2 text-white">
                Handlinger
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.userId}</td>
                <td className="border px-4 py-2">{user.gender}</td>
                <td className="border px-4 py-2">
                  <button className="mr-2 rounded bg-black px-4 py-2 text-white">
                    Vis økter
                  </button>
                  <button className="rounded bg-black px-4 py-2 text-white">
                    Vis rapporter
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
  )
}

export default UsersTable
