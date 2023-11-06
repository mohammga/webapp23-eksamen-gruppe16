"use client";

import { useState } from "react";
import type { FormEvent, MouseEvent } from "react"
import TaskText from "@/components/Text"


export default function Answer() {
  const [answer, setAnswer] = useState(0)

  const send = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log(answer)
  }

  const update = (event: FormEvent<HTMLInputElement>) => {
    setAnswer(event.currentTarget.valueAsNumber)
  }

  return (
    <div className="flex flex-col">
      <TaskText text={"Skriv resultatet av regneoperasjonen"} />
      <label htmlFor="answer">Svar</label>
      <input
        name="answer"
        type="number"
        placeholder="Sett svar her"
        onInput={update}
      />
      {9 + 2 === answer ? "Bra jobbet!" : null}
      <button className="bg-blue-500 text-white" onClick={send}>Send</button>
    </div>
  )
}