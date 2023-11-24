"use client"

import { useState } from "react"

interface FormData {
  name: string
  tags: string
  slug: string
  activityType: string
  questions: number
  measurementParameter: string
  intervals: Interval[]
  // Add the rest of the attributes
}

interface Interval {
  duration: number
  intensityZone: string
}

const TemplateForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    tags: "",
    slug: "",
    activityType: "",
    questions: 0,
    measurementParameter: "",
    intervals: [{ duration: 0, intensityZone: "" }],
    // Initialize the rest of the attributes
  })

  const activityTypes = [
    "Løp",
    "Sykkel",
    "Ski",
    "Triatlon",
    "Svømming",
    "Styrke",
    "Annet",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: e.target.value,
    }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      activityType: e.target.value,
    }))
  }

  const handleIntervalChange = (
    index: number,
    field: keyof Interval,
    value: string | number,
  ) => {
    const updatedIntervals = [...formData.intervals]
    updatedIntervals[index][field] =
      typeof value === "number" ? value : value.toString()
    setFormData((prevData) => ({
      ...prevData,
      intervals: updatedIntervals,
    }))
  }

  const handleAddInterval = () => {
    setFormData((prevData) => ({
      ...prevData,
      intervals: [...prevData.intervals, { duration: 0, intensityZone: "" }],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add logic for submission, e.g., saving to a database
    console.log("Form data submitted:", formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md rounded-md border bg-gray-100 p-4"
    >
      <h1 className="text-3xl">Legg til mal</h1>
      <label className="block text-sm font-bold text-gray-600">
        Navn på treningsøkten:
      </label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        className="mt-1 w-full rounded-md border p-2"
      />

      <label className="mt-4 block text-sm font-bold text-gray-600">
        Taggs (komma-separert):
      </label>
      <input
        type="text"
        name="tags"
        value={formData.tags}
        onChange={handleTagsChange}
        className="mt-1 w-full rounded-md border p-2"
      />

      <label className="mt-4 block text-sm font-bold text-gray-600">
        Slug:
      </label>
      <input
        type="text"
        name="slug"
        value={formData.slug}
        onChange={handleInputChange}
        className="mt-1 w-full rounded-md border p-2"
      />

      <label className="mt-4 block text-sm font-bold text-gray-600">
        Aktivitets type:
      </label>

      <label className="mt-4 block text-sm font-bold text-gray-600">
        Type aktivitet:
      </label>
      <select
        name="activityType"
        value={formData.activityType}
        onChange={handleSelectChange}
        className="mt-1 w-full rounded-md border p-2"
      >
        {activityTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <label className="mt-4 block text-sm font-bold text-gray-600">
        Spørsmål
      </label>
      <select
        name="activityType"
        value={formData.activityType}
        onChange={handleSelectChange}
        className="mt-1 w-full rounded-md border p-2"
      >
        {activityTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <label className="mt-4 block text-sm font-bold text-gray-600">
        Measurement parameter:
      </label>
      <input
        type="text"
        name="measurementParameter"
        value={formData.measurementParameter}
        onChange={handleInputChange}
        className="mt-1 w-full rounded-md border p-2"
      />

      <label className="mt-4 block text-sm font-bold text-gray-600">
        Intervals:
      </label>
      {formData.intervals.map((interval, index) => (
        <div key={index} className="mt-2">
          <label className="block text-xs font-semibold text-gray-600">
            Duration (min):
          </label>
          <input
            type="number"
            value={interval.duration}
            onChange={(e) =>
              handleIntervalChange(index, "duration", +e.target.value)
            }
            className="mt-1 w-full rounded-md border p-1"
          />

          <label className="mt-2 block text-xs font-semibold text-gray-600">
            Intensity Zone:
          </label>
          <input
            type="text"
            value={interval.intensityZone}
            onChange={(e) =>
              handleIntervalChange(index, "intensityZone", e.target.value)
            }
            className="mt-1 w-full rounded-md border p-1"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddInterval}
        className="mt-2 text-sm text-blue-500 underline"
      >
        Add Interval
      </button>

      <button
        type="submit"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 font-bold text-white"
      >
        Add Template
      </button>
    </form>
  )
}

export default TemplateForm
