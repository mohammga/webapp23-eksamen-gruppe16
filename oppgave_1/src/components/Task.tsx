"use client";

import type { ReactNode } from "react";
import { Task } from "@/types";
import useProgress from "@/hooks/useProgress";

type TasksProps = {
  tasks: Task[];
  children: ReactNode;
};

export default function Task({ tasks, children }: TasksProps) {
  const { count, current, next, prev } = useProgress({ tasks });

  const nextTask = () => {
    next();
  };

  const previousTask = () => {
    prev();
  };

  return (
    <section>
      <p className='text-muted-foreground'>{count} av 3 forsøk</p>
      <div className="">
        <p>Spørsmål {count + 1}</p>
        {children}
        <article key={count}>
          <h3 className="text-lg font-semibold text-gray-800">{current.text}</h3>
          <p className="text-base text-gray-600">{current.data}</p>
        </article>
        <button onClick={previousTask}>Forrige Spørsmål</button>
        <button onClick={nextTask}>Neste Spørsmål</button>
      </div>
    </section>
  );
}
