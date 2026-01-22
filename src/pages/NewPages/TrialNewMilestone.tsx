// import React, { ReactNode, useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Calendar,
//   CheckCircle2,
//   Circle,
//   // Edit3,
//   // GripVertical,
//   // Lock,
//   // Plus,
//   ShieldAlert,
//   // Trash2,
//   // User,
//   LucideIcon,
// } from "lucide-react";

// /* ===================== Utils ===================== */

// const cx = (...c: Array<string | false | null | undefined>) =>
//   c.filter(Boolean).join(" ");

// export const STATUS = {
//   NOT_STARTED: "Not started",
//   IN_PROGRESS: "In progress",
//   COMPLETED: "Completed",
//   BLOCKED: "Blocked",
// } as const;

// export type Status = (typeof STATUS)[keyof typeof STATUS];

// /* ===================== Types ===================== */

// interface Milestone {
//   id: string;
//   title: string;
//   description?: string;
//   outcome?: string;
//   due?: string;
//   status: Status;
//   completedOn?: string;
// }

// interface StatusStyle {
//   dot: string;
//   pill: string;
//   card: string;
//   icon: LucideIcon;
// }

// /* ===================== Styles ===================== */

// const statusStyles: Record<Status, StatusStyle> = {
//   [STATUS.NOT_STARTED]: {
//     dot: "bg-slate-400",
//     pill: "bg-slate-100 text-slate-700 border-slate-200",
//     card: "bg-white",
//     icon: Circle,
//   },
//   [STATUS.IN_PROGRESS]: {
//     dot: "bg-blue-500",
//     pill: "bg-blue-50 text-blue-700 border-blue-200",
//     card: "bg-white",
//     icon: Circle,
//   },
//   [STATUS.COMPLETED]: {
//     dot: "bg-emerald-500",
//     pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
//     card: "bg-emerald-50/60",
//     icon: CheckCircle2,
//   },
//   [STATUS.BLOCKED]: {
//     dot: "bg-red-500",
//     pill: "bg-red-50 text-red-700 border-red-200",
//     card: "bg-white",
//     icon: ShieldAlert,
//   },
// };

// /* ===================== Helpers ===================== */

// const formatDate = (d?: string): string => {
//   if (!d) return "";
//   try {
//     return new Date(d).toLocaleDateString(undefined, {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   } catch {
//     return d;
//   }
// };

// const prettyDue = (d?: string): string => {
//   if (!d) return "";
//   try {
//     return new Date(d).toISOString().slice(0, 10);
//   } catch {
//     return d;
//   }
// };

// const initialMilestones: Milestone[] = [];

// /* ===================== Main ===================== */

// const MilestoneRoadmapPreview: React.FC = () => {
//   const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);
//   const [title, setTitle] = useState("");
//   const [outcome, setOutcome] = useState("");
//   const [due, setDue] = useState("");
//   const [description, setDescription] = useState("");
//   //@ts-ignore
//   const [showDetails, setShowDetails] = useState(false);

//   const visibleMilestones = useMemo(() => {
//     return [...milestones].sort((a, b) => {
//       const aw = a.status === STATUS.COMPLETED ? 0 : 1;
//       const bw = b.status === STATUS.COMPLETED ? 0 : 1;
//       if (aw !== bw) return aw - bw;
//       return String(a.due ?? "").localeCompare(String(b.due ?? ""));
//     });
//   }, [milestones]);

//   const resetForm = () => {
//     setTitle("");
//     setOutcome("");
//     setDue("");
//     setDescription("");
//     setShowDetails(false);
//   };

//   const addMilestone = () => {
//     if (!title.trim()) return;

//     const newItem: Milestone = {
//       id: `m_${crypto.randomUUID()}`,
//       title: title.trim(),
//       description: description.trim(),
//       outcome: outcome.trim(),
//       due,
//       status: STATUS.NOT_STARTED,
//     };

//     setMilestones((prev) => [newItem, ...prev]);
//     resetForm();
//   };

//   const cycleStatus = (id: string) => {
//     setMilestones((prev) =>
//       prev.map((m) => {
//         if (m.id !== id) return m;

//         const next: Status =
//           m.status === STATUS.NOT_STARTED
//             ? STATUS.IN_PROGRESS
//             : m.status === STATUS.IN_PROGRESS
//             ? STATUS.COMPLETED
//             : m.status === STATUS.COMPLETED
//             ? STATUS.BLOCKED
//             : STATUS.NOT_STARTED;

