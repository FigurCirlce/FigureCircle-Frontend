// // import React, { useState } from "react";
// // import { useParams } from "react-router-dom";
// // import baseURL from "@/config/config";
// // import { useEffect } from "react";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import { useUserContext } from "../../components/context/userContext";
// // // import { useNavigate } from "react-router-dom";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // // import { Button } from "@/components/ui/button";
// // import { Loader2 } from "lucide-react";
// // interface StatusProps {
// //   label: string;
// //   value: boolean;
// // }

// // interface FeedbackCardProps {
// //   title: string;
// //   data: any; // improve later if needed
// //   type: string;
// // }

// // interface EmptyCardProps {
// //   title: string;
// //   message: string;
// //   // actionLabel: string;
// // }
// // interface Feedback {
// //   user_id: number;
// //   mentor_id: number;
// //   check_meeting_id: number;
// //   progress_rating: number;
// //   // add only fields you actually use
// // }

// // interface TypeMilestone {
// //   milestone?: string;
// //   description?: string;
// //   expectedCompletionDate?: string;
// //   status?: string;
// // }

// // interface InlineDropdownProps {
// //   milestones?: TypeMilestone[];
// //   selectedMilestone: number | null;
// //   onSelectMilestone: (index: number | null) => void;
// // }

// // const InlineDropdown: React.FC<InlineDropdownProps> = ({
// //   milestones = [],
// //   selectedMilestone,
// //   onSelectMilestone,
// // }) => {
// //   return (
// //     <select
// //       value={selectedMilestone ?? ""}
// //       onChange={(e) =>
// //         onSelectMilestone(e.target.value ? Number(e.target.value) : null)
// //       }
// //       className="inline-block mx-2 px-3 py-1 border border-gray-300 rounded-md text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //     >
// //       <option value="">this</option>
// //       {milestones.map((milestone: TypeMilestone, index: number) => (
// //         <option key={index} value={index} onSelect={setIndex}>
// //           {milestone?.milestone}
// //         </option>
// //       ))}
// //     </select>
// //   );
// // };

// // const FeedbackUI = ({
// //   feedbackData,
// //   myUserId,
// //   type,
// // }: {
// //   feedbackData: any[];
// //   myUserId: Number;
// //   type: string;
// // }) => {
// //   const myFeedback = feedbackData.find((f) => f.user_id === myUserId);
// //   const mentorFeedback = feedbackData.find((f) => f.user_id !== myUserId);

// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
// //       {myFeedback ? (
// //         <FeedbackCard title="Your Feedback" data={myFeedback} type="You" />
// //       ) : (
// //         <EmptyCard
// //           title="Your Feedback"
// //           message="You have not submitted feedback yet"
// //           // actionLabel="Submit Feedback"
// //         />
// //       )}

// //       {mentorFeedback ? (
// //         <FeedbackCard
// //           title={type === "Mentor" ? "Mentee Feedback" : "Mentor Feedback"}
// //           data={mentorFeedback}
// //           type="Mentor"
// //         />
// //       ) : (
// //         <EmptyCard
// //           title="Mentor Feedback"
// //           message="Mentor has not submitted feedback yet"
// //           // actionLabel="Send Reminder"
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // /* ---------------- COMPONENTS ---------------- */

// // function FeedbackCard({ title, data, type }: FeedbackCardProps) {
// //   return (
// //     <Card className="rounded-2xl shadow-md">
// //       <CardContent className="p-6 space-y-4">
// //         <div className="flex justify-between items-center">
// //           <h2 className="text-lg font-semibold">{title}</h2>
// //           <Badge variant={type === "You" ? "default" : "secondary"}>
// //             {title.split(" ")[0]}
// //           </Badge>
// //         </div>

// //         <p className="text-sm text-gray-500">
// //           Submitted on {new Date(data.created_at).toLocaleString()}
// //         </p>

// //         <div>
// //           <p className="text-sm font-medium">Milestone</p>
// //           <p className="text-base">{data.milestone}</p>
// //         </div>

// //         <div className="flex flex-wrap gap-4">
// //           <Status label="Milestone Achieved" value={data.milestone_achieved} />
// //           <Status
// //             label="Next Steps Identified"
// //             value={data.next_steps_identified}
// //           />
// //           <Status
// //             label="User Responsibility"
// //             value={data.user_responsibility}
// //           />
// //           <Status
// //             label="Mentor Responsibility"
// //             value={data.mentor_responsibility}
// //           />
// //         </div>

// //         <div>
// //           <p className="text-sm font-medium">Progress Rating</p>
// //           <div className="flex gap-1 mt-1">
// //             {Array.from({ length: 5 }).map((_, i) => (
// //               <span
// //                 key={i}
// //                 className={`text-xl ${
// //                   i < data.progress_rating ? "text-yellow-400" : "text-gray-300"
// //                 }`}
// //               >
// //                 ★
// //               </span>
// //             ))}
// //           </div>
// //         </div>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// // function EmptyCard({ title, message }: EmptyCardProps) {
// //   return (
// //     <Card className="rounded-2xl border-2 border-dashed">
// //       <CardContent className="p-6 flex flex-col items-center justify-center space-y-4 text-center">
// //         <h2 className="text-lg font-semibold">{title}</h2>
// //         <p className="text-sm text-gray-500">{message}</p>
// //         {/* <Button variant="outline" size="sm">
// //           {actionLabel}
// //         </Button> */}
// //       </CardContent>
// //     </Card>
// //   );
// // }

// // function Status({ label, value }: StatusProps) {
// //   return (
// //     <div className="flex items-center gap-2">
// //       <span
// //         className={`w-3 h-3 rounded-full ${
// //           value ? "bg-green-500" : "bg-red-400"
// //         }`}
// //       />
// //       <span className="text-sm">{label}</span>
// //     </div>
// //   );
// // }

