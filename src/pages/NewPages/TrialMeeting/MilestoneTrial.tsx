import baseURL from "@/config/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

/* ================= TYPES ================= */

interface Milestone {
  id: string;
  title: string;
  description: string;
  due: string;
}

interface MilestoneForm {
  title: string;
  description: string;
  due: string;
}

/* ================= MOCK APIs ================= */
// Replace with real APIs

// const fetchMilestonesAPI = async (): Promise<Milestone[]> => {
//   return [
//     {
//       id: "1",
//       title: "milestone1",
//       description: "Resume v1",
//       due: "2026-01-22",
//     },
//     {
//       id: "2",
//       title: "milestone2",
//       description: "Mock interviews",
//       due: "2026-01-24",
//     },
//   ];
// };

const createMilestoneAPI = async (data: MilestoneForm): Promise<void> => {
  console.log("CREATE", data);
};

const updateMilestoneAPI = async (
  id: string,
  data: MilestoneForm
): Promise<void> => {
  console.log("UPDATE", id, data);
};

/* ================= COMPONENT ================= */

const MilestonePage = () => {
  const [milestones, setMilestones] = useState<any>([]);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(
    null
  );
  //@ts-ignore
const [loading,setLoading]=useState(false);
  const [formData, setFormData] = useState<MilestoneForm>({
    title: "",
    description: "",
    due: "",
  });
  const user=localStorage.getItem("user");
  //@ts-ignore
  const parseUser=user?JSON.parse(user):null;

  /* ================= FETCH ================= */

//   const fetchMilestones = async () => {
//     const res = await fetchMilestonesAPI();
//     setMilestones(res);
//   };
 const fetchMilestones = async () => {
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

// const data=response.data;
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
        //    setStateMilestone(true);
           setMilestones(mileData);
  




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
    fetchMilestones();
  }, []);

  /* ================= FORM HANDLERS ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = (): void => {
    setFormData({
      title: "",
      description: "",
      due: "",
    });
    setEditingMilestone(null);
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (): Promise<void> => {
    if (!formData.title || !formData.due) return;

    if (editingMilestone) {
      await updateMilestoneAPI(editingMilestone.id, formData);
    } else {
      await createMilestoneAPI(formData);
    }

    resetForm();
    fetchMilestones();
  };

  /* ================= EDIT ================= */

  const handleEdit = async(milestone: Milestone) => {
    setEditingMilestone(milestone);
    setFormData({
      title: milestone.title,
      description: milestone.description,
      due: milestone.due,
    });
   await fetchMilestones();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* ================= LEFT FORM ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          {editingMilestone ? "Edit Milestone" : "Add Milestone"}
        </h2>

        <div className="space-y-4">
          <input
            name="title"
            placeholder="Milestone title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <input
            name="description"
            placeholder="Expected outcome"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="date"
            name="due"
            value={formData.due}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className={`px-4 py-2 rounded text-white ${
                editingMilestone ? "bg-blue-600" : "bg-green-600"
              }`}
            >
              {editingMilestone ? "Update Milestone" : "Submit Milestone"}
            </button>

            {editingMilestone && (
              <button
                onClick={resetForm}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= RIGHT LIST ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Milestones ({milestones.length})
        </h2>

        {milestones.length === 0 ? (
          <p className="text-gray-500">No milestones yet</p>
        ) : (
          <div className="space-y-4">
            {milestones.map((m:any) => (
              <div
                key={m.id}
                className="border rounded p-4 flex justify-between items-start"
              >
                <div>
                  <h4 className="font-semibold">{m.title}</h4>
                  <p className="text-sm text-gray-600">
                    Due: {m.due}
                  </p>
                </div>
(parseUser.is_mentor) && (
                <button
                  onClick={() => handleEdit(m)}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>
)

              </div>

            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MilestonePage;
