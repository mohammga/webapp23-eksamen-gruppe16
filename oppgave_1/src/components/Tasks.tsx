"use client"

import type { ReactNode } from "react"

type TasksProps = {
  children: ReactNode
}

export default function Tasks({ children }: TasksProps) {
  return (
    <section className="flex justify-center items-center w-full h-screen">
      <div className="w-full md:w-[520px] rounded-lg border bg-white p-10 shadow-md">
      {children}
      </div>
    </section>
  )
}