// // const FeedbackForm: React.FC = () => {
// //   const { id } = useParams<{ id: string }>();
// //   const [nextMilestone, setNextMilestone] = useState<"yes" | "no" | null>(null);
// //   const [growthValue, setGrowthValue] = useState("");
// //   const [sessionRating, setSessionRating] = useState(0);
// //   const [milestoneData, setMilestoneData] = useState<any>();
// //   const [complete, setComplete] = useState<"yes" | "no" | null>(null);
// //   const [message, setMessage] = useState<boolean>(false);
// //   const [itemPending, setItemPending] = useState<"yes" | "no" | null>(null);
// //   const { scheduleData } = useUserContext();
// //   const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);
// //   const [loading, setLoading] = useState(false);
// //   // const navigate = useNavigate();

// //   const token = localStorage.getItem("token");
// //   const user = localStorage.getItem("user");
// //   const parseUser = user ? JSON.parse(user) : null;
// //   const user_id = user ? JSON.parse(user)?.user_id : null;

// //   const growthOptions = [
// //     "Highly Valuable",
// //     "Moderately Valuable",
// //     "Slightly Valuable",
// //     "Not Valuable",
// //   ];

// //   const notifySuccess = () =>
// //     toast.success("Thank you for Submitting Feedback!");

// //   // useEffect(() => {
// //   //   if (id) {
// //   //     const fetchMeetingDetails = async () => {
// //   //       try {
// //   //         const response = await axios.get(`${baseURL}/api/validMeeting/${id}`);
// //   //         setMeetingData(response.data);
// //   //       } catch (error: any) {
// //   //         if (error.response && error.response.status === 403) {
// //   //           setErrorMessage(error.response.data.error);
// //   //         } else {
// //   //           console.error("Error fetching meeting details:", error);
// //   //         }
// //   //       }
// //   //     };

// //   //     fetchMeetingDetails();
// //   //   }
// //   // }, [id]);

// //   useEffect(() => {
// //     getFeedback();
// //     console.log("scheduleData---", scheduleData);
// //   }, []);

// //   const myFeedback = feedbackData.find((f) => f.user_id === user_id);

// //   const handleStatus = async () => {
// //     const token = localStorage.getItem("token");
// //     console.log("milestoneData", milestoneData);
// //     console.log("RAW current_milestone →", milestoneData?.current_milestone);
// //     console.log("Is array?", Array.isArray(milestoneData?.current_milestone));

// //     const milestones: TypeMilestone[] = milestoneData?.current_milestone || [];

// //     const activeMilestone = milestones.find((m: TypeMilestone) => m.milestone);
// //     console.log("activemIlestone", activeMilestone);
// //     const dataToUpdate = {
// //       serial_number: milestoneData?.serial_number,
// //       mentor_id: milestoneData?.mentor_id,
// //       user_id: milestoneData?.user_id,
// //       milestone_index: 1,
// //       milestone: {
// //         ...activeMilestone,
// //         status: complete === "yes" ? "completed" : "Pending",
// //       },
// //     };

// //     console.log("status----dataToUpdate", dataToUpdate);

// //     await axios.patch(`${baseURL}/api/milestone`, dataToUpdate, {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //         "Content-Type": "application/json",
// //       },
// //     });
// //   };

// //   const handleSubmit = async () => {
// //     try {
// //       const dataToSend = {
// //         user_id: user_id,
// //         mentor_id: scheduleData ? scheduleData.mentor_id : null,
// //         milestone: "Complete project draft",
// //         milestone_achieved:
// //           complete === "yes" ? true : itemPending === "no" ? true : false,
// //         next_steps_identified: complete
// //           ? true
// //           : nextMilestone === "yes"
// //             ? true
// //             : false,
// //         progress_rating: sessionRating,
// //         mentor_responsibility: complete === "yes" ? true : false,
// //         user_responsibility: complete === "yes" ? true : false,
// //         check_id: parseUser.is_mentor ? scheduleData?.mentor_id : user_id,
// //         check_meeting_id: Number(id),
// //       };

// //       const response = await axios.post(`${baseURL}/feedback`, dataToSend, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "application/json",
// //         },
// //       });
// //       console.log("response-data", response.data);
// //       setMessage(true);
// //       notifySuccess();
// //       handleStatus();
// //       // navigate(`/dashboard`);
// //       setTimeout(() => {
// //         window.close();
// //       }, 5000);
// //     } catch (error) {
// //       console.error("Feedback submission failed:", error);
// //     }
// //   };

// //   const fetchMilestoneData = async () => {
// //     const token = localStorage.getItem("token");

// //     if (!token) {
// //       toast.error("Token not found!");
// //       return;
// //     }
// //     try {
// //       const response = await axios.get(`${baseURL}/api/milestone`, {
// //         params: {
// //           user_id: scheduleData?.user_id,
// //           mentor_id: scheduleData?.mentor_id,
// //         },
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       console.log("response---milestone", response.data);
// //       const data = response.data;
// //       setMilestoneData(data);
// //       // if (response.data) {
// //       //     setMilestones(response.data.milestone);
// //       //     setMilestonesSerial(response.data);

// //       //     console.log('milestones', response.data);
// //       // } else {
// //       //     setErrorMessage('No milestones found.');
// //       // }
// //     } catch (error) {
// //       console.error("Error fetching milestones:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchMilestoneData();
// //   }, []);

// //   const getFeedback = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await axios.get(`${baseURL}/feedback`, {
// //         params: {
// //           user_id: user_id,
// //           mentor_id: scheduleData?.mentor_id,
// //           check_meeting_id: Number(id),
// //         },
// //       });
// //       console.log("res---feedback---", res.data);
// //       const data = res.data;
// //       setFeedbackData(data);
// //     } catch (error) {
// //       console.log("error", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <>
// //       {message ? (
// //         <div className="flex justify-center items-center w-full h-screen">
// //           <div className="text-lg font-bold">
// //             Thank You For Submitting Feedback...The window will close in few
// //             seconds
// //           </div>
// //         </div>
// //       ) : loading ? (
// //         <div className="fixed inset-0 bg-white/70 flex justify-center items-center z-50">
// //           <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
// //         </div>
// //       ) : myFeedback ? (
// //         <div>
// //           <FeedbackUI
// //             feedbackData={feedbackData}
// //             myUserId={user_id}
// //             type={parseUser.is_mentor ? "Mentor" : "Mentee"}
// //           />
// //         </div>
// //       ) : (
// //         <div className="p-6 max-w-3xl mx-auto font-sans text-sm border-2 border-slate-300 rounded-md shadow-md shadow-slate-400 my-10 bg-blue-50">
// //           <h1 className="text-3xl font-bold mb-4 flex justify-center">
// //             Feedback Form
// //           </h1>

