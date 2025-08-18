import React, { useState } from "react";

import {
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
} from "react";


interface StepTwoProps {
  formData: {
    fullName: string;
    email: string;
  };
   degree?: (data: object) => void; 
}





const StepTwo: ForwardRefRenderFunction<any, StepTwoProps> = ({formData,degree}, ref) => {
 
  const [userInfo, setUserInfo] = useState({
    emailid:"",
   
    work_experience: "",
    high_education: "",
    interested_stream: "",
    data_filed: false,
  });

  

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    const value = e.target.value;
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };


    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     const nameParts = formData.fullName.trim().split(/\s+/);
  const firstname = nameParts[0] || "";
  const lastname = nameParts.slice(1).join(" ") || "";
    const newUserInfo = {
      ...userInfo,
      data_filed: true,
      emailid:formData.email,
      useruniqid: formData.email,
      firstname,
      lastname,

    };
     degree?.(newUserInfo);
    }
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("-------userInfo------", userInfo);
  //     const nameParts = formData.fullName.trim().split(/\s+/);
  // const firstname = nameParts[0] || "";
  // const lastname = nameParts.slice(1).join(" ") || "";
  //   const newUserInfo = {
  //     ...userInfo,
  //     data_filed: true,
  //     emailid:formData.email,
  //     useruniqid: formData.email,
  //     firstname,
  //     lastname,

  //   };
  //   // setUserInfo(prev => ({ ...prev, data_filed: true }));
  //   console.log("newUSERINFO----------", newUserInfo);

  //   try {
  //     //             const response = await axios.post(`${baseURL}/api/basic-info`, newUserInfo,
  //     //                 {
  //     //           headers: {
  //     //             Authorization: `Bearer ${

     
  //     //           },
  //     //         }
  //     //     );
  //     const response = await axios.post(
  //       `${baseURL}/api/basic-info`,
  //       newUserInfo
  //     );
  //     if (response.status === 201) {
  //       //   setStatus("success");
  //       degree?.(userInfo.high_education);
  //       notifySuccess();
  //       // navigate('/dashboard');
  //     }
  //   } catch (error) {
  //     alert("Submission failed. Please try again.");
  //     console.error("Error submitting data:", error);
  //     // setStatus("error");
  //   }
  // };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    <section className="max-w-4xl px-6 py-3 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
        Basic Information
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        

        

          

          <div>
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor="high_education"
            >
              Highest Education
            </label>
            <input
              type="text"
              id="high_education"
              placeholder="Highest Education"
              value={userInfo.high_education}
              onChange={(e) => handleInputChange(e, "high_education")}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                            dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                            focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                            dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>

     <div className="mb-4">
  <label htmlFor="work_experience" className="block mb-1 font-medium text-gray-700">
    Work Experience
  </label>
  <select
    id="work_experience"
    name="work_experience"
    value={userInfo.work_experience}
    onChange={(e) => handleInputChange(e, "work_experience")}
    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
               dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
               focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
               dark:focus:border-blue-300 focus:outline-none focus:ring"
  >
    <option value="">Select your experience</option>
    <option value="0-1">0–1 years</option>
    <option value="1-3">1–3 years</option>
    <option value="3-5">3–5 years</option>
    <option value="5+">5+ years</option>
  </select>
</div>


{/* <div>
  <label
    className="text-gray-700 dark:text-gray-200"
    htmlFor="role_based"
  >
    Current Role
  </label>
  <input
    type="text"
    id="role_based"
    placeholder="role_based"
    value={userInfo.role_based}
    onChange={(e) => handleInputChange(e, "role_based")}
    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
              dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
              focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
              dark:focus:border-blue-300 focus:outline-none focus:ring"
  />
</div> */}


          <div>
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor="interested_stream"
            >
              Interested Stream
            </label>
            <input
              type="text"
              id="interested_stream"
              placeholder="Interested Stream"
              value={userInfo.interested_stream}
              onChange={(e) => handleInputChange(e, "interested_stream")}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                            dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                            focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                            dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>

   
        </div>

        {/* <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        className="px-6 py-2 leading-5 text-white transition-colors duration-200 
                        transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none 
                        focus:bg-blue-600"
                    >
                        
                         {status === "submitting" ? "Submitting..." : "Submit"}
                    </button>
                </div> */}
      </form>
    </section>
  );
};

export default forwardRef(StepTwo);
