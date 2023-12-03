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
}

export default function Tasks({tasks, antallOppgaver, fullført, setFullført, setTemafeil, temafeil }: TasksProps) {
  const {count,  setTask} = useProgress()

  const [answerCorrect, setAnswerCorrect] = useState(0)
  const [forsøk, setForsøk] = useState(0)
  const [current, setCurrent] = useState(0)

  let task = tasks[current];
  let fasit = eval(task.data)
  let nextQ = current + 1
  

  return (
    <>    
    {nextQ <= antallOppgaver || !fullført ? (
      <div>
        <TaskCard
          task={task}
          oppgaveNummer={current}
          count={forsøk}
          antallOppgaver={antallOppgaver}
        >
          <TaskText text={"Skriv resultatet av regneoperasjonen"} />
        </TaskCard>
        <Answer
          setForsøk={setForsøk}
          forsøk={forsøk}
          setAnswerCorrect={setAnswerCorrect}
          answerCorrect={answerCorrect}
          task={task}
          fasit={fasit}
          setCurrent={setCurrent}
          current={current}
          setFullført={setFullført}
          setTemafeil={setTemafeil}
          temafeil={temafeil}
          antallOppgaver={antallOppgaver}

        />
      </div>
    ) : (
      <>
      Du har fullført alle oppgavene dine!
      </>
    )}
    </>
  )
}