"use client"

import { useState, ChangeEvent, FormEvent } from 'react';
import Activity from "@/components/practitionerForm/form/Activity"
import IntensityZones from '@/components/practitionerForm/form/IntensityZones';


interface AthleteFormData {
  uniqueId: string;
  gender: string;
  sportType: string;
  maxHeartRate: string;
  thresholdWatt: string;
  thresholdSpeed: string;
  intensityZoneHeartRate: string;
  intensityZoneWatt: string;
  intensityZoneSpeed: string;
  intensityZone: string;
  activities: {
    date: string;
    name: string;
    goalId: string;
  }[];

}

interface AthleteFormProps {
  // nødvendig props
}

const AthleteForm: React.FC<AthleteFormProps> = () => {



  const [formData, setFormData] = useState<AthleteFormData>({
    // fylle forms input feltene med nødvendig informasjon
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
    // Her skal utøver opprettes, og du kan kalle calculateIntensityZones() her
    calculateIntensityZones();
    // ... (resten av handleSubmit-koden)
  };


  const calculateIntensityZones = () => {
    // Implementer beregning av intensitetssoner basert på prestasjonsfaktorer
    // Dette kan gjøres ved å bruke formData.maxHeartRate, formData.thresholdWatt og formData.thresholdSpeed
  };

  const handleIntensityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, intensityZone: e.target.value });
  };

  const handleActivityChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { id, value } = e.target;
    const updatedActivities = [...formData.activities];
    updatedActivities[index] = { ...updatedActivities[index], [id]: value };
    setFormData({ ...formData, activities: updatedActivities });
  };

  const handleDeleteActivity = (index: number) => {
    const updatedActivities = [...formData.activities];
    updatedActivities.splice(index, 1); // Fjern aktivitet ved indeks
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
              <h2 className="text-2xl font-bold mb-4">Opprette utøver</h2>

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

      <IntensityZones
        maxHeartRate={formData.maxHeartRate}
        thresholdWatt={formData.thresholdWatt}
        thresholdSpeed={formData.thresholdSpeed}
        onChange={handleChange}
      />

      <label className="block text-gray-700 text-sm font-bold mb-2">Treningsaktiviteter</label>
      {formData.activities.map((activity, index) => (
        <Activity key={index} activity={activity} onChange={(e) => handleActivityChange(e, index)} onDelete={() => handleDeleteActivity(index)} />
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
