// // // 
// // import React from "react";
// // import { X } from "lucide-react";



// // export interface MilestoneData {
// //   check_id: number;
// //   check_meeting_id: number;
// //   created_at: string;         // "Tue, 11 Nov 2025 08:39:30 GMT"
// //   history_count: number;
// //   milestone: Milestone[]; // optional if backend might not send it
// //   [key: string]: any;         // fallback for any extra fields you didn't list
// // }

// // export interface Milestone {
// //   id?: number;
// //   title?: string;
// //   stage?: string;
// //   status?: string;
// //   description?: string;
// //   created_at?: string;
// //   updated_at?: string;

// //   // handles any other backend fields
// //   [key: string]: any;
// // }



// // interface MilestonePopupProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   MilestoneData: MilestoneData;
// // }

// // function convertDateTime(datetimeStr: string | number | Date): string {
// //   const dateObj = new Date(datetimeStr);
// //   const day = String(dateObj.getDate()).padStart(2, "0");
// //   const month = String(dateObj.getMonth() + 1).padStart(2, "0");
// //   const year = dateObj.getFullYear();
// //   let hours = dateObj.getHours();
// //   const minutes = String(dateObj.getMinutes()).padStart(2, "0");
// //   const ampm = hours >= 12 ? "PM" : "AM";
// //   hours = hours % 12 || 12;
// //   const time = `${hours}:${minutes} ${ampm}`;
// //   const formattedDate = `${day}/${month}/${year}`;
// //   return `${formattedDate} ${time}`;
// // }

// // const MilestonePopup: React.FC<MilestonePopupProps> = ({ isOpen, onClose, MilestoneData }) => {
// //   if (!isOpen) return null;

// //   const getProgressColor = (rating: number) => {
// //     if (rating >= 4) return "text-green-600 bg-green-100";
// //     if (rating >= 3) return "text-yellow-600 bg-yellow-100";
// //     if (rating >= 1) return "text-orange-600 bg-orange-100";
// //     return "text-red-600 bg-red-100";
// //   };
// // console.log("MilestoneData----",MilestoneData);
  

// //   return (
// //     // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      
// //       { Object.keys(MilestoneData).length === 0?<div className="bg-white rounded-lg shadow-xl max-w-xl w-full mx-4 max-h-[90vh] overflow-y-auto">
// //         <div className="flex justify-between items-center p-6 border-b"> 
// //           <p className="text-red-500">
// //             No Milestone submitted for this meeting yet!!
// //           </p>
// //           <button
// //             onClick={onClose}
// //             className="text-gray-500 hover:text-gray-700 transition-colors"
// //           >
// //             <X size={24} />
// //           </button></div></div>:
          
// //           (
// //       <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
// //         <div className="flex justify-between items-center p-6 border-b">
// //           <h2 className="text-2xl font-bold text-gray-800">
// //             Milestone Details - Meeting ID: {MilestoneData.check_meeting_id}
// //           </h2>
// //           <button
// //             onClick={onClose}
// //             className="text-gray-500 hover:text-gray-700 transition-colors"
// //           >
// //             <X size={24} />
// //           </button>
// //         </div>

// //         <div className="p-6">
// //           <div className="border rounded-lg p-6 bg-gray-50">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div className="space-y-3">
// //                 <div className="flex items-center space-x-2">
// //                   <span className="font-semibold text-gray-700">History Count
// // :</span>
// //                   <span
// //                     className={`px-3 py-1 rounded-full font-medium ${getProgressColor(
// //                     MilestoneData.history_count

// //                     )}`}
// //                   >
// //                     {MilestoneData.history_count
// // } 
// //                   </span>
// //                 </div>

             
// //               <div>
// //                   { MilestoneData.map(item,index)=>
// //                   <span className="font-semibold text-gray-700 text-lg">Milestones:</span>
// //                   <p className="text-gray-600 mt-1"><span className="text-md ">Description-</span> {MilestoneData?.milestone?.description

// // }</p>
         
