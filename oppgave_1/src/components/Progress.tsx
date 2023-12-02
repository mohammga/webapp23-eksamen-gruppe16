"use client"
import  Result  from "@/components/Result";

type TasksProps = {
  next: () => void
  setCurrent: () => void
}

export default function Progress({ next, setCurrent }: TasksProps) {
  return (
    <footer className="mt-3 space-y-4">
      <button
        onClick={next}
        type="button"
        className="w-full rounded-sm bg-black py-2 text-white"
      >
        Neste
      </button>
      
      <div>
        <Result poeng={2} setCurrent = {setCurrent} />
      </div>
    </footer>
  )
}

/**operationToPractice={hvaMåØvesMerPå()}
 * 
 */
