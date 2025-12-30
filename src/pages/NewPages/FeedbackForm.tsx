import React, { useState } from "react";
import { useParams } from "react-router-dom";
import baseURL from "@/config/config";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserContext } from "../../components/context/userContext";
// import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
interface StatusProps {
  label: string;
  value: boolean;
}

interface FeedbackCardProps {
  title: string;
  data: any; // improve later if needed
  type: string;
}

interface EmptyCardProps {
  title: string;
  message: string;
  // actionLabel: string;
}
interface Feedback {
  user_id: number;
  mentor_id: number;
  check_meeting_id: number;
  progress_rating: number;
  // add only fields you actually use
}


const FeedbackUI = ({ feedbackData,myUserId ,type}: { feedbackData: any[],myUserId:Number ,type:string}) => {
  

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
          // actionLabel="Submit Feedback"
        />
      )}

      {mentorFeedback ? (
        <FeedbackCard
          title={type==="Mentor"?"Mentee Feedback":"Mentor Feedback"}
          data={mentorFeedback}
          type="Mentor"
        />
      ) : (
        <EmptyCard
          title="Mentor Feedback"
          message="Mentor has not submitted feedback yet"
          // actionLabel="Send Reminder"
        />
      )}
    </div>
  );
};

/* ---------------- COMPONENTS ---------------- */

function FeedbackCard({ title, data, type }:FeedbackCardProps) {
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
          <Status
            label="User Responsibility"
            value={data.user_responsibility}
          />
          <Status
            label="Mentor Responsibility"
            value={data.mentor_responsibility}
          />
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

function EmptyCard({ title, message }:EmptyCardProps) {
  return (
    <Card className="rounded-2xl border-2 border-dashed">
      <CardContent className="p-6 flex flex-col items-center justify-center space-y-4 text-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">{message}</p>
        {/* <Button variant="outline" size="sm">
          {actionLabel}
        </Button> */}
      </CardContent>
    </Card>
  );
}

function Status({ label, value }:StatusProps) {
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
  const [complete, setComplete] = useState<"yes" | "no" | null>(null);
  const [message, setMessage] = useState<boolean>(false);
  const [itemPending, setItemPending] = useState<"yes" | "no" | null>(null);
  const { scheduleData } = useUserContext();
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const parseUser=user?JSON.parse(user):null;
  const user_id = user ? JSON.parse(user)?.user_id : null;

  const growthOptions = [
    "Highly Valuable",
    "Moderately Valuable",
    "Slightly Valuable",
    "Not Valuable",
  ];

  const notifySuccess = () =>
    toast.success("Thank you for Submitting Feedback!");

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
    getFeedback();
    console.log("scheduleData---", scheduleData);
  }, []);

  const myFeedback = feedbackData.find(
  (f) => f.user_id === user_id
);


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
      // navigate(`/dashboard`);
      setTimeout(() => {
        window.close();
      }, 5000);
    } catch (error) {
      console.error("Feedback submission failed:", error);
    }
  };

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
          <FeedbackUI feedbackData={feedbackData} myUserId={user_id} type={parseUser.is_mentor?"Mentor":"Mentee"} />
        </div>
      ) : (
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
                <div className="font-semibold text-lg">
                  {" "}
                  {/* {scheduleData ? scheduleData.mentor_name : null} */}
                  {parseUser.is_mentor?scheduleData?.name:scheduleData?.mentor_name}
                </div>
                <div className="text-gray-500 text-md">{parseUser.is_mentor?"Mentee":"Mentor"}</div>
              </div>
            </div>
            <div className="text-gray-600 text-lg">
              <span className="font-medium !text-lg">Session Date:</span>{" "}
              {scheduleData ? new Date(scheduleData.start_datetime).toLocaleDateString("en-GB") : null}
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
                    onClick={() =>
                      setComplete(val.toLowerCase() as "yes" | "no")
                    }
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