// //           {/* Session Details */}
// //           <div className="border rounded-lg p-3 mb-6 flex justify-between items-center bg-white">
// //             <div className="flex items-center gap-6">
// //               <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
// //                 DD
// //               </div>
// //               <div>
// //                 <div className="font-semibold text-lg">
// //                   {" "}
// //                   {/* {scheduleData ? scheduleData.mentor_name : null} */}
// //                   {parseUser.is_mentor
// //                     ? scheduleData?.name
// //                     : scheduleData?.mentor_name}
// //                 </div>
// //                 <div className="text-gray-500 text-md">
// //                   {parseUser.is_mentor ? "Mentee" : "Mentor"}
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="text-gray-600 text-lg">
// //               <span className="font-medium !text-lg">Session Date:</span>{" "}
// //               {scheduleData
// //                 ? new Date(scheduleData.start_datetime).toLocaleDateString(
// //                     "en-GB",
// //                   )
// //                 : null}
// //             </div>
// //           </div>

// //           {/* Question 1 */}
// //           <div className="border rounded-lg p-6 bg-white shadow-sm mb-6">
// //             <div className="">
// //               <label className="block mb-1 text-gray-700 text-lg font-semibold ">
// //                 1. Will you mark
// //                 <InlineDropdown
// //         milestones={milestoneData?.current_milestone}
// //         selectedMilestone={selectedMilestoneIndex}
// //         onSelectMilestone={setSelectedMilestoneIndex}
// //       />
// //                 Milestone as Complete?
// //               </label>
// //               <div className="flex gap-4 mt-1 px-5">
// //                 {["Yes", "No"].map((val) => (
// //                   <button
// //                     key={val}
// //                     onClick={() =>
// //                       setComplete(val.toLowerCase() as "yes" | "no")
// //                     }
// //                     className={`px-4 py-2 rounded-full border mt-2 text-sm ${
// //                       complete === val.toLowerCase()
// //                         ? "bg-blue-600 text-white"
// //                         : "bg-white text-gray-700"
// //                     }`}
// //                   >
// //                     {val}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {complete === "no" && (
// //             <>
// //               <div className="border rounded-lg p-6 bg-white shadow-sm mb-6">
// //                 <div className="mb-10">
// //                   <label className="block mb-1 text-gray-700 font-semibold text-lg pb-3">
// //                     2. Are the items pending to discuss in the current meeting?
// //                   </label>
// //                   <div className="flex gap-4 mt-1 px-5">
// //                     {["Yes", "No"].map((val) => (
// //                       <button
// //                         key={val}
// //                         onClick={() =>
// //                           setItemPending(val.toLowerCase() as "yes" | "no")
// //                         }
// //                         className={`px-4 py-2 rounded-full border text-sm ${
// //                           itemPending === val.toLowerCase()
// //                             ? "bg-blue-600 text-white"
// //                             : "bg-white text-gray-700"
// //                         }`}
// //                       >
// //                         {val}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 <div className="mb-10">
// //                   <label className="block mb-1 text-gray-700 text-lg font-semibold pb-3">
// //                     3. New action items identified for next milestone/meet?
// //                   </label>
// //                   <div className="flex gap-4 mt-1 px-5">
// //                     {["Yes", "No"].map((val) => (
// //                       <button
// //                         key={val}
// //                         onClick={() =>
// //                           setNextMilestone(val.toLowerCase() as "yes" | "no")
// //                         }
// //                         className={`px-4 py-2 rounded-full border text-sm ${
// //                           nextMilestone === val.toLowerCase()
// //                             ? "bg-blue-600 text-white"
// //                             : "bg-white text-gray-700"
// //                         }`}
// //                       >
// //                         {val}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 <div className="mb-10">
// //                   <label className="block mb-1 text-gray-700 text-lg font-semibold pb-3">
// //                     4. Was the session valuable for your growth?
// //                   </label>
// //                   <div className="flex flex-wrap gap-3 px-5">
// //                     {growthOptions.map((label) => (
// //                       <button
// //                         key={label}
// //                         onClick={() => setGrowthValue(label)}
// //                         className={`px-4 py-2 rounded-full border text-sm ${
// //                           growthValue === label
// //                             ? "bg-blue-600 text-white"
// //                             : "bg-white text-gray-700"
// //                         }`}
// //                       >
// //                         {label}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Session Effectiveness Rating */}
// //             </>
// //           )}

// //           <div className="border rounded-lg p-6 bg-white shadow-sm">
// //             <h2 className="block mb-1 text-gray-700 text-xl font-semibold pb-3">
// //               Session Effectiveness Rating
// //             </h2>
// //             <p className="text-gray-600 mb-4 text-lg">
// //               Rate the overall effectiveness of the session on a scale of 1 to
// //               5.
// //             </p>
// //             <div className="flex gap-6 justify-center">
// //               {[1, 2, 3, 4, 5].map((num) => (
// //                 <label
// //                   key={num}
// //                   className="flex flex-col items-center gap-1 cursor-pointer"
// //                 >
// //                   <input
// //                     type="radio"
// //                     name="sessionRating"
// //                     className="hidden"
// //                     checked={sessionRating === num}
// //                     onChange={() => setSessionRating(num)}
// //                   />
// //                   <div
// //                     className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
// //                       sessionRating === num
// //                         ? "bg-blue-600 text-white border-blue-600"
// //                         : "text-gray-700 border-gray-400"
// //                     }`}
// //                   >
// //                     {num}
// //                   </div>
// //                 </label>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Submit Button */}
// //           <div className="flex justify-center w-full py-5">
// //             <button
// //               className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md shadow text-lg"
// //               onClick={handleStatus}
// //             >
// //               Submit Feedback
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default FeedbackForm;
// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import baseURL from "@/config/config";
// import { useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useUserContext } from "../../components/context/userContext";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Loader2 } from "lucide-react";

