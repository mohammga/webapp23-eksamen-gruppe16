"use client"

import { useEffect, useState } from "react"
import type { Task } from "@/types"

import Header from "@/components/Header"
import InputCount from "@/components/InputCount"
import Tasks from "@/components/Tasks"
import useProgress from "@/hooks/useProgress"
import Progress from "@/components/Progress"
import Answer from "@/components/Answer"

export default function Home() {

  let result: any
  const [data, setData] = useState<Task[]>([])

  const [recievedData, setRecievedData] = useState(false)
  const { amount, answerCorrect, current, count, canSkip, setAmount, setCurrent } = useProgress()

  useEffect(() => {
    const fetchData = async () => {
      if (amount > 0 && amount <= 10) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/task?count=${amount}`,
            {
              method: "GET",
              cache: "no-store",
            },
          )
          result = await response.json()
          setData(result.data)
          setRecievedData(true)
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
    }

    fetchData()
  }, [amount])

  const updateAmount = (newAmount: number) => {
    setAmount(newAmount)
  }

  return (
    <div>
      <Header />
      {amount === 0 ? (
        <>
          <InputCount updateAmount={updateAmount} />
        </>
      ) : recievedData ? (
        <div>
          <main className="px-6 md:px-0">
            <div  className="flex items-center w-full h-screen flex-col py-20">
            <section  className="w-full md:w-[520px] rounded-lg border bg-white p-10 shadow-md">
            <Tasks tasks={data} antallOppgaver={amount}>
              <Answer count={count} answerCorrect={answerCorrect}/>
            </Tasks>
            <Progress current={current} setCurrent={setCurrent} canSkip={canSkip} />
            </section>
            </div>
          </main>
        </div>
      ) : (
        <p>Laster...</p>
      )}
    </div>
  )
}
