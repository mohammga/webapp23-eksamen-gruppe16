import AthleteTable from "@/components/tables/athlete/AthleteTable"
import YearlyTable from "@/components/tables/athlete/YearlyTable"
import CompetitionsTable from "@/components/tables/athlete/CompetitionsTable"
import SessionsTable from "@/components/tables/athlete/SessionsTable"
import TrainingGoalsTable from "@/components/tables/athlete/TrainingGoalsTable"


function Page() {
  return (
    <div>
      <h1 className="text-3xl px-6 pt-6 font-bold">Utøver</h1>
      <AthleteTable />
      <YearlyTable />
      <CompetitionsTable />
      <SessionsTable />
      <TrainingGoalsTable />
    </div>
  )
}

export default Page