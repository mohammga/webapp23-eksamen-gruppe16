"use client"

import useProgress from "@/hooks/useProgress";

export default function Progress( ) {
  const { next } = useProgress();

  return (
    <footer className="mt-4 border-t-slate-300">
      <button onClick={next} className="bg-teal-700 text-white">
        Neste
      </button>
    </footer>
  )
}

