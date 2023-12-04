"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"

import { Session } from "@/types/index"

const SessionForm = () => {

    const params = useParams()
    const { id } = params;
  const [formData, setFormData] = useState<Session>({
    name: "",
    date: new Date(),
    tag: "",
    slug: "",
    sportType: "",
    athleteId: id,
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
      const response = await fetch(`http://localhost:3000/api/session`, {
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
        console.error("Feil ved opprettelse av økt")
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
      <h2 className="mb-4 text-2xl font-bold">Opprett økt</h2>

      {formSubmitted && (
        <p className="text-md mb-4 text-gray-600">
          Økten har blitt opprettet og du blir omdirigert om {countdown}{" "}
          sekunder.
        </p>
      )}

      <label
        htmlFor="name"
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        Navn
      </label>
      <input
        type="text"
        id="name"
        required
        value={formData.name}
        onChange={handleChange}
        className="mb-4 w-full rounded border border-gray-300 p-2"
      />

      <label
        htmlFor="tag"
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        Tag
      </label>
      <input
        type="text"
        id="tag"
        required
        value={formData.tag}
        onChange={handleChange}
        className="mb-4 w-full rounded border border-gray-300 p-2"
      />

      <label
        htmlFor="slug"
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        Slug
      </label>
      <input
        type="text"
        id="slug"
        required
        value={formData.slug}
        onChange={handleChange}
        className="mb-4 w-full rounded border border-gray-300 p-2"
      />

      <label
        htmlFor="date"
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        Dato
      </label>
      <input
        type="date"
        id="date"
        onChange={handleChange}
        className="mb-4 w-full rounded border border-gray-300 p-2"
      />

      <label
        htmlFor="sportType"
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        Velg aktivitet
      </label>
      <select
        id="sportType"
        onChange={handleChange}
        required
        value={formData.sportType}
        className="mb-4 w-full rounded border border-gray-300 p-2"
      >
        <option value="">Velg sport</option>
        <option value="running">Løp</option>
        <option value="cycling">Sykkel</option>
        <option value="skiing">Ski</option>
        <option value="triathlon">Triathlon</option>
        <option value="swimming">Svømming</option>
        <option value="strength">Styrke</option>
        <option value="other">Annet</option>
      </select>

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
