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
  temafeil: string[],
  answerCorrect: number
}


export default function Answer({
  count,
  answerCorrect,
  task
}: TasksProps) {
  const [answer, setAnswer] = useState(""); // For brukerens svar
  const [temafeil, setTemafeil] = useState<string[]>([]); // For å holde styr på tema-feil
  const [correct, setCorrect] = useState(false); // For å indikere om svaret er riktig
  const [message, setMessage] = useState(""); // For å vise en melding basert på svaret
  const [click, setClick] = useState(false); // For å holde styr på om fasiten er vist
  const [poeng, setPoeng] = useState(0); // For å holde styr på om fasiten er vist
  
  const correctAnswer = eval(task.data);

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

      const pang = poeng + 1
      setPoeng(pang)
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
      //setError()
      setMessage("")
    }
  }

  //Må flyttes til usePROGRESSS
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
                readOnly={answerCorrect != 0}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>
            <button
              className="mt-2 rounded-sm bg-black p-2 text-white"
              type="submit"
            >
              Sjekk svar
            </button>
          </>
          {correct && (
          <>
            {message}
          </>
        )}
        {answerCorrect === -1 && (
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
              </>
            )}
          </>
        )}
      </form>
    </div>
  )
}

/**
 * 
 *      Holder på inputten og button
        {!correct && !failed && (
        )}
 * 
 * 
 * 
        

        Inputten:        
                

        Button under INPUTTEN:        
            disabled={failed || correct}
            

 */