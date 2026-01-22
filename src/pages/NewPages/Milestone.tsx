// // import React from "react";
// // import { Card } from "@/components/ui/card";
// // import { Calendar, DollarSign, Clock } from "lucide-react";
// // import { BadgeInfo } from "lucide-react";

// // // Define types
// // type Milestone = {
// //   milestone: string;
// //   description: string;
// //   expectedCompletionDate: string;
// //   mentorFees?: number;
// // };

// // type MilestoneData = {
// //   check_id: number;
// //   check_meeting_id: number;
// //   created_at: string;
// //   history_count: number;
// //   milestones: Milestone[];
// //   mentor_id: number;
// //   serial_number: number;
// //   user_id: number;
// // };

// // interface MilestoneTimelineProps {
// //   data: MilestoneData;
// // }

// // const AvailMilestone: React.FC<MilestoneTimelineProps> = ({ data }) => {
// //   const {
// //     serial_number,
// //     user_id,
// //     mentor_id,
// //     check_id,
// //     check_meeting_id,
// //     created_at,
// //     history_count,
// //     // latest_milestone,
// //     milestones
// //   } = data;

// //   const { milestone, description, expectedCompletionDate, mentorFees } =
// //     milestones;

// //   return (
// //     <Card className="w-full max-w-3xl mx-auto mt-10 rounded-2xl shadow-md p-4">
// //       <h2 className="text-2xl font-bold mb-4 flex justify-center">
// //         Latest Milestone
// //       </h2>

// //       <div className="space-y-8">
// //         <div className="flex items-start gap-4">
// //           <BadgeInfo className="text-blue-500 mt-1" />
// //           <div>
// //             <p className="text-lg font-medium text-gray-800">{milestone}</p>
// //             <p className="text-sm text-gray-500">{description}</p>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
// //           <div className="flex items-center gap-2">
// //             <Calendar className="h-4 w-4 text-green-600" />
// //             <span className="font-semibold">
// //               Due: <span className="">{expectedCompletionDate}</span>
// //             </span>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <DollarSign className="h-4 w-4 text-yellow-600" />
// //             <span className="font-semibold">
// //               Mentor Fee:<span className="">${mentorFees}</span>{" "}
// //             </span>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <Clock className="h-4 w-4 text-blue-600" />
// //             <span className="font-semibold">
// //               Created At:{" "}
// //               <span className="">{new Date(created_at).toLocaleString()}</span>
// //             </span>
// //           </div>
// //           <div className="col-span-2 md:col-span-1 flex items-center gap-2">
// //             <span className="font-semibold">History Count:</span>
// //             <span>{history_count}</span>
// //           </div>
// //         </div>

// //         <div className="text-xs text-gray-400 pt-2 border-t mt-4">
// //           <p>
// //             Ref IDs - Check ID: {check_id}, Meeting ID: {check_meeting_id},
// //             User: {user_id}, Mentor: {mentor_id}, Serial: {serial_number}
// //           </p>
// //         </div>
// //       </div>
// //     </Card>
// //   );
// // };

// // export default AvailMilestone;
// import React from "react";
// import { Card } from "@/components/ui/card";
// import { Calendar, DollarSign, Clock, BadgeInfo } from "lucide-react";

// // Define types
// type Milestone = {
//   milestone: string;
//   description: string;
//   expectedCompletionDate: string;
//   mentorFees?: number;
// };

// type MilestoneData = {
//   check_id: number;
//   check_meeting_id: number;
//   created_at: string;
//   history_count: number;
//   milestones: Milestone[];
//   mentor_id: number;
//   serial_number: number;
//   user_id: number;
// };

// interface MilestoneTimelineProps {
//   data: MilestoneData;
// }

// const AvailMilestones: React.FC<MilestoneTimelineProps> = ({ data }) => {
//   // Add safety check for data
//   if (!data) {
//     return (
//       <Card className="w-full max-w-3xl mx-auto mt-10 rounded-2xl shadow-md p-4">
//         <p className="text-center text-gray-500">No milestone data available</p>
//       </Card>
//     );
//   }

