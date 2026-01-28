import React, { useEffect, useState } from "react";
import { Briefcase, GraduationCap, User } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseURL from "../../../config/config";
import { useNavigate } from "react-router-dom";
import { EyeOff } from 'lucide-react';
import { Eye } from 'lucide-react';

// import { createPortal } from "react-dom";
import SearchableSelect from "../SearchableSelect";

// interface SelectOption {
//   [key: string]: string | number;
// }
interface SupportCardsProps {
  selectedSupports: string[];
  setSelectedSupports: React.Dispatch<React.SetStateAction<string[]>>;
}

// interface SearchableSelectProps {
//   value: string | number | null;
//   onChange: (value: string | number) => void;
//   options: SelectOption[];
//   placeholder?: string;
//   labelKey?: string;
//   valueKey?: string;
// }

// const SearchableSelect = ({
//   value,
//   onChange,
//   options,
//   placeholder = "Select an option",
//   labelKey = "label",
//   valueKey = "value",
// }: SearchableSelectProps) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showOptions, setShowOptions] = useState(false);
//   const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     const selected = options.find(opt => opt[valueKey] === value);
//     if (selected && typeof selected[labelKey] === "string") {
//       setSearchTerm(selected[labelKey] as string);
//     }
//   }, [value, options, labelKey, valueKey]);

//   const filteredOptions = options.filter(item => {
//     const label = item[labelKey];
//     return (
//       typeof label === "string" &&
//       label.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   const handleSelect = (selectedValue: string | number) => {
//     onChange(selectedValue);
//     const selected = options.find(opt => opt[valueKey] === selectedValue);
//     setSearchTerm(
//       typeof selected?.[labelKey] === "string"
//         ? (selected[labelKey] as string)
//         : ""
//     );
//     setShowOptions(false);
//   };

//   const openDropdown = () => {
//     if (!inputRef.current) return;

//     const rect = inputRef.current.getBoundingClientRect();
//     setDropdownStyle({
//       position: "absolute",
//       top: rect.bottom + window.scrollY,
//       left: rect.left + window.scrollX,
//       width: rect.width,
//       zIndex: 9999,
//     });

//     setShowOptions(true);
//   };

//   return (
//     <>
//       <div className="w-full">
//         <input
//           ref={inputRef}
//           type="text"
//           className="border p-2 rounded w-full"
//           placeholder={placeholder}
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             openDropdown();
//           }}
//           onFocus={openDropdown}
//           onBlur={() => setTimeout(() => setShowOptions(false), 150)}
//         />
//       </div>

//       {showOptions &&
//         createPortal(
//           <ul
//             style={dropdownStyle}
//             className="bg-white border rounded shadow-lg max-h-60 overflow-y-auto"
//           >
//             {filteredOptions.length > 0 ? (
//               filteredOptions.map((item, index) => (
//                 <li
//                   key={index}
//                   className="p-2 hover:bg-gray-200 cursor-pointer"
//                   onMouseDown={() => handleSelect(item[valueKey])}
//                 >
//                   {item[labelKey]}
//                 </li>
//               ))
//             ) : (
//               <li className="p-2 text-gray-500">No matches found</li>
//             )}
//           </ul>,
//           document.body
//         )}
//     </>
//   );
// };

// const SearchableSelect: React.FC<SearchableSelectProps> = ({
//   value,
//   onChange,
//   options,
//   placeholder = 'Select an option',
//   labelKey = 'label',
//   valueKey = 'value',
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showOptions, setShowOptions] = useState(false);

//   useEffect(() => {
//       const selected = options.find(opt => opt[valueKey] === value);
//   if (selected) {
//     setSearchTerm(selected[labelKey] as string);
//   }
//   }, [value, options, labelKey, valueKey]);

//   const filteredOptions = options.filter(item =>{
//     const label = item[labelKey];
//   return (
//     typeof label === 'string' &&
//     label.toLowerCase().includes(searchTerm.toLowerCase())
//   );
// }
//   );

//   const handleSelect = (selectedValue: string | number) => {
//     onChange(selectedValue);
//     const selected = options.find(opt => opt[valueKey] === selectedValue);
//     // setSearchTerm(selected?.[labelKey] || '');
//       setSearchTerm(
//     typeof selected?.[labelKey] === 'string'
//       ? selected[labelKey] as string
//       : String(selected?.[labelKey] ?? '')
//   );
//     setShowOptions(false);
//   };

