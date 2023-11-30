import { useState } from "react";
import type { Task } from "@/types"


type Props = {
  data: Task[]
}

export default function useProgress() {
  const [count, setCount] = useState(0)
  const [current, setCurrent] = useState(0)
  const [answer, setAnswer] = useState([""])
  const [temafeil, setTemafeil] = useState([]) //"", "addisjon", "", "multiplication", "multi.."
  const [amount, setAmount] = useState(0)

  const [message, setMessage] = useState("")
  const [failed, setFailed] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [poeng, setPoeng] = useState(0)

  const [data, setData] = useState<Task[]>([])

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

  const hvaMåØvesMerPå = () => {
    return temafeil.reduce((a, b, _, arr) =>
        (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b)
    );
  };

  const sendAnswers = () => {
    //setter answers inne i POST request
  }


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

  return  {poeng, count, current, data, temafeil, setTemafeil, setData, setCurrent, hvaMåØvesMerPå, correct, failed, message, amount, answer, leggPoeng, setAmount, setMessage, next, setCorrect, setError, setAnswer}
}