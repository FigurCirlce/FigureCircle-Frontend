import React, { useState, useEffect } from 'react';
import useRedirectIfNotLoggedIn from '@/customHooks/useRedirectIfNotLoggedIn';
import axios from 'axios';
import baseURL from '@/config/config';
import StaticFrom from '@/components/strip/StaticFrom';
import { toast } from 'react-toastify';

// SchoolDetail component definition
interface SchoolDetailProps {
    label: string;
    value: string;
}

const SchoolDetail: React.FC<SchoolDetailProps> = ({ label, value }) => (
    <div className="w-full mb-4 md:w-2/5">
        <div className="flex">
            <span className="mr-3 text-gray-500 dark:text-gray-400">
                {/* Add your SVG content */}
            </span>
            <div>
                <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
                <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">{value}</h2>
            </div>
        </div>
    </div>
);

const Mentor = () => {
    useRedirectIfNotLoggedIn(); // Custom hook to redirect if not logged in
    const [isMentorClicked, setMentorClicked] = useState(false); // State to manage click on a mentor
    const [isMobileScreen, setIsMobileScreen] = useState(false); // State to detect mobile screen
    const [data, setData] = useState<any[]>([]); // State to store mentor data from API
    //@ts-ignore
    const [dataTwo, setDataTwo] = useState<any[]>([]); // State to store mentor data from API
    //@ts-ignore
    const [dataThree, setDataThree] = useState<any[]>([]); // State to store mentor data from API

    const [selectedMentor, setSelectedMentor] = useState<any>(null); // State to hold the selected mentor details
    //@ts-ignore
    const [checkoutFlag, setCheckoutFlag] = useState<any>(false); // State to hold the selected mentor details

    const [datafour, setDatafour] = useState<any>({})

    console.log("checklingfour-->", datafour)


    const notifySuccess = () => toast.success("Added Mentor successfully!");
    // const notifyError = (error: any) => toast.error(`Error: ${error}`);

    const name = localStorage.getItem('token');



    useEffect(() => {
        const fetchInfoData = async () => {
            try {
                const name = localStorage.getItem('token');
                const response = await axios.get(`${baseURL}/recommended_mentors`, {
                    headers: {
                        'Authorization': `Bearer ${name}`,
                    }
                });
                console.log("response==?", response?.data?.mentors)
                setData(response?.data?.mentors); // Update the state with the fetched data
                // setDataTwo(response?.data?.related_mentors); // Update the state with the fetched data

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchInfoData();

        const handleResize = () => {
            setIsMobileScreen(window.innerWidth < 1024);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);


    console.log("checkingmenotr==>", selectedMentor)


    useEffect(() => {
        const degree = localStorage.getItem('degree') || "{}";
        setDatafour(JSON.parse(degree))
    }, [])


    useEffect(() => {
        const fetchInfoData = async () => {
            try {
                const name = localStorage.getItem('token');
                const response = await axios.get(`${baseURL}/all_mentors`, {
                    headers: {
                        'Authorization': `Bearer ${name}`,
                    }
                });
                console.log("checkingmentorstwo-=>", response?.data?.all_mentors, response)
                setDataThree(response?.data?.all_mentors); // Update the state with the fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchInfoData();

        const handleResize = () => {
            setIsMobileScreen(window.innerWidth < 1024);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Function to handle mentor click
    const handleMentorClick = (mentor: any) => {
        setSelectedMentor(mentor); // Set the selected mentor
        setMentorClicked(true); // Set isMentorClicked to true to expand details
    };



    // const checkoutFN = () => {
    //     setCheckoutFlag(!checkoutFlag)
    // }

    // console.log("checkingmenotr==>",selectedMentor)

    useEffect(() => {
        const loadRazorpayScript = () => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => console.log("Razorpay script loaded successfully");
            script.onerror = () => console.error("Error loading Razorpay script");
            document.body.appendChild(script);
        };
        loadRazorpayScript();
    }, []);

    const checkoutFN = async () => {
        try {
            const mentor_id = selectedMentor?.mentor_id;


            const response = await axios.post(`${baseURL}/create_order`, {
                mentor_id,
            },);

            console.log("Order created successfully:", response.data);

            const { id: order_id, amount, currency } = response.data;


            const razorpayOptions = {
                key: "rzp_test_D4OC2CLZNTebD7",
                amount: amount,
                currency: currency,
                name: "Mentorship Payment",
                description: "Payment for mentoring services",
                order_id: order_id,
                handler: async (paymentResponse: any) => {
                    console.log("Payment response received:", paymentResponse);
                    try {
                        const verificationResponse = await axios.post(`${baseURL}/verify_payment`, {
                            razorpay_payment_id: paymentResponse.razorpay_payment_id,
                            razorpay_order_id: paymentResponse.razorpay_order_id,
                            razorpay_signature: paymentResponse.razorpay_signature,
                            mentor_id,
                            //@ts-ignore
                            user_id: datafour?.user_id,
                        });

                        const response = await axios.post(`${baseURL}/new_assign_mentor`, {
                            mentor_id: selectedMentor?.mentor_id,
                            user_id: datafour?.user_id,
                            mentor_user_id: selectedMentor?.user_id
                        }, {
                            headers: {
                                'Authorization': `Bearer ${name}`,
                            },
                        });
                        notifySuccess();
                        console.log('Success:', response.data);

                        console.log("Payment verified successfully:", verificationResponse.data);

                    } catch (verificationError) {
                        console.error("Payment verification failed:", verificationError);
                    }
                },
                theme: {
                    color: "#F37254",
                },
            };

            //@ts-ignore
            // Check if Razorpay script is loaded before opening modal
            if (window.Razorpay) {
                //@ts-ignore
                const razorpay = new window.Razorpay(razorpayOptions);
                razorpay.open();
            } else {
                console.error("Razorpay SDK failed to load.");
            }

        } catch (error) {
            console.error("Error creating order:", error);
        }
    };




    return (
        <div>
            {checkoutFlag ? (
                <StaticFrom selectedMentor={selectedMentor} />
            ) : (
                <>
                    <h1 className='text-center text-2xl font-bold text-[#1c2533] mb-4'>Hire An Expert based on Your Need</h1>
                    <div className="flex justify-center items-center">
                        <input
                            type="text"
                            placeholder="Search"
                            className="block mt-2 w-[25rem] placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                        />
                    </div>
                    <div className={`grid ${isMentorClicked ? 'grid-cols-3' : 'grid-cols-1'} justify-items-start my-10`}>
                        {/* Mentor List */}
                        <div className={`px-4 ${isMentorClicked ? 'mx-0' : 'mx-auto'} sm:max-w-xl md:max-w-full lg:w-full xl:w-4/6 md:px-4 justify-self-end`}>
                            <div className="grid gap-8 cols-gap-5 lg:grid-cols-1">
                                {data.map((mentor: any) => (
                                    <div key={mentor?.mentor_id} className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl">
                                        <div className="relative p-5 bg-white rounded-sm">
                                            <div className="flex flex-col mb-2 lg:items-center lg:flex-row">
                                                <div className="flex items-center justify-center w-10 h-10 mb-4 mr-2 rounded-full bg-indigo-50 lg:mb-0">
                                                    {/* Add SVG Icon or Image */}
                                                </div>
                                                <h6 className="font-semibold leading-5">{mentor?.name}</h6>
                                            </div>
                                            <p className="mb-2 text-sm text-gray-900">{mentor?.background}</p>
                                            {isMobileScreen ? (
                                                <a
                                                    href="/view-expert"
                                                    className="inline-flex items-center text-sm font-semibold cursor-pointer transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                                                >
                                                    Learn more
                                                </a>
                                            ) : (
                                                <a
                                                    onClick={() => handleMentorClick(mentor)}
                                                    className="inline-flex items-center text-sm font-semibold cursor-pointer transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                                                >
                                                    Learn more
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}


                            </div>

                            <div className="grid gap-8 cols-gap-5 lg:grid-cols-1 mt-4">
                                {dataTwo.map((mentor: any) => (
                                    <div key={mentor?.mentor_id} className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl">
                                        <div className="relative p-5 bg-white rounded-sm">
                                            <div className="flex flex-col mb-2 lg:items-center lg:flex-row">
                                                <div className="flex items-center justify-center w-10 h-10 mb-4 mr-2 rounded-full bg-indigo-50 lg:mb-0">
                                                    {/* Add SVG Icon or Image */}
                                                </div>
                                                <h6 className="font-semibold leading-5">{mentor?.mentor_name}</h6>
                                            </div>
                                            <p className="mb-2 text-sm text-gray-900">{mentor?.description}</p>
                                            {isMobileScreen ? (
                                                <a
                                                    href="/view-expert"
                                                    className="inline-flex items-center text-sm font-semibold cursor-pointer transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                                                >
                                                    Learn more
                                                </a>
                                            ) : (
                                                <a
                                                    onClick={() => handleMentorClick(mentor)}
                                                    className="inline-flex items-center text-sm font-semibold cursor-pointer transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                                                >
                                                    Learn more
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}


                            </div>


                        </div>
                        {isMentorClicked && selectedMentor && (
                            // Mentor Details Section
                            <div className='col-span-2'>
                                <section className="font-poppins dark:bg-gray-800">
                                    <div className="max-w-6xl px-4 mx-auto">
                                        <div className="grid grid-cols-2">
                                            <div className="w-full px-4">
                                                <div className="mb-6">
                                                    <div>
                                                        <img className="object-cover w-32 h-32 rounded-full ring-gray-300" src={selectedMentor?.profile_picture} alt="ProfilePic" />
                                                        <span className="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                                                            Mentor/Expert
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                                            Name: {selectedMentor?.name}
                                                        </h2>
                                                        <div className="flex flex-wrap items-center mb-6">
                                                            <ul className="flex mb-4 mr-2 lg:mb-0">
                                                                {/* Add star icons or rating */}
                                                            </ul>
                                                            <a className="mb-4 text-xs underline hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-300 lg:mb-0" href="#">
                                                                View Profile
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-6">
                                                    <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">Mentor/Expert Details</h2>
                                                    <div className="bg-gray-100 dark:bg-gray-700 rounded-xl">
                                                        <div className="p-3 lg:p-5">
                                                            <div className="p-2 rounded-xl lg:p-6 dark:bg-gray-800 bg-gray-50">
                                                                <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                                                                    <SchoolDetail label="MileStones" value={selectedMentor?.milestones} />
                                                                    <SchoolDetail label="Highest Degree" value={selectedMentor?.degree} />
                                                                    <SchoolDetail label="Expertise" value={selectedMentor?.expertise} />
                                                                    <SchoolDetail label="Rank" value="1" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-6">
                                                    <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">Description :</h2>
                                                    <p className="text-base text-gray-500 dark:text-gray-400">
                                                        {selectedMentor?.background}
                                                    </p>
                                                </div>
                                            </div>
                                            {/* Pricing Section */}
                                            <div className="px-4 mx-auto ml-4 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
                                                <div className=" max-w-md gap-10 row-gap-5 sm:row-gap-10 lg:max-w-screen-md  sm:mx-auto flex justify-center items-center">
                                                    <div className="flex flex-col justify-between p-5 bg-white border rounded shadow-sm">
                                                        <div className="mb-6">
                                                            <div className="flex items-center justify-between pb-6 mb-6 border-b">
                                                                <div>
                                                                    <p className="text-sm font-medium leading-4 text-gray-500 dark:text-gray-400">Starting From</p>
                                                                    <p className="text-2xl mt-2 font-bold leading-4 text-blue-600 dark:text-gray-200">₹{selectedMentor?.fee}</p>
                                                                </div>

                                                            </div>
                                                            <p className="mb-2 text-gray-900 dark:text-gray-400">Price may vary based on the services you want.</p>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">Choose your requirement.</p>
                                                        </div>
                                                        <div className="flex items-center justify-center">
                                                            <button
                                                                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-blue-500 rounded shadow-md hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                                                                onClick={checkoutFN}
                                                            >
                                                                Checkout
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>

    );
};

export default Mentor;
