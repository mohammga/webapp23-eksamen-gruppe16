"use client";

import { useEffect, useState } from "react";
import type { Session } from "@/types";
import { useParams } from "next/navigation";



import SessionsTable from "@/components/tables/athlete/SessionsTable";


export default function Page() {
  const params = useParams()
  const { athleteId } = params
  const [athleteSessions, setAthleteSessions] = useState<Session[]>([])

  useEffect(() => {
    const fetchAthleteSessions = async () => {
      try {
        if (athleteId) {
          const response = await fetch(
            `http://localhost:3000/api/session/${athleteId}`,
            {
              method: "GET",
              cache: "no-store",
            },
          )

          if (!response.ok) {
            throw new Error("Failed to fetch athlete sessions");
          }

          const sessions: Session[] = await response.json() as Session[];
          setAthleteSessions(sessions);

          console.log("Fetched athlete sessions:", sessions);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    }

    fetchAthleteSessions()
      console.log("Athlete sessions:", athleteSessions)
  }, [athleteId])


  return (
    <div>
      <SessionsTable />
    </div>
  )
}