"use client"

type TasksProps = {
  next: () => void;
  current: number;
}

export default function Progress({ next, current}: TasksProps) {

  return (
    <footer className="">
      <button onClick={next} className="bg-black rounded-sm text-white w-full">
        Neste
      </button>
      
      {current !== 0 && (
      <button  className="bg-black rounded-sm text-white w-full">
        Forrige
      </button>)}
    </footer>
  )
}
