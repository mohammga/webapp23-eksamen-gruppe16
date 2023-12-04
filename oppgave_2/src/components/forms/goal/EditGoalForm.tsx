// Import statements...
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AthleteFormData } from "@/types/index";
import CustomizedEditGoalForm from "@/components/forms/goal/CustomizedEditGoalForm";

const EditGoalForm: React.FC = () => {
    const [formData, setFormData] = useState<AthleteFormData>({
      goals: [{ goalId: "", date: "", name: "", goalValue: "", comment: "" }],
    });
  
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  
    const router = useRouter();
  
    const handleBack = () => {
      router.push("/");
    };
  
    const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const year = e.target.value;
      // Implement logic to fetch goals for the selected year
      setSelectedYear(year);
      // Reset selectedGoal when the year changes
      setSelectedGoal(null);
    };
  
    const handleGoalSelection = (e: ChangeEvent<HTMLSelectElement>) => {
      const goalId = e.target.value;
      // Implement logic to fetch goal details based on goalId
      setSelectedGoal(goalId);
    };
  
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Add your form submission logic here
    };

    // ... (existing code)
  
    return (
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 max-w-md rounded bg-white p-8 shadow-md"
      >
        <h2 className="mb-4 text-2xl font-bold">Endre mål</h2>
  
        {/* Year selection dropdown */}
        <label
          htmlFor="year"
          className="mb-2 block text-sm font-bold text-gray-700"
        >
          Velg år:
        </label>
        <select
          id="year"
          onChange={handleYearChange}
          className="mb-4 w-full rounded border border-gray-300 p-2"
        >
          {/* Populate years based on your data */}
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          {/* Add more years as needed */}
        </select>
  
        {/* Goal selection dropdown */}
        {selectedYear && (
          <div className="mb-4">
            <label
              htmlFor="selectedGoal"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Velg mål:
            </label>
            <select
              id="selectedGoal"
              onChange={handleGoalSelection}
              className="mb-4 w-full rounded border border-gray-300 p-2"
            >
              {/* Populate goals based on the selected year and your data */}
              <option value="goal1">Goal 1</option>
              <option value="goal2">Goal 2</option>
              {/* Add more goals as needed */}
            </select>
          </div>
        )}
  
        {/* Render goal form only when a goal is selected */}
        {selectedGoal && (
          <div className="mb-4">
            <CustomizedEditGoalForm/>
          </div>
        )}
  
        {/* ... (existing code) */}
  
        <button
          onClick={handleBack}
          type="button"
          className="mr-2 rounded bg-gray-700 px-4 py-2 text-white"
        >
          Tilbake
        </button>
  
        <button
          type="submit"
          className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
        >
          Endre
        </button>
      </form>
    );
  };
  
  export default EditGoalForm;
  