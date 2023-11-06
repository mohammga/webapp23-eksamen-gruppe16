import Answer from "@/components/Answer";
import Taskify from "@/components/Task";
import { Task } from "@/types";
import Progress from "@/components/Progress";

type TasksProps = {
  tasks: Task[]
}

export default function Tasks({ tasks }: TasksProps) {
  return (
    <section className="flex justify-center items-center w-full h-screen">
      <div className="w-full md:w-[500px] rounded-lg border bg-white p-4 shadow-md">
      <Taskify tasks={tasks} />
      <Answer />
      <Progress tasks={tasks} />
      </div>
    </section>
  )
}