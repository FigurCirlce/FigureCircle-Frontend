import baseURL from '@/config/config';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface RecomProps {
    degree: {
        stream_name?: string;
    };
}

const Recom: React.FC<RecomProps> = ({ degree }) => {
    const [data, setData] = useState<string[]>([]);
    const [certificate, setCertificate] = useState<string[]>([]);
    const [competition, setCompetition] = useState<string[]>([]);

    useEffect(() => {
        const fetchAllData = async () => {
            const token = localStorage.getItem('token');
            const stream = degree?.stream_name;

            if (!stream) return;

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            try {
                // Try all three primary APIs in parallel
                const [courseRes, certificateRes, competitionRes] = await Promise.all([
                    axios.post(`https://harsh1993-model.hf.space/get_course`, { stream }, { headers }),
                    axios.post(`https://harsh1993-model.hf.space/get_certificate`, { stream }, { headers }),
                    axios.post(`https://harsh1993-model.hf.space/get_competition`, { stream }, { headers }),
                ]);

                setData(JSON.parse(courseRes.data.ans));
                setCertificate(JSON.parse(certificateRes.data.ans));
                setCompetition(JSON.parse(competitionRes.data.ans));
            } catch (primaryError) {
                console.warn('Primary API failed, trying fallback API...', primaryError);

                try {
                    const fallbackRes = await axios.get(`${baseURL}/search-degree?degree=${stream}`, { headers });
                    console.log("Fallback response", fallbackRes.data);

                    setData(fallbackRes.data.courses || []);
                    setCertificate(fallbackRes.data.certifications || []);
                    setCompetition(fallbackRes.data.competitions || []);
                } catch (fallbackError) {
                    console.error('Fallback API also failed:', fallbackError);
                }
            }
        };

        fetchAllData();
    }, [degree?.stream_name]);


    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                    Explore our <br /> awesome{' '}
                    <span className="underline decoration-blue-500">Recommendation</span>
                </h1>

                <p className="mt-4 text-gray-500 xl:mt-6 dark:text-gray-300">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quam voluptatibus.
                </p>

                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
                    {/* Courses */}
                    <InfoCard title="Courses" data={data} />
                    {/* Competition */}
                    <InfoCard title="Competition" data={competition} />
                    {/* Certification */}
                    <InfoCard title="Certification" data={certificate} />
                </div>
            </div>
        </section>
    );
};

interface InfoCardProps {
    title: string;
    data: string[];
}

const InfoCard: React.FC<InfoCardProps> = ({ title, data }) => {
    return (
        <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
            <span className="inline-block text-blue-500 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
            </span>

            <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">{title}</h1>

            <div className="text-gray-500 dark:text-gray-300">
                {data.length > 0 ? (
                    data.map((item, index) => <div key={index}>{item}</div>)
                ) : (
                    <p>No recommendations available.</p>
                )}
            </div>

            <a href="#" className="inline-flex p-2 text-blue-500 capitalize transition-colors duration-300 transform bg-blue-100 rounded-full dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </a>
        </div>
    );
};

export default Recom;
