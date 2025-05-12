import baseURL from '@/config/config';
import axios from 'axios';
import  { useEffect, useState } from 'react';
import useRedirectIfNotLoggedIn from '@/customHooks/useRedirectIfNotLoggedIn';

interface Mentor {
    id: number;
    mentor_name: string;
    qualification: string;
    skills: string;
    experience: string;
    verified: boolean;
}

const MentorList = () => {
    const [unverified, setUnverified] = useState<Mentor[]>([]);
    const [verified, setverified] = useState<Mentor[]>([]);

    useRedirectIfNotLoggedIn()

    useEffect(() => {
        const fetchUnverified = async () => {
            try {
                const name = localStorage.getItem('token');
                if (name) {
                    const response = await axios.get(`${baseURL}/unverified_mentors`, {
                        headers: {
                            'Authorization': `Bearer ${name}`,
                        }
                    });
                    setUnverified(response.data.unverified_mentors);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUnverified();
    }, []);


    useEffect(() => {
        const fetchUnverified = async () => {
            try {
                const name = localStorage.getItem('token');
                if (name) {
                    const response = await axios.get(`${baseURL}/verified_mentors`, {
                        headers: {
                            'Authorization': `Bearer ${name}`,
                        }
                    });
                    setverified(response.data.verified_mentors);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUnverified();
    }, []);

    return (
        <div>
            <div>
                <h1 className='text-center text-2xl font-bold text-[#1c2533]'>Unverified mentors</h1>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-white border-b">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Id</th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Name</th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Qualification</th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Skill</th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Experience</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {unverified.map((mentor, index) => (
                                            <tr key={mentor.id} className={index % 2 === 0 ? 'bg-gray-100 border-b' : 'bg-white border-b'}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{mentor.mentor_name}</td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{mentor.qualification}</td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{mentor.skills}</td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{mentor.experience}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-10'>
                <h1 className='text-center text-2xl font-bold text-[1c2533]'>Verified mentors</h1>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-white border-b">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Id</th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Name</th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Qualification</th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Skill</th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Experience</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {verified.map((mentor, index) => (
                                            <tr key={mentor.id} className={index % 2 === 0 ? 'bg-gray-100 border-b' : 'bg-white border-b'}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{mentor.mentor_name}</td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{mentor.qualification}</td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{mentor.skills}</td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{mentor.experience}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default MentorList;
