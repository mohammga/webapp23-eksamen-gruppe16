import type { Task } from "@/types";



import Answer from "@/components/Answer";
import Header from "@/components/Header";
import Progress from "@/components/Progress";
import Tasks from "@/components/Tasks";
import TaskText from "@/components/Text";


export default async function Home() {
  const response = await fetch("http://localhost:3000/api/restapi?count=1", {
    method: "get",
  })
  const result: any = await response.json()

  const tasks: Task[] = result.data; // Extract tasks from the "data" property

  return (
    <main>
      <Header />
      <Tasks tasks={tasks}>
        <Answer />
      </Tasks>
      <TaskText text={"Skriv resultatet av regneoperasjonen"} />
      <Progress tasks={tasks} />
    </main>
  );
}