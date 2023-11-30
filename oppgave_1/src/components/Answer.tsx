"use client";

import { useState } from "react";
import Progress from "@/components/Progress";
import { Task } from "@/types";


type TasksProps = {
  current: number
  next: () => void
  setError: () => void
  answer: string
  setAnswer: Function
  setTemafeil: Function
  setCorrect: Function
  leggPoeng: () => void
  setMessage: Function
  message: string
  poeng: number
  task: Task
  failed: boolean
  correct: boolean
  count: number
  temafeil: string[]
}

export default function Answer({
  task,
  current,
  failed,
  correct,
  setError,
  setCorrect,
  next,
  setMessage,
  message,
  leggPoeng,
  answer,
  setAnswer,
  setTemafeil,
  temafeil,
  count,
}: TasksProps) {

  const [click, setClick] = useState(false)

  const correctAnswer = eval(task.data)

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault()
    if (answer === correctAnswer.toString()) {
      setAnswer(answer)
      setCorrect(true)
      setMessage("Bra jobbet!")
      try {
        const response = await fetch(
          "http://localhost:3000/api/task",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              attempts: count + 1,
              taskId: task.id,
            }),
          },
        )

        if (!response.ok) {
          throw new Error("Feil ved innsending av svar")
        }

      } catch (error) {
        console.error("Feil ved innsending av svar:", (error as Error).message);
      }

      leggPoeng()
      setAnswer("")
    } else {
      setTemafeil([...temafeil, task.type]);

      console.log("Dette er TEMAFEIL" + temafeil)
      console.log(temafeil)
      console.log("SLUTT")
      console.log("DETTE ER TASK:" + task.data)
      console.log("DETTE ER TASK:" + task.type)


      setAnswer("")
      setCorrect(false)
      setError()
      setMessage("")
    }
  }

  const visFasit = () => {
    setClick(true)
  }

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
        {!correct && !failed && (
          <>
            <label htmlFor="answer">Svar</label>
            <div className="flex-col">
              <input
                type="number"
                name="answer"
                placeholder="Sett svar her"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full rounded-md border p-2"
                readOnly={failed || correct}
                required
              />
            </div>
            <button
            className="mt-2 rounded-sm bg-black p-2 text-white"
            type="submit"
            disabled={failed || correct}
          >
            Sjekk svar
          </button>
          </>
        )}

        {failed && (
          <>
            <button
              className="mt-2 rounded-sm bg-black p-2 text-white"
              type="button"
              onClick={visFasit}
            >
              Du fikk feil 3 ganger. Trykk for å vise fasiten!
            </button>

            {click && (
              <>
                <div>{`Fasit: ${task.data} = ${correctAnswer}`}</div>
                <Progress next={next} current={current} />
              </>
            )}
          </>
        )}

        {correct && (
          <>
            {message}
            <Progress next={next} current={current} />
          </>
        )}
      </form>
    </div>
  )
}