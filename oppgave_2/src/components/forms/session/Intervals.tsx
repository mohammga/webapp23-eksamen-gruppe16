"use client"
import React, { useState } from 'react';
import { Interval } from '@/types/index';

const defaultInterval = { duration: 0, intensityZone: '' };

export default function Intervals() {
  const [formData, setFormData] = useState({
    intervals: [defaultInterval],
  });

  const handleIntervalChange = (index: number, field: keyof Interval, value: number | string) => {
    const newIntervals = [...formData.intervals];
    (newIntervals[index] as any)[field] = value;
    setFormData({ intervals: newIntervals });
  };

  const handleAddInterval = () => {
    setFormData({
      intervals: [...formData.intervals, defaultInterval],
    });
  };

  const handleRemoveInterval = (index: number) => {
    const newIntervals = [...formData.intervals];
    newIntervals.splice(index, 1);
    setFormData({ intervals: newIntervals });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="block font-bold text-gray-700 text-sm mb-2">Intervals</label>
      {formData.intervals.map((interval, index) => (
        <div key={index} className="mt-2">
          <label className="block text-gray-700 text-sm mb-2">Duration (min):</label>
          <input
            type="number"
            value={interval.duration}
            onChange={(e) => handleIntervalChange(index, 'duration', +e.target.value)}
            className="w-full p-1 mt-1 border rounded-md"
          />

          <label className="block text-gray-700 text-sm mb-2">Intensity Zone:</label>
          <input
            type="text"
            value={interval.intensityZone}
            onChange={(e) => handleIntervalChange(index, 'intensityZone', e.target.value)}
            className="w-full p-1 mt-1 border rounded-md"
          />

          {index > 0 && (
            <button
              type="button"
              onClick={() => handleRemoveInterval(index)}
              className="bg-red-500 text-white p-2 mt-2 rounded-md"
            >
              slett
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={handleAddInterval} className="bg-green-500 text-white p-2 mt-2 rounded-md">
        Legg interval
      </button>
    </form>
  );
}