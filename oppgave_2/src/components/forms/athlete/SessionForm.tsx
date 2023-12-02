"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Session } from "@/types/index";


const SessionForm = () => {
  const [formData, setFormData] = useState<Session>({
    date: new Date("2021-10-10"),
    name: "Ole",
    slug: "kos",
    athleteId: "01fb8d71-46c7-4300-83d5-7a094df2dfac",
  })

  const router = useRouter()
  const [countdown, setCountdown] = useState(0)
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout

    if (countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)
    } else {
      if (formSubmitted) {
        router.push("/")
        router.refresh()
      }
    }

    return () => clearInterval(countdownInterval)
  }, [countdown, router, formSubmitted])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/session", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        setCountdown(5)
        setFormSubmitted(true)
      } else {
        console.error("Feil ved opprettelse av utøver")
      }
    } catch (error) {
      console.error("Noe gikk galt:", error)
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 max-w-md rounded bg-white p-8 shadow-md"
    >
      <h2 className="mb-4 text-2xl font-bold">Oppret økt</h2>

      {formSubmitted && (
        <p className="text-md mb-4 text-gray-600">
          Utøveren har blitt opprettet og du blir omdirigert om {countdown}{" "}
          sekunder.
        </p>
      )}
      <button
        type="submit"
        className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
      >
        Opprett
      </button>
    </form>
  )
}

export default SessionForm