"use client"

import { ChangeEvent, FormEvent, useState } from "react"

interface AthleteFormData {
  userId: string
  gender: string
  sportType: string
  meta: {
    heartRate: string
    watt: string
    speed: string
  }
  goals: { goalId: string; date: string }[]
}

const ShowAthlete: React.FC = () => {
  const [formData, setFormData] = useState<AthleteFormData>({
    userId: "",
    gender: "",
    sportType: "",
    meta: {
      heartRate: "",
      watt: "",
      speed: "",
    },
    goals: [{ goalId: "", date: "" }],
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleGoalChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { id, value } = e.target
    const updatedGoals = [...formData.goals]
    updatedGoals[index] = { ...updatedGoals[index], [id]: value }
    setFormData({ ...formData, goals: updatedGoals })
  }

  const handleAddGoal = () => {
    setFormData({
      ...formData,
      goals: [...formData.goals, { goalId: "", date: "" }],
    })
  }

  const handleRemoveGoal = (index: number) => {
    const updatedGoals = [...formData.goals]
    updatedGoals.splice(index, 1)
    setFormData({ ...formData, goals: updatedGoals })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 max-w-md rounded bg-white p-8 shadow-md"
    >
      <h2 className="mb-4 text-2xl font-bold">Se eller endre utøver</h2>

      <label
        htmlFor="uniqueId"
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        Unik ID:
      </label>
      <input
        type="text"
        id="uniqueId"
        placeholder="abc-123-979"
        required
        value={formData.userId}
        onChange={handleChange}
        className="mb-4 w-full rounded border border-gray-300 p-2"
      />

      <label
        htmlFor="gender"
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        Kjønn:
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
        Type sport:
      </label>
      <select
        id="sportType"
        onChange={handleChange}
        required
        value={formData.sportType}
        className="mb-4 w-full rounded border border-gray-300 p-2"
      >
        <option value="running">Løp</option>
        <option value="cycling">Sykkel</option>
        <option value="skiing">Ski</option>
        <option value="triathlon">Triathlon</option>
        <option value="swimming">Svømming</option>
        <option value="strength">Styrke</option>
        <option value="other">Annet</option>
      </select>

      <label
        htmlFor="maxHeartRate"
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        Maksimal hjertefrekvens:
      </label>
      <input
        type="number"
        id="maxHeartRate"
        value={formData.meta.heartRate}
        onChange={handleChange}
        required
        placeholder="190 bpm"
        className="mb-4 w-full rounded border border-gray-300 p-2"
      />

      <label
        htmlFor="thresholdWatt"
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        Terskelwatt:
      </label>
      <input
        type="number"
        id="thresholdWatt"
        value={formData.meta.watt}
        onChange={handleChange}
        required
        placeholder="250 watt"
        className="mb-4 w-full rounded border border-gray-300 p-2"
      />

      <label
        htmlFor="thresholdSpeed"
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        Terskelfart:
      </label>
      <input
        type="number"
        id="thresholdSpeed"
        value={formData.meta.speed}
        onChange={handleChange}
        required
        placeholder="30 km/t"
        className="mb-4 w-full rounded border border-gray-300 p-2"
      />

      <div className="mb-4">
        {formData.goals.map((goal, index) => (
          <div key={index}>
            <label
              htmlFor={`goalId-${index}`}
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Mål:
            </label>
            <input
              type="text"
              id={`goalId-${index}`}
              name={`goalId-${index}`}
              placeholder="Legg til mål"
              value={goal.goalId}
              onChange={(e) => handleGoalChange(e, index)}
              className="mb-4 w-full rounded border border-gray-300 p-2"
            />

            <label
              htmlFor={`date-${index}`}
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Dato:
            </label>
            <input
              type="text"
              id={`date-${index}`}
              name={`date-${index}`}
              placeholder="2023-12-01"
              value={goal.date}
              onChange={(e) => handleGoalChange(e, index)}
              className="mb-2 w-full rounded border border-gray-300 p-2"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveGoal(index)}
                className="mr-2 text-red-500"
              >
                Fjern mål
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddGoal}
          className="rounded bg-gray-500 px-2 py-1 text-white"
        >
          Legg til mål
        </button>
      </div>

      <button
        type="submit"
        className="mr-2 rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
      >
        Endre
      </button>

      <button className="rounded bg-red-500 px-4 py-2 text-white">Lukk</button>
    </form>
  )
}

export default ShowAthlete
