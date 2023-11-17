import React, { ChangeEvent, FormEvent, useState } from "react"

import useProgress from "@/hooks/useProgress"

interface InputCountProps {
  updateAmount: (amount: number) => void
}

export default function InputCount({ updateAmount }: InputCountProps) {
  const { setAmount } = useProgress()
  const [count, setCount] = useState<number>(0)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10)
    if (value > 0 && value <= 10) {
      setCount(value)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (count > 0 && count <= 10) {
      setAmount(count)
      updateAmount(count)
    }
  }

  return (
    <section className="flex h-screen w-full flex-col items-center py-20">
      <div className="w-full rounded-lg border bg-white p-10 shadow-md md:w-[520px]">
        <section className="rounded p-4">
          <div className="flex flex-col items-center bg-gray-200">
            <p className="mb-4 text-lg font-semibold">
              Hvor mange oppgaver vil du gjennomføre?
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col items-center"
            >
              <input
                type="number"
                placeholder="Antall oppgaver"
                min={1}
                max={10}
                onChange={handleChange}
                className="mb-4 w-3/4 rounded-md border p-2 md:w-1/2"
                required
              />
              <button
                type="submit"
                className="w-3/4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 md:w-1/2"
              >
                Fortsett
              </button>
            </form>
          </div>
        </section>
      </div>
    </section>
  )
}
