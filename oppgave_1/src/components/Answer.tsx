"use client";

import { useState } from "react";



import Progress from "@/components/Progress";
import { Task } from "@/types";


type TasksProps = {
  current: number
  next: () => void
  previous: () => void
  setError: () => void
  setCorrect: Function
  leggPoeng: () => void
  setMessage: Function
  message: string
  poeng: number
  task: Task
  failed: boolean
  correct: boolean
}

export default function Answer({
  task,
  current,
  failed,
  correct,
  setError,
  setCorrect,
  next,
  previous,
  setMessage,
  message,
  leggPoeng,
}: TasksProps) {
  const [click, setClick] = useState(false)
  const [answer, setAnswer] = useState("")

  const correctAnswer = eval(task.data)

  const handleSubmit = async (): Promise<void> => {
    if (answer === correctAnswer.toString()) {
      setCorrect(true)
      setMessage("Bra jobbet!")
      leggPoeng()
      // øke poeng med 1
      // øke forsøk med 1
      setAnswer("") // Reset the answer
    } else {
      setCorrect(false)
      setError()
      setMessage("")
      setAnswer("") // Reset the answer
    }
  }

  const visFasit = () => {
    setClick(true)
  }

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
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
            required // Add the required attribute
          />
          {!correct && !failed && (

            <button
              className="mt-2 rounded-sm bg-black p-2 text-white"
              type="button"
              onClick={handleSubmit}
              disabled={failed || correct}
            >
              Sjekk svar
            </button>




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
                  <Progress next={next} previous={previous} current={current} />
                </>
              )}
            </>
          )}

          {correct && (
            <>
              {message}
              <Progress next={next} previous={previous} current={current} />
            </>


          )}
        </div>
      </form>
    </div>
  )
}