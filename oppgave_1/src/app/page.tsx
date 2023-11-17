"use client"

import React, { useEffect, useState } from "react"
import type { Task } from "@/types"

import Header from "@/components/Header"
import InputCount from "@/components/InputCount"
import Tasks from "@/components/Tasks"
import useProgress from "@/hooks/useProgress"

export default function Home() {
  let count = 0
  let result: any

  const [recievedData, setRecievedData] = useState(false)
  const [data, setData] = useState<Task[]>([])
  const { amount, setAmount } = useProgress()

  useEffect(() => {
    const fetchData = async () => {
      if (amount > 0 && amount <= 10) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/restapi?count=${amount}`,
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

  console.log("Amount" + amount)
  console.log("Count" + count)

  console.log("Data")
  console.log(data)

  return (
    <div>
      {amount === 0 ? (
        <>
                 <Header />
        <InputCount updateAmount={updateAmount} />
        </>
      ) : recievedData ? (
        <div>
          <Header />
          <main className="px-6 md:px-0">
            <Tasks tasks={data} antallOppgaver={amount} />
          </main>
        </div>
      ) : (
        <p>Laster...</p>
      )}
    </div>
  )
}
