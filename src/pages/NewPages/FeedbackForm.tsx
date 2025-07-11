import React, { useState } from "react";
import { useParams } from "react-router-dom";
import baseURL from "@/config/config";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserContext } from "../../components/context/userContext";
import { useNavigate } from "react-router-dom";

const FeedbackForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nextMilestone, setNextMilestone] = useState<"yes" | "no" | null>(null);
  const [growthValue, setGrowthValue] = useState("");
  const [sessionRating, setSessionRating] = useState(0);
  const [complete, setComplete] = useState<"yes" | "no" | null>(null);
  const [itemPending, setItemPending] = useState<"yes" | "no" | null>(null);
  const { scheduleData } = useUserContext();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const user_id = user ? JSON.parse(user)?.user_id : null;

  const growthOptions = [
    "Highly Valuable",
    "Moderately Valuable",
    "Slightly Valuable",
    "Not Valuable",
  ];

  const notifySuccess = () => toast.success("Feedback added successfully!");

  // useEffect(() => {
  //   if (id) {
  //     const fetchMeetingDetails = async () => {
  //       try {
  //         const response = await axios.get(`${baseURL}/api/validMeeting/${id}`);
  //         setMeetingData(response.data);
  //       } catch (error: any) {
  //         if (error.response && error.response.status === 403) {
  //           setErrorMessage(error.response.data.error);
  //         } else {
  //           console.error("Error fetching meeting details:", error);
  //         }
  //       }
  //     };

  //     fetchMeetingDetails();
  //   }
  // }, [id]);

  useEffect(() => {
    console.log("scheduleData---", scheduleData);
  }, []);

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        user_id: user_id,
        mentor_id: scheduleData ? scheduleData.mentor_id : null,
        milestone: "Complete project draft",
        milestone_achieved:
          complete === "yes" ? true : itemPending === "no" ? true : false,
        next_steps_identified: complete
          ? true
          : nextMilestone === "yes"
          ? true
          : false,
        progress_rating: sessionRating,
        mentor_responsibility: complete === "yes" ? true : false,
        user_responsibility: complete === "yes" ? true : false,
        check_id: scheduleData ? scheduleData.mentor_id : null,
        check_meeting_id: id,
      };

      const response = await axios.post(`${baseURL}/feedback`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
console.log("response-data",response.data);
      notifySuccess();
      navigate(`/dashboard`);
    } catch (error) {
      console.error("Feedback submission failed:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto font-sans text-sm border-2 border-slate-300 rounded-md shadow-md shadow-slate-400 my-10 bg-blue-50">
      <h1 className="text-3xl font-bold mb-4 flex justify-center">
        Feedback Form
      </h1>

      {/* Session Details */}
      <div className="border rounded-lg p-3 mb-6 flex justify-between items-center bg-white">
        <div className="flex items-center gap-6">
          <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
            DD
          </div>
          <div>
            <div className="font-semibold text-lg">Harsh Mentor</div>
            <div className="text-gray-500 text-md">Mentor</div>
          </div>
        </div>
        <div className="text-gray-600 text-lg">
          <span className="font-medium !text-lg">Session Date:</span> 2025-06-27
        </div>
      </div>

      {/* Question 1 */}
      <div className="border rounded-lg p-6 bg-white shadow-sm mb-6">
        <div className="">
          <label className="block mb-1 text-gray-700 text-lg font-semibold ">
            1. Will you mark this Milestone as Complete?
          </label>
          <div className="flex gap-4 mt-1 px-5">
            {["Yes", "No"].map((val) => (
              <button
                key={val}
                onClick={() => setComplete(val.toLowerCase() as "yes" | "no")}
                className={`px-4 py-2 rounded-full border mt-2 text-sm ${
                  complete === val.toLowerCase()
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      </div>

      {complete === "no" && (
        <>
          <div className="border rounded-lg p-6 bg-white shadow-sm mb-6">
            <div className="mb-10">
              <label className="block mb-1 text-gray-700 font-semibold text-lg pb-3">
                2. Are the items pending to discuss in the current meeting?
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
                3. New action items identified for next milestone/meet?
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
                4. Was the session valuable for your growth?
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
        </>
      )}

      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <h2 className="block mb-1 text-gray-700 text-xl font-semibold pb-3">
          Session Effectiveness Rating
        </h2>
        <p className="text-gray-600 mb-4 text-lg">
          Rate the overall effectiveness of the session on a scale of 1 to 5.
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
  );
};

export default FeedbackForm;
