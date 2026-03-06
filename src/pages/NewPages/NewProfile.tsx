// // import { useState, useEffect, useMemo } from "react";
// // import axios from "axios";
// // import { motion } from "framer-motion";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";

// // import {
// //   Select,
// //   SelectContent,
// //   SelectGroup,
// //   SelectItem,
// //   SelectLabel,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import MentorProfileWidget from "@/pages/NewPages/NewMentorProfile";
// // // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// // import { User, Search, Bell, MessageCircle, Loader2 } from "lucide-react";
// // import baseURL from "@/config/config";
// // import {
// //   Save,
// //   X,
// //   Users,
// //   Sparkles,
// //   BookOpen,
// //   Award,
// //   Trophy,
// //   Wrench,
// //   MessageSquare,
// // } from "lucide-react";
// // import SearchableSelect from "@/components/NewPage/SearchableSelect";

// // interface EducationItem {
// //   id: number;
// //   description: string;
// //   name: string;
// //   created_at: string;
// //   updated_at: string;
// // }

// // // const ROLE_OPTIONS = [
// // //   "Software Engineer",
// // //   "Data Analyst",
// // //   "Data Scientist",
// // //   "Product Manager",
// // //   "Cloud / DevOps Engineer",
// // //   "Cybersecurity Analyst",
// // // ]

// // // const EDUCATION_OPTIONS = [
// // //   "High School Diploma",
// // //   "Bachelor's in Computer Science",
// // //   "Bachelor's in Business Administration",
// // //   "Master of Business Administration",
// // //   "Master's in Data Science",
// // //   "PhD in Computer Science",
// // // ]

// // // const RECO_LIB = {
// // //   "Software Engineer": {
// // //     courses: [
// // //       { title: "Full-Stack with React & Node", provider: "Meta" },
// // //       { title: "System Design Fundamentals", provider: "Educative" },
// // //       { title: "API Design & REST", provider: "Udemy" },
// // //       { title: "Clean Code", provider: "Robert C. Martin" },
// // //       { title: "Data Structures & Algorithms", provider: "Coursera" },
// // //     ],
// // //     certs: [
// // //       { title: "AWS Developer Associate", by: "Amazon" },
// // //       { title: "Azure Fundamentals (AZ-900)", by: "Microsoft" },
// // //       { title: "Google Associate Cloud Engineer", by: "Google" },
// // //       { title: "Oracle Java SE", by: "Oracle" },
// // //     ],
// // //     comps: [
// // //       { title: "LeetCode Weekly", host: "LeetCode" },
// // //       { title: "Facebook Hacker Cup", host: "Meta" },
// // //       { title: "Codeforces Rounds", host: "Codeforces" },
// // //       { title: "Google Code Jam (archived)", host: "Google" },
// // //     ],
// // //   },
// // //   "Data Analyst": {
// // //     courses: [
// // //       { title: "Google Data Analytics", provider: "Google" },
// // //       { title: "SQL for Analytics", provider: "Mode" },
// // //       { title: "Excel to MySQL", provider: "Duke" },
// // //       { title: "Data Visualization", provider: "Tableau" },
// // //     ],
// // //     certs: [
// // //       { title: "Tableau Desktop Specialist", by: "Tableau" },
// // //       { title: "Power BI Data Analyst", by: "Microsoft" },
// // //       { title: "Google Data Analytics Certificate", by: "Google" },
// // //       { title: "Looker Business Analyst", by: "Google" },
// // //     ],
// // //     comps: [
// // //       { title: "Kaggle Competitions", host: "Kaggle" },
// // //       { title: "TDI Milestone Challenges", host: "The Data Incubator" },
// // //       { title: "Makeover Monday", host: "Community" },
// // //       { title: "Analytics Vidhya Hackathons", host: "AV" },
// // //     ],
// // //   },
// // // }

// // // const START = {
// // //   name: "harsh bansal",
// // //   email: "harsh6@gmail.com",
// // //   education: "Master of Business Administration",
// // //   industry: "Medical and healthcare services",
// // //   experience: "3–5 years",
// // //   dreamRole: "Software Engineer",
// // //   intent: { clarity: true, roadmap: true },
// // // }

// // function IntentCard({ active, title, subtitle, icon: Icon, onClick }: any) {
// //   return (
// //     <motion.button
// //       whileHover={{ scale: 1.03 }}
// //       whileTap={{ scale: 0.98 }}
// //       type="button"
// //       onClick={onClick}
// //       className={`flex w-full items-start gap-3 rounded-2xl border p-4 shadow-sm transition ${active ? "border-black ring-1 ring-black bg-gray-50" : "border-gray-200 bg-white hover:bg-gray-50"
// //         }`}
// //     >
// //       <div
// //         className={`rounded-lg p-2 ${active ? "bg-gray-200 text-black" : "bg-gray-100 text-gray-500"
// //           }`}
// //       >
// //         <Icon className="size-5" />
// //       </div>
// //       <div className="text-left">
// //         <div className="font-medium leading-tight text-gray-900">{title}</div>
// //         <div className="text-xs text-gray-500 mt-0.5">{subtitle}</div>
// //       </div>
// //     </motion.button>
// //   );
// // }

// // const ProfileRecWidget = () => {
// //   // profile shape is flexible; we will map backend fields defensively
// //   const [profile, setProfile] = useState<any>([]);
// //   const [typedRoles, setTypedRoles] = useState<string[]>([]);

// //   //@ts-ignore
// //   const [loading, setLoading] = useState(false);
// //   // const [open, setOpen] = useState(false);
// //   const [saving, setSaving] = useState(false);
// //   const [reco, setReco] = useState<any | null>(null);
// //   const [role_options, setRole_Options] = useState<any>([]);
// //   const [combinedRoles, setCombinedRoles] = useState<string[]>([]);

// //   //@ts-ignore
// //   const [ExperienceArray, setExperienceArray] = useState<EducationItem[]>([]);
// //   const [IndustryArray, setIndustryArray] = useState<EducationItem[]>([]);
// //   const [educationArray, setEducationArray] = useState<EducationItem[]>([]);
// //   //@ts-ignore
// //   const [assignedMentors, setAssignedMentors] = useState<any[]>([]);
// //   // const [experience, setExperience] = useState("");
// //   //   const rec = useMemo(() => reco ?? RECO_LIB[profile.dreamRole] ?? RECO_LIB["Software Engineer"], [profile.dreamRole, reco])

// //   const token = localStorage.getItem("token");
// //   const userRaw =
// //     typeof window !== "undefined" ? localStorage.getItem("user") : null;
// //   const parsedUser = userRaw ? JSON.parse(userRaw) : null;

// //   // helper to map backend basic-info response to local profile shape
// //   const mapResponseToProfile = (resp: any) => {
// //     // resp might be either the whole object or nested
// //     const d = resp?.data ?? resp;

// //     let parsedIntent = d.intent;
// //     if (typeof parsedIntent === "string") {
// //       // normalize any string into an object
// //       parsedIntent = {
// //         roadmap: parsedIntent.includes("Roadmap"),
// //         clarity: parsedIntent.includes("Clarity"),
// //       };
// //     } else if (typeof parsedIntent !== "object" || parsedIntent === null) {
// //       // default fallback
// //       parsedIntent = { roadmap: false, clarity: false };
// //     }
// //     return {
// //       name: d.firstname
// //         ? `${d.firstname}${d.lastname ? " " + d.lastname : ""}`
// //         : d.name ?? profile.name,
// //       email: d.emailid ?? d.email ?? profile.email,
// //       education: d.high_education ?? d.education ?? profile.education,
// //       industry: d.industry ?? profile.industry,
// //       work_experience: d.work_experience ?? profile.work_experience,
// //       dreamRole: d.role_based ?? d.dreamRole ?? profile.dreamRole,
// //       intent: parsedIntent,
// //       // keep raw backend piece for saving if needed
// //       __raw: d,
// //     };
// //   };

// //   useEffect(() => {
// //     setCombinedRoles((prev) => {
// //       const merged = new Set([...prev, ...role_options]);
// //       return Array.from(merged);
// //     });
// //   }, [role_options]);


// //   useEffect(() => {
// //     if (profile.dreamRole) {
// //       setCombinedRoles((prev) => {
// //         if (prev.includes(profile.dreamRole)) return prev;
// //         return [profile.dreamRole, ...prev];
// //       });
// //     }
// //   }, [profile.dreamRole]);

// //   const allRoles = useMemo(() => combinedRoles, [combinedRoles]);

// //   // fetch basic info (same as InfoCard)
// //   const fetchBasicInfo = async () => {
// //     setLoading(true);
// //     try {
// //       const endpoint = parsedUser?.is_mentor
// //         ? `${baseURL}/api/mentor/details?user_id=${parsedUser.user_id}`
// //         : `${baseURL}/api/basic-info`;

