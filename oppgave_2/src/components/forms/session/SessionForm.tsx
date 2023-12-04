"use client";

import { useState } from 'react';

interface FormData {
    name: string;
    tags: string;
    slug: string;
    activityType: string;
    question: string;
    date: string;
    goal: string;
}

const activityTypes = [
    "Løp",
    "Sykkel",
    "Ski",
    "Triatlon",
    "Svømming",
    "Styrke",
    "Annet",
];

const measurementParameters = [
    "Puls",
    "Wat",
    "Fart",
    "Tid",
];

const demoQuestions = [
    "Hvor langt løp du?",
    "Hva var gjennomsnittspulsen din?",
    "Hvor lang tid tok det?",
    "Hvor mange kalorier forbrente du?",
];

const SessionForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        tags: '',
        slug: '',
        activityType: '',
        question: "",
        date: "",
        goal: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleQuestionsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setFormData((prevData) => ({ ...prevData, questions: selectedOptions }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Legg til logikk for innsending, f.eks. lagring til en database
        console.log('Skjemadata sendt:', formData);
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            tags: e.target.value,
        }));
    };

    const handleActivityTypesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            activityTypes: Array.from(e.target.selectedOptions).map(option => option.value),
        }));
    };

    const handleMeasurementParameterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            measurementParameter: e.target.value,
        }));
    };
    return (
        <div className="max-w-lg mx-auto bg-white p-8 mt-8 rounded shadow-md ">
            <h1 className="text-2xl font-semibold mb-4">Opprett Økt</h1>
            <form onSubmit={handleSubmit}>
                <label className="block text-gray-700 text-sm mb-2">Navn på treningsøkten:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 border rounded-md mb-4"
                />

                <label className="block text-gray-700 text-sm mb-2">Tagg</label>
                <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleTagsChange}
                    className="w-full p-2 mt-1 border rounded-md"
                />


                <label htmlFor="sessionDate" className="block text-sm font-medium text-gray-700">
                    Dato
                </label>
                <input
                    type="date"
                    id="sessionDate"
                    name="sessionDate"
                    className="mt-4 p-2 border rounded w-full"
                    value={formData.sessionDate}
                />


                <div className="my-4">
                    <label htmlFor="selectedTrainingGoal" className="block text-sm font-medium text-gray-700">
                        Velg en treningsmål
                    </label>
                    <select
                        id="selectedTrainingGoal"
                        name="selectedTrainingGoal"
                        className="mt-1 p-2 border rounded w-full mb-4"
                        value={formData.selectedTrainingGoal}
                        onChange={(e) => handleSelectChange('selectedTrainingGoal', e.target.value)}
                    >
                        <option value="">Velg</option>
                    </select>
                </div>


                <div className="mb-4">
                    <label htmlFor="selectedTrainingGoal" className="block text-sm font-medium text-gray-700">
                        Velg en aktivitetstype
                    </label>
                    <select
                        id="selectedTrainingGoal"
                        name="selectedTrainingGoal"
                        className="mt-1 p-2 border rounded w-full mb-4"
                        value={formData.selectedTrainingGoal}
                        onChange={(e) => handleSelectChange('selectedTrainingGoal', e.target.value)}
                    >
                        <option value="">Velg</option>
                    </select>
                </div>

                <button type="submit" className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700">
                    Opprett
                </button>

            </form>
        </div>


    );
};

export default SessionForm;