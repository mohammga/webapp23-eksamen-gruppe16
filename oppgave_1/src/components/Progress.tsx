"use client"

type TasksProps = {
  next: () => void
}

export default function Progress({ next }: TasksProps) {
  return (
    <footer className="mt-3 space-y-4">
      <button
        onClick={next}
        type="button"
        className="w-full rounded-sm bg-black py-2 text-white"
      >
        Neste
      </button>
    </footer>
  )
}
