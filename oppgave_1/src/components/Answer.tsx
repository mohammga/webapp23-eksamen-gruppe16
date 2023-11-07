"use client";

import { useState } from "react";
import type { FormEvent, MouseEvent } from "react";
import { Task } from "@/types"


type TasksProps = {
  current: number;
  tasks: Task[]
}

export default function Answer({ tasks, current } : TasksProps) {
  const [answer, setAnswer] = useState(0)

  console.log(tasks[current].data)

  const send = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log(answer)
  }

  const update = (event: FormEvent<HTMLInputElement>) => {
    setAnswer(event.currentTarget.valueAsNumber)
  }

  //hvis svaret er riktig, skriv ut "Bra jobbet!"
  //hvis svaret er feil etter 3 forsøk, vis en knapp med "Se svaret!"
  //vi skal bruke useProgress hooken her for å holde styr på hvor mange forsøk vi har gjort og antall forsøk vi har igjen

  return (
    <div className="flex flex-col">
      <label htmlFor="answer">Svar</label>
      <input
        name="answer"
        type="number"
        placeholder="Sett svar her"
        onInput={update}
      />
      {eval(tasks[current].data) - answer === 0 ? "Bra jobbet!" : null}
      <button className="bg-black rounded-sm text-white" onClick={send}>Sjekk svar</button>
    </div>
  )
}