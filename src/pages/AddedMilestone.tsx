import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '@/config/config';
import useRedirectIfNotLoggedIn from '@/customHooks/useRedirectIfNotLoggedIn';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Milestone {
    milestone: string;
    description: string;
    expectedCompletionDate: string;
    mentorFees: string;
}

const AddedMilestone: React.FC = () => {
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [milestonesSerial, setMilestonesSerial] = useState<any>();

    useRedirectIfNotLoggedIn();

    const { id } = useParams<{ id: string }>(); // `id` in format "user_id-mentor_id"

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Extract user_id and mentor_id from the `id` param (format: "user_id-mentor_id")
    const [userId, mentorId] = id?.split('-').map(Number) || [];

    useEffect(() => {
        if (!userId || !mentorId) {
            setErrorMessage('Invalid user or mentor ID.');
            setLoading(false);
            return;
        }

        const fetchMilestoneData = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error('Token not found!');
                return;
            }
            try {
                const response = await axios.get(`${baseURL}/milestone`, {
                    params: { user_id: userId, mentor_id: mentorId },
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data) {
                    setMilestones(response.data.milestone);
                    setMilestonesSerial(response.data);

                    console.log('milestones', response.data);
                } else {
                    setErrorMessage('No milestones found.');
                }
            } catch (error) {
                setErrorMessage('Failed to fetch milestone data.');
                console.error('Error fetching milestones:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMilestoneData();
    }, [userId, mentorId]);

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const updatedMilestones = [...milestones];
        updatedMilestones[index] = { ...updatedMilestones[index], [name]: value };
        setMilestones(updatedMilestones);
    };

    const addMilestoneRow = () => {
        setMilestones([...milestones, { milestone: '', description: '', expectedCompletionDate: '', mentorFees: '' }]);
    };

    const removeMilestoneRow = (index: number) => {
        const updatedMilestones = milestones.filter((_, i) => i !== index);
        setMilestones(updatedMilestones);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Token not found!');
            return;
        }

        try {
            await axios.put(
                `${baseURL}/milestone`,
                { user_id: userId, mentor_id: mentorId, serial_number:milestonesSerial?.serial_number,milestone:milestones },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success('Milestones stored successfully!');
        } catch (error: any) {
            toast.error('Failed to store milestones.');
            console.error('Error storing milestones:', error);
        }
    };

    return (
        <div>
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : errorMessage ? (
                <p className="text-red-600 text-center">{errorMessage}</p>
            ) : (
                <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-8 bg-white shadow-md rounded-lg">
                    <h1 className="text-2xl font-bold mb-6 text-center">Milestone Form</h1>

                    {milestones.map((milestone, index) => (
                        <div key={index} className="border border-gray-200 p-6 mb-6 rounded-lg bg-gray-50 shadow-sm">
                            <h4 className="text-lg font-semibold mb-4">Milestone {index + 1}</h4>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Milestone</label>
                                    <input
                                        type="text"
                                        name="milestone"
                                        value={milestone.milestone}
                                        onChange={(e) => handleInputChange(index, e)}
                                        required
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={milestone.description}
                                        onChange={(e) => handleInputChange(index, e)}
                                        required
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Expected Completion Date</label>
                                    <input
                                        type="date"
                                        name="expectedCompletionDate"
                                        value={milestone.expectedCompletionDate}
                                        onChange={(e) => handleInputChange(index, e)}
                                        required
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mentor Fees</label>
                                    <input
                                        type="number"
                                        name="mentorFees"
                                        value={milestone.mentorFees}
                                        onChange={(e) => handleInputChange(index, e)}
                                        required
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                            </div>

                            {milestones.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeMilestoneRow(index)}
                                    className="mt-4 text-red-600 hover:text-red-800 text-sm font-semibold"
                                >
                                    Remove Milestone
                                </button>
                            )}
                        </div>
                    ))}

                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={addMilestoneRow}
                            className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 shadow-md"
                        >
                            Add Milestone
                        </button>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button type="submit" className="py-2 px-6 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 shadow-md">
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AddedMilestone;
