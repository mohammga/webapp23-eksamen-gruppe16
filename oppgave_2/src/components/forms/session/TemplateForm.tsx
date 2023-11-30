"use client";

import { useState } from 'react';


interface FormData {
    name: string;
    tags: string;
    slug: string;
    activityTypes: string[];
    questions: string[];  // Endret fra number[] til string[]
    measurementParameter: string;
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


const TemplateForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        tags: '',
        slug: '',
        activityTypes: [],
        questions: [],
        measurementParameter: '',
    });


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            tags: e.target.value,
        }));
    };

    const handleMeasurementParameterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            measurementParameter: e.target.value,
        }));
    };

    const handleQuestionsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setFormData((prevData) => ({
            ...prevData,
            questions: selectedOptions,
        }));
    };
    const handleActivityTypesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            activityTypes: Array.from(e.target.selectedOptions).map(option => option.value),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add logic for submission, e.g., saving to a database
        console.log('Form data submitted:', formData);
    };




    return (
        <form onSubmit={handleSubmit}>
            <label className="block text-gray-700 text-sm mb-2" >Navn på treningsøkten:</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border rounded-md"
            />

            <label className="block text-gray-700 text-sm mb-2">Taggs (komma-separert):</label>
            <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleTagsChange}
                className="w-full p-2 mt-1 border rounded-md"
            />

            <label className="block text-gray-700 text-sm mb-2">Slug:</label>
            <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border rounded-md"
            />

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



        </form>
    );
};

export default TemplateForm;