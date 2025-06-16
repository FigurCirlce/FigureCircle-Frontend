import React, { useState } from 'react';
import axios from 'axios';
import baseURL from '@/config/config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const StepTwo: React.FC = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
     const [status, setStatus] = useState<"idle" | "success" | "error" | "submitting">("idle");

    const [userInfo, setUserInfo] = useState({
        first_name: '',
        last_name: '',
        emailid: '',
        high_education: '',
        interested_stream: '',
        data_filed: false
    });
console.log("token------",token);
console.log("type",typeof(token));
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const notifySuccess = (msg = "Saved successfully!") => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: string
    ) => {
        const value = e.target.value;
        setUserInfo(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
         setStatus("submitting");
        setUserInfo(prev => ({ ...prev, data_filed: true }));
        console.log("USERINFO----------",userInfo);

        try {
            const response = await axios.post(`${baseURL}/api/basic-info`, userInfo, { headers });
            if (response.status === 201) {
              setStatus("success");
                notifySuccess();
                navigate('/dashboard'); // Redirect after success if needed
            }
        } catch (error) {
          alert("Submission failed. Please try again.");
            console.error("Error submitting data:", error);
            
        }
    };

    return (
        <section className="max-w-4xl px-6 py-3 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
                Basic Information
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            placeholder="First Name"
                            value={userInfo.first_name}
                            onChange={(e) => handleInputChange(e, 'first_name')}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                            dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                            focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                            dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            placeholder="Last Name"
                            value={userInfo.last_name}
                            onChange={(e) => handleInputChange(e, 'last_name')}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                            dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                            focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                            dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="email_id">
                            Email
                        </label>
                        <input
                            type="email"
                            id="emailid"
                            placeholder="Email"
                            value={userInfo.emailid}
                            onChange={(e) => handleInputChange(e, 'emailid')}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                            dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                            focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                            dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="high_education">
                            Highest Education
                        </label>
                        <input
                            type="text"
                            id="high_education"
                            placeholder="Highest Education"
                            value={userInfo.high_education}
                            onChange={(e) => handleInputChange(e, 'high_education')}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                            dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                            focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                            dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="interested_stream">
                            Interested Stream
                        </label>
                        <input
                            type="text"
                            id="interested_stream"
                            placeholder="Interested Stream"
                            value={userInfo.interested_stream}
                            onChange={(e) => handleInputChange(e, 'interested_stream')}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                            dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                            focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                            dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        className="px-6 py-2 leading-5 text-white transition-colors duration-200 
                        transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none 
                        focus:bg-blue-600"
                    >
                        
                         {status === "submitting" ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default StepTwo;
