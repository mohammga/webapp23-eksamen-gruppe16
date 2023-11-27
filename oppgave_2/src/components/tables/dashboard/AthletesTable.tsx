"use client";

import { useState } from "react";
import type { User } from "@/types";

interface UsersTableProps {
  users: User[];
}

const translateGender = (gender: string): string => {
  const translations: Record<string, string> = {
    male: "Mann",
    female: "Kvinne",
  };

  return translations[gender] || gender;
};

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<string>("Alle");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  const handleSearch = () => {
    const updatedFilteredUsers = users.filter((user) => {
      const includesSearchTerm =
        user.id.toString().includes(searchTerm) ||
        user.userId.toString().includes(searchTerm);

      const passesGenderFilter =
        genderFilter === "Alle" || user.gender === genderFilter;

      return includesSearchTerm && passesGenderFilter;
    });

    setFilteredUsers(updatedFilteredUsers);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setGenderFilter("Alle");
    setFilteredUsers(users);
  };

  const genderOptions = ["Alle", "male", "female"];

  return (
    <section className="p-6">
      <div className="mb-4 flex justify-between">
        <div>
          <input
            type="text"
            id="search"
            placeholder="Søk etter utøvere"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mr-2 border p-2"
          />
          <button
            onClick={handleSearch}
            className="mr-2 rounded bg-black px-4 py-2 text-white"
          >
            Søk
          </button>
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="rounded bg-red-500 px-4 py-2 text-white"
            >
              Tøm søk
            </button>
          )}
        </div>
        <div className="flex flex-col items-center">
          <select
            id="genderFilter"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="w-[100px] border p-2"
          >
            {genderOptions.map((option) => (
              <option key={option} value={option}>
                {translateGender(option)}
              </option>
            ))}
          </select>
        </div>
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
                <td className="border px-4 py-2">
                  {translateGender(user.gender)}
                </td>
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