//         return {
//           ...m,
//           status: next,
//           completedOn:
//             next === STATUS.COMPLETED
//               ? new Date().toISOString().slice(0, 10)
//               : undefined,
//         };
//       })
//     );
//   };

//   const removeMilestone = (id: string) => {
//     setMilestones((prev) => prev.filter((m) => m.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 md:p-6">
//       <div className="mx-auto max-w-5xl">
//         <h1 className="text-2xl font-bold text-slate-900">
//           Milestone Roadmap
//         </h1>

//         <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[360px_1fr]">
//           {/* LEFT */}
//           <div className="rounded-2xl bg-white p-5 shadow border">
//             <h2 className="font-semibold mb-4">Add milestone</h2>

//             <Field label="Milestone title" required>
//               <input
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="h-10 w-full rounded-xl border px-3"
//               />
//             </Field>

//             <Field label="Outcome">
//               <input
//                 value={outcome}
//                 onChange={(e) => setOutcome(e.target.value)}
//                 className="h-10 w-full rounded-xl border px-3"
//               />
//             </Field>

//             <Field label="Due date">
//               <input
//                 type="date"
//                 value={due}
//                 onChange={(e) => setDue(e.target.value)}
//                 className="h-10 w-full rounded-xl border px-3"
//               />
//             </Field>

//             <button
//               onClick={addMilestone}
//               className="mt-4 w-full rounded-xl bg-indigo-600 py-2 text-white font-semibold"
//             >
//               Add to roadmap
//             </button>
//           </div>

//           {/* RIGHT */}
//           <div className="rounded-2xl bg-white p-5 shadow border">
//             <AnimatePresence>
//               {visibleMilestones.map((m) => (
//                 <motion.div
//                   key={m.id}
//                   layout
//                   className="mb-4"
//                 >
//                   <MilestoneCard
//                     milestone={m}
//                     onCycle={() => cycleStatus(m.id)}
//                     onDelete={() => removeMilestone(m.id)}
//                   />
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MilestoneRoadmapPreview;

// /* ===================== Components ===================== */

// interface FieldProps {
//   label: string;
//   required?: boolean;
//   children: ReactNode;
// }

// const Field: React.FC<FieldProps> = ({ label, required, children }) => (
//   <div className="mb-3">
//     <label className="text-xs font-semibold text-slate-700">
//       {label} {required && <span className="text-red-500">*</span>}
//     </label>
//     <div className="mt-1">{children}</div>
//   </div>
// );

// interface MilestoneCardProps {
//   milestone: Milestone;
//   onCycle: () => void;
//   onDelete: () => void;
// }

// const MilestoneCard: React.FC<MilestoneCardProps> = ({
//   milestone,
//   onCycle,
//   onDelete,
// }) => {
//   const s = statusStyles[milestone.status];
//   const StatusIcon = s.icon;

//   return (
//     <div className={cx("rounded-xl border p-4", s.card)}>
//       <h3 className="font-semibold">{milestone.title}</h3>

//       <p className="text-sm text-slate-600">
//         {milestone.description || "—"}
//       </p>

//       <div className="mt-3 flex gap-2">
//         <span className={cx("rounded-full border px-2 py-1 text-xs", s.pill)}>
//           <StatusIcon className="inline h-3 w-3 mr-1" />
//           {milestone.status}
//         </span>

//         {milestone.due && (
//           <span className="rounded-full border px-2 py-1 text-xs">
//             <Calendar className="inline h-3 w-3 mr-1" />
//             {formatDate(milestone.due)}
//           </span>
//         )}
//       </div>

//       <div className="mt-3 flex gap-2">
//         <button
//           onClick={onCycle}
//           className="rounded bg-slate-900 px-3 py-1 text-xs text-white"
//         >
//           Cycle
//         </button>
//         <button
//           onClick={onDelete}
//           className="rounded border px-3 py-1 text-xs text-red-600"
//         >
//           Delete
//         </button>
//       </div>

//       <div className="mt-2 text-[11px] text-slate-400">
//         ID: {milestone.id} · due: {prettyDue(milestone.due)}
//       </div>
//     </div>
//   );
// };



import { ReactNode, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  CheckCircle2,
  Circle,
  Edit3,
  GripVertical,
  Loader2,
  Plus,
  ShieldAlert,
  Trash2,
  User,
} from "lucide-react";
import axios from "axios";
import baseURL from "@/config/config";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import AvailMilestones from "./Milestone";

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const STATUS = {
  NOT_STARTED: "Not started",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  BLOCKED: "Blocked",
} as const;

