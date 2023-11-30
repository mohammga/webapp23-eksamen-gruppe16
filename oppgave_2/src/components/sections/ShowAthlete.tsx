"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";





interface AthleteFormData {
  userId: string
  gender: string
  sportType: string
  meta: {
    heartRate: number
    watt: number
    speed: number
  }
  goals: { goalId: string; date: string }[]
  competitions: { competitionId: string; date: string }[]
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
    competitions: [{ competitionId: "", date: "" }],
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


  const handleCompetitionChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { id, value } = e.target
    const updatedCompetitions = [...formData.competitions]
    updatedCompetitions[index] = { ...updatedCompetitions[index], [id]: value }
    setFormData({ ...formData, competitions: updatedCompetitions })
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

  const handleAddCompetition = () => {
    setFormData({
      ...formData,
      competitions: [...formData.competitions, { competitionId: "", date: "" }],
    })
  }

  const handleRemoveCompetition = (index: number) => {
    const updatedCompetitions = [...formData.competitions]
    updatedCompetitions.splice(index, 1)
    setFormData({ ...formData, competitions: updatedCompetitions })
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
        Velg type sport:
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

      <div className="mb-4">
        {formData.goals.map((goal, index) => (
          <div key={index}>
            <label
              htmlFor={`goalId-${index}`}
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Mål
            </label>
            <input
              type="text"
              id={`goalId-${index}`}
              name={`goalId-${index}`}
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
              type="date"
              id={`date-${index}`}
              name={`date-${index}`}
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
          Legg til nytt mål
        </button>
      </div>

            <div className="mb-4">
        {formData.competitions.map((competition, index) => (
          <div key={index}>
            <label
              htmlFor={`competitionId-${index}`}
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Konkurranse
            </label>
            <input
              type="text"
              id={`competitionId-${index}`}
              name={`competitionId-${index}`}
              value={competition.competitionId}
              onChange={(e) => handleCompetitionChange(e, index)}
              className="mb-4 w-full rounded border border-gray-300 p-2"
            />

            <label
              htmlFor={`competitionDate-${index}`}
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Dato:
            </label>
            <input
              type="date"
              id={`competitionDate-${index}`}
              name={`competitionDate-${index}`}
              value={competition.date}
              onChange={(e) => handleCompetitionChange(e, index)}
              className="mb-2 w-full rounded border border-gray-300 p-2"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveCompetition(index)}
                className="mr-2 text-red-500"
              >
                Fjern konkurranse
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddCompetition}
          className="rounded bg-gray-500 px-2 py-1 text-white"
        >
          Legg til ny konkurranse
        </button>
      </div>

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