import { useState } from "react";
import type { Task } from "@/types"


type Props = {
  data: Task[]
}

export default function useProgress() {
  const [count, setCount] = useState(0) //Trengs ikke
  const [amount, setAmount] = useState(0)
  const [current, setCurrent] = useState(0)
  const [answerCorrect, setAnswerCorrect] = useState(0) //Trengs ikke
  const [canSkip, setCanSkip] = useState(false)

  return  {count, current, canSkip, setCanSkip, setCurrent, answerCorrect, setAnswerCorrect, setCount, amount, setAmount}
}