// //       const response = await axios.get(endpoint, {
// //         headers: token ? { Authorization: `Bearer ${token}` } : undefined,
// //       });

// //       // map to our UI model
// //       const mapped = mapResponseToProfile(response.data);
// //       console.log("mapped----response", mapped.work_experience);
// //       console.log("mapped-------", mapped);
// //       setProfile((prev: any) => ({ ...prev, ...mapped }));
// //       localStorage.setItem("degree", JSON.stringify(response.data));
// //     } catch (error) {
// //       console.error("Error fetching profile:", error);
// //       // keep default START profile silently
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchAssignedMentors = async () => {
// //     try {
// //       const response = await axios.get(`${baseURL}/get_assigned_mentors`, {
// //         headers: token ? { Authorization: `Bearer ${token}` } : undefined,
// //       });
// //       if (response.data?.mentors) {
// //         setAssignedMentors(response.data.mentors);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching assigned mentors:", error);
// //     }
// //   };

// //   // const handleUnassignMentor = async (mentorId: number) => {
// //   //   if (!window.confirm("Are you sure you want to unassign this expert?")) return;
// //   //   try {
// //   //     await axios.delete(`${baseURL}/unassign_mentor`, {
// //   //       headers: {
// //   //         Authorization: `Bearer ${token}`,
// //   //       },
// //   //       data: { mentor_id: mentorId }
// //   //     });
// //   //     fetchAssignedMentors();
// //   //   } catch (error) {
// //   //     console.error("Error unassigning mentor:", error);
// //   //   }
// //   // };

// //   // fetch recommendations from backend (search-degree). We'll use dreamRole as degree param;
// //   // backend earlier used /search-degree?degree=...
// //   const fetchRecommendations = async (degreeParam: string) => {
// //     if (!degreeParam || degreeParam.trim() === "") return;
// //     try {
// //       const resp = await axios.get(`${baseURL}/search-degree`, {
// //         params: { degree: degreeParam },
// //         headers: token ? { Authorization: `Bearer ${token}` } : undefined,
// //       });
// //       // backend probably returns { degree, matched_role, courses:[], certifications:[], competitions:[] }
// //       const data = resp.data;
// //       if (data) {
// //         setReco({
// //           courses: Array.isArray(data.courses)
// //             ? data.courses.map((c: any) => ({
// //               title: c.title || c,
// //               provider: c.provider || c.source || "",
// //             }))
// //             : [],
// //           certs: Array.isArray(data.certifications)
// //             ? data.certifications.map((c: any) => ({
// //               title: c.title || c,
// //               by: c.by || "",
// //             }))
// //             : [],
// //           comps: Array.isArray(data.competitions)
// //             ? data.competitions.map((c: any) => ({
// //               title: c.title || c,
// //               host: c.host || "",
// //             }))
// //             : [],
// //         });
// //       }
// //     } catch (error) {
// //       console.warn(
// //         "Could not fetch backend recommendations, falling back to local RECO_LIB.",
// //         error
// //       );
// //       // leave reco null -> use RECO_LIB
// //     }
// //   };

// //   // update basic info (PUT)
// //   const updateBasicInfo = async () => {
// //     setSaving(true);
// //     try {
// //       // If backend returns __raw (original fields) keep IDs
// //       const payload = {
// //         // map our UI profile back to expected backend keys conservatively:
// //         firstname: profile.name?.split(" ")[0] ?? undefined,
// //         lastname: profile.name?.split(" ").slice(1).join(" ") ?? undefined,
// //         emailid: profile.email,
// //         high_education: profile.education,
// //         industry: profile.industry,
// //         work_experience: profile.work_experience,
// //         role_based: profile.dreamRole,
// //         intent: profile.intent,
// //         // if backend gave mentor-specific data (we preserved in __raw), include ids
// //         ...(profile.__raw?.id ? { id: profile.__raw.id } : {}),
// //         ...(profile.__raw?.user_id ? { user_id: profile.__raw.user_id } : {}),
// //       };

// //       const url = parsedUser?.is_mentor
// //         ? // mentor update route from InfoCard: /update_mentor/{mentor_id}
// //         `${baseURL}/update_mentor/${profile.__raw?.mentor_id ?? profile.__raw?.mentorId ?? ""
// //         }`
// //         : // user basic info update:
// //         `${baseURL}/api/basic-info`;

// //       // choose HTTP method: InfoCard used PUT for both. Use PUT.
// //       await axios.put(url, payload, {
// //         headers: {
// //           ...(token ? { Authorization: `Bearer ${token}` } : {}),
// //           "Content-Type": "application/json",
// //         },
// //       });
// //       const degreeFetch = localStorage.getItem("degree");

// //       if (degreeFetch) {
// //         localStorage.removeItem("degree");
// //         await fetchBasicInfo();
// //       }
// //       // refetch to get canonical representation
// //       // await fetchBasicInfo()
// //       // Optionally show a toast in your app
// //     } catch (error) {
// //       console.error("Error saving profile:", error);
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchBasicInfo();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   // Whenever dreamRole changes we attempt to fetch backend recommendations
// //   useEffect(() => {
// //     fetchRecommendations(profile.dreamRole);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [profile.dreamRole]);

// //   const fetchIndustryData = async () => {
// //     try {
// //       const response = await axios.get(`${baseURL}/api/industry`);
// //       console.log("response-data--industry", response.data.industry);
// //       // Remove duplicates based on description
// //       const uniqueIndustries = Array.from(
// //         new Map(response.data.industry.map((item: EducationItem) => [item.description, item])).values()
// //       ) as EducationItem[];
// //       setIndustryArray(uniqueIndustries);
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //     }
// //   };

// //   const fetchExperienceData = async () => {
// //     try {
// //       const response = await axios.get(`${baseURL}/api/experience-level`);
// //       console.log(
// //         "response-data--api/experience-level",
// //         response.data.experience_level
// //       );
// //       setExperienceArray(response.data.experience_level);
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //     }
// //   };

// //   const fetchEducationData = async () => {
// //     try {
// //       const response = await axios.get(`${baseURL}/api/education`);
// //       console.log("response-data--education", response.data.education);
// //       // Remove duplicates based on description
// //       const uniqueEducation = Array.from(
// //         new Map(response.data.education.map((item: EducationItem) => [item.description, item])).values()
// //       ) as EducationItem[];
// //       setEducationArray(uniqueEducation);
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //     }
// //   };

// //   const fetchDreamProfiles = async () => {
// //     const degreeData = localStorage.getItem("degree");
// //     const degree = degreeData ? JSON.parse(degreeData) : null;
// //     try {
// //       const res = await axios.get(`${baseURL}/dream-list`, {
// //         params: {
// //           degree: degree?.high_education,
// //           industry: degree?.industry,
// //           experience: degree?.work_experience,
// //         },

// //         headers: { Authorization: `Bearer ${token}` },
// //       }
// //       );

// //       console.log("dream Profiles", res.data);
// //       const roles = res.data.matched_roles.map((r: any) => r.matched_role);
// //       console.log("roles----", roles);

// //       setRole_Options(roles);
// //     } catch (error) {
// //       console.error("Error fetching dream profiles", error);
// //     }
// //   };

// //   const handleDreamRoleChange = (v: string) => {
// //     // store typed/custom roles
// //     if (
// //       v &&
// //       !role_options.includes(v) &&
// //       !typedRoles.includes(v)
// //     ) {
// //       setTypedRoles(prev => [...prev, v]);
// //     }

// //     setProfile({ ...profile, dreamRole: v });
// //   };

// //   // const allRoles = useMemo(() => {
// //   //   if (
// //   //     profile.dreamRole &&
// //   //     !role_options.includes(profile.dreamRole)
// //   //   ) {
// //   //     return [profile.dreamRole, ...role_options];
// //   //   }
// //   //   return role_options;
// //   // }, [profile.dreamRole, role_options]);

// //   // const allRoles = useMemo(() => {
// //   //   return Array.from(
// //   //     new Set([
// //   //       ...typedRoles,       
// //   //       ...role_options,      
// //   //       profile.dreamRole,    
// //   //     ])
// //   //   ).filter(Boolean);
// //   // }, [typedRoles, role_options, profile.dreamRole]);



// //   useEffect(() => {
// //     fetchIndustryData();
// //     fetchExperienceData();
// //     fetchEducationData();
// //     fetchDreamProfiles();
// //     if (parsedUser && !parsedUser.is_mentor) {
// //       fetchAssignedMentors();
// //     }
// //   }, []);

// //   return (
// //     <div className="w-full">
// //       {loading ? (
// //         <div className="fixed inset-0 bg-white/70 flex justify-center items-center z-50">
// //           <Loader2 className="h-10 w-10 animate-spin text-black" />
// //         </div>
// //       ) : !parsedUser?.is_mentor ? (
// //         <div className="px-[4%] w-full p-6 space-y-6">
// //           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
// //             {/* Profile Section */}
// //             <Card className="border-0 shadow-md backdrop-blur-md">
// //               <CardHeader className="border-b bg-gray-50 rounded-t-2xl">
// //                 <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
// //                   <Users className="size-5 text-black" /> Your Profile
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-4 pt-4">
// //                 <div className="flex items-center gap-3">
// //                   <User className="size-12 border-2 border-gray-200 text-gray-700 bg-white rounded-md p-1">
// //                     <Search />
// //                     <MessageCircle />
// //                     HB
// //                     <Bell />
// //                   </User>
// //                   <span className="text-xs text-muted-foreground">
// //                     Edit details to personalize recommendations
// //                   </span>
// //                 </div>

// //                 {/* Editable Fields */}
// //                 <div className="space-y-6">
// //                   <div className="grid grid-cols-[120px_1fr] md:grid-cols-[140px_1fr] items-center gap-4">
// //                     <Label className="text-sm font-medium text-slate-700">
// //                       Name
// //                     </Label>
// //                     <Input
// //                       className="w-full bg-white transition-all shadow-sm focus-visible:ring-1"
// //                       value={profile.name}
// //                       onChange={(e) =>
// //                         setProfile({ ...profile, name: e.target.value })
// //                       }
// //                     />
// //                   </div>

// //                   <div className="grid grid-cols-[120px_1fr] md:grid-cols-[140px_1fr] items-center gap-4">
// //                     <Label className="text-sm font-medium text-slate-700">
// //                       Email
// //                     </Label>
// //                     <Input
// //                       className="w-full bg-white transition-all shadow-sm focus-visible:ring-1"
// //                       value={profile.email}
// //                       onChange={(e) =>
// //                         setProfile({ ...profile, email: e.target.value })
// //                       }
// //                     />
// //                   </div>

// //                   <div className="grid grid-cols-[120px_1fr] md:grid-cols-[140px_1fr] items-center gap-4">
// //                     <Label className="text-sm font-medium text-slate-700">
// //                       Education
// //                     </Label>
// //                     <div className="w-full">
// //                       {/* <Select value={profile.education} onValueChange={(v) => setProfile({ ...profile, education: v })}>
// //                     <SelectTrigger>
// //                       <SelectValue placeholder="Select Education" />
// //                     </SelectTrigger>
// //                     <SelectContent>
// //                       {educationArray.map((e) => (
// //                         <SelectItem key={e.id} value={e.name}>
// //                           {e.name}
// //                         </SelectItem>
// //                       ))}
// //                     </SelectContent>
// //                   </Select> */}
// //                       <SearchableSelect
// //                         value={profile.education}
// //                         onChange={(v) =>
// //                           setProfile({ ...profile, education: v })
// //                         }
// //                         options={educationArray.map((item) => ({
// //                           label: item.description,
// //                           value: item.description,
// //                         }))}
// //                         placeholder="Select Education"
// //                       />
// //                     </div>
// //                   </div>
// //                   <div className="grid grid-cols-[120px_1fr] md:grid-cols-[140px_1fr] items-center gap-4">
// //                     <Label className="text-sm font-medium text-slate-700">
// //                       Industry
// //                     </Label>
// //                     <div className="w-full">
// //                       {/* <Select value={profile.industry} onValueChange={(v) => setProfile({ ...profile, industry: v })}>
// //                     <SelectTrigger>
// //                       <SelectValue placeholder="Select Education" />
// //                     </SelectTrigger>
// //                     <SelectContent>
// //                       {IndustryArray.map((e) => (
// //                         <SelectItem key={e.id} value={e.name}>
// //                           {e.name}
// //                         </SelectItem>
// //                       ))}
// //                     </SelectContent>
// //                   </Select> */}
// //                       <SearchableSelect
// //                         value={profile.industry}
// //                         onChange={(v) =>
// //                           setProfile({ ...profile, industry: v })
// //                         }
// //                         options={IndustryArray.map((item) => ({
// //                           label: item.description,
// //                           value: item.description,
// //                         }))}
// //                         placeholder="Select Industry"
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="grid grid-cols-[120px_1fr] md:grid-cols-[140px_1fr] items-center gap-4">
// //                     <Label className="text-sm font-medium text-slate-700">
// //                       Experience
// //                     </Label>
// //                     <div className="w-full">
// //                       {/* <Select value={profile.work_experience} onValueChange={(v) => setProfile({ ...profile, work_experience: v })}>
// //                     <SelectTrigger>
// //                       <SelectValue placeholder="Select Experience" />
// //                     </SelectTrigger>
// //                     <SelectContent>
// //                       {EXPERIENCE_OPTIONS.map((e) => (
// //                         <SelectItem key={e} value={e}>
// //                           {e}
// //                         </SelectItem>
// //                       ))}
// //                     </SelectContent>
// //                   </Select> */}
// //                       <SearchableSelect
// //                         value={profile.work_experience}
// //                         onChange={(v) =>
// //                           setProfile({ ...profile, work_experience: v })
// //                         }
// //                         options={ExperienceArray.map((item) => ({
// //                           label: item.description,
// //                           value: item.description,
// //                         }))}
// //                         placeholder="Select Work Experience"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Intent Cards */}
// //                 {/* <div className=" grid grid-cols-1 sm:grid sm:grid-cols-2 gap-3 pt-2">
// //                   <IntentCard
// //                     active={!!profile.intent?.roadmap}
// //                     title="Skill Roadmapping"
// //                     subtitle="Learn skills for your role."
// //                     icon={Wrench}
// //                     onClick={() =>
// //                       setProfile({
// //                         ...profile,
// //                         intent: {
// //                           ...profile.intent,
// //                           roadmap: !profile.intent?.roadmap,
// //                         },
// //                       })
// //                     }
// //                   />
// //                   <IntentCard
// //                     active={!!profile.intent?.clarity}
// //                     title="Career Clarity & Connections"
// //                     subtitle="Get insights and networking."
// //                     icon={MessageSquare}
// //                     onClick={() =>
// //                       setProfile({
// //                         ...profile,
// //                         intent: {
// //                           ...profile.intent,
// //                           clarity: !profile.intent?.clarity,
// //                         },
// //                       })
// //                     }
// //                   />
// //                 </div> */}

// //                 {/* Dream Role */}
// //                 {/* <div className="flex items-center gap-3">
// //                   <div className="flex-1">
// //                     <Label className="text-sm text-muted-foreground mb-1 block">
// //                       Dream Role
// //                     </Label>
// //                     <Select
// //                       value={profile.dreamRole}
// //                       onValueChange={(v) =>
// //                         setProfile({ ...profile, dreamRole: v })
// //                       }
// //                     >
// //                       <SelectTrigger className="h-9 w-[150px] sm:w-full border-primary/20">
// //                         <SelectValue placeholder="Select dream role" />
// //                       </SelectTrigger>
// //                       <SelectContent>
// //                         <SelectGroup>
// //                           <SelectLabel>Popular Roles</SelectLabel>
// //                           {allRoles.map((r: string) => (
// //                             <SelectItem key={r} value={r }>
// //                               {r}
// //                             </SelectItem>
// //                           ))}
// //                         </SelectGroup>
// //                       </SelectContent>
          


// //                     </Select>
// //                   </div>

// //                   <div className="flex items-end mt-5 gap-2">
// //                     <Button
// //                       onClick={updateBasicInfo}
// //                       disabled={saving}
// //                       className="bg-green-500"
// //                     >
// //                       <Save className="mr-2" />{" "}
// //                       <span className="hidden sm:inline">
// //                         {saving ? "Saving..." : "Save"}
// //                       </span>
// //                     </Button>
// //                     <Button
// //                       variant="ghost"
// //                       onClick={() => {
// //                         fetchBasicInfo();
// //                       }}
// //                     >
// //                       <X className="text-red-600 font-bold" />
// //                       <span className="hidden sm:inline">Reset</span>
// //                     </Button>
// //                   </div>
// //                 </div> */}
              

// //               </CardContent>
// //             </Card>

// //             {/* Recommendations Section */}
// //             <Card className="border-0 shadow-md backdrop-blur-md">
// //               <CardHeader className="border-b bg-gray-50 rounded-t-2xl">
// //                 <CardTitle className="flex items-center gap-2 text-xl font-bold text-black">
// //                   <Sparkles className="size-5 text-black" /> Personalized
// //                   Recommendations —{" "}
// //                   <span className="text-gray-600">
// //                     {profile.dreamRole}
// //                   </span>
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="grid gap-4 pt-4">
// //                   <div className="flex items-end gap-3">
// //                   <div className="w-64">
// //                     <Label className="text-sm text-muted-foreground mb-1 block">
// //                       Dream Role
// //                     </Label>
// //                     <Select
// //                       value={profile.dreamRole}
// //                       // onValueChange={(v) =>
// //                       //   setProfile({ ...profile, dreamRole: v })
// //                       // }
// //                       onValueChange={handleDreamRoleChange}

// //                     >
// //                       <SelectTrigger className="h-9 w-[90%] border-gray-200">
// //                         <SelectValue placeholder="Select dream role" />
// //                       </SelectTrigger>
// //                       <SelectContent
// //                         position="popper"
// //                         sideOffset={4}
// //                         className="max-h-[300px] w-50 z-50"
// //                       >
// //                         <div className="max-h-[280px] overflow-y-auto">
// //                           <SelectGroup>
// //                             <SelectLabel>Popular Roles</SelectLabel>
// //                             {allRoles.map((r: string) => (
// //                               <SelectItem key={r} value={r}>
// //                                 {r}
// //                               </SelectItem>
// //                             ))}
// //                           </SelectGroup>
// //                         </div>
// //                       </SelectContent>
// //                     </Select>
// //                   </div>

// //                   <div className="flex gap-2">
// //                     <Button
// //                       onClick={updateBasicInfo}
// //                       disabled={saving}
// //                       className="bg-black text-white hover:bg-gray-800 transition-colors h-9"
// //                     >
// //                       <Save className="w-4 h-4 sm:mr-2" />
// //                       <span className="hidden sm:inline">
// //                         {saving ? "Saving..." : "Save"}
// //                       </span>
// //                     </Button>
// //                     <Button
// //                       variant="outline"
// //                       onClick={() => {
// //                         fetchBasicInfo();
// //                       }}
// //                       className="h-9 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
// //                     >
// //                       <X className="w-4 h-4 text-gray-500 font-bold sm:mr-2 " />
// //                       <span className="hidden sm:inline">Reset</span>
// //                     </Button>
// //                   </div>
// //                 </div>
// //                 {[
// //                   { title: "Courses", icon: BookOpen, list: reco?.courses },
// //                   { title: "Certifications", icon: Award, list: reco?.certs },
// //                   { title: "Competitions", icon: Trophy, list: reco?.comps },
// //                 ].map((block, idx) => {
// //                   const Icon = block.icon as any;
// //                   const full = block.list?.length ?? 0;
// //                   const visible = full >= 4 ? 4 : Math.min(3, full);
// //                   return (
// //                     <motion.div
// //                       key={idx}
// //                       whileHover={{ scale: 1.02 }}
// //                       transition={{ duration: 0.2 }}
// //                       className="rounded-2xl border bg-muted/30 p-4 shadow-sm hover:shadow-md"
// //                     >
// //                       <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
// //                         <Icon className="size-4" /> {block.title}
// //                       </h4>
// //                       <div className="grid gap-3 sm:grid-cols-2">
// //                         {Array.isArray(block.list) &&
// //                           block.list
// //                             .slice(0, visible)
// //                             .map((item: any, i: number) => (
// //                               <motion.div
// //                                 key={i}
// //                                 whileHover={{ scale: 1.02 }}
// //                                 className="rounded-xl bg-background p-3 shadow-sm hover:bg-gray-50 border border-transparent hover:border-gray-300 transition"
// //                               >
// //                                 <div className="font-medium text-sm leading-tight">
// //                                   {item.title}
// //                                 </div>
// //                                 <div className="text-xs text-muted-foreground">
// //                                   {item.provider || item.by || item.host}
// //                                 </div>
// //                               </motion.div>
// //                             ))}
// //                         {(!Array.isArray(block.list) ||
// //                           block.list.length === 0) && (
// //                             <div className="text-xs text-muted-foreground">
// //                               No recommendations found for this category.
// //                             </div>
// //                           )}
// //                       </div>
// //                       {full > 4 && (
// //                         <div className="pt-1 text-right text-xs text-muted-foreground">
// //                           +{full - 4} more matched
// //                         </div>
// //                       )}
// //                     </motion.div>
// //                   );
// //                 })}
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {/* {!parsedUser?.is_mentor && assignedMentors.length > 0 && (
// //             <Card className="border-0 shadow-md backdrop-blur-md">
// //               <CardHeader className="border-b bg-gray-50 rounded-t-2xl">
// //                 <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
// //                   <Users className="size-5 text-black" /> Your Assigned Experts
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="pt-4">
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //                   {assignedMentors.map((mentor) => (
// //                     <div key={mentor.mentor_id} className="flex items-center justify-between p-4 rounded-2xl border bg-muted/30 shadow-sm hover:shadow-md transition group">
// //                       <div className="flex items-center gap-3">
// //                         <img
// //                           src={mentor.profile_picture || "https://via.placeholder.com/40"}
// //                           alt={mentor.name}
// //                           className="w-10 h-10 rounded-full object-cover border border-gray-200"
// //                         />
// //                         <div>
// //                           <div className="font-medium text-sm leading-tight">{mentor.name}</div>
// //                           <div className="text-xs text-muted-foreground">{mentor.expertise}</div>
// //                         </div>
// //                       </div>
// //                       <Button
// //                         variant="ghost"
// //                         size="sm"
// //                         className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-opacity"
// //                         onClick={() => handleUnassignMentor(mentor.mentor_id)}
// //                       >
// //                         Unassign
// //                       </Button>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           )} */}
// //         </div>
// //       ) : (
// //         <div className="flex justify-center w-full">
// //           <MentorProfileWidget />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ProfileRecWidget;
// import { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import MentorProfileWidget from "@/pages/NewPages/NewMentorProfile";
// import { Loader2 } from "lucide-react";
// import baseURL from "@/config/config";
// import {
//   Save,
//   X,
//   Users,
//   Sparkles,
//   BookOpen,
//   Award,
//   Trophy,
// } from "lucide-react";
// import SearchableSelect from "@/components/NewPage/SearchableSelect";

// /* ─── Design tokens ──────────────────────────────────────────────────────── */
// const C = {
//   blue:        "#3b6ef5",
//   blueBg:      "#eef2ff",
//   blueBorder:  "#d4dcfb",
//   blueHover:   "#dce4fd",
//   blueDeep:    "#2c5ee0",
//   pageBg:      "#f8f9fc",
//   cardBorder:  "#e8ecf4",
//   divider:     "#f0f3fa",
//   rowHover:    "#fafbff",
//   label:       "#9fa8c0",
//   text:        "#1a1e2e",
//   red:         "#c0305a",
//   shadow:      "0 2px 12px rgba(59,110,245,0.07)",
// };

// /* ─── Types ──────────────────────────────────────────────────────────────── */
// interface EducationItem {
//   id: number;
//   description: string;
//   name: string;
//   created_at: string;
//   updated_at: string;
// }

// /* ─── Component ──────────────────────────────────────────────────────────── */
// const ProfileRecWidget = () => {
//   const [profile, setProfile]         = useState<any>({});
//   const [typedRoles, setTypedRoles]   = useState<string[]>([]);
//   const [loading, setLoading]         = useState(false);
//   const [saving, setSaving]           = useState(false);
//   const [reco, setReco]               = useState<any | null>(null);
//   const [roleOptions, setRoleOptions] = useState<string[]>([]);
//   const [combinedRoles, setCombinedRoles] = useState<string[]>([]);
//   const [ExperienceArray, setExperienceArray] = useState<EducationItem[]>([]);
//   const [IndustryArray, setIndustryArray]     = useState<EducationItem[]>([]);
//   const [educationArray, setEducationArray]   = useState<EducationItem[]>([]);
//   const [assignedMentors, setAssignedMentors] = useState<any[]>([]);

//   const token      = localStorage.getItem("token");
//   const userRaw    = typeof window !== "undefined" ? localStorage.getItem("user") : null;
//   const parsedUser = userRaw ? JSON.parse(userRaw) : null;

//   /* helpers */
//   const mapResponseToProfile = (resp: any) => {
//     const d = resp?.data ?? resp;
//     let parsedIntent = d.intent;
//     if (typeof parsedIntent === "string") {
//       parsedIntent = { roadmap: parsedIntent.includes("Roadmap"), clarity: parsedIntent.includes("Clarity") };
//     } else if (typeof parsedIntent !== "object" || parsedIntent === null) {
//       parsedIntent = { roadmap: false, clarity: false };
//     }
//     return {
//       name:           d.firstname ? `${d.firstname}${d.lastname ? " " + d.lastname : ""}` : d.name ?? profile.name,
//       email:          d.emailid ?? d.email ?? profile.email,
//       education:      d.high_education ?? d.education ?? profile.education,
//       industry:       d.industry ?? profile.industry,
//       work_experience:d.work_experience ?? profile.work_experience,
//       dreamRole:      d.role_based ?? d.dreamRole ?? profile.dreamRole,
//       intent:         parsedIntent,
//       __raw:          d,
//     };
//   };

//   /* sync combined roles */
//   useEffect(() => {
//     setCombinedRoles(prev => Array.from(new Set([...prev, ...roleOptions])));
//   }, [roleOptions]);

//   useEffect(() => {
//     if (profile.dreamRole) {
//       setCombinedRoles(prev => prev.includes(profile.dreamRole) ? prev : [profile.dreamRole, ...prev]);
//     }
//   }, [profile.dreamRole]);

//   const allRoles = useMemo(() => combinedRoles, [combinedRoles]);

//   /* API calls */
//   const fetchBasicInfo = async () => {
//     setLoading(true);
//     try {
//       const endpoint = parsedUser?.is_mentor
//         ? `${baseURL}/api/mentor/details?user_id=${parsedUser.user_id}`
//         : `${baseURL}/api/basic-info`;
//       const res = await axios.get(endpoint, { headers: token ? { Authorization: `Bearer ${token}` } : undefined });
//       setProfile((prev: any) => ({ ...prev, ...mapResponseToProfile(res.data) }));
//       localStorage.setItem("degree", JSON.stringify(res.data));
//     } catch (e) { console.error(e); } finally { setLoading(false); }
//   };

//   const fetchAssignedMentors = async () => {
//     try {
//       const res = await axios.get(`${baseURL}/get_assigned_mentors`, { headers: token ? { Authorization: `Bearer ${token}` } : undefined });
//       if (res.data?.mentors) setAssignedMentors(res.data.mentors);
//     } catch (e) { console.error(e); }
//   };

//   const fetchRecommendations = async (degreeParam: string) => {
//     if (!degreeParam?.trim()) return;
//     try {
//       const res = await axios.get(`${baseURL}/search-degree`, { params: { degree: degreeParam }, headers: token ? { Authorization: `Bearer ${token}` } : undefined });
//       const d = res.data;
//       if (d) setReco({
//         courses: Array.isArray(d.courses)        ? d.courses.map((c:any)=>({ title:c.title||c, provider:c.provider||c.source||"" })) : [],
//         certs:   Array.isArray(d.certifications)  ? d.certifications.map((c:any)=>({ title:c.title||c, by:c.by||"" })) : [],
//         comps:   Array.isArray(d.competitions)    ? d.competitions.map((c:any)=>({ title:c.title||c, host:c.host||"" })) : [],
//       });
//     } catch (e) { console.warn(e); }
//   };

//   const updateBasicInfo = async () => {
//     setSaving(true);
//     try {
//       const payload = {
//         firstname:       profile.name?.split(" ")[0],
//         lastname:        profile.name?.split(" ").slice(1).join(" "),
//         emailid:         profile.email,
//         high_education:  profile.education,
//         industry:        profile.industry,
//         work_experience: profile.work_experience,
//         role_based:      profile.dreamRole,
//         intent:          profile.intent,
//         ...(profile.__raw?.id      ? { id:      profile.__raw.id }      : {}),
//         ...(profile.__raw?.user_id ? { user_id: profile.__raw.user_id } : {}),
//       };
//       const url = parsedUser?.is_mentor
//         ? `${baseURL}/update_mentor/${profile.__raw?.mentor_id ?? ""}`
//         : `${baseURL}/api/basic-info`;
//       await axios.put(url, payload, { headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), "Content-Type": "application/json" } });
//       if (localStorage.getItem("degree")) { localStorage.removeItem("degree"); await fetchBasicInfo(); }
//     } catch (e) { console.error(e); } finally { setSaving(false); }
//   };

//   const fetchIndustryData = async () => {
//     try {
//       const res = await axios.get(`${baseURL}/api/industry`);
//       setIndustryArray(Array.from(new Map(res.data.industry.map((i:EducationItem)=>[i.description,i])).values()) as EducationItem[]);
//     } catch (e) { console.error(e); }
//   };
//   const fetchExperienceData = async () => {
//     try {
//       const res = await axios.get(`${baseURL}/api/experience-level`);
//       setExperienceArray(res.data.experience_level);
//     } catch (e) { console.error(e); }
//   };
//   const fetchEducationData = async () => {
//     try {
//       const res = await axios.get(`${baseURL}/api/education`);
//       setEducationArray(Array.from(new Map(res.data.education.map((i:EducationItem)=>[i.description,i])).values()) as EducationItem[]);
//     } catch (e) { console.error(e); }
//   };
//   const fetchDreamProfiles = async () => {
//     const deg = localStorage.getItem("degree");
//     const d   = deg ? JSON.parse(deg) : null;
//     try {
//       const res = await axios.get(`${baseURL}/dream-list`, {
//         params:  { degree:d?.high_education, industry:d?.industry, experience:d?.work_experience },
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setRoleOptions(res.data.matched_roles.map((r:any)=>r.matched_role));
//     } catch (e) { console.error(e); }
//   };

//   const handleDreamRoleChange = (v: string) => {
//     if (v && !roleOptions.includes(v) && !typedRoles.includes(v)) setTypedRoles(p=>[...p,v]);
//     setProfile({ ...profile, dreamRole: v });
//   };

//   useEffect(() => { fetchBasicInfo(); }, []);
//   useEffect(() => { fetchRecommendations(profile.dreamRole); }, [profile.dreamRole]);
//   useEffect(() => {
//     fetchIndustryData(); fetchExperienceData(); fetchEducationData(); fetchDreamProfiles();
//     if (parsedUser && !parsedUser.is_mentor) fetchAssignedMentors();
//   }, []);

//   /* ─── Styles (same visual layout as existing page, blue theme) ─────────── */
//   const s = {
//     page:       { width:"100%", minHeight:"100vh", background:C.pageBg, fontFamily:"'Inter',-apple-system,sans-serif", padding:"28px 4% 40px" } as React.CSSProperties,
//     twoCol:     { display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, alignItems:"start" } as React.CSSProperties,
//     card:       { background:"#fff", border:`1px solid ${C.cardBorder}`, borderRadius:16, overflow:"hidden", boxShadow:C.shadow } as React.CSSProperties,
//     cardHead:   { padding:"18px 24px 16px", borderBottom:`1px solid ${C.divider}`, display:"flex", alignItems:"center", gap:10 } as React.CSSProperties,
//     cardTitle:  { fontSize:16, fontWeight:700, color:C.text, display:"flex", alignItems:"center", gap:8, margin:0 } as React.CSSProperties,
//     cardSub:    { fontSize:12, color:C.label, marginTop:2 } as React.CSSProperties,
//     row:        { display:"flex", alignItems:"center", padding:"14px 24px", borderBottom:`1px solid #f4f6fb`, gap:16 } as React.CSSProperties,
//     lbl:        { width:90, fontSize:12, fontWeight:600, color:C.label, textTransform:"uppercase" as const, letterSpacing:"0.05em", flexShrink:0 },
//     inp:        { flex:1, border:"none", background:"transparent", fontSize:14, color:C.text, fontFamily:"inherit", fontWeight:500, outline:"none" } as React.CSSProperties,
//     footer:     { padding:"14px 24px", borderTop:`1px solid ${C.divider}`, display:"flex", gap:10 } as React.CSSProperties,
//     btnBlue:    { display:"inline-flex", alignItems:"center", gap:6, padding:"8px 20px", background:C.blue, color:"#fff", border:"none", borderRadius:22, fontSize:13.5, fontWeight:600, cursor:"pointer", fontFamily:"inherit" } as React.CSSProperties,
//     btnGhost:   { display:"inline-flex", alignItems:"center", gap:6, padding:"8px 16px", background:"transparent", color:"#888", border:`1.5px solid #dde2ef`, borderRadius:22, fontSize:13.5, fontWeight:500, cursor:"pointer", fontFamily:"inherit" } as React.CSSProperties,
//     recSec:     { background:C.pageBg, border:`1px solid #edf0f9`, borderRadius:12, padding:"16px 18px", marginBottom:12 } as React.CSSProperties,
//     recLbl:     { display:"flex", alignItems:"center", gap:7, fontSize:11.5, fontWeight:700, color:C.label, textTransform:"uppercase" as const, letterSpacing:"0.06em", marginBottom:10 } as React.CSSProperties,
//     recGrid:    { display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 } as React.CSSProperties,
//     recItem:    { background:"#fff", border:`1px solid ${C.cardBorder}`, borderRadius:10, padding:"10px 13px", cursor:"default" } as React.CSSProperties,
//     recItemTxt: { fontSize:13.5, fontWeight:600, color:C.text, lineHeight:1.35 } as React.CSSProperties,
//     recItemSub: { fontSize:12, color:C.label, marginTop:2 } as React.CSSProperties,
//     badge:      { display:"inline-block", padding:"2px 9px", background:C.blueBg, color:C.blue, borderRadius:10, fontSize:11, fontWeight:600, marginLeft:6 } as React.CSSProperties,
//     avatar:     { width:38, height:38, borderRadius:"50%", background:C.blue, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:15, flexShrink:0 } as React.CSSProperties,
//     roleRow:    { display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" as const, padding:"14px 24px 16px" } as React.CSSProperties,
//     selTrig:    { border:`1.5px solid #dde2ef`, borderRadius:22, padding:"7px 14px", fontSize:13.5, fontWeight:500, color:"#333", background:"#fff", fontFamily:"inherit", outline:"none", cursor:"pointer", minWidth:180 } as React.CSSProperties,
//     btnSm:      { padding:"7px 16px", fontSize:13 } as React.CSSProperties,
//     moreBadge:  { display:"inline-block", padding:"4px 10px", background:"#f4f5f8", color:C.label, borderRadius:20, fontSize:11.5, border:`1px solid #e8eaf0`, marginTop:6, float:"right" as const } as React.CSSProperties,
//   };

//   /* ─── Render ────────────────────────────────────────────────────────────── */
//   if (!parsedUser?.is_mentor) return (
//     <div style={s.page}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
//         * { box-sizing:border-box; }
//         .fc-row:hover { background:${C.rowHover} !important; }
//         .fc-btn-blue:hover  { background:${C.blueDeep} !important; transform:translateY(-1px); }
//         .fc-btn-ghost:hover { border-color:${C.blue} !important; color:${C.blue} !important; }
//         .fc-rec-item:hover  { background:${C.blueBg} !important; border-color:${C.blueBorder} !important; }
//         .fc-loader { animation: spin 1s linear infinite; }
//         @keyframes spin { to { transform: rotate(360deg); } }
//       `}</style>

//       {loading && (
//         <div style={{ position:"fixed", inset:0, background:"rgba(255,255,255,.75)", display:"flex", justifyContent:"center", alignItems:"center", zIndex:50 }}>
//           <Loader2 style={{ width:40, height:40, color:C.blue }} className="fc-loader" />
//         </div>
//       )}

//       <div style={s.twoCol}>

//         {/* ── LEFT: Your Profile ── */}
//         <div style={s.card}>
//           {/* Header */}
//           <div style={s.cardHead}>
//             <div style={s.avatar}>{(profile.name ?? "U").charAt(0).toUpperCase()}</div>
//             <div>
//               <div style={s.cardTitle}>
//                 <Users style={{ width:16, height:16, color:C.blue }} />
//                 Your Profile
//               </div>
//               <div style={s.cardSub}>Edit details to personalise recommendations</div>
//             </div>
//           </div>

//           {/* Name */}
//           <div className="fc-row" style={s.row}>
//             <span style={s.lbl}>Name</span>
//             <input style={s.inp} value={profile.name ?? ""} onChange={e=>setProfile({...profile,name:e.target.value})} />
//           </div>

//           {/* Email */}
//           <div className="fc-row" style={s.row}>
//             <span style={s.lbl}>Email</span>
//             <input style={s.inp} value={profile.email ?? ""} onChange={e=>setProfile({...profile,email:e.target.value})} />
//           </div>

//           {/* Education */}
//           <div className="fc-row" style={s.row}>
//             <span style={s.lbl}>Education</span>
//             <div style={{ flex:1 }}>
//               <SearchableSelect
//                 value={profile.education}
//                 onChange={(v:string)=>setProfile({...profile,education:v})}
//                 options={educationArray.map(i=>({ label:i.description, value:i.description }))}
//                 placeholder="Select Education"
//               />
//             </div>
//           </div>

//           {/* Industry */}
//           <div className="fc-row" style={s.row}>
//             <span style={s.lbl}>Industry</span>
//             <div style={{ flex:1 }}>
//               <SearchableSelect
//                 value={profile.industry}
//                 onChange={(v:string)=>setProfile({...profile,industry:v})}
//                 options={IndustryArray.map(i=>({ label:i.description, value:i.description }))}
//                 placeholder="Select Industry"
//               />
//             </div>
//           </div>

//           {/* Experience */}
//           <div className="fc-row" style={{ ...s.row, borderBottom:"none" }}>
//             <span style={s.lbl}>Experience</span>
//             <div style={{ flex:1 }}>
//               <SearchableSelect
//                 value={profile.work_experience}
//                 onChange={(v:string)=>setProfile({...profile,work_experience:v})}
//                 options={ExperienceArray.map(i=>({ label:i.description, value:i.description }))}
//                 placeholder="Select Work Experience"
//               />
//             </div>
//           </div>

//           {/* ── Save / Reset (NEW) ── */}
//           <div style={s.footer}>
//             <button
//               className="fc-btn-blue"
//               style={{ ...s.btnBlue, opacity: saving ? 0.65 : 1, cursor: saving ? "not-allowed":"pointer" }}
//               disabled={saving}
//               onClick={updateBasicInfo}
//             >
//               <Save style={{ width:14, height:14 }} />
//               {saving ? "Saving…" : "Save"}
//             </button>
//             <button
//               className="fc-btn-ghost"
//               style={s.btnGhost}
//               onClick={()=>fetchBasicInfo()}
//             >
//               <X style={{ width:13, height:13 }} />
//               Reset
//             </button>
//           </div>
//         </div>

//         {/* ── RIGHT: Personalised Recommendations ── */}
//         <div style={s.card}>
//           {/* Header — title + selector all in one line */}
//           <div style={{ ...s.cardHead, flexWrap:"wrap", gap:10, justifyContent:"space-between" }}>
//             {/* Left: title */}
//             <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
//               <Sparkles style={{ width:16, height:16, color:C.blue }} />
//               <span style={{ fontSize:15, fontWeight:700, color:C.text }}>Personalised Recommendations</span>
//               <span style={s.badge}>New</span>
//             </div>

//             {/* Right: Dream Role selector + buttons */}
//             <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"nowrap" as const }}>
//               <span style={{ fontSize:11.5, color:C.label, fontWeight:500, whiteSpace:"nowrap" as const }}>Dream Role</span>
//               <Select value={profile.dreamRole} onValueChange={handleDreamRoleChange}>
//                 <SelectTrigger style={{ ...s.selTrig, minWidth:0, width:130, fontSize:12, padding:"5px 20px" }}>
//                   <SelectValue placeholder="Select role" />
//                 </SelectTrigger>
//                 <SelectContent position="popper" sideOffset={4} className="max-h-[300px] z-50">
//                   <div className="max-h-[280px] overflow-y-auto">
//                     <SelectGroup>
//                       <SelectLabel style={{ fontSize:11, color:C.label, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em" }}>Popular Roles</SelectLabel>
//                       {allRoles.map((r:string) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
//                     </SelectGroup>
//                   </div>
//                 </SelectContent>
//               </Select>
//               <button
//                 className="fc-btn-blue"
//                 style={{ ...s.btnBlue, padding:"6px 12px", fontSize:12, opacity:saving?0.65:1, cursor:saving?"not-allowed":"pointer" }}
//                 disabled={saving}
//                 onClick={updateBasicInfo}
//               >
//                 <Save style={{ width:12, height:12 }} />
//                 {saving ? "Saving…" : "Save"}
//               </button>
//               <button className="fc-btn-ghost" style={{ ...s.btnGhost, padding:"6px 10px", fontSize:12 }} onClick={()=>fetchBasicInfo()}>
//                 <X style={{ width:11, height:11 }} />
//                 Reset
//               </button>
//             </div>
//           </div>

//           {/* Rec blocks */}
//           <div style={{ padding:"18px 24px" }}>
//             {([
//               { title:"Courses",        icon:BookOpen, list:reco?.courses, sub:(i:any)=>i.provider },
//               { title:"Certifications", icon:Award,    list:reco?.certs,   sub:(i:any)=>i.by       },
//               { title:"Competitions",   icon:Trophy,   list:reco?.comps,   sub:(i:any)=>i.host     },
//             ] as const).map((block, idx) => {
//               const Icon    = block.icon;
//               const full    = block.list?.length ?? 0;
//               const visible = full >= 4 ? 4 : Math.min(3, full);
//               return (
//                 <div key={idx} style={{ ...s.recSec, marginBottom: idx === 2 ? 0 : 12 }}>
//                   <div style={s.recLbl}>
//                     <Icon style={{ width:13, height:13, color:C.blue }} />
//                     {block.title}
//                   </div>
//                   {full > 0 ? (
//                     <>
//                       <div style={s.recGrid}>
//                         {block.list!.slice(0, visible).map((item:any, i:number) => (
//                           <motion.div
//                             key={i}
//                             whileHover={{ scale:1.02 }}
//                             transition={{ duration:0.15 }}
//                             className="fc-rec-item"
//                             style={s.recItem}
//                           >
//                             <div style={s.recItemTxt}>{item.title}</div>
//                             {block.sub(item) && <div style={s.recItemSub}>{block.sub(item)}</div>}
//                           </motion.div>
//                         ))}
//                       </div>
//                       {full > 4 && (
//                         <span style={s.moreBadge}>+{full - 4} more matched</span>
//                       )}
//                     </>
//                   ) : (
//                     <div style={{ fontSize:12, color:C.label }}>No recommendations found.</div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//       </div>
//     </div>
//   );

//   return (
//     <div style={{ display:"flex", justifyContent:"center", width:"100%" }}>
//       <MentorProfileWidget />
//     </div>
//   );
// };

// export default ProfileRecWidget;
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MentorProfileWidget from "@/pages/NewPages/NewMentorProfile";
import { Loader2, Save, X, Users, Sparkles, BookOpen, Award, Trophy } from "lucide-react";
import baseURL from "@/config/config";
import SearchableSelect from "@/components/NewPage/SearchableSelect";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface EducationItem {
  id: number;
  description: string;
  name: string;
  created_at: string;
  updated_at: string;
}

/* ─── Component ──────────────────────────────────────────────────────────── */
const ProfileRecWidget = () => {
  const [profile, setProfile]             = useState<any>({});
  const [typedRoles, setTypedRoles]       = useState<string[]>([]);
  const [loading, setLoading]             = useState(false);
  const [saving, setSaving]               = useState(false);
  const [reco, setReco]                   = useState<any | null>(null);
  const [roleOptions, setRoleOptions]     = useState<string[]>([]);
  const [combinedRoles, setCombinedRoles] = useState<string[]>([]);
  const [ExperienceArray, setExperienceArray] = useState<EducationItem[]>([]);
  const [IndustryArray, setIndustryArray]     = useState<EducationItem[]>([]);
  const [educationArray, setEducationArray]   = useState<EducationItem[]>([]);
  //@ts-ignore
  const [assignedMentors, setAssignedMentors] = useState<any[]>([]);

  const token      = localStorage.getItem("token");
  const userRaw    = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const parsedUser = userRaw ? JSON.parse(userRaw) : null;

  /* ─── Helpers ──────────────────────────────────────────────────────────── */
  const mapResponseToProfile = (resp: any) => {
    const d = resp?.data ?? resp;
    let parsedIntent = d.intent;
    if (typeof parsedIntent === "string") {
      parsedIntent = {
        roadmap: parsedIntent.includes("Roadmap"),
        clarity: parsedIntent.includes("Clarity"),
      };
    } else if (typeof parsedIntent !== "object" || parsedIntent === null) {
      parsedIntent = { roadmap: false, clarity: false };
    }
    return {
      name:            d.firstname ? `${d.firstname}${d.lastname ? " " + d.lastname : ""}` : d.name ?? profile.name,
      email:           d.emailid ?? d.email ?? profile.email,
      education:       d.high_education ?? d.education ?? profile.education,
      industry:        d.industry ?? profile.industry,
      work_experience: d.work_experience ?? profile.work_experience,
      dreamRole:       d.role_based ?? d.dreamRole ?? profile.dreamRole,
      intent:          parsedIntent,
      __raw:           d,
    };
  };

  /* ─── Combined roles sync ──────────────────────────────────────────────── */
  useEffect(() => {
    setCombinedRoles(prev => Array.from(new Set([...prev, ...roleOptions])));
  }, [roleOptions]);

  useEffect(() => {
    if (profile.dreamRole) {
      setCombinedRoles(prev =>
        prev.includes(profile.dreamRole) ? prev : [profile.dreamRole, ...prev]
      );
    }
  }, [profile.dreamRole]);

  const allRoles = useMemo(() => combinedRoles, [combinedRoles]);

  /* ─── API calls ────────────────────────────────────────────────────────── */
  const fetchBasicInfo = async () => {
    setLoading(true);
    try {
      const endpoint = parsedUser?.is_mentor
        ? `${baseURL}/api/mentor/details?user_id=${parsedUser.user_id}`
        : `${baseURL}/api/basic-info`;
      const res = await axios.get(endpoint, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setProfile((prev: any) => ({ ...prev, ...mapResponseToProfile(res.data) }));
      localStorage.setItem("degree", JSON.stringify(res.data));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignedMentors = async () => {
    try {
      const res = await axios.get(`${baseURL}/get_assigned_mentors`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (res.data?.mentors) setAssignedMentors(res.data.mentors);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchRecommendations = async (degreeParam: string) => {
    if (!degreeParam?.trim()) return;
    try {
      const res = await axios.get(`${baseURL}/search-degree`, {
        params:  { degree: degreeParam },
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      const d = res.data;
      if (d)
        setReco({
          courses: Array.isArray(d.courses)
            ? d.courses.map((c: any) => ({ title: c.title || c, provider: c.provider || c.source || "" }))
            : [],
          certs: Array.isArray(d.certifications)
            ? d.certifications.map((c: any) => ({ title: c.title || c, by: c.by || "" }))
            : [],
          comps: Array.isArray(d.competitions)
            ? d.competitions.map((c: any) => ({ title: c.title || c, host: c.host || "" }))
            : [],
        });
    } catch (e) {
      console.warn(e);
    }
  };

  const updateBasicInfo = async () => {
    setSaving(true);
    try {
      const payload = {
        firstname:       profile.name?.split(" ")[0],
        lastname:        profile.name?.split(" ").slice(1).join(" "),
        emailid:         profile.email,
        high_education:  profile.education,
        industry:        profile.industry,
        work_experience: profile.work_experience,
        role_based:      profile.dreamRole,
        intent:          profile.intent,
        ...(profile.__raw?.id      ? { id:      profile.__raw.id }      : {}),
        ...(profile.__raw?.user_id ? { user_id: profile.__raw.user_id } : {}),
      };
      const url = parsedUser?.is_mentor
        ? `${baseURL}/update_mentor/${profile.__raw?.mentor_id ?? ""}`
        : `${baseURL}/api/basic-info`;
      await axios.put(url, payload, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          "Content-Type": "application/json",
        },
      });
      if (localStorage.getItem("degree")) {
        localStorage.removeItem("degree");
        await fetchBasicInfo();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const fetchIndustryData = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/industry`);
      setIndustryArray(
        Array.from(
          new Map(res.data.industry.map((i: EducationItem) => [i.description, i])).values()
        ) as EducationItem[]
      );
    } catch (e) { console.error(e); }
  };

  const fetchExperienceData = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/experience-level`);
      setExperienceArray(res.data.experience_level);
    } catch (e) { console.error(e); }
  };

  const fetchEducationData = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/education`);
      setEducationArray(
        Array.from(
          new Map(res.data.education.map((i: EducationItem) => [i.description, i])).values()
        ) as EducationItem[]
      );
    } catch (e) { console.error(e); }
  };

  const fetchDreamProfiles = async () => {
    const deg = localStorage.getItem("degree");
    const d   = deg ? JSON.parse(deg) : null;
    try {
      const res = await axios.get(`${baseURL}/dream-list`, {
        params:  { degree: d?.high_education, industry: d?.industry, experience: d?.work_experience },
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoleOptions(res.data.matched_roles.map((r: any) => r.matched_role));
    } catch (e) { console.error(e); }
  };

  const handleDreamRoleChange = (v: string) => {
    if (v && !roleOptions.includes(v) && !typedRoles.includes(v))
      setTypedRoles(p => [...p, v]);
    setProfile({ ...profile, dreamRole: v });
  };

  /* ─── Effects ──────────────────────────────────────────────────────────── */
  useEffect(() => { fetchBasicInfo(); }, []);
  useEffect(() => { fetchRecommendations(profile.dreamRole); }, [profile.dreamRole]);
  useEffect(() => {
    fetchIndustryData();
    fetchExperienceData();
    fetchEducationData();
    fetchDreamProfiles();
    if (parsedUser && !parsedUser.is_mentor) fetchAssignedMentors();
  }, []);

  /* ─── Mentor view ──────────────────────────────────────────────────────── */
  if (parsedUser?.is_mentor) {
    return (
      <div className="flex justify-center w-full">
        <MentorProfileWidget />
      </div>
    );
  }

  /* ─── Main render ──────────────────────────────────────────────────────── */
  const recBlocks = [
    { title: "Courses",        Icon: BookOpen, list: reco?.courses, sub: (i: any) => i.provider },
    { title: "Certifications", Icon: Award,    list: reco?.certs,   sub: (i: any) => i.by       },
    { title: "Competitions",   Icon: Trophy,   list: reco?.comps,   sub: (i: any) => i.host     },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f8f9fc] font-sans px-[5%] py-7">

      {/* ── Global loader ── */}
      {loading && (
        <div className="fixed inset-0 bg-white/75 flex items-center justify-center z-50">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

        {/* ══════════════════════════════════════════════════════════════════
            LEFT — Your Profile
        ══════════════════════════════════════════════════════════════════ */}
        <div className="bg-white border border-[#e8ecf4] rounded-2xl shadow-[0_2px_12px_rgba(59,110,245,0.07)] overflow-hidden">

          {/* Card header */}
          <div className="flex items-center gap-3 px-6 py-[18px] border-b border-[#f0f3fa]">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-base shrink-0">
              {(profile.name ?? "U").charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="flex items-center gap-2 text-base font-bold text-[#1a1e2e]">
                <Users className="w-4 h-4 text-blue-500" />
                Your Profile
              </h2>
              <p className="text-xs text-[#9fa8c0] mt-0.5">
                Edit Your Profile Details
              </p>
            </div>
          </div>

          {/* ── Field rows ── */}
          {/* Name */}
          <div className="flex items-center gap-4 px-6 py-[14px] border-b border-[#f4f6fb] hover:bg-[#fafbff] transition-colors">
            <span className="w-[90px] text-xs font-semibold text-[#9fa8c0] uppercase tracking-wider shrink-0">
              Name
            </span>
            <input
              className="flex-1 border-none bg-transparent text-sm text-[#1a1e2e] font-medium outline-none"
              value={profile.name ?? ""}
              onChange={e => setProfile({ ...profile, name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 px-6 py-[14px] border-b border-[#f4f6fb] hover:bg-[#fafbff] transition-colors">
            <span className="w-[90px] text-xs font-semibold text-[#9fa8c0] uppercase tracking-wider shrink-0">
              Email
            </span>
            <input
              className="flex-1 border-none bg-transparent text-sm text-[#1a1e2e] font-medium outline-none"
              value={profile.email ?? ""}
              onChange={e => setProfile({ ...profile, email: e.target.value })}
            />
          </div>

          {/* Education */}
          <div className="flex items-center gap-4 px-6 py-[14px] border-b border-[#f4f6fb] hover:bg-[#fafbff] transition-colors">
            <span className="w-[90px] text-xs font-semibold text-[#9fa8c0] uppercase tracking-wider shrink-0">
              Education
            </span>
            <div className="flex-1">
              <SearchableSelect
                value={profile.education}
                onChange={(v) => setProfile({ ...profile, education: v })}
                options={educationArray.map(i => ({ label: i.description, value: i.description }))}
                placeholder="Select Education"
              />
            </div>
          </div>

          {/* Industry */}
          <div className="flex items-center gap-4 px-6 py-[14px] border-b border-[#f4f6fb] hover:bg-[#fafbff] transition-colors">
            <span className="w-[90px] text-xs font-semibold text-[#9fa8c0] uppercase tracking-wider shrink-0">
              Industry
            </span>
            <div className="flex-1">
              <SearchableSelect
                value={profile.industry}
                onChange={(v) => setProfile({ ...profile, industry: v })}
                options={IndustryArray.map(i => ({ label: i.description, value: i.description }))}
                placeholder="Select Industry"
              />
            </div>
          </div>

          {/* Experience */}
          <div className="flex items-center gap-4 px-6 py-[14px] hover:bg-[#fafbff] transition-colors">
            <span className="w-[90px] text-xs font-semibold text-[#9fa8c0] uppercase tracking-wider shrink-0">
              Experience
            </span>
            <div className="flex-1">
              <SearchableSelect
                value={profile.work_experience}
                onChange={(v) => setProfile({ ...profile, work_experience: v })}
                options={ExperienceArray.map(i => ({ label: i.description, value: i.description }))}
                placeholder="Select Work Experience"
              />
            </div>
          </div>

          {/* Footer — Save / Reset */}
          <div className="flex gap-2.5 px-6 py-[14px] border-t border-[#f0f3fa]">
            <button
              disabled={saving}
              onClick={updateBasicInfo}
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-full transition-all hover:-translate-y-px"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              onClick={() => fetchBasicInfo()}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-transparent border border-[#dde2ef] hover:border-blue-500 hover:text-blue-500 text-[#888] text-sm font-medium rounded-full transition-colors"
            >
              <X className="w-3 h-3" />
              Reset
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            RIGHT — Personalised Recommendations
        ══════════════════════════════════════════════════════════════════ */}
        <div className="bg-white border border-[#e8ecf4] rounded-2xl shadow-[0_2px_12px_rgba(59,110,245,0.07)] overflow-hidden">

          {/* Card header — title + Dream Role selector */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 px-6 py-[18px] border-b border-[#f0f3fa]">
            {/* Left: title + badge */}
            <div className="flex items-center gap-2 shrink-0">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-[15px] font-bold text-[#1a1e2e]">Personalised Role Recommendations</span>
         
            </div>

            {/* Right: Dream Role + action buttons */}
            <div className="flex items-center gap-1.5 flex-nowrap">
              {/* <span className="text-[13px] text-[#9fa8c0] font-medium whitespace-nowrap">Dream Role</span> */}

              <Select value={profile.dreamRole} onValueChange={handleDreamRoleChange}>
                <SelectTrigger className="h-8 w-[150px] text-xs border border-[#dde2ef] rounded-full px-3 focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={4} className="max-h-[300px] z-50">
                  <div className="max-h-[280px] overflow-y-auto">
                    <SelectGroup>
                      <SelectLabel className="text-[11px] text-[#9fa8c0] font-bold uppercase tracking-wider">
                        Popular Roles
                      </SelectLabel>
                      {allRoles.map((r: string) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectGroup>
                  </div>
                </SelectContent>
              </Select>

              <button
                disabled={saving}
                onClick={updateBasicInfo}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-full transition-all hover:-translate-y-px"
              >
                <Save className="w-3 h-3" />
                {saving ? "Saving…" : "Save"}
              </button>
              <button
                onClick={() => fetchBasicInfo()}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-transparent border border-[#dde2ef] hover:border-blue-500 hover:text-blue-500 text-[#888] text-xs font-medium rounded-full transition-colors"
              >
                <X className="w-2.5 h-2.5" />
                Reset
              </button>
            </div>
          </div>

          {/* Rec blocks */}
          <div className="p-6 space-y-3">
            {recBlocks.map(({ title, Icon, list, sub }, idx) => {
              const full    = list?.length ?? 0;
              const visible = full >= 4 ? 4 : Math.min(3, full);
              return (
                <div
                  key={idx}
                  className="bg-[#f8f9fc] border border-[#edf0f9] rounded-xl p-4"
                >
                  {/* Section label */}
                  <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#9fa8c0] uppercase tracking-wider mb-2.5">
                    <Icon className="w-3 h-3 text-blue-500" />
                    {title}
                  </div>

                  {full > 0 ? (
                    <>
                      <div className="grid grid-cols-2 gap-2">
                        {list!.slice(0, visible).map((item: any, i: number) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.15 }}
                            className="bg-white border border-[#e8ecf4] hover:bg-blue-50 hover:border-[#d4dcfb] rounded-xl p-3 cursor-default transition-colors"
                          >
                            <div className="text-sm font-semibold text-[#1a1e2e] leading-snug">
                              {item.title}
                            </div>
                            {sub(item) && (
                              <div className="text-xs text-[#9fa8c0] mt-0.5">{sub(item)}</div>
                            )}
                          </motion.div>
                        ))}
                      </div>

                      {full > 4 && (
                        <div className="text-right mt-1.5">
                          <span className="inline-block px-2.5 py-1 bg-[#f4f5f8] text-[#9fa8c0] rounded-full text-[11.5px] border border-[#e8eaf0]">
                            +{full - 4} more matched
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-xs text-[#9fa8c0]">No recommendations found.</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileRecWidget;