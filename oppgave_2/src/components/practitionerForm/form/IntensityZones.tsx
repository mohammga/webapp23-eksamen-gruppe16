"use client"
interface IntensityZonesProps {
  intensityZones: {
    heartRate: number[];
    watt: number[];
    speed: number[];
  };
}

const IntensityZones: React.FC<IntensityZonesProps> = ({ intensityZones }) => {
  return (
    <div className="intensity-zones max-w-md mx-auto bg-white p-8 mt-8 rounded shadow-md">
      <h3 className="text-xl font-bold mb-4">Intensitetssoner</h3>
      {intensityZones.heartRate.map((zone, index) => (
        <div className="intensity-zone flex justify-between mb-2" key={index}>
          <span>Puls ({(index + 1) * 10} % av makspuls):</span>
          <span>{zone.toFixed(2)}</span>
        </div>
      ))}
      {/* Gjenta for watt og fart */}
      {/* ... */}
    </div>
  );
};

export default IntensityZones;