// //           <p className="text-gray-600 mt-1"><span className="text-md ">Milestone-</span>{MilestoneData?.latest_milestone?.milestone


// // }</p>   
// //      <p className="text-gray-600 mt-1"><span className="text-md ">Expected Completion Date-</span>{MilestoneData?.latest_milestone?.expectedCompletionDate

// // }</p> 
// //       }</div>


// //                 <div>
// //                   <span className="font-semibold text-gray-700">Created:</span>
// //                   <p className="text-gray-600">{convertDateTime(MilestoneData.created_at)}</p>
// //                 </div>

// //                 {/* <div>
// //                   <span className="font-semibold text-gray-700">Feedback ID:</span>
// //                   <p className="text-gray-600">{item.feedback_id}</p>
// //                 </div> */}
// //               </div>

             
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //      )}
// //     </div>
// //   );
// // };

// // export default MilestonePopup;
// import React from "react";
// import { X, BadgeInfo, Calendar, Clock } from "lucide-react";
// import MilestoneRoadmapPreviewTSX from "@/pages/NewPages/TrialNewMilestone";

// export interface MilestoneData {
//   check_id: number;
//   check_meeting_id: number;
//   created_at: string;
//   history_count: number;
//   // milestones: Milestone[];
//   current_milestone:Milestone[];
//   mentor_id: number;
//   serial_number: number;
//   user_id: number;
// }

// export interface Milestone {
//   milestone: string;
//   description: string;
//   expectedCompletionDate: string;
//   mentorFees?: number;
// }

// interface MilestonePopupProps {
//   isOpen: boolean;
//   onClose: () => void;
//   MilestoneData: MilestoneData | null;
//   is_mentor:boolean;
// }

// function convertDateTime(datetimeStr: string | number | Date): string {
//   const dateObj = new Date(datetimeStr);
//   const day = String(dateObj.getDate()).padStart(2, "0");
//   const month = String(dateObj.getMonth() + 1).padStart(2, "0");
//   const year = dateObj.getFullYear();
//   let hours = dateObj.getHours();
//   const minutes = String(dateObj.getMinutes()).padStart(2, "0");
//   const ampm = hours >= 12 ? "PM" : "AM";
//   hours = hours % 12 || 12;
//   const time = `${hours}:${minutes} ${ampm}`;
//   const formattedDate = `${day}/${month}/${year}`;
//   return `${formattedDate} ${time}`;
// }

// const MilestonePopup: React.FC<MilestonePopupProps> = ({
//   isOpen,
//   onClose,
//   MilestoneData,
//   is_mentor
// }) => {
//   if (!isOpen) return null;

//   const getProgressColor = (rating: number) => {
//     if (rating >= 4) return "text-green-600 bg-green-100";
//     if (rating >= 3) return "text-yellow-600 bg-yellow-100";
//     if (rating >= 1) return "text-orange-600 bg-orange-100";
//     return "text-red-600 bg-red-100";
//   };

//   console.log("MilestoneData----", MilestoneData);
//   console.log("is_mentor----", is_mentor);
//   return (
//     <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
//       {!MilestoneData || !MilestoneData.current_milestone || MilestoneData.current_milestone.length === 0 ? (
//         <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//           <div className="flex justify-between items-center p-6 border-b">
//           {!is_mentor? <div className="flex justify-between items-center w-full">
//             <p className="text-red-500 ">
//                "No Milestone submitted for this meeting yet!!"
            
//             </p>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700 transition-colors"
//             >
//               <X size={24} />
//             </button>
//             </div>
//             : <div className="w-full relative"><MilestoneRoadmapPreviewTSX/>
//              <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700 transition-colors absolute top-0 right-0"
//             >
//               <X size={30} />
//             </button></div>}
//           </div>
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//           <div className="flex justify-between items-center p-3 border-b">
//             <h2 className="text-xl font-bold text-gray-800">
//               Milestone Details - Meeting ID: {MilestoneData.check_meeting_id}
//             </h2>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700 transition-colors"
//             >
//               <X size={24} />
//             </button>
//           </div>

