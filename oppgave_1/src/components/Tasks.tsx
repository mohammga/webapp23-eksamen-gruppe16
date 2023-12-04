"use client";

import Answer from "@/components/Answer";
import TaskCard from "@/components/TaskCard";
import TaskText from "@/components/Text";
import { Task } from "@/types";
import useProgress from "@/hooks/useProgress";
import  Result  from "@/components/Result";
import { useState, useEffect } from "react";


type TasksProps = {
  tasks: Task[]
  data: Task[]
  antallOppgaver: number
  fullført: boolean
  setFullført: Function
  setTemafeil: Function
  temafeil: string[]
  setPoeng: Function
  poeng: number
}

export default function Tasks({tasks, antallOppgaver, fullført, 
  setFullført, setTemafeil, temafeil, 
  setPoeng, poeng }: TasksProps) {
  const {count,  } = useProgress()

  const [answerCorrect, setAnswerCorrect] = useState(0)
  const [forsøk, setForsøk] = useState(0)
  const [current, setCurrent] = useState(0)
  const [task, setTask] = useState<Task>()
  const [fasit, setFasit] = useState("")

  let nextQ = current + 1

  const finishExam = () => {
    setFullført(true)
  }

  
  useEffect(() => {
    if (count >= antallOppgaver) {
      console.log(fullført)
      setFullført(true);
    }
    setTask(tasks[current])
    if (task !== undefined) {
      setFasit(eval(task.data))
    }
    // Du kan også kjøre andre bieffekter her som avhenger av `count`-verdien
  }, [current, antallOppgaver, task, fasit]); // Avhengigheter sikrer at effekten kjører når `count` eller `amount` endres
  

  return (
    <>    
    {nextQ <= antallOppgaver ? (
      <div>
        {task !== undefined ? (
          <TaskCard
            task={task}
            oppgaveNummer={current}
            count={forsøk}
            antallOppgaver={antallOppgaver}
          >
            <TaskText text={"Skriv resultatet av regneoperasjonen"} />
          </TaskCard>

        ) : (<p>Laster...</p>)}
        <Answer
          setForsøk={setForsøk}
          forsøk={forsøk}
          setAnswerCorrect={setAnswerCorrect}
          answerCorrect={answerCorrect}
          task={task}
          fasit={fasit}
          setCurrent={setCurrent}
          current={current}
          setTemafeil={setTemafeil}
          temafeil={temafeil}
          antallOppgaver={antallOppgaver}
          setPoeng={setPoeng}
          poeng={poeng}
        />
      </div>
    ) : (
      <>
      Du har fullført alle oppgavene dine!
      
      <button
        onClick={finishExam}
        type="button"
        className="w-full rounded-sm bg-black py-2 text-white"
      >
        Fullfør Eksamen
      </button>
      </>
    )}
    </>
  )
}