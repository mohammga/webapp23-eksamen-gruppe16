import { useState } from "react";
import type { Task } from "@/types"


type Props = {
  data: Task[]
}

export default function useProgress( tasks: Task[] ) {
  const [count, setCount] = useState(0) //Trengs ikke
  const [amount, setAmount] = useState(0)
  const [poeng, setPoeng] = useState(0)
  const [canSkip, setCanSkip] = useState(false)

  const [fasit, setFasit] = useState("")
  const [task, setTask] = useState<Task>()

  const [temafeil, setTemafeil] = useState([]) //"", "addisjon", "", "multiplication", "multi.."

  const hvaMåØvesMerPå = () => {
    try {
      console.log(temafeil);
      let testfeil = temafeil;
      return testfeil.reduce((a, b, _, arr) =>
        (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b)
      );

    } catch (error) {
      return "Ingenting";
    }
  };

  return  {count, poeng, 
    fasit, setFasit,
    task, setTask,
    temafeil, setTemafeil,
    setPoeng, canSkip, setCanSkip, 
    setCount, amount, setAmount, hvaMåØvesMerPå}
}