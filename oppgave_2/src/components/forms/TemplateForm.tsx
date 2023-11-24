"use client"

import { useState } from "react"
import type { TemplateFormData, Interval } from "@/types"

const TemplateForm: React.FC = () => {
  const [formData, setFormData] = useState<TemplateFormData>({
    name: "",
    tags: [""],
    slug: "",
    activityType: "",
    questions: [""],
    measurementParameter: "",
    intervals: [{ duration: 0, intensityZone: "" }],
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

  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      activityType: e.target.value,
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
      className="mx-auto mt-8 max-w-md rounded bg-white p-8 shadow-md"
    >
      <h2 className="mb-4 text-2xl font-bold">Opprett mal</h2>
      <label className="block text-sm font-bold text-gray-600">
        Navn på treningsøkten:
      </label>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        className="mb-4 w-full rounded border border-gray-300 p-2"
      />

      <label className="mb-2 block text-sm font-bold text-gray-700">
        Tagger (komma separert):
      </label>
      <input
        type="text"
        name="tags"
        value={formData.tags}
        onChange={handleTagsChange}
        className="mb-4 w-full rounded border border-gray-300 p-2"
      />

      <label className="mb-2 block text-sm font-bold text-gray-700">
        Slug:
      </label>
      <input
        type="text"
        name="slug"
        value={formData.slug}
        onChange={handleInputChange}
        className="mb-4 w-full rounded border border-gray-300 p-2"
      />

      <label className="mb-2 block text-sm font-bold text-gray-700">
        Type aktivitet:
      </label>
      <select
        name="activityType"
        value={formData.activityType}
        onChange={handleSelectChange}
        className="mb-4 w-full rounded border border-gray-300 p-2"
      >
        {activityTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <label className="mb-2 block text-sm font-bold text-gray-700">
        Spørsmål
      </label>
      <select
        name="activityType"
        value={formData.activityType}
        onChange={handleSelectChange}
        className="mb-4 w-full rounded border border-gray-300 p-2"
      >
        {activityTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <label className="mb-2 block text-sm font-bold text-gray-700">
        Måleparameter:
      </label>
      <input
        type="text"
        name="measurementParameter"
        value={formData.measurementParameter}
        onChange={handleInputChange}
        className="mb-4 w-full rounded border border-gray-300 p-2"
      />

      <label className="mb-2 block text-sm font-bold text-gray-700">
        Intervaler:
      </label>
      {formData.intervals.map((interval, index) => (
        <div key={index} className="mt-2">
          <label className="block text-xs font-semibold text-gray-600">
            Varighet (min):
          </label>
          <input
            type="number"
            value={interval.duration}
            className="mb-4 w-full rounded border border-gray-300 p-2"
          />

          <label className="mt-2 block text-xs font-semibold text-gray-600">
            Intensitetssone:
          </label>
          <input
            type="text"
            value={interval.intensityZone}
            className="mb-4 w-full rounded border border-gray-300 p-2"
          />
        </div>
      ))}
      <button type="submit" className="rounded bg-black px-4 py-2 text-white">
        Opprett
      </button>
    </form>
  )
}

export default TemplateForm
