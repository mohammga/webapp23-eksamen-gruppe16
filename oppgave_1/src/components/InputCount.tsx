import React, { ChangeEvent, FormEvent, useState } from "react"

interface InputCountProps {
  updateAmount: (amount: number) => void
  setCanSkip: (can: boolean) => void
}

export default function InputCount({ updateAmount, setCanSkip }: InputCountProps) {
  const [count, setCount] = useState<number>(0)
  const [hideNext, setHideNext] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10)
    if (value > 0 && value <= 10) {
      setCount(value)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (count > 0 && count <= 10) {
      updateAmount(count)
    }
  }

  const clickCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    setHideNext(event.target.checked); // Bruk event.target.checked her, ikke event.checked
    setCanSkip(event.target.checked)
  };

  return (
    <section className="flex h-screen w-full flex-col items-center py-20">
      <div className="w-full rounded-lg border bg-white p-10 shadow-md md:w-[520px]">
        <section className="rounded p-4">
          <div className="flex flex-col items-center">
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
                className="mb-4 w-full rounded-md border p-2"
                required
              />
              <button
                type="submit"
                className="w-full rounded-sm bg-black p-2 text-white"
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
