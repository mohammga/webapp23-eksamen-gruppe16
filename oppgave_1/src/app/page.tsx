import type { Task } from "@/types";
import Answer from "@/components/Answer";
import Header from "@/components/Header";
import Progress from "@/components/Progress";
import TaskCard from "@/components/Task";
import Tasks from "@/components/Tasks";
import TaskText from "@/components/Text";

export default async function Home() {
 await new Promise((resolve) => setTimeout(resolve, 1000));
 const response = await fetch("http://localhost:3000/api/restapi?count=10", {
   method: "GET",
   cache: "no-store",
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