type Status = (typeof STATUS)[keyof typeof STATUS];

type Milestone = {
  id: string;
  title: string;
  description?: string;
  outcome?: string;
  due?: string; // YYYY-MM-DD
  status: Status;
  completedOn?: string; // YYYY-MM-DD
};



type StatusStyle = {
  dot: string;
  pill: string;
  card: string;
  icon: LucideIcon;
};

const statusStyles: Record<Status, StatusStyle> = {
  [STATUS.NOT_STARTED]: {
    dot: "bg-slate-400",
    pill: "bg-slate-100 text-slate-700 border-slate-200",
    card: "bg-white",
    icon: Circle,
  },
  [STATUS.IN_PROGRESS]: {
    dot: "bg-blue-500",
    pill: "bg-blue-50 text-blue-700 border-blue-200",
    card: "bg-white",
    icon: Circle,
  },
  [STATUS.COMPLETED]: {
    dot: "bg-emerald-500",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
    card: "bg-emerald-50/60",
    icon: CheckCircle2,
  },
  [STATUS.BLOCKED]: {
    dot: "bg-red-500",
    pill: "bg-red-50 text-red-700 border-red-200",
    card: "bg-white",
    icon: ShieldAlert,
  },
};

function formatDate(d?: string): string {
  if (!d) return "";
  try {
    const dt = new Date(d);
    return dt.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return String(d);
  }
}

function prettyDue(d?: string): string {
  if (!d) return "";
  try {
    const dt = new Date(d);
    return dt.toISOString().slice(0, 10);
  } catch {
    return String(d);
  }
}

const initialMilestones: Milestone[] = [];

