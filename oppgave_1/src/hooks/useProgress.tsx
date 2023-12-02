import { useState } from "react";
import type { Task } from "@/types"


type Props = {
  data: Task[]
}

export default function useProgress() {
  const [count, setCount] = useState(0)
  const [amount, setAmount] = useState(0)
  const [current, setCurrent] = useState(0)
  const [answerCorrect, setAnswerCorrect] = useState(0)

  return  {count, current, setCurrent, answerCorrect, setAnswerCorrect, setCount, amount, setAmount}
}