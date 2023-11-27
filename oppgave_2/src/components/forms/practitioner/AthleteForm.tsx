"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import { AthleteFormData } from "@/types/Athlete"

const AthleteForm: React.FC<AthleteFormData> = () => {

  const [formData, setFormData] = useState<AthleteFormData>({
    uniqueId: 'abc-20',
    gender: 'male',
    sportType: 'running',
    maxHeartRate: '',
    thresholdWatt: '',
    thresholdSpeed: '',
    intensityZoneHeartRate: '',
    intensityZoneWatt: '',
    intensityZoneSpeed: '',
    intensityZone: '',
    activities: [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e: FormEvent) => {
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 mt-8 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Opprett utøver</h2>

      <label htmlFor="uniqueId" className="block text-gray-700 text-sm font-bold mb-2">
        Unik ID:
      </label>
      <input
        type="text"
        id="uniqueId"
        placeholder="abc-123-979"
        required
        value={formData.uniqueId}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">
        Kjønn:
      </label>
      <select
        id="gender"
        onChange={handleChange}
        required
        value={formData.gender}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      >
        <option value="male">Mann</option>
        <option value="female">Kvinne</option>
      </select>

      <label htmlFor="sportType" className="block text-gray-700 text-sm font-bold mb-2">
        Type sport:
      </label>
      <select
        id="sportType"
        onChange={handleChange}
        required
        value={formData.sportType}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      >
        <option value="running">Løp</option>
        <option value="cycling">Sykkel</option>
        <option value="skiing">Ski</option>
        <option value="triathlon">Triathlon</option>
        <option value="swimming">Svømming</option>
        <option value="strength">Styrke</option>
        <option value="other">Annet</option>
      </select>

      <button type="submit" className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700">
        Opprett
      </button>
    </form>
  );
};

export default AthleteForm;
