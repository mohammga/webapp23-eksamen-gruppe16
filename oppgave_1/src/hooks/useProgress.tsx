import { useState } from "react";
import type { Task } from "@/types"

export default function useProgress({ tasks }: { tasks: Task[] }) {
  const [count, setCount] = useState(0)
  const current = tasks[7]

  const next = () => {
    //sette neste spørsmål
    setCount((prevCount) => prevCount + 1)
  }
  const prev = () => {
    //sette forrige spørsmål
    setCount(count - 1)
  }

  return { count, current, next, prev }
}