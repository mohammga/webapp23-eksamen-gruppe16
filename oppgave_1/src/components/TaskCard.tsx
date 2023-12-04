"use client";

import type { ReactNode } from "react";
import { Task } from "@/types";

type TasksProps = {
  task: Task;
  children: ReactNode;
  count: number;
  oppgaveNummer: number;
  antallOppgaver: number;
};

export default function TaskCard({task, oppgaveNummer, count, antallOppgaver }: TasksProps) {

  const displayInfo = task?.data !== undefined;

  return (
    <section className="">
      {displayInfo ? (
        <>
          <div className="flex justify-between">
            <p>Oppgave {oppgaveNummer + 1} av {antallOppgaver}</p>
            <p className='text-muted-foreground'>Brukt {count} av 3 forsøk</p>
          </div>
  
          <div className="">
            {/*children*/}

            <p className="text-xs">Id: {task.id}</p>
            <article>
              <h3 className="text-lg font-semibold text-gray-800">{task.text + "(" + task.type.toString() + ")"}</h3>
              <p className="text-base text-gray-600">{task.data}</p>
            </article>
          </div>
        </>
      ) : (
        <p>Laster...</p>
      )}
    </section>
  );
  
}
