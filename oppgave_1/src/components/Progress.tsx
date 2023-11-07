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
    </footer>
  )
}
