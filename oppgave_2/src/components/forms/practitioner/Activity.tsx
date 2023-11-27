import React, { ChangeEvent } from 'react';

interface ActivityProps {
    activity: {
        date: string;
        name: string;
        goalId: string;
    };
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onDelete: () => void;
}

const Activity: React.FC<ActivityProps> = ({ activity, onChange, onDelete }) => {
    return (
        <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Navn:
            </label>
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Eks: Løping"
                value={activity.name}
                onChange={onChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
            />

            <label htmlFor="goalId" className="block text-gray-700 text-sm font-bold mb-2">
                Mål:
            </label>
            <input
                type="text"
                id="goalId"
                name="goalId"
                placeholder="Legg til mål"
                value={activity.goalId}
                onChange={onChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />

            <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                Dato:
            </label>
            <input
                type="text"
                id="date"
                name="date"
                placeholder="2023-12-01"
                value={activity.date}
                onChange={onChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
            />

            <button type="button" onClick={onDelete} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-400">
                Slett
            </button>
        </div>
    );
};

export default Activity;
