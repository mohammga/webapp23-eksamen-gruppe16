"use client"

type TasksProps = {
  next: () => void;
  previous: () => void;
  current: number;
}

export default function Progress({ next, previous, current}: TasksProps) {

  return (
    <footer className="">
      <button onClick={next} type="button" className="bg-black rounded-sm text-white w-full">
        Neste
      </button>
      
      {current !== 0 && (
      <button onClick={previous} type="button"  className="bg-black rounded-sm text-white w-full">
        Forrige
      </button>)}
    </footer>
  )
}
