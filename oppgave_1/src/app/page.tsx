import type { Task } from "@/types";
import Header from "@/components/Header";
import Tasks from "@/components/Tasks";
import Answer from "@/components/Answer";
import TaskCard from "@/components/Task";
import TaskText from "@/components/Text";
import Progress from "@/components/Progress";


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
      <Tasks>
        <TaskCard tasks={data}>
          <TaskText text={"Skriv resultatet av regneoperasjonen"} />
        </TaskCard>
        <Answer />
        <Progress tasks={data} />
      </Tasks>
      </main>
    </div>
  );
}