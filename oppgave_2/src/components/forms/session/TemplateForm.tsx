"use client";

import { useState } from 'react';

interface FormData {
    name: string;
    tags: string;
    slug: string;
    activityType: string;
    questions: number;
    measurementParameter: string;
    intervals: Interval[];
    // Add the rest of the attributes
}

interface Interval {
    duration: number;
    intensityZone: string;
}

const TemplateForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        tags: '',
        slug: '',
        activityType: '',
        questions: 0,
        measurementParameter: '',
        intervals: [{ duration: 0, intensityZone: '' }],
        // Initialize the rest of the attributes
    });

    const activityTypes = [
        "Løp",
        "Sykkel",
        "Ski",
        "Triatlon",
        "Svømming",
        "Styrke",
        "Annet",
    ]

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

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            activityType: e.target.value,
        }))
    }

    const handleIntervalChange = (
        index: number,
        field: keyof Interval,
        value: string | number,
    ) => {
       
    }

    const handleAddInterval = () => {
        setFormData((prevData) => ({
            ...prevData,
            intervals: [...prevData.intervals, { duration: 0, intensityZone: '' }],
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
                name="activityType"
                value={formData.activityType}
                onChange={handleSelectChange}
                className="w-full p-2 mt-1 border rounded-md"
            >
                {activityTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>



            <label className="block text-gray-700 text-sm mb-2">Number of questions:</label>
            <input
                type="number"
                name="questions"
                value={formData.questions}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border rounded-md"
            />

            <label className="block text-gray-700 text-sm mb-2">Measurement parameter:</label>
            <input
                type="text"
                name="measurementParameter"
                value={formData.measurementParameter}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border rounded-md"
            />

            <label className="block font-bold text-gray-700 text-sm mb-2">Intervals</label>
            {formData.intervals.map((interval, index) => (
                <div key={index} className="mt-2">
                    <label className="block text-gray-700 text-sm mb-2">Duration (min):</label>
                    <input
                        type="number"
                        value={interval.duration}
                        onChange={(e) => handleIntervalChange(index, 'duration', +e.target.value)}
                        className="w-full p-1 mt-1 border rounded-md"
                    />

                    <label className="block text-gray-700 text-sm mb-2">Intensity Zone:</label>
                    <input
                        type="text"
                        value={interval.intensityZone}
                        onChange={(e) => handleIntervalChange(index, 'intensityZone', e.target.value)}
                        className="w-full p-1 mt-1 border rounded-md"
                    />
                </div>
            ))}
        </form>
    );
};

export default TemplateForm;