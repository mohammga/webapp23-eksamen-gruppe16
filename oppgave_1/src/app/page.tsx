
import type { Task } from "@/types";
import Header from "@/components/Header";
import Tasks from "@/components/Tasks";

export default async function Home() {

const count = 10
 await new Promise((resolve) => setTimeout(resolve, 1000));
 const response = await fetch(`http://localhost:3000/api/restapi?count=${count}`, {
   method: "GET",
   cache: "no-store",
 })

  const result: any = await response.json()

  const data: Task[] = result.data;

  return (
    <div>
      <Header />
      <main className="px-6 md:px-0">
      <Tasks tasks={data}/>
      </main>
    </div>
  );
}