import { useState } from 'react';
import axios from 'axios';
import baseURL from '@/config/config';
import { toast } from "react-toastify";
import useRedirectIfNotLoggedIn from '@/customHooks/useRedirectIfNotLoggedIn';


const AdminVerfy = () => {
    const [mentorId, setMentorId] = useState('');
    const [firstName, setFirstName] = useState('');

    useRedirectIfNotLoggedIn()

    const notifySuccess = () => toast.success("Added mentor  successfully!");
    const notifyError = (error: any) => toast.error(`Error: ${error}`);

    const token = localStorage.getItem('token');
    const handleSave = () => {
        axios.put(`${baseURL}/admin/verify_mentor/${mentorId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('Mentor updated:', response.data);
                notifySuccess()
                // Handle success, e.g., show a success message
            })
            .catch(error => {
                notifyError(error)
                console.error('Error updating mentor:', error);
                // Handle error, e.g., show an error message
            });
    };

    return (
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Admin Mentor</h2>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                    <label className="text-gray-700 dark:text-gray-200" htmlFor="firstName">
                        Enter Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder='FirstName'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                </div>

                <div>
                    <label className="text-gray-700 dark:text-gray-200" htmlFor="mentorid">
                        Enter Mentor ID:
                    </label>
                    <input
                        type="text"
                        id="mentorid"
                        name="mentorid"
                        placeholder='mentorid'
                        value={mentorId}
                        onChange={(e) => setMentorId(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                </div>
            </div>
            <div className="flex justify-end mt-6">
                <button
                    onClick={handleSave}
                    className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                    Save
                </button>
            </div>
        </section>
    );
};

export default AdminVerfy;
