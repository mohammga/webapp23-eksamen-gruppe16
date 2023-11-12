"use client";
import type { ReactNode } from "react";
import { Task } from "@/types";
import useProgress from "@/hooks/useProgress";


type TasksProps = {
  task: Task;
  children: ReactNode;
  count: number;
  oppgaveNummer: number;
  antallOppgaver: number;
};

export default function Task({task, oppgaveNummer, count, antallOppgaver, children }: TasksProps) {
  const { poeng } = useProgress()

  return (
    <section className="py-10">
      <p className='text-muted-foreground'>Brukt {count} av 3 forsøk</p>
      <div className="">
        <p>Spørsmål {oppgaveNummer + 1} av {antallOppgaver}</p>
        <p>poengsum: {poeng}  </p>
        {/*children */}
        <article key={count}>
          <h3 className="text-lg font-semibold text-gray-800">{task.text}</h3>
          <p className="text-base text-gray-600">{task.data}</p>
        </article>
      </div>
    </section>
  );
}