//   const {
//     serial_number,
//     user_id,
//     mentor_id,
//     check_id,
//     check_meeting_id,
//     created_at,
//     history_count,
//     milestones
//   } = data;

//   // Add safety check for milestones array
//   if (!milestones || milestones.length === 0) {
//     return (
//       <Card className="w-full max-w-3xl mx-auto mt-10 rounded-2xl shadow-md p-4">
//         <p className="text-center text-gray-500">No milestones found</p>
//       </Card>
//     );
//   }

//   return (
//     <Card className="w-full max-w-3xl mx-auto mt-10 rounded-2xl shadow-md p-4">
//       <h2 className="text-2xl font-bold mb-4 flex justify-center">
//         Milestones ({milestones.length})
//       </h2>

//       <div className="space-y-6">
//         {milestones.map((milestone, index) => (
//           <div key={index} className="border-b pb-4 last:border-b-0">
//             <div className="flex items-start gap-4 mb-3">
//               <BadgeInfo className="text-blue-500 mt-1 flex-shrink-0" />
//               <div className="flex-1">
//                 <p className="text-lg font-medium text-gray-800">
//                   {milestone.milestone}
//                 </p>
//                 <p className="text-sm text-gray-500">{milestone.description}</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700 ml-10">
//               <div className="flex items-center gap-2">
//                 <Calendar className="h-4 w-4 text-green-600" />
//                 <span className="font-semibold">
//                   Due: <span className="font-normal">{milestone.expectedCompletionDate}</span>
//                 </span>
//               </div>
//               {milestone.mentorFees !== undefined && (
//                 <div className="flex items-center gap-2">
//                   <DollarSign className="h-4 w-4 text-yellow-600" />
//                   <span className="font-semibold">
//                     Mentor Fee: <span className="font-normal">${milestone.mentorFees}</span>
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mt-6 pt-4 border-t">
//         <div className="flex items-center gap-2">
//           <Clock className="h-4 w-4 text-blue-600" />
//           <span className="font-semibold">
//             Created: <span className="font-normal">{new Date(created_at).toLocaleString()}</span>
//           </span>
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="font-semibold">History Count:</span>
//           <span className="font-normal">{history_count}</span>
//         </div>
//       </div>

//       <div className="text-xs text-gray-400 pt-2 border-t mt-4">
//         <p>
//           Ref IDs - Check ID: {check_id}, Meeting ID: {check_meeting_id},
//           User: {user_id}, Mentor: {mentor_id}, Serial: {serial_number}
//         </p>
//       </div>
//     </Card>
//   );
// };

// export default AvailMilestones;
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  DollarSign,
  Clock,
  BadgeInfo,
  Pencil,
  Check,
  X,
} from "lucide-react";
import axios from "axios";
import baseURL from "@/config/config";

/* ================= TYPES ================= */

type Milestone = {
  milestone: string;
  description: string;
  expectedCompletionDate: string;
  mentorFees?: number;
};

type MilestoneData = {
  check_id: number;
  check_meeting_id: number;
  created_at: string;
  history_count: number;
  milestones: Milestone[];
  mentor_id: number;
  serial_number: number;
  user_id: number;
};

interface MilestoneTimelineProps {
  data: MilestoneData;
  onUpdateMilestone?: (index: number, updated: Milestone) => void;
  userType?:string;
}

/* ================= COMPONENT ================= */

const AvailMilestones: React.FC<MilestoneTimelineProps> = ({
  data,
  // onUpdateMilestone,
  // userType
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Milestone | null>(null);
  const token=localStorage.getItem("token");
  const user=localStorage.getItem("user");
  const parseUser=user?JSON.parse(user):null;

  if (!data || !data.milestones || data.milestones.length === 0) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-10 rounded-2xl shadow-md p-4">
        <p className="text-center text-gray-500">No milestones found</p>
      </Card>
    );
  }

  const {
    milestones,
    created_at,
    history_count,
    check_id,
    check_meeting_id,
    user_id,
    mentor_id,
    serial_number,
  } = data;

  /* ================= HANDLERS ================= */

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditForm({ ...milestones[index] });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditForm(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editForm) return;
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

