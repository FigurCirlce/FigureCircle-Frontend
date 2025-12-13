import { useMemo, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DollarSign,
  User2,
  Briefcase,
  Linkedin,
  // FileText,
  // Upload,
  Check,
} from "lucide-react";
import axios from "axios";
import baseURL from "@/config/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



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

interface ExpertData {
  linkedin: string;
  expertise: string;
  degree: string;
  background: string;
  fee: string;
  milestones: number;
  profile_picture: File | null;
  resume: File | null;
  availability: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  current_role: string;
  work_experience: string;
  interested_field: string;
  intent_price: {
    intent: string;
    price: number;
  }[];
}

interface EducationItem {
  id: number;
  description: string;
  name: string;
  created_at: string;
  updated_at: string;
}



interface SelectOption {
  [key: string]: string | number;
}

interface SearchableSelectProps {
  value: string | number | null;
  onChange: (value: string | number) => void;
  options: SelectOption[];
  placeholder?: string;
  labelKey?: string;
  valueKey?: string;
}

const SERVICES = [
  {
    id: "skill-roadmap",
    label: "Skill Roadmap",
    hint: "Structured plan + resources",
    defaultDur: "30–45 min",
  },
  {
    id: "career-clarity",
    label: "Career Clarity / Profile Review",
    hint: "Focused guidance or CV/LinkedIn review",
    defaultDur: "20–30 min",
  },
  {
    id: "industry-insights",
    label: "Industry Insights / Mentorship",
    hint: "Q&A, trends, pathways",
    defaultDur: "30 min",
  },
];