// interface StatusProps {
//   label: string;
//   value: boolean;
// }

// interface FeedbackCardProps {
//   title: string;
//   data: any;
//   type: string;
// }

// interface EmptyCardProps {
//   title: string;
//   message: string;
// }

// interface Feedback {
//   user_id: number;
//   mentor_id: number;
//   check_meeting_id: number;
//   progress_rating: number;
// }

// interface TypeMilestone {
//   milestone?: string;
//   description?: string;
//   expectedCompletionDate?: string;
//   status?: string;
// }

// interface InlineDropdownProps {
//   milestones?: TypeMilestone[];
//   selectedMilestone: number | null;
//   onSelectMilestone: (index: number | null) => void;
// }

// const InlineDropdown: React.FC<InlineDropdownProps> = ({
//   milestones = [],
//   selectedMilestone,
//   onSelectMilestone,
// }) => {
//   return (
//     <select
//       value={selectedMilestone ?? ""}
//       onChange={(e) => {
//         const value = e.target.value ? Number(e.target.value) : null;
//         onSelectMilestone(value);
//         console.log("Selected milestone index:", value);
//       }}
//       className="inline-block mx-2 px-3 py-1 border border-gray-300 rounded-md text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//     >
//       <option value="">Select Milestone</option>
//       {milestones.map((milestone: TypeMilestone, index: number) => (
//         <option key={index} value={index}>
//           {milestone?.milestone}
//         </option>
//       ))}
//     </select>
//   );
// };

// const FeedbackUI = ({
//   feedbackData,
//   myUserId,
//   type,
// }: {
//   feedbackData: any[];
//   myUserId: Number;
//   type: string;
// }) => {
//   const myFeedback = feedbackData.find((f) => f.user_id === myUserId);
//   const mentorFeedback = feedbackData.find((f) => f.user_id !== myUserId);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
//       {myFeedback ? (
//         <FeedbackCard title="Your Feedback" data={myFeedback} type="You" />
//       ) : (
//         <EmptyCard
//           title="Your Feedback"
//           message="You have not submitted feedback yet"
//         />
//       )}

//       {mentorFeedback ? (
//         <FeedbackCard
//           title={type === "Mentor" ? "Mentee Feedback" : "Mentor Feedback"}
//           data={mentorFeedback}
//           type="Mentor"
//         />
//       ) : (
//         <EmptyCard
//           title="Mentor Feedback"
//           message="Mentor has not submitted feedback yet"
//         />
//       )}
//     </div>
//   );
// };

// /* ---------------- COMPONENTS ---------------- */

// function FeedbackCard({ title, data, type }: FeedbackCardProps) {
//   return (
//     <Card className="rounded-2xl shadow-md">
//       <CardContent className="p-6 space-y-4">
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg font-semibold">{title}</h2>
//           <Badge variant={type === "You" ? "default" : "secondary"}>
//             {title.split(" ")[0]}
//           </Badge>
//         </div>

//         <p className="text-sm text-gray-500">
//           Submitted on {new Date(data.created_at).toLocaleString()}
//         </p>

//         <div>
//           <p className="text-sm font-medium">Milestone</p>
//           <p className="text-base">{data.milestone}</p>
//         </div>

//         <div className="flex flex-wrap gap-4">
//           <Status label="Milestone Achieved" value={data.milestone_achieved} />
//           <Status
//             label="Next Steps Identified"
//             value={data.next_steps_identified}
//           />
//           <Status
//             label="User Responsibility"
//             value={data.user_responsibility}
//           />
//           <Status
//             label="Mentor Responsibility"
//             value={data.mentor_responsibility}
//           />
//         </div>

//         <div>
//           <p className="text-sm font-medium">Progress Rating</p>
//           <div className="flex gap-1 mt-1">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <span
//                 key={i}
//                 className={`text-xl ${
//                   i < data.progress_rating ? "text-yellow-400" : "text-gray-300"
//                 }`}
//               >
//                 ★
//               </span>
//             ))}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// function EmptyCard({ title, message }: EmptyCardProps) {
//   return (
//     <Card className="rounded-2xl border-2 border-dashed">
//       <CardContent className="p-6 flex flex-col items-center justify-center space-y-4 text-center">
//         <h2 className="text-lg font-semibold">{title}</h2>
//         <p className="text-sm text-gray-500">{message}</p>
//       </CardContent>
//     </Card>
//   );
// }

// function Status({ label, value }: StatusProps) {
//   return (
//     <div className="flex items-center gap-2">
//       <span
//         className={`w-3 h-3 rounded-full ${
//           value ? "bg-green-500" : "bg-red-400"
//         }`}
//       />
//       <span className="text-sm">{label}</span>
//     </div>
//   );
// }

// const FeedbackForm: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [nextMilestone, setNextMilestone] = useState<"yes" | "no" | null>(null);
//   const [growthValue, setGrowthValue] = useState("");
//   const [sessionRating, setSessionRating] = useState(0);
//   const [milestoneData, setMilestoneData] = useState<any>();
//   const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<
//     number | null
//   >(null);
//   const [message, setMessage] = useState<boolean>(false);
//   const [itemPending, setItemPending] = useState<"yes" | "no" | null>(null);
//   const { scheduleData } = useUserContext();
//   const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");
//   const user = localStorage.getItem("user");
//   const parseUser = user ? JSON.parse(user) : null;
//   const user_id = user ? JSON.parse(user)?.user_id : null;

//   const growthOptions = [
//     "Highly Valuable",
//     "Moderately Valuable",
//     "Slightly Valuable",
//     "Not Valuable",
//   ];

//   const notifySuccess = () =>
//     toast.success("Thank you for Submitting Feedback!");

//   useEffect(() => {
//     getFeedback();
//     console.log("scheduleData---", scheduleData);
//   }, []);

//   const myFeedback = feedbackData.find((f) => f.user_id === user_id);

//   const handleStatus = async () => {
//     const token = localStorage.getItem("token");
//     console.log("milestoneData", milestoneData);
//     console.log("selectedMilestoneIndex:", selectedMilestoneIndex);