//           <div className="py-3 px-6">
//             <div className="border rounded-lg p-3 bg-gray-50">
//               {/* Metadata Section */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-1 border-b">
//                 <div className="flex items-center space-x-2">
//                   <span className="font-semibold text-gray-700">
//                     History Count:
//                   </span>
//                   <span
//                     className={`px-3 py-1 rounded-full font-medium ${getProgressColor(
//                       MilestoneData.history_count
//                     )}`}
//                   >
//                     {MilestoneData.history_count}
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Clock className="h-4 w-4 text-blue-600" />
//                   <span className="font-semibold text-gray-700">Created:</span>
//                   <span className="text-gray-600">
//                     {convertDateTime(MilestoneData.created_at)}
//                   </span>
//                 </div>

//                 <div className="text-sm text-gray-600">
//                   <span className="font-semibold">Milestones:</span>{" "}
//                   {MilestoneData.current_milestone.length}
//                 </div>
//               </div>

//               {/* Milestones List */}
//               <div className="space-y-3">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                   All Milestones
//                 </h3>
//                 {MilestoneData.current_milestone.map((milestone, index) => (
//                   <div
//                     key={index}
//                     className="border-b pb-4 last:border-b-0 bg-white p-4 rounded-lg shadow-sm"
//                   >
//                     <div className="flex items-start gap-4 mb-3">
//                       <BadgeInfo className="text-blue-500 mt-1 flex-shrink-0" />
//                       <div className="flex-1">
//                         <p className="text-lg font-medium text-gray-800">
//                           {milestone.milestone}
//                         </p>
//                         <p className="text-sm text-gray-500 mt-1">
//                           {milestone.description}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700 ml-10">
//                       <div className="flex items-center gap-2">
//                         <Calendar className="h-4 w-4 text-green-600" />
//                         <span className="font-semibold">
//                           Due:{" "}
//                           <span className="font-normal">
//                             {milestone.expectedCompletionDate}
//                           </span>
//                         </span>
//                       </div>
//                       {milestone.mentorFees !== undefined && (
//                         <div className="flex items-center gap-2">
//                           <span className="font-semibold">
//                             Mentor Fee:{" "}
//                             <span className="font-normal">
//                               ${milestone.mentorFees}
//                             </span>
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Reference IDs */}
//               <div className="text-xs text-gray-400 pt-4 border-t mt-6">
//                 <p>
//                   Ref IDs - Check ID: {MilestoneData.check_id}, Meeting ID:{" "}
//                   {MilestoneData.check_meeting_id}, User:{" "}
//                   {MilestoneData.user_id}, Mentor: {MilestoneData.mentor_id},
//                   Serial: {MilestoneData.serial_number}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MilestonePopup;
import React, { useEffect, useState } from "react";
import { X, BadgeInfo, Calendar, Clock } from "lucide-react";
import CreateMilestone from "./MilestoneNewForm";
import axios from "axios";
import baseURL from "@/config/config";

/* ================= TYPES ================= */

export interface Milestone {
  milestone: string;
  description: string;
  expectedCompletionDate: string;
  mentorFees?: number;
}

export interface MilestoneHistory {
  id: number;
  edited_at: string;        // "Wed, 21 Jan 2026 13:18:53 GMT"
  edited_by: string;        // mentor email
  milestone_state: Milestone[];
}



export interface MilestoneData {
  check_id: number;
  check_meeting_id: number;
  created_at: string;
  history_count: number;
  history: MilestoneHistory[];
  current_milestone: Milestone[];
  mentor_id: number;
  serial_number: number;
  user_id: number;
}

interface MilestonePopupProps {
  isOpen: boolean;
  onClose: () => void;
  MilestoneData: MilestoneData | null;
  is_mentor: boolean;
  userId?:number;
}

/* ================= HELPERS ================= */

function formatDateTime(value: string) {
  const d = new Date(value);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = d.getHours() % 12 || 12;
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = d.getHours() >= 12 ? "PM" : "AM";
  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
}

/* ================= COMPONENT ================= */

