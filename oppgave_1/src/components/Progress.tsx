"use client"
import  Result  from "@/components/Result";

type TasksProps = {
  next: () => void
  setCurrent: () => void
  canSkip: boolean
  current: number
  antallOppgaver: number
  hvaMåØvesMerPå: Function
}

export default function Progress({ next, current, setCurrent, canSkip, antallOppgaver, hvaMåØvesMerPå}: TasksProps) {


  return (
    <footer className="mt-3 space-y-4">
      <div>
      </div>
    </footer>
  )
}

//onClick={next}

/**operationToPractice={hvaMåØvesMerPå()}
        <Result poeng={2} setCurrent = {setCurrent} maksPoeng={antallOppgaver} />
 * 
 */
