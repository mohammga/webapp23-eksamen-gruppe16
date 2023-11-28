"use client"

import { useState } from "react"
import { useParams } from "next/navigation"

interface Session {
  id: number
  date: string
  name: string
  tags: string[]
  type: string
  status: string
}

const SessionsTable: React.FC = () => {
  const [filterType, setFilterType] = useState("")
  const [filterTag, setFilterTag] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [sortByDate, setSortByDate] = useState<"asc" | "desc">("desc")

  const params = useParams()
  const { athleteId } = params

  const sessions: Session[] = [
    {
      id: 1,
      date: "2023-11-27",
      name: "Økt 1",
      tags: ["Utendørs", "Løping"],
      type: "Trening",
      status: "normal",
    },
    {
      id: 2,
      date: "2023-11-28",
      name: "Økt 2",
      tags: ["Innendørs", "Styrke"],
      type: "Trening",
      status: "low",
    },
  ]

  const filteredSessions = sessions.filter((session) => {
    return (
      (filterType === "" || session.type === filterType) &&
      (filterTag === "" || session.tags.includes(filterTag)) &&
      (filterStatus === "" || session.status === filterStatus)
    )
  })

  const sortedSessions = filteredSessions.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return sortByDate === "asc" ? dateA - dateB : dateB - dateA
  })

  const duplicateSession = (session: Session) => {
    console.log("Dupliser økt:", session)
  }

  const deleteSession = (session: Session) => {
    console.log("Slett økt:", session)
  }

  const editSession = (session: Session) => {
    console.log("Endre økt:", session)
  }

  const reportSession = (session: Session) => {
    console.log("Rapporter økt:", session)
  }

  const downloadSession = (session: Session) => {
    console.log("Last ned økt:", session)
  }

  return (
    <>
      <h1 className="px-6 pt-6 text-3xl font-bold">
        Se øktene til {athleteId}
      </h1>
      <section className="px-6">
        <div className="mb-4">
          <select
            id="typeFilter"
            className="mr-2 w-[100px] border p-2"
            onChange={(e) => setFilterType(e.target.value)}
            value={filterType}
          >
            <option value="">Alle typer</option>
            <option value="Trening">Trening</option>
          </select>

          <select
            id="tagFilter"
            className="mr-2 w-[100px] border p-2"
            onChange={(e) => setFilterTag(e.target.value)}
            value={filterTag}
          >
            <option value="">Alle tags</option>
          </select>

          <select
            id="statusFilter"
            className="w-[100px] border p-2"
            onChange={(e) => setFilterStatus(e.target.value)}
            value={filterStatus}
          >
            <option value="">Alle status</option>
            <option value="ingen rapport">Ingen rapport</option>
            <option value="no">No</option>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>

          <select
            className="w-[100px] border p-2"
            onChange={() =>
              setSortByDate(sortByDate === "asc" ? "desc" : "asc")
            }
            value={sortByDate}
          >
            <option value="desc">Nyeste først</option>
            <option value="asc">Eldste først</option>
          </select>
        </div>
        <table className="mt-4 w-full border-collapse">
          <thead>
            <tr>
              <th className="border bg-black px-4 py-2 text-white">Dato</th>
              <th className="border bg-black px-4 py-2 text-white">Navn</th>
              <th className="border bg-black px-4 py-2 text-white">Tags</th>
              <th className="border bg-black px-4 py-2 text-white">
                Type aktivitet
              </th>
              <th className="border bg-black px-4 py-2 text-white">Status</th>
              <th className="border bg-black px-4 py-2 text-white">
                Handlinger
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedSessions.map((session) => (
              <tr key={session.id}>
                <td className="border px-4 py-2">{session.date}</td>
                <td className="border px-4 py-2">{session.name}</td>
                <td className="border px-4 py-2">{session.tags.join(", ")}</td>
                <td className="border px-4 py-2">{session.type}</td>
                <td className="border px-4 py-2">{session.status}</td>
                <td className="border px-4 py-2">
                  <button
                    className="mr-2 rounded bg-black px-4 py-2 text-white"
                    onClick={() => duplicateSession(session)}
                  >
                    Dupliser
                  </button>
                  <button
                    className="mr-2 rounded bg-black px-4 py-2 text-white"
                    onClick={() => deleteSession(session)}
                  >
                    Slett
                  </button>
                  <button
                    className="mr-2 rounded bg-black px-4 py-2 text-white"
                    onClick={() => editSession(session)}
                  >
                    Endre
                  </button>

                  <button
                    className="mr-2 rounded bg-black px-4 py-2 text-white"
                    onClick={() => reportSession(session)}
                  >
                    Rapporter
                  </button>

                  {session.status !== "ingen rapport" && (
                    <button
                      className="ml-2 rounded bg-black px-4 py-2 text-white"
                      onClick={() => downloadSession(session)}
                    >
                      Last ned
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default SessionsTable