//   return (
//     <div className="relative w-full">
//       <input
//         type="text"
//         className="border p-2 rounded w-full"
//         placeholder={placeholder}
//         value={searchTerm}
//         onChange={(e) => {
//           setSearchTerm(e.target.value);
//           setShowOptions(true);
//         }}
//         onFocus={() => setShowOptions(true)}
//         onBlur={() => setTimeout(() => setShowOptions(false), 100)}
//       />
//       {showOptions && (
//         <ul className="absolute z-10 bg-white border rounded w-full max-h-60 overflow-y-auto">
//           {filteredOptions.length > 0 ? (
//             filteredOptions.map((item, index) => (
//               <li
//                 key={index}
//                 className="p-2 hover:bg-gray-200 cursor-pointer"
//                 onMouseDown={() => handleSelect(item[valueKey])}
//               >
//                 {item[labelKey]}
//               </li>
//             ))
//           ) : (
//             <li className="p-2 text-gray-500">No matches found</li>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
}

interface EducationItem {
  id: number;
  description: string;
  name: string;
  created_at: string;
  updated_at: string;
}

const getMinExperience = (description: string) => {
  const match = description.match(/\d+/);
  return match ? parseInt(match[0], 10) : Infinity;
};

const sortByExperience = (arr: any) =>
  [...arr].sort(
    (a, b) =>
      getMinExperience(a.description) -
      getMinExperience(b.description)
  );


