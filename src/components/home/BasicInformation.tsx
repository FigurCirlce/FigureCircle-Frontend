import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import axios from 'axios';
import baseURL from '@/config/config';


const BasicInformation: React.FC = () => {
    //user obeject from localstorage
    const storedUserString = localStorage.getItem('user');
    // const user = storedUserString ? JSON.parse(storedUserString) : {};

    console.log("verison news 1.2",storedUserString)



    const [infoData, setInfoData] = useState<any>();

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchInfoData = async () => {
            try {
                // Replace 'user-id' with the actual user ID from localStorage

                const name = localStorage.getItem('token')
                if (true) {
                    const response = await axios.get(`${baseURL}/user_details`, {
                        headers: {
                            'Authorization': `Bearer ${name}`,
                        }
                    });
                    localStorage.setItem('degree', JSON.stringify(response.data))
                    setInfoData(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchInfoData();
    }, []);

    console.log("infoData", infoData?.schoolname)
    return (
        <Card className="w-[800px]">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-1">
                    <div className="grid max-w-2xl mx-auto">


                        <div className="flex">
                            <div className="flex flex-col items-center mr-6">
                                <div className="w-px h-10 opacity-0 sm:h-full" />
                                <div>
                                    <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full">
                                        1
                                    </div>
                                </div>
                                <div className="w-px h-full bg-gray-300" />
                            </div>
                            <div className="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0">
                                <div className="sm:mr-5">
                                    <div className="flex items-center justify-center w-16 h-16 my-3 rounded-full bg-indigo-50 sm:w-24 sm:h-24">
                                        <svg
                                            className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                                            stroke="currentColor"
                                            viewBox="0 0 52 52"
                                        >
                                            <polygon
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                fill="none"
                                                points="29 13 14 29 25 29 23 39 38 23 27 23"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xl font-semibold sm:text-base">
                                        {infoData?.school_name}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                      
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="flex flex-col items-center mr-6">
                                <div className="w-px h-10 opacity-0 sm:h-full" />
                                <div>
                                    <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full">
                                        1
                                    </div>
                                </div>
                                <div className="w-px h-full bg-gray-300" />
                            </div>
                            <div className="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0">
                                <div className="sm:mr-5">
                                    <div className="flex items-center justify-center w-16 h-16 my-3 rounded-full bg-indigo-50 sm:w-24 sm:h-24">
                                        <svg
                                            className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                                            stroke="currentColor"
                                            viewBox="0 0 52 52"
                                        >
                                            <polygon
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                fill="none"
                                                points="29 13 14 29 25 29 23 39 38 23 27 23"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xl font-semibold sm:text-base">
                                        {infoData?.bachelors_degree}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                    
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="flex flex-col items-center mr-6">
                                <div className="w-px h-10 opacity-0 sm:h-full" />
                                <div>
                                    <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full">
                                        1
                                    </div>
                                </div>
                                <div className="w-px h-full bg-gray-300" />
                            </div>
                            <div className="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0">
                                <div className="sm:mr-5">
                                    <div className="flex items-center justify-center w-16 h-16 my-3 rounded-full bg-indigo-50 sm:w-24 sm:h-24">
                                        <svg
                                            className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                                            stroke="currentColor"
                                            viewBox="0 0 52 52"
                                        >
                                            <polygon
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                fill="none"
                                                points="29 13 14 29 25 29 23 39 38 23 27 23"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xl font-semibold sm:text-base">
                                        {infoData?.masters_degree}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">

            </CardFooter>
        </Card>

    );
};

export default BasicInformation;
