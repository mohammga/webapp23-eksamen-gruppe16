"use client";

import type { ReactNode } from "react";
import { Task } from "@/types";

type TasksProps = {
  tasks: Task[];
  children: ReactNode;
  current: number;
  count: number;
};

export default function Task({ tasks, children, current, count }: TasksProps) {
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
