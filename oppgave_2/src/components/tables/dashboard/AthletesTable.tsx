"use client";

import { useState } from "react";
import Link from "next/link";
import type { Athlete } from "@/types";
import { useRouter } from "next/navigation"


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
  const [genderFilter, setGenderFilter] = useState<string>("Alle");
  const [filteredAthletes, setFilteredAthletes] = useState<Athlete[]>(athletes);


  const handleShowSession = (id: string) => {
    router.push(`/show-session/${id}`);
  };

  const handleShowReport = (id: string) => {
    router.push(`/show-report/${id}`);
  };


  const handleSearch = () => {
    const updatedFilteredathletes = athletes.filter((athlete) => {
      const includesSearchTerm =
        athlete.userId.toString().includes(searchTerm);

      const passesGenderFilter =
        genderFilter === "Alle" || athlete.gender === genderFilter;

      return includesSearchTerm && passesGenderFilter;
    });

    setFilteredAthletes(updatedFilteredathletes);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setGenderFilter("Alle");
    setFilteredAthletes(athletes);
  };

  const genderOptions = ["Alle", "male", "female"];

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
              <tr key={athlete.userId}>
                <td className="border px-4 py-2">{athlete.userId}</td>
                <td className="border px-4 py-2">
                  {translateGender(athlete.gender)}
                </td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleShowSession(athlete.userId)} className="mr-2 rounded bg-black px-4 py-2 text-white">
                    Vis økter
                  </button>
                  <button onClick={() => handleShowReport(athlete.userId)} className="rounded bg-black px-4 py-2 text-white">
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

export default athletesTable;