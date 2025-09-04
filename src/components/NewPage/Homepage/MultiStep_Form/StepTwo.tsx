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
 const[ profile_type,setProfile_type]=useState("");
  const [userInfo, setUserInfo] = useState({
    emailid:"",
  
   industry:"",
    work_experience: "",
    high_education: "",
    interested_stream: "",
    data_filed: false,
    role:"",
    role_based:"",
    intent:[],
    expertise:"",

// industry_role:"",
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

      {/* <form onSubmit={handleSubmit}>
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

       
      </form> */}
      <form onSubmit={handleSubmit}>
  <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">

    {/* Profile Type */}
    <div>
      <label
        htmlFor="profile_type"
         className="text-gray-700 font-medium block"
      >
        Profile Type
      </label>
      <select
        id="profile_type"
        value={profile_type}
        onChange={(e) => setProfile_type(e.target.value)}
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                  dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                  dark:focus:border-blue-300 focus:outline-none focus:ring"
      >
        <option value="">Select Profile</option>
        <option value="student">Student</option>
        <option value="professional">Professional</option>
        <option value="others">Others</option>
      </select>
    </div>

    {/* Conditional Fields */}
    {/* {profile_type === "student" && (
      <>
        {/* Highest Education */}
        {/* <div>
          <label
            className="text-gray-700 font-medium block"
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
        </div> */}

         {/* <div className="flex-1 min-w-0">
    <label   className="text-gray-700 font-medium block">
      What kind of support are you looking for?
    </label>
    <div className="max-h-48 overflow-y-auto border rounded-md p-2 bg-white dark:bg-gray-800">
      {[
        "Strategic advice",
        "Skill development roadmap",
        "Portfolio or profile feedback",
        "Industry insights",
        "Connections or opportunities",
        "Something else",
      ].map((option) => (
        <label key={option} className="flex items-center mb-1">
          <input type="checkbox" className="mr-2" id="high_education"
            placeholder="intent"
            value={userInfo.intent}
            onChange={(option) => handleInputChange(option, "intent")}/> {option}
        </label>
      ))}
    </div>
  </div> */}
      {/* </>
    )}  */}
    {profile_type === "student" && (
  <>
    {/* Highest Education */}
    <div>
      <label className="text-gray-700 font-medium block" htmlFor="high_education">
        Highest Education
      </label>
      <select
        id="high_education"
        value={userInfo.high_education}
        onChange={(e) => handleInputChange(e, "high_education")}
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                   dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                   dark:focus:border-blue-300 focus:outline-none focus:ring"
      >
        <option value="">Select Education</option>
        <option value="High School">High School</option>
        <option value="Diploma">Diploma</option>
        <option value="Bachelors">Bachelors</option>
        <option value="Masters">Masters</option>
      </select>
    </div>

    {/* Support / Intent */}
    <div className="flex-1 min-w-0 mt-4">
      <label className="text-gray-700 font-medium block">
        What kind of support are you looking for?
      </label>
      <div className="max-h-[6rem] overflow-y-auto border rounded-md p-2 bg-white dark:bg-gray-800">
        {[
          "Strategic advice",
          "Skill development roadmap",
          "Portfolio or profile feedback",
          "Industry insights",
          "Connections or opportunities",
          "Something else",
        ].map((option) => (
          <label key={option} className="flex items-center mb-1">
            <input
              type="checkbox"
              className="mr-2"
              value={option}
              onChange={(e) => handleInputChange(e, "intent")}
            />{" "}
            {option}
          </label>
        ))}
      </div>
    </div>
  </>
)}

    {/* {profile_type === "professional" && (


      <>

        <div>
          <label
            className="text-gray-700 font-medium block"
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
        {/* Industry */}
        {/* <div>
          <label
            htmlFor="industry"
            className="text-gray-700 font-medium block"
          >
            Industry
          </label>
          <input
            type="text"
            id="industry"
            placeholder="Industry"
            value={userInfo.industry}
            onChange={(e) => handleInputChange(e, "industry")}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                      dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                      focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                      dark:focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div> */}

        
        

        {/* Role */}
        {/* <div>
          <label
            htmlFor="role"
             className="text-gray-700 font-medium block"
          >
            Job Role
          </label>
          <input
            type="text"
            id="role"
            placeholder="Job Role"
            value={userInfo.role}
            onChange={(e) => handleInputChange(e, "role")}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                      dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                      focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                      dark:focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div> */}

        {/* Work Experience */}
        {/* <div>
          <label
            htmlFor="work_experience"
             className="text-gray-700 font-medium block"
          >
            Work Experience
          </label>
          <select
            id="work_experience"
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
        </div> */}

     

         {/* <div className="flex-1 min-w-0">
    <label   className="text-gray-700 font-medium block">
      What kind of support are you looking for?
    </label>
    <div className="max-h-[6rem] overflow-y-auto border rounded-md p-2 bg-white dark:bg-gray-800">
      {[
        "Strategic advice",
        "Skill development roadmap",
        "Portfolio or profile feedback",
        "Industry insights",
        "Connections or opportunities",
        "Something else",
      ].map((option) => (
        <label key={option} className="flex items-center mb-1"  >
          <input type="checkbox" className="mr-2" id="intent"
            placeholder="intent"
            value={userInfo.intent}
            onChange={(option) => handleInputChange(option, "intent")}/> {option}
        </label>
      ))}
    </div>
  </div> */}

      {/* <div>
          <label
            htmlFor="expertise"
             className="text-gray-700 font-medium block"
          >
            Area Of Expertise
          </label>
          <input
            type="text"
            id="expertise"
            placeholder="area of expertise"
            value={userInfo.expertise}
            onChange={(e) => handleInputChange(e, "expertise")}
            className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-200 rounded-md 
                      dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                      focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                      dark:focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div>
      </>
    )}  */}
    {profile_type === "professional" && (
  <>
    {/* Highest Education */}
    <div>
      <label className="text-gray-700 font-medium block" htmlFor="high_education">
        Highest Education
      </label>
      <select
        id="high_education"
        value={userInfo.high_education}
        onChange={(e) => handleInputChange(e, "high_education")}
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                   dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                   dark:focus:border-blue-300 focus:outline-none focus:ring"
      >
        <option value="">Select Education</option>
        <option value="Bachelors">Bachelors</option>
        <option value="Masters">Masters</option>
        <option value="PhD">PhD</option>
        <option value="Diploma">Diploma</option>
      </select>
    </div>

    {/* Industry */}
    <div>
      <label className="text-gray-700 font-medium block" htmlFor="industry">
        Industry
      </label>
      <select
        id="industry"
        value={userInfo.industry}
        onChange={(e) => handleInputChange(e, "industry")}
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                   dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                   dark:focus:border-blue-300 focus:outline-none focus:ring"
      >
        <option value="">Select Industry</option>
        <option value="IT">IT</option>
        <option value="Finance">Finance</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Education">Education</option>
      </select>
    </div>

    {/* Job Role */}
    {/* <div>
      <label className="text-gray-700 font-medium block" htmlFor="role">
        Job Role
      </label>
      <select
        id="role"
        value={userInfo.role}
        onChange={(e) => handleInputChange(e, "role")}
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                   dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                   dark:focus:border-blue-300 focus:outline-none focus:ring"
      >
        <option value="">Select Job Role</option>
        <option value="Software Engineer">Software Engineer</option>
        <option value="Senior Software Engineer">Senior Software Engineer</option>
        <option value="Engineering Manager">Engineering Manager</option>
        <option value="Product Manager">Product Manager</option>
      </select>
    </div> */}
      <div>
          <label
            htmlFor="role"
             className="text-gray-700 font-medium block"
          >
           Job Role
          </label>
          <input
            type="text"
            id="role"
            placeholder="Job Role"
            value={userInfo.role}
            onChange={(e) => handleInputChange(e, "role")}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                      dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                      focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                      dark:focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div>

    {/* Work Experience */}
    <div>
      <label className="text-gray-700 font-medium block" htmlFor="work_experience">
        Work Experience
      </label>
      <select
        id="work_experience"
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

    {/* Intent / Support */}
    <div className="flex-1 min-w-0">
      <label className="text-gray-700 font-medium block">What kind of support are you looking for?</label>
      <div className="max-h-[6rem] overflow-y-auto border rounded-md p-2 bg-white dark:bg-gray-800">
        {[
          "Strategic advice",
          "Skill development roadmap",
          "Portfolio or profile feedback",
          "Industry insights",
          "Connections or opportunities",
          "Something else",
        ].map((option) => (
          <label key={option} className="flex items-center mb-1">
            <input
              type="checkbox"
              className="mr-2"
              id="intent"
              value={option}
              onChange={(e) => handleInputChange(e, "intent")}
            />{" "}
            {option}
          </label>
        ))}
      </div>
    </div>

    {/* Area of Expertise */}
    {/* <div>
      <label className="text-gray-700 font-medium block" htmlFor="expertise">
        Area Of Expertise
      </label>
      <select
        id="expertise"
        value={userInfo.expertise}
        onChange={(e) => handleInputChange(e, "expertise")}
        className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-200 rounded-md 
                   dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                   dark:focus:border-blue-300 focus:outline-none focus:ring"
      >
        <option value="">Select Expertise</option>
        <option value="Frontend Development">Frontend Development</option>
        <option value="Backend Development">Backend Development</option>
        <option value="Fullstack Development">Fullstack Development</option>
        <option value="Data Science">Data Science</option>
      </select>
    </div> */}
      <div>
          <label
            htmlFor="expertise"
            className="text-gray-700 font-medium block"
          >
            Area Of Expertise
          </label>
          <input
            type="text"
            id="expertise"
            placeholder="area of expertise"
            value={userInfo.expertise}
            onChange={(e) => handleInputChange(e, "expertise")}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                      dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                      focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                      dark:focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div>
  </>
)}


    {/* {profile_type === "others" && (
      <>

        <div>
          <label
            className="text-gray-700 font-medium block"
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
        {/* Industry Role */}
        {/* <div>
          <label
            htmlFor="industry"
            className="text-gray-700 font-medium block"
          >
            Industry 
          </label>
          <input
            type="text"
            id="industry"
            placeholder="Industry"
            value={userInfo.industry}
            onChange={(e) => handleInputChange(e, "industry")}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                      dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                      focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                      dark:focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div>

           <div>
          <label
            htmlFor="role"
             className="text-gray-700 font-medium block"
          >
           Job Role
          </label>
          <input
            type="text"
            id="role"
            placeholder="Job Role"
            value={userInfo.role}
            onChange={(e) => handleInputChange(e, "role")}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                      dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                      focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                      dark:focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div> */}

        {/* Experience */}
        {/* <div>
          <label
            htmlFor="work_experience"
            className="block mb-1 font-medium text-gray-700"
          >
            Work Experience
          </label>
          <select
            id="work_experience"
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
        </div> */}

        

         {/* <div className="flex-1 min-w-0">
    <label  className="text-gray-700 font-medium block">
      What kind of support are you looking for?
    </label>
    <div className="max-h-48 overflow-y-auto border rounded-md p-2 bg-white dark:bg-gray-800">
      {[
        "Strategic advice",
        "Skill development roadmap",
        "Portfolio or profile feedback",
        "Industry insights",
        "Connections or opportunities",
        "Something else",
      ].map((option) => (
        <label key={option} className="flex items-center mb-1">
          <input type="checkbox" className="mr-2" id="intent"
            
            value={userInfo.intent}
            onChange={(option) => handleInputChange(option, "intent")}/> {option}
        </label>
      ))}
    </div>
  </div> */}

     {/* <div>
          <label
            htmlFor="expertise"
            className="text-gray-700 font-medium block"
          >
            Area Of Expertise
          </label>
          <input
            type="text"
            id="expertise"
            placeholder="area of expertise"
            value={userInfo.expertise}
            onChange={(e) => handleInputChange(e, "expertise")}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                      dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                      focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                      dark:focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div>
      </>
    )}  */}

    {profile_type === "others" && (
  <>
    {/* Highest Education */}
    <div>
      <label className="text-gray-700 font-medium block" htmlFor="high_education">
        Highest Education
      </label>
      <select
        id="high_education"
        value={userInfo.high_education}
        onChange={(e) => handleInputChange(e, "high_education")}
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                   dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                   dark:focus:border-blue-300 focus:outline-none focus:ring"
      >
        <option value="">Select Education</option>
        <option value="Bachelors">Bachelors</option>
        <option value="Masters">Masters</option>
        <option value="PhD">PhD</option>
        <option value="Diploma">Diploma</option>
      </select>
    </div>

    {/* Industry */}
    <div>
      <label className="text-gray-700 font-medium block" htmlFor="industry">
        Industry
      </label>
      <select
        id="industry"
        value={userInfo.industry}
        onChange={(e) => handleInputChange(e, "industry")}
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                   dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                   dark:focus:border-blue-300 focus:outline-none focus:ring"
      >
        <option value="">Select Industry</option>
        <option value="IT">IT</option>
        <option value="Finance">Finance</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Education">Education</option>
      </select>
    </div>

    {/* Job Role */}
    {/* <div>
      <label className="text-gray-700 font-medium block" htmlFor="role">
        Job Role
      </label>
      <select
        id="role"
        value={userInfo.role}
        onChange={(e) => handleInputChange(e, "role")}
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                   dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                   dark:focus:border-blue-300 focus:outline-none focus:ring"
      >
        <option value="">Select Job Role</option>
        <option value="Software Engineer">Software Engineer</option>
        <option value="Senior Software Engineer">Senior Software Engineer</option>
        <option value="Engineering Manager">Engineering Manager</option>
        <option value="Product Manager">Product Manager</option>
      </select>
    </div> */}
       <div>
          <label
            htmlFor="role"
             className="text-gray-700 font-medium block"
          >
           Job Role
          </label>
          <input
            type="text"
            id="role"
            placeholder="Job Role"
            value={userInfo.role}
            onChange={(e) => handleInputChange(e, "role")}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                      dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                      focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                      dark:focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div>

    {/* Work Experience */}
    <div>
      <label className="block mb-1 font-medium text-gray-700" htmlFor="work_experience">
        Work Experience
      </label>
      <select
        id="work_experience"
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

    {/* Support / Intent */}
    <div className="flex-1 min-w-0">
      <label className="text-gray-700 font-medium block">What kind of support are you looking for?</label>
      <div className="max-h-[6rem] overflow-y-auto border rounded-md p-2 bg-white dark:bg-gray-800">
        {[
          "Strategic advice",
          "Skill development roadmap",
          "Portfolio or profile feedback",
          "Industry insights",
          "Connections or opportunities",
          "Something else",
        ].map((option) => (
          <label key={option} className="flex items-center mb-1">
            <input
              type="checkbox"
              className="mr-2"
              value={option}
              onChange={(e) => handleInputChange(e, "intent")}
            />{" "}
            {option}
          </label>
        ))}
      </div>
    </div>

    {/* Area of Expertise */}
    {/* <div>
      <label className="text-gray-700 font-medium block" htmlFor="expertise">
        Area Of Expertise
      </label>
      <select
        id="expertise"
        value={userInfo.expertise}
        onChange={(e) => handleInputChange(e, "expertise")}
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                   dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                   dark:focus:border-blue-300 focus:outline-none focus:ring"
      >
        <option value="">Select Expertise</option>
        <option value="Frontend Development">Frontend Development</option>
        <option value="Backend Development">Backend Development</option>
        <option value="Fullstack Development">Fullstack Development</option>
        <option value="Data Science">Data Science</option>
      </select>
    </div> */}
      <div>
          <label
            htmlFor="expertise"
            className="text-gray-700 font-medium block"
          >
            Area Of Expertise
          </label>
          <input
            type="text"
            id="expertise"
            placeholder="area of expertise"
            value={userInfo.expertise}
            onChange={(e) => handleInputChange(e, "expertise")}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
                      dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
                      focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
                      dark:focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div>
  </>
)}


    {/* Common Field: Interested Stream */}
   {/* <div className="flex-1 min-w-0">
    <label
      className="text-gray-700 font-medium block"
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
  </div> */}
  <div className="flex-1 min-w-0">
  <label
    className="text-gray-700 font-medium block"
    htmlFor="interested_stream"
  >
    Interested Stream
  </label>
  <select
    id="interested_stream"
    value={userInfo.interested_stream}
    onChange={(e) => handleInputChange(e, "interested_stream")}
    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md 
               dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 
               focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 
               dark:focus:border-blue-300 focus:outline-none focus:ring"
  >
    <option value="">Select Stream</option>
    <option value="Computer Science">Computer Science</option>
    <option value="Data Science">Data Science</option>
    <option value="AI & Machine Learning">AI & Machine Learning</option>
    <option value="Electronics & Communication">Electronics & Communication</option>
    <option value="Mechanical Engineering">Mechanical Engineering</option>
    <option value="Business Management">Business Management</option>
  </select>
</div>

  </div>
</form>



    </section>
  );
};

export default forwardRef(StepTwo);
