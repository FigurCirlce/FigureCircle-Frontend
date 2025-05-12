import baseURL from '@/config/config';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";

interface AppointmentFormProps { }

const BecomeForm: React.FC<AppointmentFormProps> = () => {

    const [degree, setDegree] = useState<any>({});
    const [degreeTwo, setDegreeTwo] = useState<any>({});

    
    const [expertData, setExpertData] = useState({
        mentor_name: '',
        profile_photo: "",
        description: "",
        highest_degree: "",
        expertise: "",
        recent_project: "",
        meeting_time: "2:30",
        fees: "",
        stream: "",
        country: "",
        sender_email: '',
        username: '',
        user_id: '',
    });

    console.log(degree, degreeTwo,expertData)

    const notifySuccess = () => toast.success("Request for becoming mentor sent successfully!");
    const notifyError = (error: any) => toast.error(`Error: ${error}`);

    useEffect(() => {
        const userLocalData = localStorage.getItem('userlocaldata') || '{}';
        const Current = localStorage.getItem('degree') || '{}';

        const parsedData = JSON.parse(userLocalData);
        const cureentparse = JSON.parse(Current);
        setDegreeTwo(cureentparse);

        setDegree(parsedData);
        setExpertData(prevState => ({
            ...prevState,
            username: parsedData.username
        }));
        setExpertData(prevState => ({
            ...prevState,
            user_id: cureentparse.user_id
        }));
    }, []);

    const token = localStorage.getItem('token');
    const handleFormSubmit = () => {
        axios.post(`${baseURL}/add_mentor`, expertData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('API response:', response.data);
                notifySuccess();
            })
            .catch((error) => {
                notifyError(error);
                console.error('Error sending data:', error);
            });
    };



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    const base64String = (reader.result as string).split(',')[1];
                    setExpertData(prevState => ({
                        ...prevState,
                        profile_photo: base64String,
                    }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="mx-14 mt-10 border-2 border-blue-400 rounded-lg">
            <div className="mt-3 text-center text-4xl font-bold">Become an Expert</div>
            <div className="p-8">
                <div className=" my-6 flex gap-4">
                    <input
                        type="text"
                        name="name"
                        value={expertData.mentor_name}
                        onChange={(e) => setExpertData({ ...expertData, mentor_name: e.target.value })}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Expertise Name"
                    />
                    <input
                        type="file"
                        name="photo"
                        onChange={handleFileChange}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    />
                </div>
                <div className=" my-6 flex gap-4">
                    <input
                        type="text"
                        name="Highest Degree"
                        value={expertData.highest_degree}
                        onChange={(e) => setExpertData({ ...expertData, highest_degree: e.target.value })}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Highest Degree*"
                    />
                    <input
                        type="text"
                        name="Experties"
                        value={expertData.expertise}
                        onChange={(e) => setExpertData({ ...expertData, expertise: e.target.value })}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Experties"
                    />
                </div>
                <div className=" my-6 flex gap-4">
                    <input
                        type="text"
                        name="Recent Project"
                        value={expertData.recent_project}
                        onChange={(e) => setExpertData({ ...expertData, recent_project: e.target.value })}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Recent Project"
                    />
                    <input
                        type="text"
                        name="Stream Name"
                        value={expertData.stream}
                        onChange={(e) => setExpertData({ ...expertData, stream: e.target.value })}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Stream Name"
                    />
                </div>
                <div className=" my-6 flex gap-4">
                    <input
                        type="text"
                        name="country"
                        value={expertData.country}
                        onChange={(e) => setExpertData({ ...expertData, country: e.target.value })}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="country"
                    />
                    <input
                        type="number"
                        name="fees"
                        value={expertData.fees}
                        onChange={(e) => setExpertData({ ...expertData, fees: e.target.value })}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Fees"
                    />
                </div>
                <div className=" my-6 flex gap-4">
                    <input
                        type="text"
                        name="description"
                        value={expertData.description}
                        onChange={(e) => setExpertData({ ...expertData, description: e.target.value })}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Description"
                    />
                    <input
                        type="text"
                        name="email"
                        value={expertData.sender_email}
                        onChange={(e) => setExpertData({ ...expertData, sender_email: e.target.value })}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Email"
                    />
                </div>
                <div className="flex gap-4">
                    <div className="text-center">
                        <button
                            className="cursor-pointer rounded-lg bg-blue-700 px-8 py-5 text-sm font-semibold text-white"
                            onClick={handleFormSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BecomeForm;
