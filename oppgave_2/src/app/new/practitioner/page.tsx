"use client"
import { useState } from 'react';
import AthleteForm from '@/components/practitionerForm/form/AthleteForm';
import IntensityZones from '@/components/practitionerForm/form/IntensityZones';

const Home: React.FC = () => {
  const [intensityZones, setIntensityZones] = useState<{
    heartRate: number[];
    watt: number[];
    speed: number[];
  } | null>(null);

  const handleSubmit = (formData: any) => {
    // Gjør nødvendig logikk for å beregne intensitetssoner her
    const calculatedIntensityZones = calculateIntensityZones(
      parseInt(formData.maxHeartRate),
      parseInt(formData.thresholdWatt),
      parseInt(formData.thresholdSpeed)
    );

    // Oppdater tilstanden for intensitetssoner
    setIntensityZones(calculatedIntensityZones);
  };

  const calculateIntensityZones = (maxHeartRate: number, thresholdWatt: number, thresholdSpeed: number) => {
    // Implementer beregningene for intensitetssoner her
    // ...

    return {
      heartRate: [maxHeartRate * 0.5, maxHeartRate * 0.6, maxHeartRate * 0.7, maxHeartRate * 0.8, maxHeartRate * 0.9],
      watt: [thresholdWatt * 0.5, thresholdWatt * 0.6, thresholdWatt * 0.7, thresholdWatt * 0.8, thresholdWatt * 0.9],
      speed: [thresholdSpeed * 0.5, thresholdSpeed * 0.6, thresholdSpeed * 0.7, thresholdSpeed * 0.8, thresholdSpeed * 0.9],
    };
  };

  return (
    <div>
      <section className="p-4">
        <h2 className="text-2xl font-bold mb-4">Opprette utøver</h2>
        <AthleteForm onSubmit={handleSubmit} />
        {intensityZones && <IntensityZones intensityZones={intensityZones} />}
      </section>
    </div>
  );
};

export default Home;
