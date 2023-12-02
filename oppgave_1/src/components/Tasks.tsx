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
    <section className="flex items-center w-full h-screen flex-col py-20">
    {current+1 <= antallOppgaver ? (
      <div className="w-full md:w-[520px] rounded-lg border bg-white p-10 shadow-md">
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
  </section>
    
  )
}