export default function MilestoneRoadmapPreviewTSX(): JSX.Element {
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);
const[mentorData,setMentorData]=useState<any>();
  const [title, setTitle] = useState<string>("");
  const [outcome, setOutcome] = useState<string>("");
  const [due, setDue] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const[milestoneData,setMilestoneData]=useState<any>([]);
  //@ts-ignore
   const [stateMilestone, setStateMilestone] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const { userId, mentorId } = useParams<{
      userId: string;
      mentorId: string;
    }>();

    console.log("userId-----",userId);
    console.log("mentorId-----",mentorId);

    


  const userData=localStorage.getItem("user");
  const parsedUserData=userData?JSON.parse(userData):null;
  const token=localStorage.getItem("token");

  const visibleMilestones = useMemo(() => {
    // Completed collapsed to top (optional)
    return milestones
      .slice()
      .sort((a, b) => {
        const aw = a.status === STATUS.COMPLETED ? 0 : 1;
        const bw = b.status === STATUS.COMPLETED ? 0 : 1;
        if (aw !== bw) return aw - bw;
        return String(a.due ?? "").localeCompare(String(b.due ?? ""));
      });
  }, [milestones]);

  const resetForm = () => {
    setTitle("");
    setOutcome("");
    setDue("");
    setDescription("");
    setShowDetails(false);
  };

       const crunchMilestones = (milestones: any[]) =>
  milestones.map(item => ({
    milestone: item.title ?? "",
    description: item.description ?? "",
    expectedCompletionDate: item.due ?? ""
  }));




    const fetchMentorInfo = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/mentor/details?user_id=${parsedUserData.user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("basicInformation---", response.data);
        const data = response.data;
        setMentorData(data);
        // setMentorId(data.mentor_id);
  
        // setBasicInfo([response.data]);
      } catch (error) {
        console.log(error);
      }
    };
  
      useEffect(() => {
        fetchMentorInfo();
      }, [parsedUserData?.is_mentor]);

 const notifySuccess = () =>
    toast.success("User mentorship created successfully!");


 const fetchMilestoneData = async () => {
       const token = localStorage.getItem("token");
       const scheduleData=localStorage.getItem("scheduleData");
       const parseScheduleData=scheduleData?JSON.parse(scheduleData):null;
 
       if (!token) {
         toast.error("Token not found!");
         return;
       }
       try {
         setLoading(true);
         const response = await axios.get(`${baseURL}/api/milestone`, {
           // params: { user_id: parsedUserData.is_mentor?userId:parsedUserData.user_id, mentor_id: mentorId },
           params: { user_id: parseScheduleData.user_id, mentor_id: parseScheduleData.mentor_id},
           headers: { Authorization: `Bearer ${token}` },
         });

      
 
         if (response.data) {
           console.log("response-----datttaaa-----response", response.data);

const data=response.data;
// if(data){

   const mileData={
            check_id: response.data.check_id,
  check_meeting_id: response.data.check_meeting_id,
  created_at: response.data.created_at,
  history_count: response.data.history_count,
  milestones: response.data?.current_milestone, // ✅ correct
  mentor_id: response.data.mentor_id,
  serial_number: response.data.serial_number,
  user_id: response.data.user_id,
           }
           setStateMilestone(true);

           if(Array.isArray(data) && data.length === 0){
            setMilestoneData([]);
           }
 else{
           setMilestoneData(mileData);
  
 }



// console.log("milestone---dattaaa----milestone",mileData);
         } else {
           console.log("No milestones found.");
         }
       } catch (error) {
         console.log("Failed to fetch milestone data.");
         console.error("Error fetching milestones:", error);
       } finally {
         setLoading(false);
         console.log(false);
       }
     };

   useEffect(() => {
     // if (!userId || !mentorId) {
     //     setErrorMessage('Invalid user or mentor ID.');
     //     setLoading(false);
     //     return;
     // }
     // console.log("mentor_id",mentorId);
     console.log("userId", userId);
     console.log("mentorId", mentorId);

//      const fetchMilestoneData = async () => {
//        const token = localStorage.getItem("token");
//        const scheduleData=localStorage.getItem("scheduleData");
//        const parseScheduleData=scheduleData?JSON.parse(scheduleData):null;
 
//        if (!token) {
//          toast.error("Token not found!");
//          return;
//        }
//        try {
//          setLoading(true);
//          const response = await axios.get(`${baseURL}/api/milestone`, {
//            // params: { user_id: parsedUserData.is_mentor?userId:parsedUserData.user_id, mentor_id: mentorId },
//            params: { user_id: parseScheduleData.user_id, mentor_id: parseScheduleData.mentor_id},
//            headers: { Authorization: `Bearer ${token}` },
//          });

      
 
//          if (response.data) {
//            console.log("response-----datttaaa-----response", response.data);

// const data=response.data;
// // if(data){

//    const mileData={
//             check_id: response.data.check_id,
//   check_meeting_id: response.data.check_meeting_id,
//   created_at: response.data.created_at,
//   history_count: response.data.history_count,
//   milestones: response.data?.current_milestone, // ✅ correct
//   mentor_id: response.data.mentor_id,
//   serial_number: response.data.serial_number,
//   user_id: response.data.user_id,
//            }
//            setStateMilestone(true);

//            if(Array.isArray(data) && data.length === 0){
//             setMilestoneData([]);
//            }
//  else{
//            setMilestoneData(mileData);
  
//  }



// // console.log("milestone---dattaaa----milestone",mileData);
//          } else {
//            console.log("No milestones found.");
//          }
//        } catch (error) {
//          console.log("Failed to fetch milestone data.");
//          console.error("Error fetching milestones:", error);
//        } finally {
//          setLoading(false);
//          console.log(false);
//        }
//      };
 
     fetchMilestoneData();
   }, []);

 

    const handleSubmit = async () => {
      console.log("Final Milestones:", milestones);
      const degree = localStorage.getItem("degree");
      const user_id = degree ? JSON.parse(degree)?.user_id : null;
      console.log("mentorData-------",mentorData);
      
  
      try {
        // setLoading(true);
        const token = localStorage.getItem("token");
        console.log("user_id", user_id);

        // const milestoneData={
        //    milestone: ,
        // description: "",
        // expectedCompletionDate: "",
        // }

   
const crunchedMilestones = crunchMilestones(milestones);


        const dataToSend = {
          // user_id: parsedUserData.is_mentor ? userId : userId,
           user_id: mentorId,
          mentor_id: mentorData?.mentor_id,
          milestone: crunchedMilestones,
          check_meeting_id: userId,
          check_id: mentorData?.mentor_id,
        };
  
        const response = await axios.post(
          `${baseURL}/mentor/milestone`,
          dataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("responseMilestone-------", response);
        notifySuccess();
        fetchMilestoneData();
      } catch (error) {
        console.error("Milestone submission failed:", error);
      }
    };
  
  const addMilestone = () => {
    const t = title.trim();
    if (!t) return;

    const id = `m_${Math.random().toString(16).slice(2)}`;

    const newItem: Milestone = {
      id,
      title: t,
      description: description.trim() || undefined,
      outcome: outcome.trim() || undefined,
      due: due || undefined,
      status: STATUS.NOT_STARTED,
    };

    setMilestones((prev) => [newItem, ...prev]);
    resetForm();
  };

  const cycleStatus = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;

        const next: Status =
          m.status === STATUS.NOT_STARTED
            ? STATUS.IN_PROGRESS
            : m.status === STATUS.IN_PROGRESS
              ? STATUS.COMPLETED
              : m.status === STATUS.COMPLETED
                ? STATUS.BLOCKED
                : STATUS.NOT_STARTED;

        return {
          ...m,
          status: next,
          completedOn:
            next === STATUS.COMPLETED ? new Date().toISOString().slice(0, 10) : undefined,
        };
      })
    );
  };

  const removeMilestone = (id: string) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
  };

  
  return (
    <>
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
   
      {loading ? (
              <div className="fixed inset-0 bg-white/70 flex justify-center items-center z-50">
                <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
              </div>
            ) : milestoneData && !Array.isArray(milestoneData)? (
                  
                      <AvailMilestones
                        data={milestoneData}
                        userType={parsedUserData.is_mentor?"mentor":"user"}
                      />
                    
                  ) :parsedUserData?.is_mentor ?
      <div className="mx-auto max-w-5xl">
        <div className="flex items-centeer justify-center gap-4">
          <div className="">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900">Create Milestone</h1>
            
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[360px_1fr]">
          {/* LEFT: Builder */}
          <div className="rounded-2xl bg-white p-5 shadow-[0_6px_18px_rgba(0,0,0,0.06)] border border-slate-100">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Add milestone</h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 border border-indigo-100">
                <User className="h-3.5 w-3.5" /> Expert
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <Field label="Milestone title" required>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Week 1 — Resume Foundations"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
                />
              </Field>

              <Field label="Expected outcome (key)" hint="What should the user walk away with?">
                <input
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
                  placeholder="Resume v1 + role shortlist"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
                />
              </Field>

              <Field label="Due date">
                <div className="relative">
                  <input
                    type="date"
                    value={due}
                    onChange={(e) => setDue(e.target.value)}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-3 pr-10 text-sm outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                </div>
              </Field>

              <button
                onClick={() => setShowDetails((s) => !s)}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                <span className="inline-flex items-center gap-2">
                  <Plus className={cx("h-4 w-4", showDetails ? "rotate-45" : "")} />
                  Add details (optional)
                </span>
                <span className="text-xs text-slate-500">{showDetails ? "Hide" : "Show"}</span>
              </button>

              <AnimatePresence initial={false}>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2">
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Optional context, links, or notes"
                        className="min-h-[84px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={addMilestone}
                className="mt-2 h-10 w-full rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
              >
                Add to roadmap
              </button>
              <button
                onClick={handleSubmit}
                className="mt-2 h-10 w-full rounded-xl bg-green-500 text-white text-sm font-semibold shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
              >
                Submit Milestone
              </button>

              {/* <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-start gap-2">
                  <Lock className="h-4 w-4 text-slate-500 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-700">Auto-saved</p>
                    <p className="text-xs text-slate-600">No “Submit all”. Changes persist immediately.</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* RIGHT: Timeline */}
          <div className="rounded-2xl bg-white p-5 shadow-[0_6px_18px_rgba(0,0,0,0.06)] border border-slate-100">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">User roadmap</h2>
                <p className="text-sm text-slate-600">Clear outcomes. Visible progress. Less chaos.</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 border border-indigo-100">
                Created by expert
              </span>
            </div>

            <div className="mt-6 relative">
              {/* Spine */}
              <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-slate-200" />

              <AnimatePresence mode="popLayout" initial={false}>
                {visibleMilestones.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-7 text-center"
                  >
                    <p className="text-base font-semibold text-slate-900">No milestones yet</p>
                    <p className="mt-1 text-[13px] text-slate-600">Experts usually create 4–6 milestones.</p>
                    <p className="mt-1 text-[13px] text-slate-600">Add your first milestone on the left.</p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {visibleMilestones.map((m) => (
                      <motion.div
                        key={m.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.18 }}
                        className="relative pl-14"
                      >
                        {/* Dot */}
                        <div
                          className={cx(
                            "absolute left-[18px] top-6 h-3 w-3 rounded-full",
                            statusStyles[m.status].dot
                          )}
                        />

                        <MilestoneCard
                          milestone={m}
                          onCycle={() => cycleStatus(m.id)}
                          onDelete={() => removeMilestone(m.id)}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* <p className="mt-6 text-xs text-slate-500">
          Note: This is a UI preview (Figma-style). Edit flow and drag-reorder are visually reserved but not fully
          implemented.
        </p> */}
      </div>
      :(<div className="flex justify-center bg-slate-50">
  <div className="bg-white border border-slate-200 rounded-xl px-6 py-5 shadow-sm max-w-md text-center">
    <p className="text-slate-600 text-sm">
      Milestone yet to be submitted by mentor
    </p>
  </div>
</div>
)
}
    </div>
        
    </>
  );
}

type FieldProps = {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
};

function Field({ label, hint, required, children }: FieldProps): JSX.Element {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-xs font-semibold text-slate-700">
          {label} {required ? <span className="text-red-500">*</span> : null}
        </label>
        {hint ? <span className="text-[11px] text-slate-500">{hint}</span> : null}
      </div>
      <div className="mt-1">{children}</div>
    </div>
  );
}

