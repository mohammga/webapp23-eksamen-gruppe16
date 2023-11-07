import { useState } from "react";

export default function useProgress() {
  const [count, setCount] = useState(0)
  const [current, setCurrent] = useState(0)

  const next = () => {
    //hvis svaret er riktig så skal counten resetes
    //ellers hvis feil
    if (count < 3) {
      setCurrent(current + 1)
      setCount(count + 1)
    }

  }

  const setError = () => {
    setCount(count + 1)
  }

  return { count, current, next, setError}
}