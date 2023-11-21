"use client"

import { useState, ChangeEvent, FormEvent } from 'react';
import Activity from "@/components/practitionerForm/form/Activity"

interface AthleteFormData {
  uniqueId: string;
  gender: string;
  sportType: string;
  maxHeartRate: string;
  thresholdWatt: string;
  thresholdSpeed: string;
  activities: {
    date: string;
    name: string;
    goalId: string;
  }[];
}

interface AthleteFormProps {
  onSubmit: (formData: AthleteFormData) => void;
}

const AthleteForm: React.FC<AthleteFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<AthleteFormData>({
    uniqueId: '',
    gender: 'male',
    sportType: 'running',
    maxHeartRate: '',
    thresholdWatt: '',
    thresholdSpeed: '',
    activities: [],
  });

  const [intensityZones, setIntensityZones] = useState<{
    heartRate: number[];
    watt: number[];
    speed: number[];
  } | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  
  const handleActivityChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { id, value } = e.target;
    const updatedActivities = [...formData.activities];
    updatedActivities[index] = { ...updatedActivities[index], [id]: value };
    setFormData({ ...formData, activities: updatedActivities });
  };

  const addActivity = () => {
    setFormData({
      ...formData,
      activities: [...formData.activities, { date: '', name: '', goalId: '' }],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 mt-8 rounded shadow-md">

      <label htmlFor="uniqueId" className="block text-gray-700 text-sm font-bold mb-2">
        Unik ID:
      </label>
      <input
        type="text"
        id="uniqueId"
        placeholder="abc-123-979"
        required
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

      <label htmlFor="maxHeartRate" className="block text-gray-700 text-sm font-bold mb-2">
        Maksimal hjertefrekvens:
      </label>
      <input
        type="number"
        id="maxHeartRate"
        value={formData.maxHeartRate}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <label htmlFor="thresholdWatt" className="block text-gray-700 text-sm font-bold mb-2">
        Terskelwatt:
      </label>
      <input
        type="number"
        id="thresholdWatt"
        value={formData.thresholdWatt}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <label htmlFor="thresholdSpeed" className="block text-gray-700 text-sm font-bold mb-2">
        Terskelfart:
      </label>
      <input
        type="number"
        id="thresholdSpeed"
        value={formData.thresholdSpeed}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />


      <label className="block text-gray-700 text-sm font-bold mb-2">Treningsaktiviteter</label>
      {formData.activities.map((activity, index) => (
        <Activity key={index} activity={activity} onChange={(e) => handleActivityChange(e, index)} />


      ))}

      <button type="submit" className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700">
        Opprett utøver
      </button>
      <button type="button" onClick={addActivity} className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700">
        Legg til aktivitet
      </button>
    </form>
  );
};

export default AthleteForm;
