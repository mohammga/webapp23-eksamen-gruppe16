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
    <div>
      <Header />
      <main className="px-6 md:px-0">
      <Tasks tasks={data} />
      </main>
    </div>
  );
}