"use client";

import { useState } from 'react';
import Intervals from '@/components/forms/session/Intervals';
import {FormData} from "@/types/index"
import { useRouter } from "next/navigation";

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

const ChangeSessionForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        tags: '',
        slug: '',
        activityTypes: [],
        questions: [],
        measurementParameter: '',
        sessionDate: "",
        selectedTrainingGoal: '',
        selectedCompetition: '',
    });

    const router = useRouter();
    
    const handleEdit = (id: string) => {
        router.push(`/edit/session/${id}`);
    };

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
            <h1 className="text-2xl font-semibold mb-4">Endre Økt</h1>
            <form onSubmit={handleSubmit}>
                <label className="block text-gray-700 text-sm mb-2">Navn på treningsøkten:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 border rounded-md mb-4"
                />

                <label className="block text-gray-700 text-sm mb-2">Taggs (komma-separert):</label>
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


                <div className="mb-4">
                    <label htmlFor="selectedTrainingGoal" className="block text-sm font-medium text-gray-700">
                        Velg en treningsmål (optional)
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
                    <label htmlFor="selectedCompetition" className="block text-sm font-medium text-gray-700">
                        Velg en konkurranse (optional)
                    </label>
                    <select
                        id="selectedCompetition"
                        name="selectedCompetition"
                        className="mt-1 p-2 border rounded w-full"
                        value={formData.selectedCompetition}
                        onChange={(e) => handleSelectChange('selectedCompetition', e.target.value)}
                    >
                        <option value="">Velg</option>
                    </select>
                </div>

                <label className="block text-gray-700 font-bold text-sm mb-2">Aktivitets type</label>

                <label className="block text-gray-700 text-sm mb-2">Type aktivitet:</label>
                <select
                    name="activityTypes"
                    value={formData.activityTypes}
                    onChange={handleActivityTypesChange}
                    multiple
                    className="w-full p-2 mt-1 border rounded-md"
                >
                    {activityTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>


                <label className="block text-gray-700 text-sm mb-2">Number of questions:</label>
                <select
                    name="questions"
                    value={formData.questions}
                    onChange={handleQuestionsChange}
                    multiple
                    className="w-full p-2 mt-1 border rounded-md"
                >
                    {demoQuestions.map((question) => (
                        <option key={question} value={question}>
                            {question}
                        </option>
                    ))}
                </select>

                <label className="block text-gray-700 text-sm mb-2">Measurement parameter:</label>
                <select
                    name="measurementParameter"
                    value={formData.measurementParameter}
                    onChange={handleMeasurementParameterChange}
                    className="w-full p-2 mt-1 border rounded-md"
                >
                    {measurementParameters.map((param) => (
                        <option key={param} value={param}>
                            {param}
                        </option>
                    ))}
                </select>

                <Intervals />

                <button type="submit" className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700">
                    Endre Økten
                </button>

            </form>
        </div>


    );
};

export default ChangeSessionForm;