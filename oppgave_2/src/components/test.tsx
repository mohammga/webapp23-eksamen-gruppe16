"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { Athlete } from "@/types"

const newAthlete: Athlete = {
  userId: "Mohammed er Kongen",
  gender: "Mann",
  sportType: "Løp",
}

export default function test() {
  const [formData, setFormData] = useState<Athlete>(newAthlete)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    console.log(formData)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const response = await fetch("/api/athlete", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  const inputFieldStyle =
    "mt-1 p-2 w-half rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
  const labelStyle = "block text-sm font-medium text-gray-700"

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-10">
        <div className="mb-4">
          <h1 className="mb-4">Kjønn</h1>
          <div className="mb-2 flex items-center gap-2">
            <input
              required
              type="radio"
              id="mann"
              name="gender"
              value="Mann"
              checked={formData.gender === "Mann"}
              onChange={handleChange}
            />
            <label htmlFor="gender" className={labelStyle}>
              Mann
            </label>
          </div>
          <div className="mb-4 flex items-center gap-2">
            <input
              required
              type="radio"
              id="kvinne"
              name="gender"
              value="Kvinne"
              checked={formData.gender === "Kvinne"}
              onChange={handleChange}
            />
            <label htmlFor="gender" className={labelStyle}>
              Kvinne
            </label>
          </div>
          <h1 className="mb-4">Sport</h1>
          <div className="mb-2 flex items-center gap-2">
            <input
              required
              type="radio"
              id="løp"
              name="sport"
              value="Løp"
              checked={formData.sportType === "Løp"}
              onChange={handleChange}
            />
            <label htmlFor="sport" className={labelStyle}>
              Løp
            </label>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <input
              required
              type="radio"
              id="sykkel"
              name="sport"
              value="Sykkel"
              checked={formData.sportType === "Sykkel"}
              onChange={handleChange}
            />
            <label htmlFor="sport" className={labelStyle}>
              Sykkel
            </label>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <input
              required
              type="radio"
              id="ski"
              name="sport"
              value="Ski"
              checked={formData.sportType === "Ski"}
              onChange={handleChange}
            />
            <label htmlFor="sport" className={labelStyle}>
              Ski
            </label>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <input
              required
              type="radio"
              id="triathlon"
              name="sport"
              value="Triathlon"
              checked={formData.sportType === "Triathlon"}
              onChange={handleChange}
            />
            <label htmlFor="sport" className={labelStyle}>
              Triathlon
            </label>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <input
              required
              type="radio"
              id="svømming"
              name="sport"
              value="Svømming"
              checked={formData.sportType === "Svømming"}
              onChange={handleChange}
            />
            <label htmlFor="sport" className={labelStyle}>
              Svømming
            </label>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <input
              required
              type="radio"
              id="styrke"
              name="sport"
              value="Styrke"
              checked={formData.sportType === "Styrke"}
              onChange={handleChange}
            />
            <label htmlFor="sport" className={labelStyle}>
              Styrke
            </label>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <input
              required
              type="radio"
              id="annet"
              name="sport"
              value="Annet"
              checked={formData.sportType === "Annet"}
              onChange={handleChange}
            />
            <label htmlFor="sport" className={labelStyle}>
              Annet
            </label>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 hover:text-yellow-300"
          >
            Oppret utøver
          </button>
        </div>
      </form>
    </div>
  )
}
