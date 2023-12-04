"use client"

import { useEffect, useState } from "react";
import type { Session } from "@/types";
import { useParams, useRouter } from "next/navigation";

interface ApiResponse {
  success: boolean;
  data: Session[];
}

const SessionsTable: React.FC = () => {
  const [athleteSessions, setAthleteSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const router = useRouter();
  const { athleteId } = params;

  useEffect(() => {
    const fetchAthleteSessions = async () => {
      try {
        if (athleteId) {
          setLoading(true);

          const response = await fetch(
            `http://localhost:3000/api/session/${athleteId}/`,
            {
              method: "GET",
              cache: "no-store",
            },
          );

          if (!response.ok) {
            throw new Error("Failed to fetch athlete sessions");
          }

          const jsonResponse = await response.json();

          const { success, data } = jsonResponse as ApiResponse;

          if (success) {
            setAthleteSessions(data);
          } else {
            throw new Error("Failed to fetch athlete sessions");
          }
        }
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAthleteSessions();
  }, [athleteId]);

  const deleteSession = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/session/${athleteId}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete session");
      }
  
      setAthleteSessions((prevSessions) =>
        prevSessions.filter((session) => session.id !== id)
      );
  
    } catch (error: any) {
      console.error("Error deleting session:", error.message);
    }
  };
  

  const editSession = (id: string) => {
    console.log("Endre økt:", id);
    router.push(`/session/edit/${id}`);
  };

  return (
    <>
      <h1 className="px-6 pt-6 text-3xl font-bold">
        Se øktene til {athleteId}
      </h1>
      <section className="px-6">
        {loading && <p className="py-2">Laster inn...</p>}
        {!loading && athleteSessions.length === 0 && (
          <p className="py-2">Utøveren har ingen økter. Lag økter for utøveren å se de her.</p>
        )}
        {!loading && athleteSessions.length > 0 && (
          <table className="mt-4 w-full border-collapse">
            <thead>
              <tr>
                <th className="border bg-black px-4 py-2 text-white">Navn</th>
                <th className="border bg-black px-4 py-2 text-white">Tagg(er)</th>
                <th className="border bg-black px-4 py-2 text-white">Dato</th>
                <th className="border bg-black px-4 py-2 text-white">Sportstype(r)</th> 
                <th className="border bg-black px-4 py-2 text-white">
                  Handlinger
                </th>
              </tr>
            </thead>
            <tbody>
              {athleteSessions.map((session) => (
                <tr key={session.id}>
                  <td className="border px-4 py-2">{session.name}</td>
                  <td className="border px-4 py-2">{session.tags}</td>
                  <td className="border px-4 py-2">{session.date.toString()}</td>
                  <td className="border px-4 py-2">{session.sportType}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="mr-2 rounded bg-black px-4 py-2 text-white"
                      onClick={() => deleteSession(session.id)}
                    >
                      Slett
                    </button>
                    <button
                      className="mr-2 rounded bg-black px-4 py-2 text-white"
                      onClick={() => editSession(session.id)}
                    >
                      Endre
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
};

export default SessionsTable;