const handleMilestoneUpdate = async (
  updatedMilestone: Milestone
) => {

  const dataToUpdate = {
    serial_number: serial_number,
    mentor_id: mentor_id,
    user_id: user_id,
    milestone_index:editingIndex,
    milestone: {
      milestone: updatedMilestone.milestone,
      description: updatedMilestone.description,
      expectedCompletionDate: updatedMilestone.expectedCompletionDate,
      mentorFees: updatedMilestone.mentorFees,
    },
  };

  await axios.patch(`${baseURL}/api/milestone`,dataToUpdate, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};


  const handleUpdate = () => {
    if (editingIndex === null || !editForm) return;
console.log("editForm----",editForm);
    // 🔗 Call parent / API
    // onUpdateMilestone?.(editingIndex, editForm);
 handleMilestoneUpdate(editForm);
//  fetchMilestone();
    setEditingIndex(null);
    setEditForm(null);
  };

  /* ================= RENDER ================= */

  return (
    <Card className="w-full max-w-3xl mx-auto mt-10 rounded-2xl shadow-md p-4">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">
        Milestones ({milestones.length})
      </h2>

      <div className="space-y-6">
        {milestones.map((m, index) => {
          const isEditing = editingIndex === index;

          return (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <div className="flex items-start gap-4">
                <BadgeInfo className="text-blue-500 mt-1" />

                <div className="flex-1 space-y-2">
                  {/* ===== TITLE ===== */}
                  {isEditing ? (
                    <input
                      name="milestone"
                      value={editForm?.milestone || ""}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1"
                    />
                  ) : (
                    <p className="text-lg font-medium text-gray-800">
                      {m.milestone}
                    </p>
                  )}

                  {/* ===== DESCRIPTION ===== */}
                  {isEditing ? (
                    <textarea
                      name="description"
                      value={editForm?.description || ""}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1 text-sm"
                    />
                  ) : (
                    <p className="text-sm text-gray-500">{m.description}</p>
                  )}
                </div>

                {/* ===== ACTIONS ===== */}
                {parseUser.is_mentor && (
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Check
                        className="h-5 w-5 text-green-600 cursor-pointer"
                        onClick={handleUpdate}
                      />
                      <X
                        className="h-5 w-5 text-red-500 cursor-pointer"
                        onClick={cancelEdit}
                      />
                    </>
                  ) : (
                    <Pencil
                      className="h-4 w-4 text-gray-600 cursor-pointer"
                      onClick={() => startEdit(index)}
                    />
                  )}
                </div>
                )
        }
              </div>

              {/* ===== META ===== */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700 ml-10 mt-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  {isEditing ? (
                    <input
                      type="date"
                      name="expectedCompletionDate"
                      value={editForm?.expectedCompletionDate || ""}
                      onChange={handleChange}
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    <span>{m.expectedCompletionDate}</span>
                  )}
                </div>

                {m.mentorFees !== undefined && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-yellow-600" />
                    <span>${m.mentorFees}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== FOOTER ===== */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mt-6 pt-4 border-t">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-blue-600" />
          <span>{new Date(created_at).toLocaleString()}</span>
        </div>
        <div>
          <span className="font-semibold">History Count:</span>{" "}
          {history_count}
        </div>
      </div>

      <div className="text-xs text-gray-400 pt-2 border-t mt-4">
        Ref IDs — Check ID: {check_id}, Meeting ID: {check_meeting_id},
        User: {user_id}, Mentor: {mentor_id}, Serial: {serial_number}
      </div>
    </Card>
  );
};

export default AvailMilestones;
