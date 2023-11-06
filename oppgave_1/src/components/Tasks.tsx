import { ReactNode } from "react"

import { Task } from "@/types"

type TasksProps = {
  children: ReactNode
  tasks: Task[]
}

export default function Tasks({ children, tasks }: TasksProps) {
  return (
    <section className="bg-gray-100 p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tasks.map((task) => (
          <article
            key={task.id}
            className="rounded-lg border bg-white p-4 shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-800">{task.text}</h3>
            <p className="text-base text-gray-600">{task.data}</p>
          </article>
        ))}
      </div>
      {children}
    </section>
  )
}
