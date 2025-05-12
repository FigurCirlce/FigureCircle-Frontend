import { FutureMain } from '@/components/future/FutureMain';
import baseURL from '@/config/config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import useRedirectIfNotLoggedIn from '@/customHooks/useRedirectIfNotLoggedIn';

const FutureProfile = () => {
    const [infoData, setInfoData] = useState<any>([]);
    const [infoData2, setInfoData2] = useState<any>("");
    const [infoGetValue, setInfoGetValue] = useState<any>("");
    const [threeData, setThreeData] = useState<any>([]);
    const [degree, setDegree] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true); // New state for loading

    const [count, setCount] = useState<any>(0);
    useRedirectIfNotLoggedIn();

    const notifySuccess = (data: any) => toast.success(`Successfully Selected: ${data}`);
    // const notifyError = (error: any) => toast.error(`Login failed: ${error}`);
    console.log("maindegree==>", degree);

    useEffect(() => {
        const degree = localStorage.getItem('degree') || "{}";
        setDegree(JSON.parse(degree));
    }, []);

    useEffect(() => {

        const fetchInfoData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {

                const response = await axios.get(
                    `https://harsh1993-model.hf.space/get_streams`,
                    { headers: { 'Authorization': `Bearer ${token}` } }
                );

                console.log("Raw ans field BEFORE parsing:", response.data.ans);

                if (Array.isArray(response.data.ans)) {
                    setInfoData(response.data.ans);
                } else {
                    console.error("Unexpected ans format:", response.data.ans);
                }

                setCount(count + 1);
                // console.log('Stream response:', streamResponse);
                // setInfoData(streamResponse?.data); // or whatever field you want to show

            } catch (streamError: any) {
                console.error('Error calling /streams:', streamError);

                const status = streamError?.response?.status;

                const payload = {};
                if (degree?.stream_name && degree?.stream_name !== "null") {
                    //@ts-ignore
                    payload.role = degree.stream_name;
                } else {
                    //@ts-ignore
                    payload.highestdegree = degree?.masters_degree || degree?.bachelors_degree;
                }

                if (status === 404 || status === 500) {
                    try {
                        // If /streams fails with 404 or 500, call /get_roles_by_stream
                        const rolesResponse = await axios.post(`${baseURL}/get_roles_by_stream`, payload, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },
                        });

                        setCount(count + 1);
                        console.log("Fallback roles:", rolesResponse?.data.related_roles);
                        setInfoData(rolesResponse?.data.related_roles);

                    } catch (rolesError) {
                        console.error('Error calling /get_roles_by_stream:', rolesError);
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };

        // const fetchInfoData = async () => {
        //     try {
        //         const token = localStorage.getItem('token');
        //         if (!token) return;


        //     } catch (error) {
        //         console.error('Error fetching data:', error);
        //     } finally {
        //         setIsLoading(false);
        //     }
        // };

        // const fetchInfoData = async () => {
        //     try {
        //         const token = localStorage.getItem('token');
        //         if (token) {
        //             const response = await axios.post(`${baseURL}/get_roles_by_stream`, {
        //                 role: degree?.stream_name
        //             }, {
        //                 headers: {
        //                     'Authorization': `Bearer ${token}`,
        //                 },
        //             });

        //             setCount(count + 1);

        //             // notifySuccess(infoData2);
        //             console.log("role==?", response?.data.related_roles);
        //             setInfoData(response?.data.related_roles)
        //         }
        //     } catch (error: any) {
        //         console.error('Error fetching data:', error);
        //         const token = localStorage.getItem('token');
        //         if (error.response && error.response.status === 500) {
        //             try {
        //                 const streamResponse = await axios.post(`${baseURL}/streams`, {
        //                     name: infoData2
        //                 }, {
        //                     headers: {
        //                         'Authorization': `Bearer ${token}`,
        //                     },
        //                 });
        //                 setCount(count + 1);
        //                 console.log('Stream response:', streamResponse);
        //                 fetchInfoData();
        //             } catch (streamError) {
        //                 console.error('Error fetching streams:', streamError);
        //             }
        //         }
        //     } finally {
        //         setIsLoading(false); // Set loading to false after fetching
        //     }
        // };

        fetchInfoData();
    }, [degree]);









    useEffect(() => {
        if (degree) {
            const fetchInfoData = async () => {
                try {
                    const name = localStorage.getItem('token');
                    if (name) {
                        const response = await axios.post(`https://harsh1993-model.hf.space/get_three_streams`, {
                            "degree": degree?.masters_degree || degree?.bachelors_degree
                        }, {
                            headers: {
                                'Authorization': `Bearer ${name}`,
                            },
                        });
                        console.log("checkingmain==>", JSON.parse(response.data.ans));
                        setThreeData(JSON.parse(response.data.ans));
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setIsLoading(false); // Set loading to false after fetching
                }
            };
            fetchInfoData();
        }
    }, [degree]);

    useEffect(() => {
        const fetchInfoData = async () => {
            try {
                const name = localStorage.getItem('token');
                const response = await axios.get(`${baseURL}/chosen_stream`, {
                    headers: {
                        'Authorization': `Bearer ${name}`,
                    }
                });
                const chosenStream = response.data.chosen_stream;
                setInfoGetValue(chosenStream);
                console.log("checking==>", chosenStream);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false); // Set loading to false after fetching
            }
        };

        fetchInfoData();
    }, []);

    useEffect(() => {
        if (infoData2) {
            const fetchInfoData = async () => {
                try {
                    const token = localStorage.getItem('token');
                    if (token) {
                        const response = await axios.post(`${baseURL}/update_user_details_diff`, {
                            stream_name: infoData2
                        }, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },
                        });

                        setCount(count + 1);

                        notifySuccess(infoData2);
                        console.log(response);
                    }
                } catch (error: any) {
                    console.error('Error fetching data:', error);
                    const token = localStorage.getItem('token');
                    if (error.response && error.response.status === 500) {
                        try {
                            const streamResponse = await axios.post(`${baseURL}/streams`, {
                                name: infoData2
                            }, {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                },
                            });
                            setCount(count + 1);
                            console.log('Stream response:', streamResponse);
                            fetchInfoData();
                        } catch (streamError) {
                            console.error('Error fetching streams:', streamError);
                        }
                    }
                } finally {
                    setIsLoading(false); // Set loading to false after fetching
                }
            };

            fetchInfoData();
        }
    }, [infoData2]);

    if (isLoading) {
        return <div>Loading...</div>; // Render a loader while data is being fetched
    }

    return (
        <div>
            <FutureMain infoGetValue={infoGetValue} degree={degree} infoData2={infoData2} setInfoData2={setInfoData2} infoData={infoData} threeData={threeData} />
            <ToastContainer />
        </div>
    );
};

export default FutureProfile;