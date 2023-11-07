"use client";

import Answer from "@/components/Answer";
import Progress from "@/components/Progress";
import TaskCard from "@/components/Task";
import TaskText from "@/components/Text";
import { Task } from "@/types";
import useProgress from "@/hooks/useProgress";


type TasksProps = {
  tasks: Task[]
}

export default function Tasks({ tasks }: TasksProps) {
  const { count, current, next } = useProgress()
  return (
    <section className="flex justify-center items-center w-full h-screen">
      <div className="w-full md:w-[520px] rounded-lg border bg-white p-10 shadow-md">
        <TaskCard tasks={tasks} current={current} count={count}>
          <TaskText text={"Skriv resultatet av regneoperasjonen"} />
        </TaskCard>
        <Answer tasks={tasks} current={current} />
        <Progress next={next} current={current}  />
      </div>
    </section>
  )
}