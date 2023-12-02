"use client"
import  Result  from "@/components/Result";

type TasksProps = {
  next: () => void
  setCurrent: () => void
  canSkip: boolean
  current: number
}

export default function Progress({ next, current, setCurrent, canSkip }: TasksProps) {

  const nextQuestion = () => {
    let nextQ = current + 1
    setCurrent(nextQ)
  }

  return (
    <footer className="mt-3 space-y-4">
      <>
      <button
        onClick={nextQuestion}
        id="THEBADDESTBITCH"
        type="button"
        className={`w-full rounded-sm bg-black py-2 text-white ${!canSkip ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!canSkip}
      >
        Neste
      </button>
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