const RegistrationFlow: React.FC<any> = () => {
  const [step, setStep] = useState(1);
  const [profileType, setProfileType] = useState<string | null>("student");
  // const [supportType, setSupportType] = useState<string | null>(null)
  const [selectedSupports, setSelectedSupports] = useState<string[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [degree, setDegree] = useState("");
  const [Recommendations, setRecommendations] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [customRole, setCustomRole] = useState("");

  const [selectedRole, setSelectedRole] = useState("");
  //@ts-ignore
  const [basicInfo, setBasicInfo] = useState({});
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    // phone:""
  });
  const [userInfo, setUserInfo] = useState({
    emailid: "",

    industry: "",
    work_experience: "",
    high_education: "",
    interested_stream: "",
    data_filed: false,
    role: "",
    role_based: "",
    intent: "",
    expertise: "",
    bachelors_degree: "btech",

    // industry_role:"",
  });
  const [educationArray, setEducationArray] = useState<EducationItem[]>([]);
  const [IndustryArray, setIndustryArray] = useState<EducationItem[]>([]);
  const [ExperienceArray, setExperienceArray] = useState<EducationItem[]>([]);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  // const handleInputChange = (
  //     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  //     field: string
  //   ) => {
  //     const value = e.target.value;
  //     setUserInfo((prev) => ({ ...prev, [field]: value }));
  //   };

  const handleInputChange = (field: string, value: string) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);
  const finishInfo = () => setShowRecommendations(true);

  const [errors, setErrors] = useState<FormErrors>({});
  // const [loading, setLoading] = useState(false);

  const notifySuccess = () => toast.success("Registration successful!");
  const notifyError = (error: any) =>
    toast.error(`Registration failed: ${error}`);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const SupportCards = () => (
  //   <div className="space-y-4">
  //     <h3 className="text-sm font-medium">What do you want to focus on right now?</h3>
  //     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  //       {/* Roadmap */}
  //       <div
  //         onClick={() => setSupportType("Skill Roadmapping")}
  //         className={`cursor-pointer border rounded-lg p-3 transition ${
  //           supportType === "Skill Roadmapping" ? "border-blue-500 bg-blue-50" : "border-gray-200"
  //         }`}
  //       >
  //         <div className="flex flex-col items-start space-y-2">
  //           <Wrench className="h-6 w-6" />
  //           <h4 className="font-semibold text-base">Skill Roadmapping</h4>
  //           <p className="text-xs text-gray-600">Learn the skills for your target role.</p>
  //         </div>
  //       </div>

  //       {/* Clarity */}
  //       <div
  //         onClick={() => setSupportType("Career Clarity & Connections")}
  //         className={`cursor-pointer border rounded-lg p-3 transition ${
  //           supportType === "Career Clarity & Connections" ? "border-blue-500 bg-blue-50" : "border-gray-200"
  //         }`}
  //       >
  //         <div className="flex flex-col items-start space-y-2">
  //           <MessageSquare className="h-6 w-6" />
  //           <h4 className="font-semibold text-base">Career Clarity & Connections</h4>
  //           <p className="text-xs text-gray-600">Get advice, insights, and networking.</p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )

  const SupportCards = ({
    selectedSupports,
    setSelectedSupports,
  }: SupportCardsProps) => {
    const toggleSupport = (type: any) => {
      console.log("type--------", type);
      setSelectedSupports((prev) => {
        const updated = prev.includes(type)
          ? prev.filter((item) => item !== type)
          : [...prev, type];

        console.log("Prev =>", prev);
        console.log("Type clicked =>", type);
        console.log("Updated =>", updated);

        return updated;
      });
    };
    const intents = [
      {
        id: 1,
        title: "Skill Roadmapping",
        desc: "A personalized guide to the exact skills you need for your target role and the fastest way to build them.",
      },
      {
        id: 2,
        title: "Career Clarity, Insights & Connections",
        desc: "Get expert guidance on the right career direction, feedback on your profile, and access to meaningful industry connections.",
      },
    ];

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium">
          What do you want to focus on right now?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {intents.map((intent) => (
            <div
              key={intent.id}
              onClick={() => toggleSupport(intent.title)}
              className={`cursor-pointer border-2 rounded-xl p-4 transition ${selectedSupports.includes(intent.title)
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
                }`}
            >
              <h3 className="font-semibold text-lg mb-2">{intent.title}</h3>
              <p className="text-sm text-gray-600">{intent.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    console.log("emailregister---", formData.email);
    console.log("passregister---", formData.password);

    if (Object.keys(validationErrors).length === 0) {
      // setLoading(true);
      const registerStatus = localStorage.getItem("registerStatus");
      if (registerStatus) {
        next();
      } else {
        try {
          const { email, password } = formData;
          const response = await axios.post(`${baseURL}/register`, {
            username: email,
            password,
          });
          console.log("Registration successful:", response.data);

          notifySuccess();
          if (response.status === 201) {
            localStorage.setItem("registerStatus", response.data.register);
            next();
          }
        } catch (error: any) {
          console.error("Registration failed:", error);
          notifyError(error?.response?.data?.message || error.message);
        } finally {
          // setLoading(false);
        }
      }
    }
  };

  const fetchEducationData = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/education`);
      console.log("response-data--education", response.data.education);
      // Remove duplicates based on description
      const uniqueEducation = Array.from(
        new Map(response.data.education.map((item: EducationItem) => [item.description, item])).values()
      ) as EducationItem[];
      setEducationArray(uniqueEducation);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchIndustryData = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/industry`);
      console.log("response-data--industry", response.data.industry);
      // Remove duplicates based on description
      const uniqueIndustries = Array.from(
        new Map(response.data.industry.map((item: EducationItem) => [item.description, item])).values()
      ) as EducationItem[];
      setIndustryArray(uniqueIndustries);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchExperienceData = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/experience-level`);
      console.log(
        "response-data--api/experience-level",
        response.data.experience_level
      );
      console.log("experience--level", response.data.experience_level);
      const data = response.data.experience_level;
      const sorted = sortByExperience(data);
      console.log("sortedddd----data", sorted);
      setExperienceArray(sorted);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchEducationData();
    fetchIndustryData();
    fetchExperienceData();
  }, []);

  const handleLogin = async () => {
    const dataToLogin = {
      username: formData.email,
      password: formData.password,
    };
    try {
      const response = await axios.post(`${baseURL}/login`, dataToLogin);
      console.log("responseLoginnnnn-------", response);
      console.log("response", response.data.access_token);

      const token = response.data.access_token;
      document.cookie = `token=${token}; expires=${new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toUTCString()}; path=/`;
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", token);
      const user = response.data;
      localStorage.setItem("userlocaldata", JSON.stringify(user));

      // dispatch(setUser(user));

      // Show success toast
      console.log("Login successful");
      // navigate(`/dashboard`);
      //       if(type!=="mentor"){
      //       if (response.data.data_fill === true ) {
      //           console.log("---fetchbasicInfo-----");
      //        await fetchBasicInfo();
      //         navigate("/dashboard");
      //       }
      //       else{
      //         navigate('/basic-info');
      //       }
      //     }
      //     else{
      //       console.log("mentor--loginnnn");
      // fetchMentorInfo();

      //     }
      //  if (response.data.is_mentor) {
      //     console.log("Mentor login detected");

      //   } else {
      // if (response.data.data_fill === true) {

      await fetchBasicInfo();

      // }
    } catch (error) {
      // notifyError(error); // Show error toast
      console.error("Login failed:", error);
    } finally {
      // setLoading(false);
    }
  };

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("userInfo-------", userInfo);
    const nameParts = formData.fullName.trim().split(/\s+/);
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ") || "";
    console.log("selectedSupport", selectedSupports);
    let parsedIntent = selectedSupports;
    let intentTopost = {};
    if (Array.isArray(parsedIntent)) {
      intentTopost = {
        roadmap: parsedIntent.includes("Skill Roadmapping"),
        clarity: parsedIntent.includes(
          "Career Clarity, Insights & Connections"
        ),
      };
    }
    // else if (typeof parsedIntent === "string") {
    //   intentTopost = {
    //     roadmap: parsedIntent.includes("Roadmap"),
    //     clarity: parsedIntent.includes("Clarity")
    //   };
    else {
      intentTopost = { roadmap: false, clarity: false };
    }

    const newUserInfo = {
      ...userInfo,
      data_filed: true,
      emailid: formData.email,
      useruniqid: formData.email,
      firstname,
      lastname,
      intent: intentTopost,
      role_based: selectedRole,
    };
    setBasicInfo(newUserInfo);

    try {
      const response = await axios.post(
        `${baseURL}/api/basic-info`,
        newUserInfo
      );
      console.log("response---data-----", response.data);
      await handleLogin();
      await fetchBasicInfo();
      navigate(`/dashboard`);
    } catch (e) { }

    // setRecommendations(newUserInfo?.high_education);
  };

  const handleInfoDetail = async () => {
    setDegree(userInfo?.high_education);
    //  await handleLogin();
    setTimeout(() => {
      next();
      finishInfo();
    }, 1000);
  };

  useEffect(() => {
    // const token=localStorage.getItem("token");
    const fetchDreamProfiles = async () => {
      try {
        let currentToken = token;

        // Get token if not already in state
        if (!currentToken) {
          const dataToLogin = {
            username: formData.email,
            password: formData.password,
          };

          const res = await axios.post(`${baseURL}/login`, dataToLogin);
          const data = res.data;
          currentToken = data.access_token;
          setToken(currentToken);
        }

        const res = await axios.get(`${baseURL}/dream-list`, {
          params: {
            degree: degree,
            // education:userInfo.high_education ,
            industry: userInfo.industry,
            experience: userInfo.work_experience,
            // stream: userInfo.interested_stream,
          },
          headers: { Authorization: `Bearer ${currentToken}` },
        });

        console.log("dream Profiles", res.data);
        const roles = res.data.matched_roles.map((r: any) => r.matched_role);
        console.log("roles----", roles);

        setRecommendations(roles);
      } catch (error) {
        console.error("Error fetching dream profiles", error);
      }
    };

    fetchDreamProfiles();
    // handleLogin();
  }, [degree]);

  // useEffect(()=>{

  // },[Recommendations.len])

  //    const handleUserBasicInfo = async (newUserInfo: any) => {
  //   try {
  //     const response = await axios.post(`${baseURL}/api/basic-info`, newUserInfo);
  //     console.log("response----userBasicInfo", response.data);
  //   } catch (error) {
  //     console.error("Error saving basic info:", error);
  //   }
  // };

  //  useEffect(() => {
  //     const fetchDreamProfiles = async () => {
  //       try {
  //         const res = await axios.get(
  //           `${baseURL}/dream-list?degree=${degree.high_education}`,
  //           {
  //             headers: { Authorization: `Bearer ${token}` },
  //           }
  //         );

  //         console.log("dream Profiles", res.data);
  //         const roles = res.data.matched_roles;
  //         setMatchedRoles(roles);
  //       } catch (error) {
  //         console.error("Error fetching dream profiles", error);
  //       }
  //     };

  //     fetchDreamProfiles();
  //   }, [degree]);

  const fetchBasicInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseURL}/api/basic-info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("basicInformation---", response.data);
      localStorage.setItem("degree", JSON.stringify(response.data));

      // setBasicInfo([response.data]);
      // setDegree(response.data.interested_stream);
      // setFormData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6 max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="flex items-center space-x-4 w-full justify-center">
        {["Login", "Info", "Recommendations"].map((label, index) => (
          <div key={label} className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${(showRecommendations ? 3 : step) === index + 1
                  ? "border-blue-500 bg-blue-100 text-blue-600"
                  : "border-gray-300 text-gray-400"
                }`}
            >
              {index + 1}
            </div>
            <span
              className={`text-sm ${(showRecommendations ? 3 : step) === index + 1
                  ? "text-blue-600 font-medium"
                  : "text-gray-500"
                }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Step 1: Login/Register */}
      {step === 1 && !showRecommendations && (
        <div className="border rounded-lg shadow p-6 w-full max-w-md bg-white">
          <h2 className="text-xl font-semibold text-center mb-4">
            Create Account
          </h2>
          <div className="space-y-3">
            <input
              className="border p-2 rounded w-full"
              placeholder="Full Name"
              onChange={handleChange}
              value={formData.fullName}
              name="fullName"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
            <input
              type="email"
              className="border p-2 rounded w-full"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              name="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="border p-2 rounded w-full"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
                name="password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <Eye color="black" size={'20px'} /> : <EyeOff color="black" size={'20px'} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="border p-2 rounded w-full"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={formData.confirmPassword}
                name="confirmPassword"
              />{" "}
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <Eye color="black" size={'20px'} /> : <EyeOff color="black" size={'20px'} />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
            <button
              className="w-full bg-blue-600 text-white py-2 rounded"
              onClick={handleRegister}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Basic Info */}
      {step === 2 && !showRecommendations && (
        <div className="border rounded-lg shadow p-6 w-full max-w-2xl bg-white">
          <h2 className="text-xl font-semibold text-center mb-6">
            Tell Us About You
          </h2>

          {/* Profile Options */}
          <div className="grid grid-cols-3 gap-4">
            <div
              onClick={() => setProfileType("student")}
              className={`p-3 border rounded-lg cursor-pointer flex flex-col items-center space-y-2 ${profileType === "student"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
                }`}
            >
              <GraduationCap />
              <span className="text-sm">Student</span>
            </div>

            <div
              onClick={() => setProfileType("professional")}
              className={`p-3 border rounded-lg cursor-pointer flex flex-col items-center space-y-2 ${profileType === "professional"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
                }`}
            >
              <Briefcase />
              <span className="text-sm">Professional</span>
            </div>

            <div
              onClick={() => setProfileType("other")}
              className={`p-3 border rounded-lg cursor-pointer flex flex-col items-center space-y-2 ${profileType === "other"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
                }`}
            >
              <User />
              <span className="text-sm">Other</span>
            </div>
          </div>

          {/* Conditional Fields */}
          <div className="space-y-6 mt-6">
            <SearchableSelect
              value={userInfo.high_education}
              onChange={(val: string | number) =>
                handleInputChange("high_education", String(val))
              }
              options={educationArray.map((item) => ({
                label: item.description,
                value: item.description,
              }))}
              placeholder="Highest Education"
            />

            {profileType !== null && (
              <>
                {profileType !== "student" && (
                  <>
                    <SearchableSelect
                      value={userInfo.industry}
                      onChange={(val: string | number) =>
                        handleInputChange("industry", String(val))
                      }
                      options={IndustryArray.map((item) => ({
                        label: item.description,
                        value: item.description,
                      }))}
                      placeholder="Industry"
                    />

                    {/* <select className="border p-2 rounded w-full"  id="work_experience"
        value={userInfo.work_experience}
        onChange={(e) => handleInputChange(e, "work_experience")}>
                      <option value="">Experience Level</option>
                      <option value="0-2 yrs">0–2 yrs</option>
                      <option value="3-6 yrs">3–6 yrs</option>
                      <option value="7+ yrs">7+ yrs</option>
                    </select> */}

                    <SearchableSelect
                      value={userInfo.work_experience}
                      onChange={(val: string | number) =>
                        handleInputChange("work_experience", String(val))
                      }
                      options={ExperienceArray.map((item) => ({
                        label: item.description,
                        value: item.description,
                      }))}
                      placeholder="Work Experience"
                    />
                  </>
                )}

                <SupportCards
                  selectedSupports={selectedSupports}
                  setSelectedSupports={setSelectedSupports}
                />
              </>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button className="px-4 py-2 border rounded" onClick={back}>
              Back
            </button>
            <button
              className={`px-4 py-2 rounded text-white ${!profileType || !selectedSupports
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600"
                }`}
              onClick={handleInfoDetail}
              disabled={!profileType || !selectedSupports}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Recommendations */}
      {showRecommendations && (
        <div className="border rounded-lg shadow p-6 w-full max-w-2xl bg-white">
          <h2 className="text-xl font-semibold text-center">
            Recommended Roles
          </h2>
          <p className="text-sm text-gray-500 text-center mb-4">
            Based on your information, here are some suggestions:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {Recommendations?.map((role) => (
              <button
                key={role}
                className={`px-3 py-1 border rounded transition
      ${selectedRole === role
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                onClick={() => {
                  // setSelectedRole(role)
                  setSelectedRole(selectedRole === role ? "" : role);
                  setCustomRole("");
                }}
              >
                {role}
              </button>
            ))}
          </div>
          <input
            className="border p-2 rounded w-full mt-4"
            placeholder="Or type your own role"
            value={customRole}
            onChange={(e) => {
              const value = e.target.value;
              setCustomRole(value);
              setSelectedRole(value);
            }}
          />
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 border rounded"
              onClick={() => {
                setShowRecommendations(false);
                setStep(2);
              }}
            >
              Back
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleInfoSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default RegistrationFlow;
