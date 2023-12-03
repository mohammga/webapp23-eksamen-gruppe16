"use client"
import  Result  from "@/components/Result";

type TasksProps = {
  next: () => void
  setCurrent: () => void
  canSkip: boolean
  current: number
}

export default function Progress({ next, current, setCurrent, canSkip }: TasksProps) {


  return (
    <footer className="mt-3 space-y-4">
      <>
      </>
      
      
      <div>
        <Result poeng={2} setCurrent = {setCurrent} />
      </div>
    </footer>
  )
}

//onClick={next}

/**operationToPractice={hvaMåØvesMerPå()}
 * 
 */
