import { useState } from "react";


export default function useProgress() {
  const [count, setCount] = useState(0)
  const [current, setCurrent] = useState(0)
   const [amount, setAmount] = useState(0)

  const [message, setMessage] = useState("")
  const [failed, setFailed] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [poeng, setPoeng] = useState(0)

  const next = () => {
    // Øke current med 1 for å gå til neste spørsmål
    setCurrent(current + 1)
    // Reseter count til 0 for å starte på nytt med 0 forsøk på neste spørsmål
    setCount(0); 
    // Setter failed til false for å resette failed state
    setFailed(false);
    // Setter correct til false for å resette correct state
    setCorrect(false);
    // Setter message til tom string for å resette message state
    setMessage("");
  };

  const previous = () => {
    // Minske current med 1 for å gå tilbake til forrige spørsmål
    setCurrent(current - 1)
  };

  const setError = () => {
    if (count < 3) {
      setCount(count + 1)
    }
    if (count === 2) {
      setFailed(true)
    }
  }
  const leggPoeng = () =>{
    setPoeng(poeng + 1)
    setCount(count + 1)
  }

  return  {poeng, count, current, setCurrent, correct, failed, message, amount, leggPoeng, setAmount, setMessage, next, previous, setCorrect, setError}
}