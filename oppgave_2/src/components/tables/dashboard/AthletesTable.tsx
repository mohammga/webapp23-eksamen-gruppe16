"use client";

import { useState } from 'react';
import type { User } from "@/types";

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredUsers = users.filter((user) => {
    return (
      user.id.toString().includes(searchTerm) ||
      user.userId.toString().includes(searchTerm)
    );
  });

  return (
    <section className="p-6">
      <div className="mb-4">
        <input
          type="text"
          id="search"
          placeholder="Søk etter utøvere"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredUsers.length === 0 ? (
        <p>Ingen utøvere funnet.</p>
      ) : (
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
            {filteredUsers.map((user) => (
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
      )}
    </section>
  );
};

export default UsersTable;
