import React, { ChangeEvent } from 'react';

interface ActivityProps {
    activity: {
        date: string;
        name: string;
        goalId: string;
    };
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Activity: React.FC<ActivityProps> = ({ activity, onChange }) => {
    return (
        <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                Dato:
            </label>
            <input
                type="text"
                id="date"
                name="date"
                placeholder="2023-12-01T12:00:00Z"
                value={activity.date}
                onChange={onChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
            />

            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Navn:
            </label>
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Løping"
                value={activity.name}
                onChange={onChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
            />

            <label htmlFor="goalId" className="block text-gray-700 text-sm font-bold mb-2">
                Mål-ID:
            </label>
            <input
                type="text"
                id="goalId"
                name="goalId"
                placeholder="ee6e61d0-b98e-4d46-ac3e-a698a1cef989"
                value={activity.goalId}
                onChange={onChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
        </div>
    );
};

export default Activity;
