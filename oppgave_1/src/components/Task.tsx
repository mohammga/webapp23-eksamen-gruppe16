"use client";

import { useState } from 'react';
import { Task } from "@/types";
import useProgress from "@/hooks/useProgress";

type TasksProps = {
  tasks: Task[];
};

export default function Task({ tasks }: TasksProps) {
  const { count } = useProgress({ tasks });
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  const nextTask = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    }
  };

  const previousTask = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(currentTaskIndex - 1);
    }
  };

  return (
    <section>
      <p className='text-muted-foreground'>{count} av 3 forsøk</p>
      <div className="">
        <p>Spørsmål {currentTaskIndex + 1}</p>
        <article key={currentTaskIndex}>
          <h3 className="text-lg font-semibold text-gray-800">{tasks[currentTaskIndex].text}</h3>
          <p className="text-base text-gray-600">{tasks[currentTaskIndex].data}</p>
        </article>
        <button onClick={previousTask}>Forrige Spørsmål</button>
        <button onClick={nextTask}>Neste Spørsmål</button>
      </div>
    </section>
  );
}
