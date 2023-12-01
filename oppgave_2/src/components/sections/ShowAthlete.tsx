"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Athlete } from "@/types/Athlete"

const ShowAthlete: React.FC = () => {
  const [formData, setFormData] = useState<Athlete>({
    userId: "",
    gender: "",
    sportType: "",
    meta: {
      heartRate: "",
      watt: "",
      speed: "",
    }, 
  })

  const router = useRouter()

  const handleBack = () => {
    router.push("/")
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target
    const newValue = e.target.type === "number" ? +value : value
    setFormData({ ...formData, [id]: newValue })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 max-w-md rounded bg-white p-8 shadow-md"
    >
      <h2 className="mb-4 text-2xl font-bold">Endre utøver-informasjon</h2>

      <label
        htmlFor="userId"
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        Unik ID
      </label>
      <input
        type="text"
        id="userId"
        required
        value={formData.userId}
        onChange={handleChange}
        className="mb-4 w-full rounded border border-gray-300 p-2"
      />

      <label
        htmlFor="gender"
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        Velg kjønn
      </label>
      <select
        id="gender"
        onChange={handleChange}
        required
        value={formData.gender}
        className="mb-4 w-full rounded border border-gray-300 p-2"
      >
        <option value="male">Mann</option>
        <option value="female">Kvinne</option>
      </select>

      <label
        htmlFor="sportType"
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        Velg type sport
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

      <label
        htmlFor="heartRate"
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        Maksimal hjertefrekvens
      </label>
      <input
        type="number"
        id="heartRate"
        value={formData.meta.heartRate}
        onChange={handleChange}
        required
        className="mb-4 w-full rounded border border-gray-300 p-2"
      />

      <label
        htmlFor="watt"
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        Terskelwatt
      </label>
      <input
        type="number"
        id="watt"
        value={formData.meta.watt}
        onChange={handleChange}
        required
        className="mb-4 w-full rounded border border-gray-300 p-2"
      />

      <label
        htmlFor="speed"
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        Terskelfart
      </label>
      <input
        type="number"
        id="speed"
        value={formData.meta.speed}
        onChange={handleChange}
        required
        className="mb-4 w-full rounded border border-gray-300 p-2"
      />

      <button onClick={handleBack} type="button" className="mr-2 rounded bg-gray-700 px-4 py-2 text-white">Tilbake</button>

      <button
        type="submit"
        className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
      >
        Endre
      </button>

    </form>
  )
}

export default ShowAthlete