const MilestonePopup: React.FC<MilestonePopupProps> = ({
  isOpen,
  onClose,
  MilestoneData,
  is_mentor,
  userId
}) => {
  if (!isOpen || !MilestoneData) return null;

  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [dataToSend,setDataToSend]=useState({});
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"current" | "history">("current");



  console.log("milestoneData----",MilestoneData);

 useEffect(() => {
  if (MilestoneData?.current_milestone) {
    // Remove duplicates (by milestone + description + expectedCompletionDate)
    const uniqueMilestones = MilestoneData.current_milestone.filter(
      (v,i,a) => a.findIndex(
        t => t.milestone === v.milestone && t.description === v.description && t.expectedCompletionDate === v.expectedCompletionDate
      ) === i
    );
    setMilestones(uniqueMilestones);
  }
}, [MilestoneData]);


  
    const degree=localStorage.getItem("degree");
    const parseDegree=degree?JSON.parse(degree):null;

   useEffect(() => {

    if (!MilestoneData) return; // guard

      const data= {
  user_id: userId,
  mentor_id: parseDegree.mentor_id,
  check_meeting_id: parseDegree.mentor_id,
  check_id: parseDegree.mentor_id,
};
setDataToSend(data);
  }, [MilestoneData]);

const handleChange = (index: number, field: keyof Milestone, value: string) => {
  setEditingIndex(index);
  setMilestones(prev =>
    prev.map((m, i) => (i === index ? { ...m, [field]: value } : m))
  );
};


  const handleSave = async() => {
    console.log("UPDATED MILESTONES:", milestones);
    console.log("HIIIII:", milestones);
     if (editingIndex === null) return;
    const token=localStorage.getItem("token");
   

     const updatedMilestone = milestones[editingIndex];

      const dataToUpdate = {
        serial_number: MilestoneData.serial_number,
        mentor_id: parseDegree?.mentor_id,
        user_id: userId,
        milestone_index:editingIndex,
        milestone: updatedMilestone
      };
    
      await axios.patch(`${baseURL}/api/milestone`,dataToUpdate, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    onClose();
  };

  /* ================= EMPTY STATE ================= */

  if (milestones.length === 0 && !is_mentor) {
    return (
      <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500"
          >
            <X size={22} />
          </button>

          <p className="text-center text-slate-600 text-sm">
            Milestone yet to be submitted by mentor
          </p>
        </div>
      </div>
    );
  }
  // if(milestones.length === 0 && is_mentor){
  //   return(
  //     <div>
  //       <CreateMilestone/>
  //     </div>
  //   )
  // }


  const inlineEditBase =
  "w-full bg-transparent text-gray-800 transition-all duration-150";

const inlineEditIdle =
  "border-b border-transparent hover:border-dashed hover:border-blue-300";

const inlineEditActive =
  "border-b border-blue-500 bg-blue-50 px-1 rounded-sm focus:outline-none";



  /* ================= MAIN UI ================= */

  return (
    <>
    
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
    {milestones.length === 0 && is_mentor?(
      <div className="relative">
      <button
        onClick={onClose}
        className="absolute top-14 right-4 text-red-500 hover:text-gray-800"
      >
        ✕
      </button>
      <CreateMilestone data={dataToSend} /></div>
      
    ):(
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            Milestone Details - Meeting ID: {MilestoneData.check_meeting_id}
          </h2>
          <button onClick={onClose} className="text-gray-500">
            <X size={22} />
          </button>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 py-4 border-b text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium">History Count:</span>
            <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs">
              {MilestoneData.history_count}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={14} />
            Created: {formatDateTime(MilestoneData.created_at)}
          </div>

          <div className="text-gray-600">
            Milestones: {milestones.length}
          </div>
        </div>

        {/* Milestones */}
        <div className="px-6 py-4">
          <div className="flex gap-6 mb-4 border-b">
  <button
    onClick={() => setActiveTab("current")}
    className={`pb-2 text-sm font-medium ${
      activeTab === "current"
        ? "border-b-2 border-blue-600 text-blue-600"
        : "text-gray-500"
    }`}
  >
    All Milestones
  </button>

  <button
    onClick={() => setActiveTab("history")}
    className={`pb-2 text-sm font-medium ${
      activeTab === "history"
        ? "border-b-2 border-blue-600 text-blue-600"
        : "text-gray-500"
    }`}
  >
    History
    {MilestoneData.history_count > 0 && (
      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-600">
        {MilestoneData.history_count}
      </span>
    )}
  </button>
</div>

{activeTab === "current" && (
          <div className="space-y-3">
            {milestones.map((m, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <BadgeInfo className="text-blue-500 mt-1" />

                  <div className="flex-1">
                    {/* Title */}
                    {is_mentor ? (
                      <input
                        value={m.milestone}
                        onChange={(e) =>
                          handleChange(index, "milestone", e.target.value)
                        }
                         className={`${inlineEditBase} ${
    is_mentor ? inlineEditIdle : ""
  } focus:${inlineEditActive} text-sm font-semibold`}
                      />
                    ) : (
                      <p className="text-sm font-semibold text-gray-800">
                        {m.milestone}
                      </p>
                    )}

                    {/* Description */}
                    {is_mentor ? (
                      <input
                        value={m.description}
                        onChange={(e) =>
                          handleChange(index, "description", e.target.value)
                        }
                         className={`${inlineEditBase} ${
    is_mentor ? inlineEditIdle : ""
  } focus:${inlineEditActive} text-sm font-semibold`}
                      />
                    ) : (
                      <p className="text-xs text-gray-500 mt-1">
                        {m.description}
                      </p>
                    )}

                    {/* Due date */}
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                      <Calendar className="h-3 w-3 text-green-600" />
                      {is_mentor ? (
                        <input
                          type="date"
                          value={m.expectedCompletionDate}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "expectedCompletionDate",
                              e.target.value
                            )
                          }
                          className="border-none focus:ring-0 text-xs p-0"
                        />
                      ) : (
                        <span>Due: {m.expectedCompletionDate}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
)}

{/* {activeTab === "history" && (
  <div className="text-sm text-gray-600 py-6 text-center">
    {MilestoneData.history_count > 0 ? (
      <p>
        This milestone has <strong>{MilestoneData.history_count}</strong> previous
        versions.
        <br />
        History details will appear here once available.
      </p>
    ) : (
      <p>No milestone history available.</p>
    )}
  </div>
)} */}
{activeTab === "history" && (
  <div className="space-y-4">
    {MilestoneData.history_count > 0 && MilestoneData.history?.length ? (
      MilestoneData.history.map((entry, hIndex) => (
        <div key={entry.id} className="space-y-2">
          {/* History meta */}
          <p className="text-xs text-gray-400">
            Edited by {entry.edited_by} • {formatDateTime(entry.edited_at)}
          </p>

          {/* Milestones snapshot */}
          {entry.milestone_state.map((item, mIndex) => (
            <div
              key={`${hIndex}-${mIndex}`}
              className="border rounded-lg p-4 bg-gray-50 shadow-sm"
            >
              <p className="text-sm font-semibold">{item.milestone}</p>
              <p className="text-xs text-gray-500 mt-1">
                {item.description}
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Due: {item.expectedCompletionDate}
              </p>
            </div>
          ))}
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">
        No milestone history available.
      </p>
    )}
  </div>
)}




          {/* Actions */}
          {is_mentor && (
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md"
              >
                Save
              </button>
            </div>
          )}
        </div>

        {/* Footer refs */}
        <div className="px-6 py-3 border-t text-xs text-gray-400">
          Ref IDs – Check ID: {MilestoneData.check_id}, Meeting ID:{" "}
          {MilestoneData.check_meeting_id}, User: {MilestoneData.user_id},
          Mentor: {MilestoneData.mentor_id}, Serial:{" "}
          {MilestoneData.serial_number}
        </div>
      </div>
    )}
    </div>
    
    </>
  );
};

export default MilestonePopup;