type MilestoneCardProps = {
  milestone: Milestone;
  onCycle: () => void;
  onDelete: () => void;
};

function MilestoneCard({ milestone, onCycle, onDelete }: MilestoneCardProps): JSX.Element {
  const s = statusStyles[milestone.status];
  const StatusIcon = s.icon;
  const isCompleted = milestone.status === STATUS.COMPLETED;

  return (
    <div
      className={cx(
        "rounded-2xl border border-slate-100 shadow-[0_8px_24px_rgba(0,0,0,0.06)]",
        "p-4",
        s.card
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-slate-900">
              {isCompleted ? "✔ " : ""}
              {milestone.title}
            </h3>
            {/* future drag handle */}
            <span className="inline-flex items-center text-slate-300" title="Drag to reorder (future)">
              <GripVertical className="h-4 w-4" />
            </span>
          </div>

          {!isCompleted ? (
            <p className="mt-1 text-[13px] text-slate-600">{milestone.description || "—"}</p>
          ) : (
            <p className="mt-1 text-[13px] text-slate-600">
              Completed {milestone.completedOn ? formatDate(milestone.completedOn) : ""}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className={cx(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold",
                s.pill
              )}
            >
              <StatusIcon className="h-3.5 w-3.5" />
              {milestone.status}
            </span>
            {milestone.due ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">
                <Calendar className="h-3.5 w-3.5" /> Due {formatDate(milestone.due)}
              </span>
            ) : null}
          </div>

          {!!milestone.outcome && (
            <div
              className={cx(
                "mt-3 rounded-xl border p-3",
                isCompleted ? "border-emerald-200 bg-white/60" : "border-slate-200 bg-slate-50"
              )}
            >
              <p className="text-xs font-semibold text-slate-700">Outcome</p>
              <p className="mt-0.5 text-[13px] text-slate-700">{milestone.outcome}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          <button
            onClick={onCycle}
            className="rounded-xl bg-slate-900 px-2.5 py-2 text-[11px] font-semibold text-white hover:bg-slate-800"
            title="Cycle status"
          >
            {milestone.status === STATUS.NOT_STARTED
              ? "Mark in progress"
              : milestone.status === STATUS.IN_PROGRESS
                ? "Mark completed"
                : milestone.status === STATUS.COMPLETED
                  ? "Mark blocked"
                  : "Reset"}
          </button>

          <div className="flex items-center gap-2">
            <button
              className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50"
              title="Edit (visual only)"
              onClick={() => alert("Preview only: hook this to your edit modal.")}
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              className="rounded-xl border border-red-200 bg-white p-2 text-red-600 hover:bg-red-50"
              title="Delete"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {milestone.status === STATUS.BLOCKED ? (
            <div className="mt-1 inline-flex items-center gap-1 rounded-xl bg-red-50 px-2 py-1 text-[11px] font-semibold text-red-700 border border-red-100">
              <ShieldAlert className="h-3.5 w-3.5" /> Needs expert review
            </div>
          ) : null}
        </div>
      </div>

      {/* optional details (collapsed by default in completed state) */}
      {milestone.description && isCompleted ? (
        <details className="mt-3">
          <summary className="cursor-pointer text-xs font-semibold text-slate-600 hover:text-slate-800">
            View details
          </summary>
          <p className="mt-2 text-sm text-slate-700">{milestone.description}</p>
        </details>
      ) : null}

      {/* tiny technical meta for dev parity */}
      <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
        <span>ID: {milestone.id}</span>
        <span>due: {milestone.due ? prettyDue(milestone.due) : "—"}</span>
      </div>
    </div>
  );
}




