import React, { ChangeEvent } from 'react';

interface IntensityZonesProps {
  maxHeartRate: string;
  thresholdWatt: string;
  thresholdSpeed: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const IntensityZones: React.FC<IntensityZonesProps> = ({
  maxHeartRate,
  thresholdWatt,
  thresholdSpeed,
  onChange,
}) => {
  return (
    <>
      <label htmlFor="maxHeartRate" className="block text-gray-700 text-sm font-bold mb-2">
        Maksimal hjertefrekvens:
      </label>
      <input
        type="number"
        id="maxHeartRate"
        value={maxHeartRate}
        onChange={onChange}
        required
        placeholder="190 bpm"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <label htmlFor="thresholdWatt" className="block text-gray-700 text-sm font-bold mb-2">
        Terskelwatt:
      </label>
      <input
        type="number"
        id="thresholdWatt"
        value={thresholdWatt}
        onChange={onChange}
        required
        placeholder="250 watt"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <label htmlFor="thresholdSpeed" className="block text-gray-700 text-sm font-bold mb-2">
        Terskelfart:
      </label>
      <input
        type="number"
        id="thresholdSpeed"
        value={thresholdSpeed}
        onChange={onChange}
        required
        placeholder="30 km/t"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
    </>
  );
};

export default IntensityZones;
