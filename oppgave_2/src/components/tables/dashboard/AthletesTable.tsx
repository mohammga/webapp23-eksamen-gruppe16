"use client";

import { useState } from "react";
import type { Athlete } from "@/types";
import { useRouter } from "next/navigation";

interface athletesTableProps {
  athletes: Athlete[];
}

const translateGender = (gender: string): string => {
  const translations: Record<string, string> = {
    male: "Mann",
    female: "Kvinne",
  };

  return translations[gender] || gender;
};


const athletesTable: React.FC<athletesTableProps> = ({ athletes }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredAthletes, setFilteredAthletes] = useState<Athlete[]>(athletes);

    const handleCreateSession = (id: string) => {
    router.push(`/new/session/${id}`);
  };


  const handleShowSession = (id: string) => {
    router.push(`/session/${id}`);
  };

  const handleShowAthlete = (id: string) => {
    router.push(`/athlete/${id}`);
  };

  const handleShowGoal = (id: string) => {
    router.push(`/new/goal/${id}`);
  };

  const handleSearch = () => {
    const updatedFilteredathletes = athletes.filter((athlete) => {
      const includesSearchTerm =
        athlete.userId.toString().includes(searchTerm);

      return includesSearchTerm;
    });

    setFilteredAthletes(updatedFilteredathletes);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredAthletes(athletes);
  };

  return (
    <section className="p-6">
      <div className="mb-4 flex justify-between">
        <div>
          <input
            type="text"
            id="search"
            placeholder="Søk etter utøvere..."
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
      </div>
      {filteredAthletes.length === 0 ? (
        <p>Ingen utøvere funnet.</p>
      ) : (
        <table className="mt-4 w-full border-collapse">
          <thead>
            <tr>
              <th className="border bg-black px-4 py-2 text-white">BrukerId</th>
              <th className="border bg-black px-4 py-2 text-white">Kjønn</th>
              <th className="border bg-black px-4 py-2 text-white">
                Handlinger
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAthletes.map((athlete) => (
              <tr key={athlete.id}>
                <td className="border px-4 py-2">{athlete.userId}</td>
                <td className="border px-4 py-2">
                  {translateGender(athlete.gender)}
                </td>
                <td className="border px-4 py-2">
                           <button onClick={() => handleCreateSession(athlete.id)} className="mr-2 rounded bg-black px-4 py-2 text-white">
                    Opprett økt
                  </button>
                  <button onClick={() => handleShowSession(athlete.id)} className="mr-2 rounded bg-black px-4 py-2 text-white">
                    Vis økter
                  </button>
                  <button onClick={() => handleShowAthlete(athlete.id)} className="ml-2 rounded bg-black px-4 py-2 text-white">
                    Endre informasjon
                  </button>
                  <button onClick={() => handleShowGoal(athlete.id)} className="ml-2 rounded bg-black px-4 py-2 text-white">
                    Opprett mål
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

export default athletesTable;