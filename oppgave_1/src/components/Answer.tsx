"use client";

import { useState } from "react";
import Progress from "@/components/Progress";
import { Task } from "@/types";
import useProgress from "@/hooks/useProgress"


type TasksProps = {
  task: Task
  current: number;
  setTemafeil: (temafeil: string[]) => void;
  failed: boolean;
  temafeil: string[];
  answerCorrect: number;
  setAnswerCorrect: (answerCorrect: number) => void;
  setForsøk: (forsøk: number) => void;
  setCurrent: (current: number) => void;
  antallOppgaver: number;
  forsøk: number;
  fasit: number;
  setPoeng: Function
  poeng: number
  buttonOverride: boolean
};




export default function Answer({
  task,
  setAnswerCorrect,
  answerCorrect,
  antallOppgaver,
  setForsøk,
  forsøk,
  fasit,
  current,
  setCurrent,
  setTemafeil,
  temafeil,
  setPoeng,
  poeng,
  buttonOverride = false
}: TasksProps) {
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [click, setClick] = useState(false);
  const [canInteract, setCanInteract] = useState(false);


  const nextQuestion = () => {
    console.log("NEXTQUESTION")
    if (current+1 <= antallOppgaver) {
      console.log("AUA")
      let nextQ = current + 1
      console.log(current + 1)
      console.log(nextQ)
      setCurrent(nextQ)
      setClick(false)
      setCanInteract(false)
      setAnswerCorrect(0)
      setForsøk(0)
      setMessage("")

    }
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {

    e.preventDefault()
    setForsøk(forsøk + 1)    

    if (answer === fasit.toString()) {
      setAnswerCorrect(1)
      setMessage("Bra jobba! Det var riktig svar")
      setCanInteract(true)
      setPoeng(poeng + 1)
      
      try {
        const response = await fetch(
          "http://localhost:3000/api/task",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              attempts: forsøk + 1,
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

      const pang = poeng + 1
      setPoeng(pang)
    } else {
      if ((forsøk + 1) < 3) {
        setCanInteract(false)
        setTemafeil([...temafeil, task.type]);
        setMessage("Feil svar! Prøv igjen")

      } else {
        setCanInteract(true)
        setMessage("Du fikk feil 3 ganger. Trykk for å vise fasiten!")
        setAnswerCorrect(-1)
      }
    }
    setAnswer("")
  }

  const visFasit = () => {
    setClick(true)
  }
  

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
          <>
            <label htmlFor="answer">Svar</label>
            <div className="flex-col">
              <input
                type="number"
                name="answer"
                placeholder="Sett svar her"
                className="w-full rounded-md border p-2"
                readOnly={answerCorrect === 1 || answerCorrect === -1}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>
            {answerCorrect === (0) && (              
              <button
              className="mt-2 rounded-sm bg-black p-2 text-white"
              type="submit"
            >
              Sjekk svar
            </button>
            )}
          </>
          {message}
          
          {answerCorrect === (-1) && (
            <>
              <button
                className="mt-2 rounded-sm bg-black p-2 text-white"
                type="button"
                onClick={visFasit}
              >
                Vis Fasit
              </button>

              {click && (
                <>
                  <div>{`Fasit: ${task.data} = ${fasit}`}</div>
                </>
              )}
            </>
          )}
      </form>
      
      <button
        onClick={nextQuestion}
        type="button"
        className={`w-full rounded-sm bg-black py-2 text-white ${(!canInteract && !buttonOverride) ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!canInteract && !buttonOverride}
      >
        Neste
      </button>


    </div>
  )
}