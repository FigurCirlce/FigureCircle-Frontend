// import React, { useEffect, useState } from "react";
// import coding from "../../assets/coding.jpg";
// import pic from "../../assets/pic.jpg";
// // import { Search } from "lucide-react";
// import axios from "axios";
// import baseURL from "@/config/config";
// import { useUserContext } from "@/components/context/userContext";
// import MilestonePreview from "@/components/NewPage/Dashboard/MilestonePreview";

// // Define Interfaces
// interface ProgressAPIResponse {
//   latest_feedback: {
//     created_at: string;
//     milestone: string;
//     milestone_achieved: boolean;
//     progress_rating: number;
//   };
//   metadata: {
//     last_updated: string;
//     mentor_id: number;
//     total_feedback_entries: number;
//     user_id: number;
//   };
//   milestones: {
//     completed: MilestoneEntry[];
//     pending: MilestoneEntry[];
//   };
//   progress_summary: {
//     completed_count: number;
//     milestones_completed: string;
//     pending_count: number;
//     progress_percentage: number;
//     total_milestones: number;
//   };
// }

// interface MilestoneEntry {
//   completed: boolean;
//   completion_date: string | null;
//   description: string;
//   expected_completion_date: string;
//   id: number;
//   mentor_fees: string;
//   milestone: string;
//   progress_rating: number | null;
// }

// interface Mentor {
//   background: string;
//   degree: string;
//   email: string;
//   expertise: string;
//   fee: string;
//   linkedin: string;
//   mentor_id: number;
//   milestones: number;
//   name: string;
//   phone: string;
//   profile_picture: string;
//   resume: string;
// }

// const LandingDashboard: React.FC = () => {
//   const [assignedMentorData, setAssignedMentorData] = useState<Mentor[]>([]);
//   const [selectedExpertKey, setSelectedExpertKey] = useState<number | null>(
//     null
//   );
//   const [selectedExpertData, setSelectedExpertData] =
//     useState<ProgressAPIResponse | null>(null);
//   const [course, setCourse] = useState<string[]>([]);
//   const [certificate, setCertificate] = useState<string[]>([]);
//   const [competition, setCompetition] = useState<string[]>([]);
//   // const [user_id, setUser_id] = useState<string | null>(null);
//   const token = localStorage.getItem("token");
//   const degree = localStorage.getItem("degree");

//     const { userData} = useUserContext();

//   //  const fetchBasicInfo = async () => {
//   //     try {
//   //       const token = localStorage.getItem('token');
//   //       const response = await axios.get(`${baseURL}/api/basic-info`, {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       });

//   //       setBasicInfo([response.data]);
//   //       setDegree(response.data.interested_stream);
//   //       setFormData(response.data);
//   //       setUser_id(response.data.id);
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   };

//   useEffect(() => {
//     const fetchAssignedMentors = async () => {
//       try {
//         const res = await axios.get(`${baseURL}/get_assigned_mentors`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (res.data?.mentors?.length) {
//           console.log("res.data?.mentors?", res.data?.mentors);
//           setAssignedMentorData(res.data.mentors);
//           // const mentorData = {
//           //   mentors: [

//           //     {
//           //       background: "pick me",
//           //       degree: "Ph.D. Quantum Physics",
//           //       email: "harshmentortest4@gmail.com",
//           //       expertise: "Data Science for Finance",
//           //       fee: "800",
//           //       linkedin: "yellow/linkedin",
//           //       mentor_id: 2,
//           //       milestones: 4,
//           //       name: "Smriti mentor ",
//           //       phone: "+91 9818193660",
//           //       profile_picture:
//           //         "https://res.cloudinary.com/dpwysillm/image/upload/v1744687445/INTR_survery_j0xjys.png",
//           //       resume:
//           //         "https://res.cloudinary.com/dpwysillm/image/upload/v1744687446/Massid-_Udayan_Anand_sl8cd7.pdf",
//           //     },
//           //      {
//           //       background: "pick me",
//           //       degree: "Ph.D. Quantum Physics",
//           //       email: "harshmentortest4@gmail.com",
//           //       expertise: "Data Science for Finance",
//           //       fee: "800",
//           //       linkedin: "yellow/linkedin",
//           //       mentor_id: 6,
//           //       milestones: 4,
//           //       name: "harsh mentor 4",
//           //       phone: "+91 9818193660",
//           //       profile_picture:
//           //         "https://res.cloudinary.com/dpwysillm/image/upload/v1744687445/INTR_survery_j0xjys.png",
//           //       resume:
//           //         "https://res.cloudinary.com/dpwysillm/image/upload/v1744687446/Massid-_Udayan_Anand_sl8cd7.pdf",
//           //     },
//           //   ],
//           // };
//           // setAssignedMentorData(mentorData.mentors);
//           //  setSelectedExpertKey();
//           setSelectedExpertKey(res.data.mentors[0].mentor_id);
//         }
//       } catch (error) {
//         console.error("Error fetching assigned mentors", error);
//       }
//     };

