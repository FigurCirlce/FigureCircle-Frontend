import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Plus, User } from "lucide-react";
import cx from "classnames";
import axios from "axios";
import baseURL from "@/config/config";
import { toast } from "react-toastify";

/* -------------------- TYPES -------------------- */

type MilestoneStatus = "pending" | "active" | "completed";

interface Milestone {
  id: number;
  title: string;
  outcome?: string;
  due?: string;
  description?: string;
  status: MilestoneStatus;
}
export interface MilestoneData {
  check_id: number;
  check_meeting_id: number;
  created_at: string;
  history_count: number;
  current_milestone: Milestone[];
  mentor_id: number;
  serial_number: number;
  user_id: number;
}

// type CreateMilestoneProps = {
//   data: MilestoneData;
  
// };

/* -------------------- COMPONENT -------------------- */

const CreateMilestone = ({data,onClose}:any) => {
  const [title, setTitle] = useState<string>("");
  const [outcome, setOutcome] = useState<string>("");
  const [due, setDue] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const [milestones, setMilestones] = useState<Milestone[]>([]);

  console.log("dattaaa---milestone--",data);

  const statusStyles: Record<MilestoneStatus, { dot: string }> = {
    pending: { dot: "bg-slate-400" },
    active: { dot: "bg-indigo-500" },
    completed: { dot: "bg-green-500" },
  };

  /* -------------------- HANDLERS -------------------- */

  const addMilestone = (): void => {
    if (!title.trim()) return;

    setMilestones((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        outcome,
        due,
        description,
        status: "pending",
      },
    ]);

    setTitle("");
    setOutcome("");
    setDue("");
    setDescription("");
    setShowDetails(false);
  };

  // const cycleStatus = (id: number): void => {
  //   setMilestones((prev) =>
  //     prev.map((m) =>
  //       m.id === id
  //         ? {
  //             ...m,
  //             status:
  //               m.status === "pending"
  //                 ? "active"
  //                 : m.status === "active"
  //                 ? "completed"
  //                 : "pending",
  //           }
  //         : m
  //     )
  //   );
  // };

  const removeMilestone = (id: number): void => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
  };

//   const handleSubmit = (): void => {
//     console.log("Submitting milestones:", milestones);
//     alert("Milestones submitted. Check console.");
//   };

 const notifySuccess = () =>
    toast.success("User mentorship created successfully!");
 
const handleSubmit = async () => {
    console.log("Final Milestones:", milestones);
    const degree = localStorage.getItem("degree");
    const user_id = degree ? JSON.parse(degree)?.id : null;

 const milestoneData = milestones.map((item) => ({
  description: item.description || "",
  expectedCompletionDate: item.due,
  milestone: item.title,
  status: item.status,
}));


    try {
      // setLoading(true);
      const token = localStorage.getItem("token");
      console.log("user_id", user_id);
      const dataToSend = {
        user_id: data?.data?.user_id || data?.user_id,
        mentor_id: data?.data?.mentor_id || data?.mentor_id,
        milestone: milestoneData,
        check_meeting_id: data?.data?.mentor_id || data?.mentor_id,
        check_id: data?.data?.mentor_id || data?.mentor_id,
      };
      console.log("dataToSend-----",dataToSend);

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
     onClose();
    } catch (error) {
      console.error("Milestone submission failed:", error);
    }
  };

  /* -------------------- UI -------------------- */

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex justify-center">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900">
          Create Milestone
        </h1>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[360px_1fr]">
        {/* LEFT PANEL */}
        <div className="rounded-2xl bg-white p-5 shadow border border-slate-100">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Add milestone</h2>
            <span className="flex items-center gap-1 text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full border">
              <User className="h-3 w-3" /> Expert
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {/* Title */}
            <div>
              <label className="text-sm font-medium">
                Milestone title <span className="text-red-500">*</span>
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 h-10 w-full rounded-xl border px-3"
                placeholder="Week 1 — Resume Foundations"
              />
            </div>

            {/* Outcome */}
            <div>
              <label className="text-sm font-medium">
                Expected outcome
              </label>
              <input
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                className="mt-1 h-10 w-full rounded-xl border px-3"
                placeholder="Resume v1 + role shortlist"
              />
            </div>

            {/* Due date */}
            <div>
              <label className="text-sm font-medium">Due date</label>
              <div className="relative mt-1">
                <input
                  type="date"
                  value={due}
                  onChange={(e) => setDue(e.target.value)}
                  className="h-10 w-full rounded-xl border px-3 pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>

            {/* Optional details */}
            <button
              onClick={() => setShowDetails((s) => !s)}
              className="flex w-full justify-between items-center border rounded-xl px-3 py-2 text-sm bg-slate-50"
            >
              <span className="flex items-center gap-2">
                <Plus
                  className={cx(
                    "h-4 w-4 transition-transform",
                    showDetails && "rotate-45"
                  )}
                />
                Add details (optional)
              </span>
              <span className="text-xs text-slate-500">
                {showDetails ? "Hide" : "Show"}
              </span>
            </button>

            <AnimatePresence>
              {showDetails && (
                <motion.textarea
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 90 }}
                  exit={{ opacity: 0, height: 0 }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border px-3 py-2 text-sm"
                  placeholder="Optional context, links, notes"
                />
              )}
            </AnimatePresence>

            <button
              onClick={addMilestone}
              className="w-full h-10 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Add to roadmap
            </button>

            <button
              onClick={handleSubmit}
              className="w-full h-10 rounded-xl bg-green-500 text-white font-semibold"
            >
              Submit Milestone
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="rounded-2xl bg-white p-5 shadow border border-slate-100">
          <h2 className="font-bold">User roadmap</h2>

          <div className="relative mt-6">
            <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-slate-200" />

            {milestones.length === 0 ? (
              <div className="bg-slate-50 border border-dashed rounded-xl p-6 text-center">
                No milestones yet
              </div>
            ) : (
              <div className="space-y-4">
                {milestones.map((m) => (
                  <motion.div key={m.id} layout className="relative pl-14">
                    <div
                      className={cx(
                        "absolute left-[18px] top-6 h-3 w-3 rounded-full",
                        statusStyles[m.status].dot
                      )}
                    />

                    <div className="border rounded-xl p-4 bg-white">
                      <h3 className="font-semibold">{m.title}</h3>

                      {m.outcome && (
                        <p className="text-sm text-slate-600">
                          {m.outcome}
                        </p>
                      )}

                      {m.due && (
                        <p className="text-xs text-slate-500">
                          Due: {m.due}
                        </p>
                      )}

                      <div className="mt-3 flex gap-2">
                        {/* <button
                          onClick={() => cycleStatus(m.id)}
                          className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded"
                        >
                          Change status
                        </button> */}
                        <button
                          onClick={() => removeMilestone(m.id)}
                          className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMilestone;
