"use client";

import type { ReactNode } from "react";
import { Task } from "@/types";
import { json } from "stream/consumers";

type TasksProps = {
  task: Task;
  /*children: ReactNode; */
  count: number;
  oppgaveNummer: number;
  antallOppgaver: number;
};

export default function Task({task, oppgaveNummer, count, antallOppgaver }: TasksProps) {
  return (
    <section className="">
      <p>Oppgave id: {task.id}</p>
      <div className="flex justify-between">
      <p>Oppgave {oppgaveNummer + 1} av {antallOppgaver}</p>
      
      <p className='text-muted-foreground'>Brukt {count} av 3 forsøk</p>
      </div>

      <div className="">
        {/*children */}
        <article key={count}>
          <h3 className="text-lg font-semibold text-gray-800">{task.text}</h3>
          <p className="text-base text-gray-600">{task.data}</p>
        </article>
      </div>
    </section>
  );
}
