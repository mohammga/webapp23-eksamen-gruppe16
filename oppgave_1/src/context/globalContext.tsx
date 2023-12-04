import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Task } from '@/types';
import useProgress from '@/hooks/useProgress';

const GlobalContext = createContext(null);

type Types = {
    tasks: Task[]
    antallOppgaver: number    
    current: number;
    next: () => void;
    setError: () => void;
    answer: string;
    setAnswer: (answer: string) => void;
    setTemafeil: (temafeil: string[]) => void;
    setCorrect: (correct: boolean) => void;
    leggPoeng: () => void;
    setMessage: (message: string) => void;
    message: string;
    poeng: number;
    task: Task;
    failed: boolean;
    correct: boolean;
    temafeil: string[];
    answerCorrect: number;
    setAnswerCorrect: (answerCorrect: number) => void;
    setCurrent: (current: number) => void;
    setCanInteract: (canInteract: boolean) => void;
    setFullført: (fullført: boolean) => void;
    forsøk: number;
    fasit: number;

    setTasks: (tasks: Task[]) => void;
    setForsøk: (forsøk: number) => void;
    setAntallOppgaver: (antall: number) => void;
    children: ReactNode;
}

type GlobalProviderProps = Types & {
    children: ReactNode;
  };

export const useGlobalContext = () => {
    const context = useContext(GlobalContext)
    if(!context) throw new Error("Context is missing")
    return context
}

export const GlobalProvider = ({ tasks, antallOppgaver, children } : Types) => {
    const {count, setCount, fasit, setFasit, temafeil, setTemafeil,
        poeng, setPoeng, canSkip, setCanSkip, 
        amount, setAmount, hvaMåØvesMerPå,
        current, setCurrent,
        task, setTask} = useProgress()

        const value = {
            tasks: tasks,
            task,
            setTask,
            fasit,
            setFasit,
            forsøk: count,
            setForsøk: setCount,
            antallOppgaver: antallOppgaver,
            temafeil,
            setTemafeil
          };

    return (
        <GlobalContext.Provider value={value}>
        {children}
        </GlobalContext.Provider>
    );
};