function Stepper({ step }: { step: number }) {
  const items = ["Login/Register", "Basic Info", "Expertise", "Pricing"];
  return (
    <div className="flex items-center justify-between w-full max-w-lg">
      {items.map((label, i) => {
        const active = step === i + 1;
        const done = step > i + 1;
        return (
          <div key={label} className="flex flex-col items-center w-20">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-semibold shadow ${
                done ? "bg-green-500" : active ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </div>
            <span
              className={`mt-1 text-[10px] ${
                active ? "text-blue-700" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Chip({
  selected,
  onClick,
  children,
}: {
  selected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-2xl text-sm border transition shadow-sm hover:shadow ${
        selected
          ? "bg-blue-50 border-blue-400 text-blue-700"
          : "bg-white border-gray-300 text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  labelKey = "label",
  valueKey = "value",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  // useEffect(() => {
  //   const selected = options.find(opt => opt[valueKey] === value);
  //   if (selected) {
  //     setSearchTerm(selected[labelKey]);
  //   }
  // }, [value, options, labelKey, valueKey]);

  useEffect(() => {
    const selected = options.find((opt) => opt[valueKey] === value);
    if (selected) {
      setSearchTerm(selected[labelKey] as string);
    }
  }, [value, options, labelKey, valueKey]);

  // const filteredOptions = options.filter(item =>
  //   item[labelKey].toLowerCase().includes(searchTerm.toLowerCase())
  // );

  
  

  const filteredOptions = options.filter((item) => {
    const label = item[labelKey];
    return (
      typeof label === "string" &&
      label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleSelect = (selectedValue: string | number) => {
    onChange(selectedValue);
    const selected = options.find((opt) => opt[valueKey] === selectedValue);
    // setSearchTerm(selected?.[labelKey] || '');
    setSearchTerm(
      typeof selected?.[labelKey] === "string"
        ? (selected[labelKey] as string)
        : String(selected?.[labelKey] ?? "")
    );
    setShowOptions(false);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowOptions(true);
        }}
        onFocus={() => setShowOptions(true)}
        onBlur={() => setTimeout(() => setShowOptions(false), 100)}
      />
      {showOptions && (
        <ul className="absolute z-10 bg-white border rounded w-full max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((item, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onMouseDown={() => handleSelect(item[valueKey])}
              >
                {item[labelKey]}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No matches found</li>
          )}
        </ul>
      )}
    </div>
  );
};

const ExpertOnboardingPreview = () => {
  const [step, setStep] = useState(1);
  //@ts-ignore
  const [errors, setErrors] = useState<FormErrors>({});
  
  //@ts-ignore
  const [title, setTitle] = useState("");
  //@ts-ignore
  const [years, setYears] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [industries, setIndustries] = useState<string[]>([]);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const navigate = useNavigate();
  // expertise
 
  const [services, setServices] = useState<string[]>(["skill-roadmap"]); // sensible default
 
  const [expertform, setExpertForm] = useState<ExpertData>({
    linkedin: "https://linkedin.com/in/",
    expertise: "",
    degree: "",
    background: "",
    resume: null,
    current_role: "",
    work_experience: "",
    interested_field: "",
    profile_picture: null,
    fee: "100",
    milestones: 5,
    availability: [
      {
        day: "Monday",
        startTime: "10:00",
        endTime: "12:00",
      },
    ],
    intent_price: [],
  });
  // State for intent_price array
  //@ts-ignore
  const [intentPrice, setIntentPrice] = useState<
    { intent: string; price: number }[]
  >([
    { intent: "", price: 0 }, // initial row
  ]);
  //@ts-ignore
  const [educationArray, setEducationArray] = useState<EducationItem[]>([]);
  //@ts-ignore
  const [IndustryArray, setIndustryArray] = useState<EducationItem[]>([]);
  const [ExperienceArray, setExperienceArray] = useState<EducationItem[]>([]);
  const [CurrentRoleArray, setCurrentRoleArray] = useState<EducationItem[]>([]);
  //@ts-ignore
  const [skillsArray, setSkillArray] = useState<EducationItem[]>([]);

  // pricing
  const [pricing, setPricing] = useState<
    Record<string, { duration: string; price: string }>
  >({
    "skill-roadmap": { duration: "30–45 min", price: "" },
  });

  const fetchEducationData = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/education`);
      console.log("response-data--education", response.data.education);
      setEducationArray(response.data.education);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchIndustryData = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/industry`);
      console.log("response-data--industry", response.data.industry);
      setIndustryArray(response.data.industry);
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
      setExperienceArray(response.data.experience_level);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchRoleData = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/role`);
      console.log("response-data--education", response.data.role);
      setCurrentRoleArray(response.data.role);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSkillData = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/skills`);
      console.log("response-data--education", response.data.skills);
      setSkillArray(response.data.skills);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchEducationData();
    fetchIndustryData();
    fetchExperienceData();
    fetchRoleData();
    fetchSkillData();
  }, []);

  const next = () => setStep((s) => s + 1);
  // const back = () => setStep((s) => s - 1);
  // const token = localStorage.getItem("token");
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
      const user=response.data;
      localStorage.setItem("userlocaldata", JSON.stringify(user));

      // dispatch(setUser(user));

      // Show success toast
      console.log("Login successful");
      // navigate(`/dashboard`);
      // if (type !== "mentor") {
      if (response.data.is_mentor === true) {
        console.log("---fetchbasicInfo-----");
        await fetchBasicInfo();
        navigate("/dashboard");
      } else {
        navigate("/basic-info");
      }
      // } else {
      //   console.log("mentor--loginnnn");
      //   fetchMentorInfo();
      // }
    } catch (error) {
      // notifyError(error); // Show error toast
      console.error("Login failed:", error);
    } finally {
      // setLoading(false);
    }
  };

  const notifySuccess = () => toast.success("Registration successful!");
  const notifyError = (error: any) =>
    toast.error(`Registration failed: ${error}`);

  function toggle(
    list: string[],
    value: string,
    setter: (v: string[]) => void
  ) {
    setter(
      list.includes(value) ? list.filter((x) => x !== value) : [...list, value]
    );
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    console.log("emailregister---", formData.email);
    console.log("passregister---", formData.password);

    if (Object.keys(validationErrors).length === 0) {
      // setLoading(true);
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
          await handleLogin();
          next();
        }
      } catch (error: any) {
        console.error("Registration failed:", error);
        notifyError(error?.response?.data?.message || error.message);
      } finally {
        // setLoading(false);
      }
    }
  };

  const fetchMentorInfo = async () => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${baseURL}/api/mentor/details?user_id=${parsedUser.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("basicInformation---", response.data);
      localStorage.setItem("degree", JSON.stringify(response.data));

      // setBasicInfo([response.data]);
      // setDegree(response.data.interested_stream);
      // setFormData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleFileChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      field: "profile_picture" | "resume"
    ) => {
      const file = e.target.files?.[0] || null;
      setExpertForm((prev) => ({ ...prev, [field]: file }));
    };

 const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = "dpwysillm";
    const uploadPreset = "figurecircule";
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(cloudinaryUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw new Error("Failed to upload file.");
    }
  };

   const handleSubmit = async (e: React.FormEvent) => {
      
      e.preventDefault();
      // await handleLogin();
      console.log("-------formdata------", formData);
  
      const profileImageUrl = expertform.profile_picture
        ? await uploadToCloudinary(expertform.profile_picture)
        : null;
      const resumeUrl = expertform.resume
        ? await uploadToCloudinary(expertform.resume)
        : null;
  
      const newMentorData = {
        ...expertform,
        name: formData.fullName,
        email: formData.email,
        profile_picture: profileImageUrl,
        resume: resumeUrl,
        interested_field:"N/A",
        phone:formData.phone,
      
        intent_price: expertform.intent_price.map(item => ({
      ...item,
      price: parseFloat(item.price.toFixed(2)), // ensures float
    }))
  
      };
  
      //   const newMentorData={
  
      // name: "John Doe",
      // email: "testing.doe@examplesssssss.com",
      // phone: "+1234567890",
      // linkedin: "https://linkedin.com/in/johndoe",
      // expertise: "Data Science, AI",
      // degree: "MSc Computer Science",
      // background: "5 years in AI research and development.",
      // fee: "100",
      // milestones: 5,
      // profile_picture: "https://example.com/profile.jpg",
      // resume: "https://example.com/resume.pdf",
      // availability: [
      //   {
      //     "day": "Monday",
      //     "startTime": "10:00",
      //     "endTime": "12:00"
      //   },
      //   {
      //     "day": "Wednesday",
      //     "startTime": "14:00",
      //     "endTime": "16:00"
      //   }
      // ],
      // current_role: "Senior Data Scientist",
      // work_experience: "7 years",
      // interested_field: "Machine Learning, NLP"
  
      //   }
      // setUserInfo(prev => ({ ...prev, data_filed: true }));
      console.log("newUSERINFO----------", newMentorData);
       const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          `${baseURL}/add_new_mentor`,
  
          newMentorData,
          {
            headers: {
              //             Authorization: `Bearer ${
  
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 201) {
          //   setStatus("success");
          notifySuccess();
          // navigate('/dashboard');
          // alert("mentor created successfully");
          await handleLogin();
          await fetchMentorInfo();
          navigate('/dashboard');
        }
      } catch (error) {
        alert("Submission failed. Please try again.");
        console.error("Error submitting data:", error);
        // setStatus("error");
      }
    };


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

  function ensurePricingFor(serviceId: string) {
    setPricing((prev) =>
      prev[serviceId]
        ? prev
        : {
            ...prev,
            [serviceId]: {
              duration:
                SERVICES.find((s) => s.id === serviceId)?.defaultDur ||
                "30 min",
              price: "",
            },
          }
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setExpertForm((prev) => ({ ...prev, [field]: value }));
  };
  useMemo(() => {
    services.forEach(ensurePricingFor);
  }, [services]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-3 p-3 bg-gradient-to-b from-white to-slate-50">
      <header className="pt-1 text-center">
       
        <h1 className="font-bold text-xl mb-3">Expert Onboarding</h1>
        <div className="mt-2">
          <Stepper step={step} />
        </div>
      </header>

      <Card className="w-full max-w-lg p-4 rounded-2xl shadow-sm border border-slate-200 bg-white">
        {step === 1 && (
          <section className="space-y-3 text-center">
            <h2 className="text-sm font-semibold">Create Account</h2>
            <div className="space-y-3 max-w-xs mx-auto">
              <Input
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <Input
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <Input
                placeholder="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Input
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end">
              <Button className="mt-2" onClick={handleRegister}>
                Next
              </Button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-3">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <User2 className="h-3.5 w-3.5" /> Basic Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-slate-600">
                  Current Role / Title
                </label>
                <SearchableSelect
                  placeholder="e.g., Senior Product Manager"
                  value={expertform.current_role}
                  onChange={(val: string | number) =>
                    handleInputChange("current_role", String(val))
                  }
                  options={CurrentRoleArray.map((item) => ({
                    label: item.name,
                    value: item.name,
                  }))}
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-600">
                  Years of Experience
                </label>
                <SearchableSelect
                  value={expertform.work_experience}
  onChange={(val: string | number) => handleInputChange('work_experience', String(val))}
  options={ExperienceArray.map(item => ({
    label: item.description,
    value: item.description,
  }))}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-[11px] font-medium text-slate-600 flex items-center gap-1">
                  <Briefcase className="h-3 w-3" /> Industry / Domain
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {IndustryArray.map((item,index) => (
                    <Chip
                      key={index}
                      selected={industries.includes(item.name)}
                      onClick={() => toggle(industries, item.name, setIndustries)}
                    >
                      {item.name}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="text-[11px] font-medium text-slate-600 flex items-center gap-1">
                  <Linkedin className="h-3 w-3" /> LinkedIn (optional)
                </label>
                <Input
                  placeholder="https://linkedin.com/in/…"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => setStep(3)}>Next</Button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="space-y-3">
            <h2 className="text-sm font-semibold">Expertise & Offerings</h2>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-[11px] font-medium text-slate-600">
                  About / How you help
                </label>
                <Textarea
                  rows={4}
                  name={expertform.background}
                  placeholder="Short intro + what problems you solve for mentees"
                  value={expertform.background}
                  // onChange={(e) => setAbout(e.target.value)}
                  onChange={(e) => handleInputChange('background', e.target.value)}
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-600">
                  Areas of Guidance (select one or more)
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {SERVICES.map((s) => (
                    <Chip
                      key={s.id}
                      selected={services.includes(s.id)}
                      onClick={() => toggle(services, s.id, setServices)}
                    >
                      {s.label}
                    </Chip>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-600">
                  Skill Keywords
                </label>
                <Input
                  placeholder="e.g., SQL, Growth, PMF, Monetization, Python"
                  value={expertform.expertise}
                  onChange={(e) => handleInputChange("expertise",e.target.value)}
                />
              </div>
              <div className="w-full flex">
                <div>
            <label className="block text-sm font-medium mb-1">
              Upload Profile Picture
            </label>
            <input
              name="profile_picture"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileChange(e, "profile_picture")}
            />

            {/* {errors.profile_picture && <p className="text-xs text-red-600 mt-1">{errors.profile_picture}</p>} */}
          </div>
            <div className="">
            <label className="block text-sm font-medium mb-1">
              Resume upload
            </label>
            <input
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileChange(e, "resume")}
            />

            {/* {errors.resume && <p className="text-xs text-red-600 mt-1">{errors.resume}</p>} */}
          </div>
          </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={() => setStep(4)}>Next</Button>
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="space-y-3">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <DollarSign className="h-3.5 w-3.5" /> Pricing
            </h2>
            <p className="text-xs text-slate-500">
              Set your rates for each selected service. You can update these
              anytime.
            </p>
            <div className="space-y-2">
              {services.map((id) => {
                const def = SERVICES.find((s) => s.id === id);
                const value = pricing[id] || {
                  duration: def?.defaultDur || "30 min",
                  price: "",
                };
                return (
                  <div
                    key={id}
                    className="grid grid-cols-1 md:grid-cols-12 items-center gap-3 border rounded-xl p-3"
                  >
                    <div className="md:col-span-5">
                      <div className="text-sm font-medium">{def?.label}</div>
                      <div className="text-xs text-slate-500">{def?.hint}</div>
                    </div>
                    <div className="md:col-span-3">
                      <label className="text-[11px] text-slate-500">
                        Duration / Format
                      </label>
                      <Input
                        value={value.duration}
                     onChange={(e) => {
  setIntentPrice((p) => ({
    ...p,
    [id]: { ...value, duration: e.target.value },
  }));

  setExpertForm((prev) => ({
    ...prev,
    intent_price: {
      ...prev.intent_price,
      [id]: { ...value, duration: e.target.value },
    },
  }));
}}

                   />
                    </div>
                    <div className="md:col-span-4">
                      <label className="text-[11px] text-slate-500">
                        Price (₹ / $)
                      </label>
                      <Input
                        placeholder="e.g., ₹1500 or $25"
                        value={value.price}
                        onChange={(e) =>
                          setPricing((p) => ({
                            ...p,
                            [id]: { ...value, price: e.target.value },
                          }))
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </section>
        )}
      </Card>

     
    </div>
  );
};

export default ExpertOnboardingPreview;