//     fetchAssignedMentors();
//     // fetchBasicInfo();
//   }, []);

//   useEffect(() => {
//     if (selectedExpertKey == null) return;

//     // console.log("userDatttaDegree---", degree);
//     //  const degree = localStorage.getItem("degree"); //degree has user_id
//     // const degreeData = degree ? JSON.parse(degree) : null;
//     // const user_id = degreeData?.id;
//       const userData = localStorage.getItem("userData"); //degree has user_id
//     const parseUserData = userData? JSON.parse(userData) : null;
//     const user_id = parseUserData?.user_id;
// console.log("user_id",user_id);
//     const fetchProgressData = async () => {
//       try {
//         const res = await axios.get(`${baseURL}/progress/enhanced`, {
//           params: {
//             user_id: user_id,
//             mentor_id: selectedExpertKey,
//             // mentor_id:2
//           },
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (Array.isArray(res.data) && res.data.length > 0) {
//           console.log("trueeeeeee");
//           setSelectedExpertData(res.data[0]);
//         }
//         // const data = [
//         //   {
//         //     latest_feedback: {
//         //       created_at: "Tue, 22 Apr 2025 16:09:55 GMT",
//         //       milestone: "project discussion",
//         //       milestone_achieved: true,
//         //       progress_rating: 5,
//         //     },
//         //     metadata: {
//         //       last_updated: "Tue, 22 Apr 2025 16:09:01 GMT",
//         //       mentor_id: 2,
//         //       total_feedback_entries: 2,
//         //       user_id: 40,
//         //     },
//         //     milestones: {
//         //       completed: [
//         //         {
//         //           completed: true,
//         //           completion_date: "Tue, 22 Apr 2025 16:09:55 GMT",
//         //           description: "discussion",
//         //           expected_completion_date: "2025-04-24",
//         //           id: 1,
//         //           mentor_fees: "100",
//         //           milestone: "Project discussion",
//         //           progress_rating: 5,
//         //         },
//         //       ],
//         //       pending: [
//         //         {
//         //           completed: false,
//         //           completion_date: null,
//         //           description: "coding",
//         //           expected_completion_date: "2025-04-30",
//         //           id: 2,
//         //           mentor_fees: "200",
//         //           milestone: "coding",
//         //           progress_rating: null,
//         //         },
//         //       ],
//         //     },
//         //     progress_summary: {
//         //       completed_count: 1,
//         //       milestones_completed: "1/2",
//         //       pending_count: 1,
//         //       progress_percentage: 50,
//         //       total_milestones: 2,
//         //     },
//         //   },
//         // ];
//         // setSelectedExpertData(data[0]);
//         // if (res.data && res.data.length > 0) {
//         //   if (data && data.length > 0) {
//         //   setSelectedExpertData(data[0]);
//         // }
//         //  else {
//         //   setSelectedExpertData(null);
//         // }
//       } catch (error) {
//         console.error("Error fetching progress data", error);
//       }
//     };

//     fetchProgressData();
//   }, [selectedExpertKey]);

//   useEffect(() => {
//     const fetchAllData = async () => {
//       const token = localStorage.getItem("token");
//       const degreeData = degree ? JSON.parse(degree) : null;
//       const stream = degreeData.interested_stream;
//       console.log("Stream==--", stream);

//       if (!stream) return;

//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       try {
//         // Try all three primary APIs in parallel
//         const [courseRes, certificateRes, competitionRes] = await Promise.all([
//           axios.post(
//             `https://harsh1993-model.hf.space/get_course`,
//             { stream },
//             { headers }
//           ),
//           axios.post(
//             `https://harsh1993-model.hf.space/get_certificate`,
//             { stream },
//             { headers }
//           ),
//           axios.post(
//             `https://harsh1993-model.hf.space/get_competition`,
//             { stream },
//             { headers }
//           ),
//         ]);

//         setCourse(JSON.parse(courseRes.data.ans));
//         setCertificate(JSON.parse(certificateRes.data.ans));
//         setCompetition(JSON.parse(competitionRes.data.ans));
//       } catch (primaryError) {
//         console.warn(
//           "Primary API failed, trying fallback API...",
//           primaryError
//         );

//         try {
//           const fallbackRes = await axios.get(
//             `${baseURL}/search-degree?degree=${stream}`,
//             { headers }
//           );
//           console.log("Fallback response", fallbackRes.data);

//           setCourse(fallbackRes.data.courses || []);
//           setCertificate(fallbackRes.data.certifications || []);
//           setCompetition(fallbackRes.data.competitions || []);
//         } catch (fallbackError) {
//           console.error("Fallback API also failed:", fallbackError);
//         }
//       }
//     };

//     fetchAllData();
//   }, []);

//   return (
//     <div className=" min-h-screen font-sans">
//       <div className="flex flex-col gap-6">
//         <div className="bg-white rounded-2xl p-6 flex-1 shadow">
//           <h2 className="text-2xl font-bold  ">Recommended for You</h2>

//           {/* Courses */}
//           <h3 className="py-4 pt-3 text-xl font-bold flex justify-center">
//             Recommended Courses
//           </h3>
//           <div className="flex flex-wrap gap-x-3 gap-y-5">
//             {course.length ? (
//               course.map((item, i) => (
//                 <div
//                   key={i}
//                   className="border-2 border-slate-200 w-[200px] rounded-lg shadow-lg"
//                 >
//                   <img src={coding} alt="Course" className="mb-2" />
//                   <button className="bg-orange-400 text-white px-2 rounded-2xl text-xs my-2 mx-4">
//                     Course
//                   </button>
//                   <h3 className="font-semibold text-gray-800 px-4 pb-2 text-sm">
//                     {item}
//                   </h3>
//                 </div>
//               ))
//             ) : (
//               <div className="flex justify-center">
//                 <p>No recommendations available</p>
//               </div>
//             )}
//           </div>

//           {/* Certifications */}
//           <h3 className="py-4 text-xl font-bold flex justify-center">
//             Recommended Certifications
//           </h3>
//           <div className="flex flex-wrap gap-x-3 gap-y-5">
//             {certificate.length ? (
//               certificate.map((item, i) => (
//                 <div
//                   key={i}
//                   className="border-2 border-slate-200 w-[200px] rounded-lg shadow-lg"
//                 >
//                   <img src={coding} alt="Certification" className="mb-2" />
//                   <button className="bg-blue-500 text-white px-2 rounded-2xl text-xs my-2 mx-4">
//                     Certification
//                   </button>
//                   <h3 className="font-semibold text-gray-800 px-4 py-2 text-sm">
//                     {item}
//                   </h3>
//                 </div>
//               ))
//             ) : (
//               <p>No recommendations available</p>
//             )}
//           </div>

//           {/* Competitions */}
//           <h3 className="py-4 text-xl font-bold flex justify-center">
//             Recommended Competitions
//           </h3>
//           <div className="flex flex-wrap gap-x-3 gap-y-5">
//             {competition.length ? (
//               competition.map((item, i) => (
//                 <div
//                   key={i}
//                   className="border-2 border-slate-200 w-[200px] rounded-lg shadow-lg"
//                 >
//                   <img src={coding} alt="Competition" className="mb-2" />
//                   <button className="bg-green-400 text-white px-2 rounded-2xl text-xs my-2 mx-4">
//                     Competition
//                   </button>
//                   <h3 className="font-semibold text-gray-800 px-4 pb-2 text-sm">
//                     {item}
//                   </h3>
//                 </div>
//               ))
//             ) : (
//               <p>No recommendations available</p>
//             )}
//           </div>
//         </div>

//         {/* Expert Section */}
//         {assignedMentorData.length===0?<div className=""><MilestonePreview/></div>:
//         <div className="flex flex-col lg:flex-row gap-5 w-full">
//           {/* Expert List */}

//           <div className="bg-white rounded-2xl shadow p-6 w-[400px]">
//             <h2 className="text-2xl font-bold mb-4">{userData.is_mentor?"Your Mentees":"Your Experts"}</h2>
//             <div className="space-y-4 w-[350px]">
//               {assignedMentorData.length < 1
//                 ? "No Assigned Mentor"
//                 : assignedMentorData.map((mentor) => (
//                     <div
//                       key={mentor.mentor_id}
//                       onClick={() => setSelectedExpertKey(mentor.mentor_id)}
//                       className={`border rounded-xl px-4 py-2 flex justify-between items-center cursor-pointer ${
//                         selectedExpertKey === mentor.mentor_id
//                           ? "border-emerald-500"
//                           : ""
//                       }`}
//                     >
//                       <div className="flex gap-2">
//                         <img src={pic} alt="mentor" width={70} />
//                         <div className="flex flex-col justify-center">
//                           <p className="font-medium text-gray-800">
//                             {mentor.name}
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             {mentor.expertise}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//             </div>

//             {/* <div className="mt-6 flex justify-center">
//               <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-600 flex gap-2">
//                 Find More Experts <Search size={20} />
//               </button>
//             </div> */}
//           </div>

//           {/* Expert Progress */}
//           <div className="bg-white rounded-2xl shadow p-6 flex-1">
//             <h2 className="text-2xl mb-4 font-bold text-center">
//              {userData.is_mentor?"Progress with Mentees":"Progress with Experts"}
//             </h2>
//             {selectedExpertData ? (
//               <>
//                 <div className="my-3">
//                   <div className="flex justify-between text-sm font-semibold text-gray-700 mb-1">
//                     <div>
//                       Milestones Completed:{" "}
//                       <span>
//                         {
//                           selectedExpertData.progress_summary
//                             .milestones_completed
//                         }
//                       </span>
//                     </div>
//                     <div>
//                       {selectedExpertData.progress_summary.progress_percentage}%
//                     </div>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
//                     <div
//                       className="bg-green-500 h-2.5 rounded-full"
//                       style={{
//                         width: `${selectedExpertData.progress_summary.progress_percentage}%`,
//                       }}
//                     ></div>
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <div className="text-sm font-semibold text-gray-700">
//                     Latest Feedback
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     {selectedExpertData.latest_feedback.milestone}
//                   </div>
//                 </div>
//                 {/* Milestones */}
//                 <div className="mb-4">
//                   <h4 className="font-semibold text-gray-700 text-sm mb-1">
//                     {/* Milestones ({selectedExpertData.milestones.completed.milestone}) */}
//                     Milestones Completed
//                   </h4>
//                   {/* <ul className="text-sm text-gray-600 list-disc ml-5">
//                 {selectedExpertData?.milestones.completed.description}{selectedExpertData?.milestones.completed.completion_date}
//               </ul>
//             </div> */}
//                   <ul className="text-sm text-gray-600 list-disc ml-5">
//                     {selectedExpertData?.milestones?.completed?.map(
//                       (milestone, index) => (
//                         <li key={index}>
//                           {/* {milestone.milestone} - {milestone.completion_date} */}
//                           {milestone.milestone} ({milestone.description}) -{" "}
//                           {milestone.completion_date
//                             ? new Date(
//                                 milestone.completion_date
//                               ).toLocaleDateString("en-US", {
//                                 year: "numeric",
//                                 month: "long",
//                                 day: "numeric",
//                               })
//                             : "Not completed yet"}
//                         </li>
//                       )
//                     )}
//                   </ul>
//                 </div>

//                 <div className="mb-4">
//                   <h4 className="font-semibold text-gray-700 text-sm mb-1">
//                     Pending Task
//                   </h4>
//                   <ul className="text-sm text-gray-600 list-disc ml-5">
//                     {selectedExpertData?.milestones?.pending?.map(
//                       (pending, index) => (
//                         <li key={index}>
//                           {/* {milestone.milestone} - {milestone.completion_date} */}
//                           {pending.milestone} ({pending.description}) -{" "}
//                           {new Date(
//                             pending.expected_completion_date
//                           ).toLocaleDateString("en-GB", {
//                             day: "numeric",
//                             month: "long",
//                             year: "numeric",
//                           })}
//                         </li>
//                       )
//                     )}
//                     {/* {selectedExpert.pending.map((item, idx) => (
//                   <li key={idx}>{item}</li>
//                 ))} */}
//                   </ul>
//                 </div>

//                 {/* Completed Tasks */}
//                 {/* <div>
//               <h4 className="font-semibold text-gray-700 text-sm mb-1">
//                 Completed Tasks
//               </h4>
//               <ul className="text-sm text-gray-600 list-disc ml-5">
//                 {selectedExpertData?.milestones?.progress_summary?.map((pending, index) => (
//       <li key={index}>
//         {/* {milestone.milestone} - {milestone.completion_date} */}
//                 {/* {pending.milestone} ({pending.description}) - {pending.expected_completion_date}
//       </li>
//     ))}

//               </ul> */}
//                 {/* </div>    */}
//               </>
//             ) : (
//               <p>Loading expert progress...</p>
//             )}
//           </div>
//         </div>
// }
//       </div>
//     </div>
//   );
// };

// export default LandingDashboard;
import React, { useEffect, useState } from "react";
import pic from "../../assets/pic.jpg";
// import { Search } from "lucide-react";
import axios from "axios";
import baseURL from "@/config/config";
// import { useUserContext } from "@/components/context/userContext";
import RecommendationsPanel from "./CoursesRecommendation";
import MilestoneFlowExpertTimeline from "@/pages/NewPages/NewMilestoneExpert";
import MilestoneFlowTimeline from "@/components/NewPage/Homepage/NewMilestoneUser";
import ChatWidget from "@/components/NewPage/ChatBox";
import { Calendar, Loader2 } from "lucide-react";
// Define Interfaces
// interface ProgressAPIResponse {
//   latest_feedback: {
//     created_at: string;
//     milestone: string;
//     milestone_achieved: boolean;
//     progress_rating: number;
//   };
//   metadata: {
//     last_updated: string;
//     mentor_id: number;
//     total_feedback_entries: number;
//     user_id: number;
//   };
//   milestones: {
//     completed: MilestoneEntry[];
//     pending: MilestoneEntry[];
//   };
//   progress_summary: {
//     completed_count: number;
//     milestones_completed: string;
//     pending_count: number;
//     progress_percentage: number;
//     total_milestones: number;
//   };
// }

// interface MilestoneEntry {
//   completed: boolean;
//   completion_date: string | null;
//   description: string;
//   expected_completion_date: string;
//   id: number;
//   mentor_fees: string;
//   milestone: string;
//   progress_rating: number | null;
// }
interface LandingDashboardProps {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

interface Mentor {
  background: string;
  degree: string;
  email: string;
  expertise: string;
  fee: string;
  linkedin: string;
  mentor_id: number;
  milestones: number;
  name: string;
  phone: string;
  profile_picture: string;
  resume: string;
}

export interface AssignedUser {
  activity: string | null;
  assigned_at: string; // ISO timestamp (e.g., "2025-10-03T07:39:29.446858")
  bachelors_degree: string | null;
  basic_info: BasicInfo;
  certification: string | null;
  country: string | null;
  data_filled: boolean;
  email: string;
  first_name: string | null;
  last_name: string | null;
  masters_degree: string | null;
  school_name: string | null;
  stream_name: string | null;
  user_id: number;
  username: string;
}

export interface BasicInfo {
  bachelor: string | null;
  firstname: string;
  high_education: string;
  industry: string;
  intent: string; // e.g. "Career Clarity & Connections" or serialized JSON string
  interested_stream: string;
  lastname: string;
  role: string;
  role_based: string;
  work_experience: string;
}

const LandingDashboard: React.FC<LandingDashboardProps> = ({
  setActivePage,
}) => {
  const [assignedMentorData, setAssignedMentorData] = useState<Mentor[]>([]);
  const [assignedMenteesData, setAssignedMenteesData] = useState<
    AssignedUser[]
  >([]);
  const [selectedExpertKey, setSelectedExpertKey] = useState<number | null>(
    null
  );
  const [openChatMentor, setOpenChatMentor] = useState<number | null>(null);
  const [selectedExpertData, setSelectedExpertData] =
    useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [course, setCourse] = useState<string[]>([]);
  const [certificate, setCertificate] = useState<string[]>([]);
  const [competition, setCompetition] = useState<string[]>([]);
  // const [user_id, setUser_id] = useState<string | null>(null);
  const token = localStorage.getItem("token");
  const degree = localStorage.getItem("degree");
  const user = localStorage.getItem("user");
  const parseUser = user ? JSON.parse(user) : null;
  const parsedDegree = degree ? JSON.parse(degree) : null;

  const ITEMS_PER_PAGE = 4;
const [currentPage, setCurrentPage] = useState(1);
const listData = parseUser?.is_mentor
  ? assignedMenteesData
  : assignedMentorData;
const totalPages = Math.ceil(listData.length / ITEMS_PER_PAGE);

const paginatedMentorData = assignedMenteesData.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);

const paginatedMenteeData = assignedMentorData.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);


  // const { userData } = useUserContext();

  //  const fetchBasicInfo = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       const response = await axios.get(`${baseURL}/api/basic-info`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       setBasicInfo([response.data]);
  //       setDegree(response.data.interested_stream);
  //       setFormData(response.data);
  //       setUser_id(response.data.id);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  useEffect(() => {
    const fetchAssignedMentors = async () => {
      try {
        const res = await axios.get(`${baseURL}/get_assigned_mentors`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data?.mentors?.length) {
          console.log("res.data?.mentors?", res.data?.mentors);
          
          setAssignedMentorData(res.data.mentors);

          setSelectedExpertKey(res.data.mentors[0].mentor_id);
        }
        
      } catch (error) {
        
        console.error("Error fetching assigned mentors", error);
      }
       finally {
      setLoading(false);
    }
    };
    const fetchAssignedMentees = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/mentor_assigned_users_count/${parsedDegree?.mentor_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data?.assigned_users?.length) {
          console.log("res.data?.assigned_users?", res.data?.assigned_users);
          // setLoading(false);
          setAssignedMenteesData(res.data.assigned_users);

          setSelectedExpertKey(res.data.mentors[0].assigned_users);
        }
      } catch (error) {

        console.error("Error fetching assigned mentors", error);
      }
      finally{
        setLoading(false);
      }
    };

    if (parsedDegree?.mentor_id) {
      setLoading(true);
      fetchAssignedMentees();
    } else {
      setLoading(true);
      fetchAssignedMentors();
    }

    // fetchBasicInfo();
  }, []);


   const handleMilestone = async (mentorId: Number | null) => {
    const userData=localStorage.getItem("user");
    const parsedUserData=userData?JSON.parse(userData):null;

      try {
        const response = await axios.get(
          `${baseURL}/api/milestone`,
  
          {
            params: {
              mentor_id: parsedUserData?.is_mentor
                ? parsedDegree?.mentor_id
                : mentorId,
              user_id: parsedUserData?.is_mentor
                ? mentorId
                : parsedUserData.user_id
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        console.log("response-milestone---", response.data);
        const data = response.data.current_milestone;

const uniqueMilestones = data.filter(
  (v: { milestone: any; description: any; expectedCompletionDate: any; }, i: any, a: any[]) =>
    a.findIndex(
      t =>
        t.milestone === v.milestone &&
        t.description === v.description &&
        t.expectedCompletionDate === v.expectedCompletionDate
    ) === i
);

setSelectedExpertData(uniqueMilestones);

      } catch (e) {
        console.log(e);
      }
    };

  useEffect(()=>{
 if (selectedExpertKey == null) return;
 handleMilestone(selectedExpertKey);
  },[selectedExpertKey]);

  // useEffect(() => {
  //   if (selectedExpertKey == null) return;
  //   console.log("SelectedExpertKey", selectedExpertKey);
  //   // console.log("userDatttaDegree---", degree);
  //   const degree = localStorage.getItem("degree"); //degree has user_id
  //   const degreeData = degree ? JSON.parse(degree) : null;
  //   const user_id = degreeData?.id;
  //   //  const user = localStorage.getItem("user"); //degree has user_id
  //   // const parsedUser= user ? JSON.parse(user) : null;
    
  //   console.log("user_id", user_id);
  //   const fetchProgressData = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await axios.get(`${baseURL}/progress/enhanced`, {
  //         params: {
  //           user_id: parseUser.is_mentor
  //             ? selectedExpertKey
  //             : parseUser.user_id,
  //           mentor_id: parseUser.is_mentor
  //             ? parsedDegree?.mentor_id
  //             : selectedExpertKey,
  //           // mentor_id:2
  //         },
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       // if (Array.isArray(res.data) && res.data.length > 0) {
  //       if (res.data) {
  //         console.log("trueeeeeee");
  //         console.log("res.data-------", res.data);
        
  //         setSelectedExpertData(res.data);
  //       }
  //     } catch (error) {
        
  //       console.error("Error fetching progress data", error);
  //     }finally{
  //       setLoading(false);
  //     }
  //   };

  //   fetchProgressData();
  // }, [selectedExpertKey]);

  useEffect(() => {
    const fetchAllData = async () => {
      const token = localStorage.getItem("token");
      const degreeData = degree ? JSON.parse(degree) : null;
      console.log("degreeData", degreeData);
      const stream = degreeData.role_based;
      console.log("Stream==--", stream);

      if (!stream) return;

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        // Try all three primary APIs in parallel
        const [courseRes, certificateRes, competitionRes] = await Promise.all([
          // const [courseRes, certificateRes] = await Promise.all([
          axios.post(
            `https://harsh1993-model.hf.space/get_course`,
            { stream },
            { headers }
          ),
          axios.post(
            `https://harsh1993-model.hf.space/get_certificate`,
            { stream },
            { headers }
          ),
          axios.post(
            `https://harsh1993-model.hf.space/get_competition`,
            { stream },
            { headers }
          ),
        ]);

        setCourse(JSON.parse(courseRes.data.ans));
        setCertificate(JSON.parse(certificateRes.data.ans));
        setCompetition(JSON.parse(competitionRes.data.ans));
      } catch (primaryError) {
        console.warn(
          "Primary API failed, trying fallback API...",
          primaryError
        );

        try {
          const fallbackRes = await axios.get(
            `${baseURL}/search-degree?degree=${stream}`,
            { headers }
          );
          console.log("Fallback response", fallbackRes.data);

          setCourse(fallbackRes.data.courses || []);
          setCertificate(fallbackRes.data.certifications || []);
          setCompetition(fallbackRes.data.competitions || []);
        } catch (fallbackError) {
          console.error("Fallback API also failed:", fallbackError);
        }
      }
    };

    fetchAllData();
  }, []);

  return (
    <div>
      <div>
        <div className="flex flex-col gap-6 ">
          <div>
            {/* <h2 className="text-2xl font-bold  ">Recommended for You</h2> */}

            {/* Courses */}
            {/* <h3 className="py-4 pt-3 text-xl font-bold flex justify-center">
            Recommended Courses
          </h3> */}
            {/* <div className="flex flex-wrap gap-x-3 gap-y-5">
            {course.length ? (
              course.map((item, i) => (
                <div
                  key={i}
                  className="border-2 border-slate-200 w-[200px] rounded-lg shadow-lg"
                >
                  <img src={coding} alt="Course" className="mb-2" />
                  <button className="bg-orange-400 text-white px-2 rounded-2xl text-xs my-2 mx-4">
                    Course
                  </button>
                  <h3 className="font-semibold text-gray-800 px-4 pb-2 text-sm">
                    {item}
                  </h3>
                </div>
              ))
            ) : (
              <div className="flex justify-center">
                <p>No recommendations available</p>
              </div>
            )}
          </div> */}

            {/* Certifications */}
            {/* <h3 className="py-4 text-xl font-bold flex justify-center">
            Recommended Certifications
          </h3>
          <div className="flex flex-wrap gap-x-3 gap-y-5">
            {certificate.length ? (
              certificate.map((item, i) => (
                <div
                  key={i}
                  className="border-2 border-slate-200 w-[200px] rounded-lg shadow-lg"
                >
                  <img src={coding} alt="Certification" className="mb-2" />
                  <button className="bg-blue-500 text-white px-2 rounded-2xl text-xs my-2 mx-4">
                    Certification
                  </button>
                  <h3 className="font-semibold text-gray-800 px-4 py-2 text-sm">
                    {item}
                  </h3>
                </div>
              ))
            ) : (
              <p>No recommendations available</p>
            )}
          </div> */}

            {/* Competitions */}
            {/* <h3 className="py-4 text-xl font-bold flex justify-center">
            Recommended Competitions
          </h3>
          <div className="flex flex-wrap gap-x-3 gap-y-5">
            {competition.length ? (
              competition.map((item, i) => (
                <div
                  key={i}
                  className="border-2 border-slate-200 w-[200px] rounded-lg shadow-lg"
                >
                  <img src={coding} alt="Competition" className="mb-2" />
                  <button className="bg-green-400 text-white px-2 rounded-2xl text-xs my-2 mx-4">
                    Competition
                  </button>
                  <h3 className="font-semibold text-gray-800 px-4 pb-2 text-sm">
                    {item}
                  </h3>
                </div>
              ))
            ) : (
              <p>No recommendations available</p>
            )}
          </div> */}

            {parseUser?.is_mentor ? (
              ""
            ) : (
              <div className="mx-[5%] ">
                <RecommendationsPanel
                  course={course}
                  certificate={certificate}
                  competition={competition}
                />
              </div>
            )}
          </div>

          {/* Expert Section */}
          {loading ? (
            <div className="fixed inset-0 bg-white/70 flex justify-center items-center z-50">
              <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
            </div>
          ) : assignedMenteesData.length > 0 ||
            assignedMentorData.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-5 max-w-full mx-[4%] ">
              {/* Expert List */}

              <div className="bg-white rounded-2xl shadow p-6 mx-5">
                <h2 className="text-2xl font-bold mb-4">
                  {parseUser.is_mentor ? "Your Mentees" : "Your Experts"}
                </h2>
                <div className="space-y-4 flex-1 md:w-[400px]">
                  {parseUser?.is_mentor
                    ? paginatedMentorData.length < 1
                      ? "No Assigned Mentor"
                      : paginatedMentorData.map((user) => (
                          <div
                            key={user.user_id}
                            onClick={() => setSelectedExpertKey(user?.user_id)}
                            className={`border rounded-xl px-4 py-2 flex justify-betwe0en items-center cursor-pointer ${
                              selectedExpertKey === user?.user_id
                                ? "border-emerald-500"
                                : ""
                            }`}
                          >
                            <div className="flex items-center justify-between w-full ">
                              <img src={pic} alt="mentor" width={70} />
                              <div className="flex flex-col justify-center">
                                <p className="font-medium text-gray-800">
                                  {user?.basic_info.firstname}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {user.username}
                                </p>
                              </div>
                              <div className="">
                                <ChatWidget
                                  mentorName={user?.basic_info.firstname}
                                  mentorId={user.user_id}
                                  isOpen={openChatMentor === user.user_id}
                                  onToggle={() =>
                                    setOpenChatMentor(
                                      openChatMentor === user.user_id
                                        ? null
                                        : user.user_id
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        ))
                    : paginatedMenteeData.length < 1
                    ? "No Assigned Mentor"
                    : paginatedMenteeData.map((mentor) => (
                        <div
                          key={mentor.mentor_id}
                          onClick={() => setSelectedExpertKey(mentor.mentor_id)}
                          className={`border rounded-xl px-4 py-2 flex justify-between items-center cursor-pointer ${
                            selectedExpertKey === mentor.mentor_id
                              ? "border-emerald-500"
                              : ""
                          }`}
                        >
                          <div className="flex items-center justify-between w-full ">
                            <img src={pic} alt="mentor" width={70} />
                            <div className="flex flex-col justify-center">
                              <p className="font-medium text-gray-800">
                                {mentor.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {mentor.expertise}
                              </p>
                            </div>
                            <div className="">
                              <ChatWidget
                                mentorName={mentor.name}
                                mentorId={
                                  parseUser?.is_mentor
                                    ? parseUser?.user_id
                                    : mentor.mentor_id
                                }
                                isOpen={openChatMentor === mentor.mentor_id}
                                onToggle={() =>
                                  setOpenChatMentor(
                                    openChatMentor === mentor.mentor_id
                                      ? null
                                      : mentor.mentor_id
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      {totalPages > 1 && (
  <div className="flex justify-center gap-2 mt-4">
    <button
      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      disabled={currentPage === 1}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Prev
    </button>

    <span className="px-3 py-1 font-medium">
      {currentPage} / {totalPages}
    </span>

    <button
      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
)}

                </div>

                {/* <div className="mt-6 flex justify-center">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-600 flex gap-2">
                Find More Experts <Search size={20} />
              </button>
            </div> */}
              </div>

              {/* Expert Progress */}
              <div className="bg-white rounded-2xl shadow p-6 flex-1 mx-5">
                <h2 className="text-2xl mb-4 font-bold text-center">
                  {parseUser.is_mentor
                    ? "Progress with Mentees"
                    : "Progress with Experts"}
                </h2>
                {selectedExpertData ? (
                  <div className="space-y-3">
                             
                             <div className="relative">
                   {/* spine */}
                   <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gray-200" />
                 
                   <div className="space-y-6">
                     {selectedExpertData.map((m: any,index:number)=> (
                       <div key={index} className="relative pl-12">
                         {/* dot */}
                         <div className="absolute left-[10px] top-4 h-3 w-3 rounded-full bg-blue-500" />
                 
                         {/* milestone card */}
                         <div className="border rounded-xl p-4 bg-white shadow-sm">
                           {/* TITLE */}
                           
                             <p className="text-sm font-semibold">{m.milestone}</p>
                           
                 
                           {/* DESCRIPTION */}
                           
                             <p className="text-xs text-gray-500 mt-1">
                               {m.description}
                             </p>

                              <p className={`text-xs ${m.status==="completed"?"text-green-500":"text-yellow-500"} mt-1`}>
                               {m.status}
                             </p>
                           
                 
                           {/* DATE */}
                           <div className="flex items-center gap-2 mt-3 text-xs text-gray-600">
                             <Calendar className="h-3 w-3 text-green-600" />
                            
                               <span>Due: {m.expectedCompletionDate}</span>
                             
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
                 
                             
                           </div>
                ) : (
                  <p className="flex justify-center font-semibold text-lg">
                    Not Available
                  </p>
                )}
              </div>
            </div>
          ) : parseUser?.is_mentor && assignedMenteesData.length === 0 ? (
            <div className="mx-[5%]">
              <MilestoneFlowExpertTimeline />
            </div>
          ) : (
            <div className="mx-[5%]">
              <MilestoneFlowTimeline setActivePage={setActivePage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingDashboard;