//     const milestones: TypeMilestone[] = milestoneData?.current_milestone || [];

//     if (selectedMilestoneIndex === null) {
//       toast.error("Please select a milestone");
//       return;
//     }

//     const selectedMilestone = milestones[selectedMilestoneIndex];
//     console.log("Selected milestone:", selectedMilestone);

//     const dataToUpdate = {
//       serial_number: milestoneData?.serial_number,
//       mentor_id: milestoneData?.mentor_id,
//       user_id: milestoneData?.user_id,
//       milestone_index: selectedMilestoneIndex,
//       milestone: {
//         ...selectedMilestone,
//         status: "completed",
//       },
//     };

//     console.log("status----dataToUpdate", dataToUpdate);

//     try {
//       await axios.patch(`${baseURL}/api/milestone`, dataToUpdate, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//     } catch (error) {
//       console.error("Error updating milestone:", error);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const milestones: TypeMilestone[] =
//         milestoneData?.current_milestone || [];
//       const selectedMilestone =
//         selectedMilestoneIndex !== null
//           ? milestones[selectedMilestoneIndex]
//           : null;

//       console.log("Submitting with milestone index:", selectedMilestoneIndex);
//       console.log("Submitting with milestone:", selectedMilestone);

//       const dataToSend = {
//         user_id: user_id,
//         mentor_id: scheduleData ? scheduleData.mentor_id : null,
//         milestone: selectedMilestone?.milestone || "Complete project draft",
//         milestone_achieved:
//           selectedMilestoneIndex !== null
//             ? true
//             : itemPending === "no"
//               ? true
//               : false,
//         next_steps_identified:
//           selectedMilestoneIndex !== null
//             ? true
//             : nextMilestone === "yes"
//               ? true
//               : false,
//         progress_rating: sessionRating,
//         mentor_responsibility: selectedMilestoneIndex !== null ? true : false,
//         user_responsibility: selectedMilestoneIndex !== null ? true : false,
//         check_id: parseUser.is_mentor ? scheduleData?.mentor_id : user_id,
//         check_meeting_id: Number(id),
//       };

//       const response = await axios.post(`${baseURL}/feedback`, dataToSend, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       console.log("response-data", response.data);
//       setMessage(true);
//       notifySuccess();
//       handleStatus();
//       setTimeout(() => {
//         window.close();
//       }, 5000);
//     } catch (error) {
//       console.error("Feedback submission failed:", error);
//     }
//   };

//   const fetchMilestoneData = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       toast.error("Token not found!");
//       return;
//     }
//     try {
//       const response = await axios.get(`${baseURL}/api/milestone`, {
//         params: {
//           user_id: scheduleData?.user_id,
//           mentor_id: scheduleData?.mentor_id,
//         },
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("response---milestone", response.data);
//       const data = response.data;
//       setMilestoneData(data);
//     } catch (error) {
//       console.error("Error fetching milestones:", error);
//     }
//   };

//   useEffect(() => {
//     fetchMilestoneData();
//   }, []);

//   const getFeedback = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseURL}/feedback`, {
//         params: {
//           user_id: user_id,
//           mentor_id: scheduleData?.mentor_id,
//           check_meeting_id: Number(id),
//         },
//       });
//       console.log("res---feedback---", res.data);
//       const data = res.data;
//       setFeedbackData(data);
//     } catch (error) {
//       console.log("error", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {message ? (
//         <div className="flex justify-center items-center w-full h-screen">
//           <div className="text-lg font-bold">
//             Thank You For Submitting Feedback...The window will close in few
//             seconds
//           </div>
//         </div>
//       ) : loading ? (
//         <div className="fixed inset-0 bg-white/70 flex justify-center items-center z-50">
//           <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
//         </div>
//       ) : myFeedback ? (
//         <div>
//           <FeedbackUI
//             feedbackData={feedbackData}
//             myUserId={user_id}
//             type={parseUser.is_mentor ? "Mentor" : "Mentee"}
//           />
//         </div>
//       ) : (
//         <div className="p-6 mx-6 max-w-3xl sm:mx-auto font-sans text-sm border-2 border-slate-300 rounded-md shadow-md shadow-slate-400 my-10 bg-blue-50">
//           <h1 className="text-3xl font-bold mb-4 flex justify-center">
//             Feedback Form
//           </h1>

//           {/* Session Details */}
//           {/* <div className="border rounded-lg p-3 mb-6 flex justify-between items-center bg-white">
//             <div className="flex items-center gap-6">
//               <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
//                 DD
//               </div>
//               <div>
//                 <div className="font-semibold text-lg">
//                   {parseUser.is_mentor
//                     ? scheduleData?.name
//                     : scheduleData?.mentor_name}
//                 </div>
//                 <div className="text-gray-500 text-md">
//                   {parseUser.is_mentor ? "Mentee" : "Mentor"}
//                 </div>
//               </div>
//             </div>
//             <div className="text-gray-600 text-lg">
//               <span className="font-medium !text-lg">Session Date:</span>{" "}
//               {scheduleData
//                 ? new Date(scheduleData.start_datetime).toLocaleDateString(
//                     "en-GB"
//                   )
//                 : null}
//             </div>
//           </div> */}
//           <div className="border rounded-lg p-3 mb-6 bg-white">
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//               {/* LEFT SIDE */}
//               <div className="flex items-center gap-6">
//                 <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
//                   DD
//                 </div>

//                 <div>
//                   <div className="font-semibold text-lg">
//                     {parseUser.is_mentor
//                       ? scheduleData?.name
//                       : scheduleData?.mentor_name}
//                   </div>
//                   <div className="text-gray-500 text-md">
//                     {parseUser.is_mentor ? "Mentee" : "Mentor"}
//                   </div>
//                 </div>
//               </div>

//               {/* RIGHT SIDE */}
//               <div className="text-gray-600 text-[15px] sm:text-lg sm:text-right">
//                 <span className="font-medium text-[15px] sm:text-lg">Session Date:</span>{" "}
//                 {scheduleData
//                   ? new Date(scheduleData.start_datetime).toLocaleDateString(
//                       "en-GB",
//                     )
//                   : null}
//               </div>
//             </div>
//           </div>

