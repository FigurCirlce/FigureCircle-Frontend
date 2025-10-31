import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, User2, Briefcase, Check} from "lucide-react";
import axios from "axios";
import baseURL from "@/config/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// —— Simplified 3-step onboarding (Login → Profile & Expertise → Pricing)

interface FormData {
  fullName: string;
  email: string;
  password: string;
 
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

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
 
}

interface EducationItem {
  id: number;
  description: string;
  name: string;
  created_at: string;
  updated_at: string;
}



const DURATION_OPTIONS = [
  "15 min",
  "30 min",
  "45 min",
  "60 min",
]

const SERVICES = [
  { id: "skill-roadmap", label: "Skill Roadmap", defaultDur: "30–45 min", },
  { id: "career-support", label: "Career Clarity / Profile Review / Industry Insights", defaultDur: "20–30 min", },
]




function Stepper({ step }: { step: number }) {
  const items = ["Login", "Profile & Expertise", "Pricing"];
 
  return (
    <div className="flex items-center justify-between w-full max-w-md">
      {items.map((label, i) => {
        const active = step === i + 1
        const done = step > i + 1
        return (
          <div key={label} className="flex flex-col items-center w-24">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-semibold shadow ${done ? "bg-green-500" : active ? "bg-blue-600" : "bg-gray-300"}`}>
              {done ? <Check className="h-3.5 w-3.5"/> : i + 1}
            </div>
            <span className={`mt-1 text-[10px] ${active ? "text-blue-700" : "text-muted-foreground"}`}>{label}</span>
          </div>
        )
      })}
    </div>
  )
}

function Chip({ selected, onClick, children }: { selected?: boolean; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-2xl text-sm border transition shadow-sm hover:shadow ${selected ? "bg-blue-50 border-blue-400 text-blue-700" : "bg-white border-gray-300 text-gray-700"}`}
    >
      {children}
    </button>
  )
}

 

const ExpertOnboardingCompact=() =>{
  const [step, setStep] = useState(1);
   const [industry, setIndustry] = useState("")
 const [ExperienceArray, setExperienceArray] = useState<EducationItem[]>([]);
   const [IndustryArray, setIndustryArray] = useState<EducationItem[]>([]);
   const [educationArray, setEducationArray] = useState<EducationItem[]>([]);
  const [experience, setExperience] = useState("")
  const [degree, setDegree] = useState("")
  const [services, setServices] = useState<string[]>(["skill-roadmap"])
  const [pricing, setPricing] = useState<Record<string, { time: string; price: string }>>({ "skill-roadmap": { time: "30 min", price: "" } })
 const [formData, setFormData] = useState<FormData>({
      fullName: "",
      email: "",
      password: ""
    });
    //@ts-ignore
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
    // const [intentPrice, setIntentPrice] = useState<
    //     { intent: string; price: number }[]
    //   >([
    //     { intent: "", price: 0 }, // initial row
    //   ]);

      const navigate=useNavigate();
      //@ts-ignore
    const [errors, setErrors] = useState<FormErrors>({});

  function toggle(list: string[], value: string, setter: (v: string[]) => void) {
    setter(list.includes(value) ? list.filter((x) => x !== value) : [...list, value])
  }

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

  //  const token = localStorage.getItem("token");
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
        if (response.data.data_fill === true) {
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

    const handleSubmit = async (e: React.FormEvent) => {
          
          e.preventDefault();
          // await handleLogin();
          console.log("-------formdata------", formData);
      
          // const profileImageUrl = expertform.profile_picture
          //   ? await uploadToCloudinary(expertform.profile_picture)
          //   : null;
          // const resumeUrl = expertform.resume
          //   ? await uploadToCloudinary(expertform.resume)
          //   : null;

          const formattedIntentPrice = Object.entries(pricing).map(([intent, data]) => ({
  intent,
  price: parseFloat(data.price) || 0,
}));
      
          const newMentorData = {
            ...expertform,
            name: formData.fullName,
            email: formData.email,
            // profile_picture: profileImageUrl,
            // resume: resumeUrl,
            interested_field:"N/A",
            // phone:formData.phone,
          
        //     intent_price: expertform.intent_price.map(item => ({
        //   ...item,
        //   price: parseFloat(item.price.toFixed(2)), // ensures float
        // }))
        intent_price:formattedIntentPrice,
      
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


        const fetchEducationData = async () => {
            try {
              const response = await axios.get(`${baseURL}/api/education`);
              console.log("response-data--education", response.data.education);
              setEducationArray(response.data.education);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };

      useEffect(()=>{
        fetchIndustryData();
        fetchExperienceData();
        fetchEducationData();
      },[]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
   
    return newErrors;
  };

    const notifySuccess = () => toast.success("Registration successful!");
    const notifyError = (error: any) =>
      toast.error(`Registration failed: ${error}`);
     const next = () => setStep((s) => s + 1);

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

  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-3 p-3 bg-gradient-to-b from-white to-slate-50">
      <header className="pt-1 text-center">
        <h1 className="text-xl font-bold tracking-tight text-slate-800">Expert Onboarding</h1>
        <p className="text-xs text-slate-500">3 quick steps to join as an expert</p>
        <div className="mt-2">
          <Stepper step={step} />
        </div>
      </header>

      <Card className="w-full max-w-md p-4 rounded-2xl shadow-sm border border-slate-200 bg-white">
        {step === 1 && (
          <section className="space-y-3 text-center">
            <h2 className="text-sm font-semibold">Create Account</h2>
            <div className="space-y-3 max-w-xs mx-auto">
              <Input placeholder="Full Name"
               name="fullName"
                value={formData.fullName}
                onChange={handleChange} />
              <Input placeholder="Email" 
              name="email"
                value={formData.email}
                onChange={handleChange}/>
              <Input placeholder="Password" type="password"
            
                name="password"
                value={formData.password}
                onChange={handleChange} />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleRegister} className="mt-2">Next</Button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-4">
            <h2 className="text-sm font-semibold flex items-center gap-2"><User2 className="h-3.5 w-3.5"/> Profile & Expertise</h2>

            <div>
              <label className="text-[11px] font-medium text-slate-600 flex items-center gap-1"><Briefcase className="h-3 w-3"/> Industry</label>
              <Select onValueChange={(val)=>setIndustry(val)} value={industry}>
                <SelectTrigger className="mt-1 w-full text-sm">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent position="popper" className="z-[9999]">
                  {IndustryArray.map((item,index) => (
                    <SelectItem key={index} value={item.name}>{item.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-600">Years of Experience</label>
              <Select onValueChange={(val)=>setExperience(val)} value={experience}>
                <SelectTrigger className="mt-1 w-full text-sm">
                  <SelectValue placeholder="Select Experience" />
                </SelectTrigger>
                <SelectContent position="popper" className="z-[9999]">
                  {ExperienceArray.map((exp,index) => (
                    <SelectItem key={index} value={exp.name}>{exp.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-600">Highest Degree</label>
              <Select onValueChange={(val)=>setDegree(val)} value={degree}>
                <SelectTrigger className="mt-1 w-full text-sm">
                  <SelectValue placeholder="Select Degree" />
                </SelectTrigger>
                <SelectContent position="popper" className="z-[9999]">
                  {educationArray.map((deg,index) => (
                    <SelectItem key={index} value={deg.name}>{deg.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-600">Areas of Guidance</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {SERVICES.map((s) => (
                  <Chip key={s.id} selected={services.includes(s.id)} onClick={()=>toggle(services, s.id, setServices)}>{s.label}</Chip>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={()=>setStep(1)}>Back</Button>
              <Button onClick={()=>setStep(3)}>Next</Button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="space-y-3">
            <h2 className="text-sm font-semibold flex items-center gap-2"><DollarSign className="h-3.5 w-3.5"/> Pricing</h2>
            <p className="text-xs text-slate-500">Set your consultation rates (choose duration and price).</p>
            <div className="space-y-2">
              {services.map((id) => {
                const def = SERVICES.find((s) => s.id === id);
                const value = pricing[id] || {
                  duration: def?.defaultDur || "30 min",
                  price: "",}
                return (
                  <div key={id} className="flex flex-col border rounded-xl p-2">
                    <span className="text-sm font-medium mb-1">{def?.label}</span>
                    <div className="flex items-center gap-2">
                   <Select
  value={value.time}
  onValueChange={(selectedTime) =>
    setPricing((prev) => ({
      ...prev,
      [id]: { ...prev[id], time: selectedTime },
    }))
  }
>

                        <SelectTrigger className="w-24 text-sm">
                          <SelectValue placeholder="Duration" />
                        </SelectTrigger>
                        <SelectContent position="popper" className="z-[9999]" >
                          {DURATION_OPTIONS.map((opt)=>(
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {/* <Input className="w-28" placeholder="₹1500" value={value.price} 
                       onChange={(v)=>setPricing(p=>({ ...p, [id]: { ...value, time: value.time } }))}
                      /> */}
                      <Input
  className="w-28"
  placeholder="₹1500"
  value={value.price}
  onChange={(e) =>
    setPricing((prev) => ({
      ...prev,
      [id]: { ...prev[id], price: e.target.value },
    }))
  }
/>

                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={()=>setStep(2)}>Back</Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </section>
        )}
      </Card>

     
    </div>
  )
}


export default ExpertOnboardingCompact;