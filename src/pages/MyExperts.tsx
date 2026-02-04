import baseURL from '@/config/config';
import axios from 'axios';
import { useEffect, useState } from 'react'
import useRedirectIfNotLoggedIn from '@/customHooks/useRedirectIfNotLoggedIn';

const MyExperts = () => {
    const [mentors, setMentors] = useState<any[]>([]);
    useRedirectIfNotLoggedIn()
    console.log("mentorchekcin==>", mentors)
    // const projects = [
    //     {
    //         name: 'Framework7',
    //         description: 'Full featured framework for building iOS, Android & desktop apps',
    //         imgSrc: 'https://swiperjs.com/images/projects/framework7.svg',
    //         altText: 'Framework7',
    //         link: '#'
    //     },
    //     {
    //         name: 'Atropos',
    //         description: 'Stunning touch-friendly 3D parallax hover effects',
    //         imgSrc: 'https://swiperjs.com/images/projects/atropos.svg',
    //         altText: 'Atropos',
    //         link: '#'
    //     },
    //     {
    //         name: 'Konsta UI',
    //         description: 'Pixel perfect mobile UI components built with Tailwind CSS',
    //         imgSrc: 'https://swiperjs.com/images/projects/konsta.svg',
    //         altText: 'Konsta UI',
    //         link: '#'
    //     }
    // ];

    const fetchMentors = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/get_assigned_mentors`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setMentors(response.data.mentors);
        } catch (error) {
            console.error('Error fetching mentors:', error);
        }
    };

    useEffect(() => {
        fetchMentors();
    }, []);

    const handleUnassign = async (e: React.MouseEvent, mentorId: number) => {
        e.preventDefault();
        e.stopPropagation();

        if (!window.confirm("Are you sure you want to unassign this expert?")) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${baseURL}/unassign_mentor`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                data: { mentor_id: mentorId }
            });
            // Refresh the list
            fetchMentors();
        } catch (error) {
            console.error('Error unassigning mentor:', error);
            alert("Failed to unassign mentor. Please try again.");
        }
    };

    return (
        <div className="mx-auto mt-24 mb-20 max-w-6xl text-center p-6 dark:bg-gray-900">
            <h2 className="mb-12 text-center text-4xl font-extrabold text-gray-900 dark:text-gray-200 sm:text-5xl">
                My Experts
            </h2>
            <div className="grid mx-auto max-w-3xl items-stretch gap-4 text-left sm:grid-cols-2">
                {mentors.map((project, index) => (
                    <div key={index} className="relative group">
                        <a
                            className="flex w-full h-full items-center rounded-xl border border-black border-opacity-10 px-4 py-6 text-black duration-200 hover:border-opacity-0 hover:no-underline hover:shadow-lg dark:text-white dark:hover:bg-white dark:hover:bg-opacity-10 sm:flex-col sm:hover:shadow-2xl"
                            href="contact-expert"
                            rel="noopener noreferrer"
                        >
                            <img
                                className="mr-4 w-12 sm:mr-0 sm:h-32 sm:w-32 rounded-full object-cover"
                                src={project?.profile_picture}
                                alt={project.name}
                            />
                            <div>
                                <div className="font-semibold text-black dark:text-white sm:mt-4 sm:mb-2">
                                    {project.name}
                                </div>
                                <div className="text-sm opacity-75 line-clamp-2">
                                    {project.background}
                                </div>
                            </div>
                        </a>
                        <button
                            onClick={(e) => handleUnassign(e, project.mentor_id || project.id)}
                            className="absolute top-2 right-2 bg-red-100 text-red-600 px-2 py-1 rounded-md text-xs transition-opacity hover:bg-red-600 hover:text-white"
                        >
                            Unassign
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyExperts