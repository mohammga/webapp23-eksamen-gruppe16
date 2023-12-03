"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface AthleteFormData {
    goals: {
        goalId: string;
        date: string;
        name: string;
        goalValue: string; // Added missing property
        comment: string;
    }[];
}
const ShowAthlete: React.FC = () => {
    const [formData, setFormData] = useState<AthleteFormData>({
        goals: [{ goalId: "", date: "", name: "", goalValue: "", comment: "" }],
    });

    const router = useRouter();

    const handleBack = () => {
        router.push("/");
    };
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 max-w-md rounded bg-white p-8 shadow-md"
        >
            <h2 className="mb-4 text-2xl font-bold">Opprett mål</h2>

            <div className="mb-4">
                {formData.goals.map((goal, index) => (
                    <div key={index}>

                        <label
                            htmlFor={`name-${index}`}
                            className="mb-2 block text-sm font-bold text-gray-700"
                        >
                            Navn:
                        </label>
                        <input
                            type="text"
                            id={`name-${index}`}
                            name={`name-${index}`}
                            value={goal.name}
                            onChange={(e) => handleGoalChange(e, index)}
                            className="mb-4 w-full rounded border border-gray-300 p-2"
                        />

                        <label
                            htmlFor={`date-${index}`}
                            className="mb-2 block text-sm font-bold text-gray-700"
                        >
                            Dato:
                        </label>
                        <input
                            type="date"
                            id={`date-${index}`}
                            name={`date-${index}`}
                            value={goal.date}
                            onChange={(e) => handleGoalChange(e, index)}
                            className="mb-2 w-full rounded border border-gray-300 p-2"
                        />

                        <label
                            htmlFor={`Goal-${index}`}
                            className="mb-2 block text-sm font-bold text-gray-700"
                        >
                            Mål (tallverdi):
                        </label>
                        <input
                            type=""
                            id={`GoalValue-${index}`}
                            name={`-${index}`}
                            value={goal.goalValue}
                            onChange={(e) => handleGoalChange(e, index)}
                            className="mb-4 w-full rounded border border-gray-300 p-2"
                        />

                        <label
                            htmlFor={`comment-${index}`}
                            className="mb-2 block text-sm font-bold text-gray-700"
                        >
                            Kommentar:
                        </label>
                        <input
                            type="text"
                            id={`comment-${index}`}
                            name={`comment-${index}`}
                            value={goal.comment}
                            onChange={(e) => handleGoalChange(e, index)}
                            className="mb-2 w-full rounded border border-gray-300 p-2"
                        />

                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => handleRemoveGoal(index)}
                                className="mr-2 text-red-500"
                            >
                                Fjern mål
                            </button>
                        )}
                    </div>
                ))}

            </div>

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
                Opprett
            </button>
        </form>
    );
};

export default ShowAthlete;