"use client";

import { useState } from 'react';





interface FormData {
  name: string;
  tags: string;
  slug: string;
  activityType: string;
  questions: number;
  measurementParameter: string;
  intervals: Interval[];
  // Add the rest of the attributes
}

interface Interval {
  duration: number;
  intensityZone: string;
}

const TemplateForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    tags: '',
    slug: '',
    activityType: '',
    questions: 0,
    measurementParameter: '',
    intervals: [{ duration: 0, intensityZone: '' }],
    // Initialize the rest of the attributes
  });

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
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: e.target.value,
    }));
  };

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
      intervals: [...prevData.intervals, { duration: 0, intensityZone: '' }],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic for submission, e.g., saving to a database
    console.log('Form data submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-gray-100 border rounded-md">
              <h1 className="text-3xl">Legg til mal</h1>
      <label className="block text-sm font-bold text-gray-600">Navn på treningsøkten:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        className="w-full p-2 mt-1 border rounded-md"
      />

      <label className="block mt-4 text-sm font-bold text-gray-600">Taggs (komma-separert):</label>
      <input
        type="text"
        name="tags"
        value={formData.tags}
        onChange={handleTagsChange}
        className="w-full p-2 mt-1 border rounded-md"
      />

      <label className="block mt-4 text-sm font-bold text-gray-600">Slug:</label>
      <input
        type="text"
        name="slug"
        value={formData.slug}
        onChange={handleInputChange}
        className="w-full p-2 mt-1 border rounded-md"
      />

      <label className="block mt-4 text-sm font-bold text-gray-600">Aktivitets type:</label>



<label className="block mt-4 text-sm font-bold text-gray-600">Type aktivitet:</label>
<select
  name="activityType"
  value={formData.activityType}
  onChange={handleSelectChange}
  className="w-full p-2 mt-1 border rounded-md"
>
  {activityTypes.map((type) => (
    <option key={type} value={type}>
      {type}
    </option>
  ))}
</select>



      <label className="block mt-4 text-sm font-bold text-gray-600">Number of questions:</label>
      <input
        type="number"
        name="questions"
        value={formData.questions}
        onChange={handleInputChange}
        className="w-full p-2 mt-1 border rounded-md"
      />

      <label className="block mt-4 text-sm font-bold text-gray-600">Measurement parameter:</label>
      <input
        type="text"
        name="measurementParameter"
        value={formData.measurementParameter}
        onChange={handleInputChange}
        className="w-full p-2 mt-1 border rounded-md"
      />

      <label className="block mt-4 text-sm font-bold text-gray-600">Intervals:</label>
      {formData.intervals.map((interval, index) => (
        <div key={index} className="mt-2">
          <label className="block text-xs font-semibold text-gray-600">Duration (min):</label>
          <input
            type="number"
            value={interval.duration}
            onChange={(e) => handleIntervalChange(index, 'duration', +e.target.value)}
            className="w-full p-1 mt-1 border rounded-md"
          />

          <label className="block mt-2 text-xs font-semibold text-gray-600">Intensity Zone:</label>
          <input
            type="text"
            value={interval.intensityZone}
            onChange={(e) => handleIntervalChange(index, 'intensityZone', e.target.value)}
            className="w-full p-1 mt-1 border rounded-md"
          />
        </div>
      ))}
      <button type="button" onClick={handleAddInterval} className="mt-2 text-sm text-blue-500 underline">
        Add Interval
      </button>

      <button type="submit" className="mt-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-md">
        Add Template
      </button>
    </form>
  );
};

export default TemplateForm;