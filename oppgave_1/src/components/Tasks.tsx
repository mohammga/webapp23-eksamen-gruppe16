"use client";

import Answer from "@/components/Answer";
import TaskCard from "@/components/TaskCard";
import TaskText from "@/components/Text";
import { Task } from "@/types";
import useProgress from "@/hooks/useProgress";
import  Result  from "@/components/Result";


type TasksProps = {
  tasks: Task[]
  data: Task[]
  antallOppgaver: number
}

export default function Tasks({tasks, antallOppgaver }: TasksProps) {
  const {count, current } = useProgress()
  const task = tasks[current]
  return (
    <>    
    {current+1 <= antallOppgaver ? (
      <div>
        <TaskCard
          task={task}
          oppgaveNummer={current}
          count={count}
          antallOppgaver={antallOppgaver}
        >
          <TaskText text={"Skriv resultatet av regneoperasjonen"} />
        </TaskCard>
        <Answer
          count={count}
          answerCorrect={0}
          task={task}
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