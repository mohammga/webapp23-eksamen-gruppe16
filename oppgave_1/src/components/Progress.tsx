"use client"

type TasksProps = {
  next: () => void;
  current: number;
}

export default function Progress({ next, current}: TasksProps) {

  return (
    <footer className="mt-4 border-t-slate-300">
      <button onClick={next} className="bg-teal-700 text-white">
        Neste
      </button>
    </footer>
  )
}
