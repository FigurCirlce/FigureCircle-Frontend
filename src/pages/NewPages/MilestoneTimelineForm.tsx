import React, { useState } from "react";
import { Pen } from "lucide-react";
import { Trash2 } from "lucide-react";
import axios from "axios";
import baseURL from "@/config/config";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface Milestone {
  title: string;
  description: string;
  expectedCompletionDate: string;
}

const MilestoneTimelineForm: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [mentorData, setmentorData] = useState<any>();
  const [formData, setFormData] = useState<Milestone>({
    title: "",
    description: "",
    expectedCompletionDate: "",
  });
  const { id } = useParams<{ id: string }>();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const parsedUserData = user ? JSON.parse(user) : null;

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const notifySuccess = () =>
    toast.success("User mentorship created successfully!");

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
      setmentorData(response.data);

      // setBasicInfo([response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMentorInfo();
  }, []);

  const handleChange = (field: keyof Milestone, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const addOrUpdateMilestone = () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.expectedCompletionDate
    )
      return;

    if (editIndex !== null) {
      const updated = [...milestones];
      updated[editIndex] = formData;
      setMilestones(updated);
      setEditIndex(null);
    } else {
      setMilestones([...milestones, formData]);
    }

    setFormData({ title: "", description: "", expectedCompletionDate: "" });
  };

  const handleEdit = (index: number) => {
    setFormData(milestones[index]);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = milestones.filter((_, i) => i !== index);
    setMilestones(updated);
    if (editIndex === index) {
      setFormData({ title: "", description: "", expectedCompletionDate: "" });
      setEditIndex(null);
    }
  };

  const handleSubmit = async () => {
    console.log("Final Milestones:", milestones);
    const degree = localStorage.getItem("degree");
    const user_id = degree ? JSON.parse(degree)?.id : null;

    try {
      // setLoading(true);
      const token = localStorage.getItem("token");
      console.log("user_id", user_id);
      const dataToSend = {
        user_id: parsedUserData.user_id,
        mentor_id: mentorData.mentor_id,
        milestone: milestones,
        check_meeting_id: id,
        check_id: mentorData.mentor_id,
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
    } catch (error) {
      console.error("Milestone submission failed:", error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        Milestone Timeline Form
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Form */}
        <div className="bg-gray-100 p-6 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            {editIndex !== null ? "Edit Milestone" : "Add New Milestone"}
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Milestone Title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="date"
              value={formData.expectedCompletionDate}
              onChange={(e) =>
                handleChange("expectedCompletionDate", e.target.value)
              }
              className="w-full p-2 border rounded"
            />
            <div className="flex gap-4">
              <button
                onClick={addOrUpdateMilestone}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                {editIndex !== null ? "Update" : "Add Milestone"}
              </button>
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded"
              >
                Submit All
              </button>
            </div>
          </div>
        </div>

        {/* Right: Timeline */}
        <div className="relative border-l-4 border-gray-300 pl-6">
          {milestones.length === 0 ? (
            <p className="text-gray-500">No milestones created yet.</p>
          ) : (
            milestones.map((milestone, index) => (
              <div key={index} className="mb-6 relative">
                <span className="absolute -left-[21px] top-4 w-4 h-4 bg-blue-600 rounded-full"></span>

                <div className="bg-gray-100 p-4 rounded-md shadow flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  {/* Milestone Content */}
                  <div>
                    <h3 className="font-bold text-base">{milestone.title}</h3>
                    <p className="text-sm text-gray-700">
                      {milestone.description}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Due: {milestone.expectedCompletionDate}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 justify-end md:justify-start">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      <Pen />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MilestoneTimelineForm;
