"use client"

type TasksProps = {
  next: () => void;
  previous: () => void;
  current: number;
}

export default function Progress({ next, previous, current}: TasksProps) {

  return (
<footer className="mt-3 space-y-4">
  <button onClick={next} type="button" className="bg-black rounded-sm text-white w-full py-2">
    Neste
  </button>

  {current !== 0 && (
    <button onClick={previous} type="button" className="bg-black rounded-sm text-white w-full py-2">
      Forrige
    </button>
  )}
</footer>

  )
}
