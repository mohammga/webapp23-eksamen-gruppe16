"use client";

import Answer from "@/components/Answer";
import TaskCard from "@/components/Task";
import TaskText from "@/components/Text";
import { Task } from "@/types";
import useProgress from "@/hooks/useProgress";

type TasksProps = {
  tasks: Task[]
  antallOppgaver: number
}

export default function Tasks({ tasks, antallOppgaver }: TasksProps) {
  const { count, current, failed, next, setError, changeCount } = useProgress()

  const task = tasks[current]

  return (
    <section className="flex justify-center items-center w-full h-screen">
      <div className="w-full md:w-[520px] rounded-lg border bg-white p-10 shadow-md">
        <TaskCard task={task} oppgaveNummer={current} count={count} antallOppgaver={antallOppgaver}>
          <TaskText text={"Skriv resultatet av regneoperasjonen"} />
        </TaskCard>
        <Answer tasks={tasks} current={current} failed={failed} next={next} changeCount={changeCount} setError={setError} />
      </div>
    </section>
  )
}