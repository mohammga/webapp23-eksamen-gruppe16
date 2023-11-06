import type { Task } from "@/types";
import Header from "@/components/Header";
import Tasks from "@/components/Tasks";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/restapi?count=2", {
    method: "GET",
  })
  const result: any = await response.json()

  const data: Task[] = result.data; 

  return (
    <main>
      <Header />
      <Tasks tasks={data} />
    </main>
  );
}