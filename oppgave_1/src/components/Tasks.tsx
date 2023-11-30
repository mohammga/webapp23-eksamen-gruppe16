"use client";

import Answer from "@/components/Answer";
import TaskCard from "@/components/Task";
import TaskText from "@/components/Text";
import { Task } from "@/types";
import useProgress from "@/hooks/useProgress";
import  Result  from "@/components/Result";

type TasksProps = {
  tasks: Task[]
  antallOppgaver: number
}

export default function Tasks({tasks, antallOppgaver }: TasksProps) {
  const {count, current, setCurrent, correct, failed, next, setAnswer, answer, setCorrect, setError, poeng, leggPoeng, setMessage, message } = useProgress()
  const task = tasks[current]

  return (
    <section className="flex items-center w-full h-screen flex-col py-20">
    {current+1 <= antallOppgaver ? (
      <div className="w-full md:w-[520px] rounded-lg border bg-white p-10 shadow-md">
        <TaskCard
          task={task}
          oppgaveNummer={current}
          count={count}
          antallOppgaver={antallOppgaver}
        >
          <TaskText text={"Skriv resultatet av regneoperasjonen"} />
        </TaskCard>
        <Answer
          task={task}
          current={current}
          failed={failed}
          correct={correct}
          next={next}
          setAnswer={setAnswer}
          count={count}
          answer={answer}
          setCorrect={setCorrect}
          setError={setError}
          leggPoeng={leggPoeng}
          poeng={poeng}
          setMessage={setMessage}
          message={message}

        />
      </div>
    ) : (
      <div>
        <Result operationToPractice="multiplication" poeng={poeng} setCurrent = {setCurrent} />
      </div>
    )}
  </section>
    
  )
}