//           {/* Question 1 */}
//           <div className="border rounded-lg p-6 bg-white shadow-sm mb-6">
//             <div>
//               <label className="block mb-3 text-gray-700 text-lg font-semibold leading-relaxed">
//                 1. Will you mark
//                 <InlineDropdown
//                   milestones={milestoneData?.current_milestone}
//                   selectedMilestone={selectedMilestoneIndex}
//                   onSelectMilestone={setSelectedMilestoneIndex}
//                 />
//                 Milestone as Complete?
//               </label>

//               {/* Show milestone details below if selected */}
//               {/* {selectedMilestoneIndex !== null &&
//                 milestoneData?.current_milestone?.[selectedMilestoneIndex] && (
//                   <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm">
//                     <p className="text-gray-700">
//                       <span className="font-medium">Selected Index:</span>{" "}
//                       {selectedMilestoneIndex}
//                     </p>
//                     <p className="text-gray-700">
//                       <span className="font-medium">Milestone:</span>{" "}
//                       {
//                         milestoneData.current_milestone[selectedMilestoneIndex]
//                           .milestone
//                       }
//                     </p>
//                     <p className="text-gray-700">
//                       <span className="font-medium">Status:</span>{" "}
//                       {
//                         milestoneData.current_milestone[selectedMilestoneIndex]
//                           .status
//                       }
//                     </p>
//                     <p className="text-gray-700">
//                       <span className="font-medium">Expected Completion:</span>{" "}
//                       {
//                         milestoneData.current_milestone[selectedMilestoneIndex]
//                           .expectedCompletionDate
//                       }
//                     </p>
//                   </div>
//                 )} */}
//             </div>
//           </div>

//           {selectedMilestoneIndex === null && (
//             <>
//               <div className="border rounded-lg p-6 bg-white shadow-sm mb-6">
//                 <div className="mb-10">
//                   <label className="block mb-1 text-gray-700 font-semibold text-lg pb-3">
//                     2. Are the items pending to discuss in the current meeting?
//                   </label>
//                   <div className="flex gap-4 mt-1 px-5">
//                     {["Yes", "No"].map((val) => (
//                       <button
//                         key={val}
//                         onClick={() =>
//                           setItemPending(val.toLowerCase() as "yes" | "no")
//                         }
//                         className={`px-4 py-2 rounded-full border text-sm ${
//                           itemPending === val.toLowerCase()
//                             ? "bg-blue-600 text-white"
//                             : "bg-white text-gray-700"
//                         }`}
//                       >
//                         {val}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="mb-10">
//                   <label className="block mb-1 text-gray-700 text-lg font-semibold pb-3">
//                     3. New action items identified for next milestone/meet?
//                   </label>
//                   <div className="flex gap-4 mt-1 px-5">
//                     {["Yes", "No"].map((val) => (
//                       <button
//                         key={val}
//                         onClick={() =>
//                           setNextMilestone(val.toLowerCase() as "yes" | "no")
//                         }
//                         className={`px-4 py-2 rounded-full border text-sm ${
//                           nextMilestone === val.toLowerCase()
//                             ? "bg-blue-600 text-white"
//                             : "bg-white text-gray-700"
//                         }`}
//                       >
//                         {val}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="mb-10">
//                   <label className="block mb-1 text-gray-700 text-lg font-semibold pb-3">
//                     4. Was the session valuable for your growth?
//                   </label>
//                   <div className="flex flex-wrap gap-3 px-5">
//                     {growthOptions.map((label) => (
//                       <button
//                         key={label}
//                         onClick={() => setGrowthValue(label)}
//                         className={`px-4 py-2 rounded-full border text-sm ${
//                           growthValue === label
//                             ? "bg-blue-600 text-white"
//                             : "bg-white text-gray-700"
//                         }`}
//                       >
//                         {label}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}

//           <div className="border rounded-lg p-6 bg-white shadow-sm">
//             <h2 className="block mb-1 text-gray-700 text-xl font-semibold pb-3">
//               Session Effectiveness Rating
//             </h2>
//             <p className="text-gray-600 mb-4 text-lg">
//               Rate the overall effectiveness of the session on a scale of 1 to
//               5.
//             </p>
//             <div className="flex gap-6 justify-center">
//               {[1, 2, 3, 4, 5].map((num) => (
//                 <label
//                   key={num}
//                   className="flex flex-col items-center gap-1 cursor-pointer"
//                 >
//                   <input
//                     type="radio"
//                     name="sessionRating"
//                     className="hidden"
//                     checked={sessionRating === num}
//                     onChange={() => setSessionRating(num)}
//                   />
//                   <div
//                     className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
//                       sessionRating === num
//                         ? "bg-blue-600 text-white border-blue-600"
//                         : "text-gray-700 border-gray-400"
//                     }`}
//                   >
//                     {num}
//                   </div>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-center w-full py-5">
//             <button
//               className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md shadow text-lg"
//               onClick={handleSubmit}
//             >
//               Submit Feedback
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default FeedbackForm;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import baseURL from "@/config/config";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserContext } from "../../components/context/userContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface StatusProps {
  label: string;
  value: boolean;
}

interface FeedbackCardProps {
  title: string;
  data: any;
  type: string;
}

interface EmptyCardProps {
  title: string;
  message: string;
}

interface Feedback {
  user_id: number;
  mentor_id: number;
  check_meeting_id: number;
  progress_rating: number;
}

interface TypeMilestone {
  milestone?: string;
  description?: string;
  expectedCompletionDate?: string;
  status?: string;
}

interface InlineDropdownProps {
  milestones?: TypeMilestone[];
  selectedMilestone: number | null;
  onSelectMilestone: (index: number | null) => void;
}

const InlineDropdown: React.FC<InlineDropdownProps> = ({
  milestones = [],
  selectedMilestone,
  onSelectMilestone,
}) => {
  return (
    <select
      value={selectedMilestone ?? ""}
      onChange={(e) => {
        const value = e.target.value ? Number(e.target.value) : null;
        onSelectMilestone(value);
        console.log("Selected milestone index:", value);
      }}
      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option value="">Select Milestone</option>
      {milestones.map((milestone: TypeMilestone, index: number) => (
        <option key={index} value={index}>
          {milestone?.milestone}
        </option>
      ))}
    </select>
  );
};

