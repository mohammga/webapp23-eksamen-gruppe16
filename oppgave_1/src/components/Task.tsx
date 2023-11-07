"use client";
import type { ReactNode } from "react";
import { Task } from "@/types";
import useProgress from "@/hooks/useProgress";

type TasksProps = {
  tasks: Task[];
  children: ReactNode;
};

export default function Task({ tasks, children }: TasksProps) {
  let { count, current } = useProgress();

  return (
    <section>
      <p className='text-muted-foreground'>Brukt {count} av 3 forsøk</p>
      <div className="">
        <p>Spørsmål {count + 1} av </p>
        {children}
        <article key={count}>
          <h3 className="text-lg font-semibold text-gray-800">{tasks[current].text}</h3>
          <p className="text-base text-gray-600">{tasks[current].data}</p>
        </article>
      </div>
    </section>
  );
}
