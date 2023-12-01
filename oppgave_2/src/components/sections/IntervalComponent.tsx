// IntervalComponent.tsx
import React from "react"

interface IntervalComponentProps {
  duration: number
  intensityZone: string
  // Legg til andre intervallelementattributter
}

const IntervalComponent: React.FC<IntervalComponentProps> = ({
  duration,
  intensityZone,
  // Legg til andre intervallelementattributter som props
}) => {
  return (
    <div>
      <p>Varighet: {duration} min</p>
      <p>Intensitetssone: {intensityZone}</p>
      {/* Legg til andre intervallelementinnhold her */}
    </div>
  )
}

export default IntervalComponent