const FeedbackUI = ({
  feedbackData,
  myUserId,
  type,
}: {
  feedbackData: any[];
  myUserId: Number;
  type: string;
}) => {
  const myFeedback = feedbackData.find((f) => f.user_id === myUserId);
  const mentorFeedback = feedbackData.find((f) => f.user_id !== myUserId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {myFeedback ? (
        <FeedbackCard title="Your Feedback" data={myFeedback} type="You" />
      ) : (
        <EmptyCard
          title="Your Feedback"
          message="You have not submitted feedback yet"
        />
      )}

      {mentorFeedback ? (
        <FeedbackCard
          title={type === "Mentor" ? "Mentee Feedback" : "Mentor Feedback"}
          data={mentorFeedback}
          type="Mentor"
        />
      ) : (
        <EmptyCard
          title="Mentor Feedback"
          message="Mentor has not submitted feedback yet"
        />
      )}
    </div>
  );
};

/* ---------------- COMPONENTS ---------------- */

function FeedbackCard({ title, data, type }: FeedbackCardProps) {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Badge variant={type === "You" ? "default" : "secondary"}>
            {title.split(" ")[0]}
          </Badge>
        </div>

        <p className="text-sm text-gray-500">
          Submitted on {new Date(data.created_at).toLocaleString()}
        </p>

        <div>
          <p className="text-sm font-medium">Milestone</p>
          <p className="text-base">{data.milestone}</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Status label="Milestone Achieved" value={data.milestone_achieved} />
          <Status
            label="Next Steps Identified"
            value={data.next_steps_identified}
          />
          {type==="Mentor" &&
          <Status
            label="User Responsibility"
            value={data.user_responsibility}
          />
}
  {type==="You" &&
          <Status
            label="Mentor Responsibility"
            value={data.mentor_responsibility}
          />
  }
        </div>
        

        <div>
          <p className="text-sm font-medium">Progress Rating</p>
          <div className="flex gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-xl ${
                  i < data.progress_rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyCard({ title, message }: EmptyCardProps) {
  return (
    <Card className="rounded-2xl border-2 border-dashed">
      <CardContent className="p-6 flex flex-col items-center justify-center space-y-4 text-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">{message}</p>
      </CardContent>
    </Card>
  );
}

function Status({ label, value }: StatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-3 h-3 rounded-full ${
          value ? "bg-green-500" : "bg-red-400"
        }`}
      />
      <span className="text-sm">{label}</span>
    </div>
  );
}

const FeedbackForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nextMilestone, setNextMilestone] = useState<"yes" | "no" | null>(null);
  const [growthValue, setGrowthValue] = useState("");
  const [sessionRating, setSessionRating] = useState(0);
  const [milestoneData, setMilestoneData] = useState<any>();
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<
    number | null
  >(null);
  const [message, setMessage] = useState<boolean>(false);
  const [itemPending, setItemPending] = useState<"yes" | "no" | null>(null);
   const [milestone_achieved, setMilestone_achieved] = useState<"yes" | "no" | null>(null);
  const { scheduleData } = useUserContext();
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const parseUser = user ? JSON.parse(user) : null;
  const user_id = user ? JSON.parse(user)?.user_id : null;

  const growthOptions = [
    "Highly Valuable",
    "Moderately Valuable",
    "Slightly Valuable",
    "Not Valuable",
  ];

  const notifySuccess = () =>
    toast.success("Thank you for Submitting Feedback!");

  useEffect(() => {
    getFeedback();
    console.log("scheduleData---", scheduleData);
  }, []);

  const myFeedback = feedbackData.find((f) => f.user_id === user_id);

  const handleStatus = async () => {
    const token = localStorage.getItem("token");
    console.log("milestoneData", milestoneData);
    console.log("selectedMilestoneIndex:", selectedMilestoneIndex);

    const milestones: TypeMilestone[] = milestoneData?.current_milestone || [];

    if (selectedMilestoneIndex === null) {
      toast.error("Please select a milestone");
      return;
    }

    const selectedMilestone = milestones[selectedMilestoneIndex];
    console.log("Selected milestone:", selectedMilestone);

    const dataToUpdate = {
      serial_number: milestoneData?.serial_number,
      mentor_id: milestoneData?.mentor_id,
      user_id: milestoneData?.user_id,
      milestone_index: selectedMilestoneIndex,
      milestone: {
        ...selectedMilestone,
        status: "completed",
      },
    };

    console.log("status----dataToUpdate", dataToUpdate);

    try {
      await axios.patch(`${baseURL}/api/milestone`, dataToUpdate, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error updating milestone:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const milestones: TypeMilestone[] =
        milestoneData?.current_milestone || [];
      const selectedMilestone =
        selectedMilestoneIndex !== null
          ? milestones[selectedMilestoneIndex]
          : null;

      console.log("Submitting with milestone index:", selectedMilestoneIndex);
      console.log("Submitting with milestone:", selectedMilestone);

      const dataToSend = {
        user_id: user_id,
        mentor_id: scheduleData ? scheduleData.mentor_id : null,
        milestone: selectedMilestone?.milestone || "Complete project draft",
        milestone_achieved:
          selectedMilestoneIndex !== null && milestone_achieved === "yes"
              ? true
              : false,
        next_steps_identified:
          selectedMilestoneIndex !== null && nextMilestone === "yes"
              ? true
              : false,
        progress_rating: sessionRating,
        mentor_responsibility: selectedMilestoneIndex !== null && milestone_achieved === "yes"? true : false,
        user_responsibility: selectedMilestoneIndex !== null && nextMilestone === "yes" ? true : false,
        check_id: parseUser.is_mentor ? scheduleData?.mentor_id : user_id,
        check_meeting_id: Number(id),
      };

      const response = await axios.post(`${baseURL}/feedback`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("response-data", response.data);
      setMessage(true);
      notifySuccess();
      handleStatus();
      setTimeout(() => {
        window.close();
      }, 5000);
    } catch (error) {
      console.error("Feedback submission failed:", error);
    }
  };

  const fetchMilestoneData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Token not found!");
      return;
    }
    try {
      const response = await axios.get(`${baseURL}/api/milestone`, {
        params: {
          user_id: scheduleData?.user_id,
          mentor_id: scheduleData?.mentor_id,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response---milestone", response.data);
      const data = response.data;
      setMilestoneData(data);
    } catch (error) {
      console.error("Error fetching milestones:", error);
    }
  };

  useEffect(() => {
    fetchMilestoneData();
  }, []);

  const getFeedback = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseURL}/feedback`, {
        params: {
          user_id: user_id,
          mentor_id: scheduleData?.mentor_id,
          check_meeting_id: Number(id),
        },
      });
      console.log("res---feedback---", res.data);
      const data = res.data;
      setFeedbackData(data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {message ? (
        <div className="flex justify-center items-center w-full h-screen">
          <div className="text-lg font-bold">
            Thank You For Submitting Feedback...The window will close in few
            seconds
          </div>
        </div>
      ) : loading ? (
        <div className="fixed inset-0 bg-white/70 flex justify-center items-center z-50">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        </div>
      ) : myFeedback ? (
        <div>
          <FeedbackUI
            feedbackData={feedbackData}
            myUserId={user_id}
            type={parseUser.is_mentor ? "Mentor" : "Mentee"}
          />
        </div>
      ) : (
        <div className="p-6 mx-6 max-w-3xl sm:mx-auto font-sans text-sm border-2 border-slate-300 rounded-md shadow-md shadow-slate-400 my-10 bg-blue-50">
          <h1 className="text-3xl font-bold mb-4 flex justify-center">
            Feedback Form
          </h1>

          {/* Session Details */}
          <div className="border rounded-lg p-3 mb-6 bg-white">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              {/* LEFT SIDE */}
              <div className="flex items-center gap-6">
                <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  DD
                </div>

                <div>
                  <div className="font-semibold text-lg">
                    {parseUser.is_mentor
                      ? scheduleData?.name
                      : scheduleData?.mentor_name}
                  </div>
                  <div className="text-gray-500 text-md">
                    {parseUser.is_mentor ? "Mentee" : "Mentor"}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="text-gray-600 text-[15px] sm:text-lg sm:text-right">
                <span className="font-medium text-[15px] sm:text-lg">
                  Session Date:
                </span>{" "}
                {scheduleData
                  ? new Date(scheduleData.start_datetime).toLocaleDateString(
                      "en-GB"
                    )
                  : null}
              </div>
            </div>
          </div>

          {/* Milestone Selection */}
          <div className="border rounded-lg p-6 bg-white shadow-sm mb-6">
            <div>
              <label className="block mb-3 text-gray-700 text-lg font-semibold leading-relaxed">
                Select Milestone to Mark as Complete
              </label>
              <InlineDropdown
                milestones={milestoneData?.current_milestone}
                selectedMilestone={selectedMilestoneIndex}
                onSelectMilestone={setSelectedMilestoneIndex}
              />
            </div>
          </div>

          {/* All Questions - Always Visible */}
          <div className="border rounded-lg p-6 bg-white shadow-sm mb-6">

                <div className="mb-10">
              <label className="block mb-1 text-gray-700 font-semibold text-lg pb-3">
                1. Will You Mark this milestone as Complete?
              </label>
              <div className="flex gap-4 mt-1 px-5">
                {["Yes", "No"].map((val) => (
                  <button
                    key={val}
                    onClick={() =>
                      setMilestone_achieved(val.toLowerCase() as "yes" | "no")
                    }
                    className={`px-4 py-2 rounded-full border text-sm ${
                      milestone_achieved=== val.toLowerCase()
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-10">
              <label className="block mb-1 text-gray-700 font-semibold text-lg pb-3">
                1. Are the items pending to discuss in the current meeting?
              </label>
              <div className="flex gap-4 mt-1 px-5">
                {["Yes", "No"].map((val) => (
                  <button
                    key={val}
                    onClick={() =>
                      setItemPending(val.toLowerCase() as "yes" | "no")
                    }
                    className={`px-4 py-2 rounded-full border text-sm ${
                      itemPending === val.toLowerCase()
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <label className="block mb-1 text-gray-700 text-lg font-semibold pb-3">
                2. New action items identified for next milestone/meet?
              </label>
              <div className="flex gap-4 mt-1 px-5">
                {["Yes", "No"].map((val) => (
                  <button
                    key={val}
                    onClick={() =>
                      setNextMilestone(val.toLowerCase() as "yes" | "no")
                    }
                    className={`px-4 py-2 rounded-full border text-sm ${
                      nextMilestone === val.toLowerCase()
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <label className="block mb-1 text-gray-700 text-lg font-semibold pb-3">
                3. Was the session valuable for your growth?
              </label>
              <div className="flex flex-wrap gap-3 px-5">
                {growthOptions.map((label) => (
                  <button
                    key={label}
                    onClick={() => setGrowthValue(label)}
                    className={`px-4 py-2 rounded-full border text-sm ${
                      growthValue === label
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Session Effectiveness Rating */}
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h2 className="block mb-1 text-gray-700 text-xl font-semibold pb-3">
              Session Effectiveness Rating
            </h2>
            <p className="text-gray-600 mb-4 text-lg">
              Rate the overall effectiveness of the session on a scale of 1 to
              5.
            </p>
            <div className="flex gap-6 justify-center">
              {[1, 2, 3, 4, 5].map((num) => (
                <label
                  key={num}
                  className="flex flex-col items-center gap-1 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="sessionRating"
                    className="hidden"
                    checked={sessionRating === num}
                    onChange={() => setSessionRating(num)}
                  />
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                      sessionRating === num
                        ? "bg-blue-600 text-white border-blue-600"
                        : "text-gray-700 border-gray-400"
                    }`}
                  >
                    {num}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center w-full py-5">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md shadow text-lg"
              onClick={handleSubmit}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackForm;