import { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "@/config/config";
import {
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
} from "react";
import { toast } from "react-toastify";

interface degreeProp {
  emailid: string;
  work_experience: string;
  high_education: string;
  interested_stream: string;
  data_filed: boolean;
  useruniqid: string;
  firstname: string;
  lastname: string;
}

interface stepProp {
  degree: degreeProp;
}

interface roleProp {
  confidence: Number;
  match_type: string;
  matched_role: string;
}

const StepThree: ForwardRefRenderFunction<any, stepProp> = (
  { degree },
  ref
) => {
  const [matchedRoles, setMatchedRoles] = useState<roleProp[]>([]);
  const [selectedRole, setSelectedRole] = useState(
    matchedRoles[0]?.matched_role || ""
  );

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

  useEffect(() => {
    console.log("degreeeee", degree);
  }, []);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchDreamProfiles = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/dream-list?degree=${degree.high_education}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("dream Profiles", res.data);
        const roles = res.data.matched_roles;
        setMatchedRoles(roles);
      } catch (error) {
        console.error("Error fetching dream profiles", error);
      }
    };

    fetchDreamProfiles();
  }, [degree]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("-------userInfo------", degree);

    const newUserInfo = {
      ...degree,
      role_based: selectedRole,
      data_filed: true,
      emailid: degree.emailid,
      useruniqid: degree.useruniqid,
      firstname: degree.firstname,
      lastname: degree.lastname,
    };
    // setUserInfo(prev => ({ ...prev, data_filed: true }));
    console.log("newUSERINFO----------", newUserInfo);

    try {
      //             const response = await axios.post(`${baseURL}/api/basic-info`, newUserInfo,
      //                 {
      //           headers: {
      //             Authorization: `Bearer ${

      //           },
      //         }
      //     );
      const response = await axios.post(
        `${baseURL}/api/basic-info`,
        newUserInfo
      );
      if (response.status === 201) {
        //   setStatus("success");
        // degree?.(userInfo.high_education);
        notifySuccess();
        // navigate('/dashboard');
      }
    } catch (error) {
      alert("Submission failed. Please try again.");
      console.error("Error submitting data:", error);
      // setStatus("error");
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    // <div>
    //   <h1 className="flex justify-center text-2xl font-bold py-5">
    //     Recommendations According to Your Details
    //   </h1>
    //   <div className="flex flex-wrap gap-x-3 gap-y-3">
    //     <div className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl overflow-hidden p-6">
    //       <div className="text-center">
    //         <h2 className="text-xl font-semibold text-gray-800">
    //           Data Science
    //         </h2>
    //         <p className="mt-2 text-gray-600 text-sm">
    //           Python | Machine Learning | Pandas{" "}
    //         </p>
    //         <button className="px-4 py-2 bg-blue-600 text-white rounded mt-4">
    //           Click Me
    //         </button>
    //       </div>
    //     </div>
    //     <div className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl overflow-hidden p-6">
    //       <div className="text-center">
    //         <h2 className="text-xl font-semibold text-gray-800">
    //           Software Developer
    //         </h2>
    //         <p className="mt-2 text-gray-600 text-sm">
    //           Python | Machine Learning | Pandas{" "}
    //         </p>
    //         <button className="px-4 py-2 bg-blue-600 text-white rounded mt-4">
    //           Click Me
    //         </button>
    //       </div>
    //     </div>
    //     <div className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl overflow-hidden p-6">
    //       <div className="text-center">
    //         <h2 className="text-xl font-semibold text-gray-800">
    //           Business Development
    //         </h2>
    //         <p className="mt-2 text-gray-600 text-sm">
    //           Python | Machine Learning | Pandas{" "}
    //         </p>
    //         <button className="px-4 py-2 bg-blue-600 text-white rounded mt-4">
    //           Click Me
    //         </button>
    //       </div>
    //     </div>
    //     <div className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl overflow-hidden p-6">
    //       <div className="text-center">
    //         <h2 className="text-xl font-semibold text-gray-800">
    //           Data Science
    //         </h2>
    //         <p className="mt-2 text-gray-600 text-sm">
    //           Python | Machine Learning | Pandas{" "}
    //         </p>
    //         <button className="px-4 py-2 bg-blue-600 text-white rounded mt-4">
    //           Click Me
    //         </button>
    //       </div>
    //     </div>
    //     <div className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl overflow-hidden p-6">
    //       <div className="text-center">
    //         <h2 className="text-xl font-semibold text-gray-800">
    //           Data Science
    //         </h2>
    //         <p className="mt-2 text-gray-600 text-sm">
    //           Python | Machine Learning | Pandas{" "}
    //         </p>
    //         <button className="px-4 py-2 bg-blue-600 text-white rounded mt-4">
    //           Click Me
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    //            <div className="mb-4">
    //   <span className="flex items-center gap-2 font-semibold mb-2">
    //   Dream Field or Role Based on Your Input?
    //   </span>
    //   <div className="flex flex-col gap-2 mt-1">
    //     {matchedRoles.map((item,index)=>(
    //     <label className="inline-flex items-center" key={index}>
    //       <input type="checkbox" className="form-checkbox text-blue-600" />
    //       <span className="ml-2">{item?.matched_role}</span>
    //     </label>
    //     ))
    //     }
    //   </div>
    // </div>
    <div className="mb-4">
      <span className="flex items-center gap-2 font-semibold mb-2">
        Dream Field or Role Based on Your Input?
      </span>
      <div className="flex flex-col gap-2 mt-1">
        {matchedRoles.map((item, index) => (
          <label className="inline-flex items-center" key={index}>
            <input
              type="radio"
              name="dreamRole"
              value={item?.matched_role}
              checked={selectedRole === item?.matched_role}
              onChange={() => setSelectedRole(item?.matched_role)}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">{item?.matched_role}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default forwardRef(StepThree);
