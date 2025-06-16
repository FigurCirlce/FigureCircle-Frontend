import React, { useEffect, useState } from "react";
import coding from "../../assets/coding.jpg";
import pic from "../../assets/pic.jpg";
import { Search } from "lucide-react";
import axios from "axios";
import baseURL from "@/config/config";

// Define Interfaces
interface ProgressAPIResponse {
  latest_feedback: {
    created_at: string;
    milestone: string;
    milestone_achieved: boolean;
    progress_rating: number;
  };
  metadata: {
    last_updated: string;
    mentor_id: number;
    total_feedback_entries: number;
    user_id: number;
  };
  milestones: {
    completed: MilestoneEntry[];
    pending: MilestoneEntry[];
  };
  progress_summary: {
    completed_count: number;
    milestones_completed: string;
    pending_count: number;
    progress_percentage: number;
    total_milestones: number;
  };
}

interface MilestoneEntry {
  completed: boolean;
  completion_date: string | null;
  description: string;
  expected_completion_date: string;
  id: number;
  mentor_fees: string;
  milestone: string;
  progress_rating: number | null;
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

const LandingDashboard: React.FC = () => {
  const [assignedMentorData, setAssignedMentorData] = useState<Mentor[]>([]);
  const [selectedExpertKey, setSelectedExpertKey] = useState<number | null>(
    null
  );
  const [selectedExpertData, setSelectedExpertData] =
    useState<ProgressAPIResponse | null>(null);
  const [course, setCourse] = useState<string[]>([]);
  const [certificate, setCertificate] = useState<string[]>([]);
  const [competition, setCompetition] = useState<string[]>([]);
  const token = localStorage.getItem("token");
  const degree = localStorage.getItem("degree");

  useEffect(() => {
    const fetchAssignedMentors = async () => {
      try {
        const res = await axios.get(`${baseURL}/get_assigned_mentors`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data?.mentors?.length) {
          console.log("res.data?.mentors?", res.data?.mentors);
          setAssignedMentorData(res.data.mentors);
          // const mentorData = {
          //   mentors: [

          //     {
          //       background: "pick me",
          //       degree: "Ph.D. Quantum Physics",
          //       email: "harshmentortest4@gmail.com",
          //       expertise: "Data Science for Finance",
          //       fee: "800",
          //       linkedin: "yellow/linkedin",
          //       mentor_id: 2,
          //       milestones: 4,
          //       name: "Smriti mentor ",
          //       phone: "+91 9818193660",
          //       profile_picture:
          //         "https://res.cloudinary.com/dpwysillm/image/upload/v1744687445/INTR_survery_j0xjys.png",
          //       resume:
          //         "https://res.cloudinary.com/dpwysillm/image/upload/v1744687446/Massid-_Udayan_Anand_sl8cd7.pdf",
          //     },
          //      {
          //       background: "pick me",
          //       degree: "Ph.D. Quantum Physics",
          //       email: "harshmentortest4@gmail.com",
          //       expertise: "Data Science for Finance",
          //       fee: "800",
          //       linkedin: "yellow/linkedin",
          //       mentor_id: 6,
          //       milestones: 4,
          //       name: "harsh mentor 4",
          //       phone: "+91 9818193660",
          //       profile_picture:
          //         "https://res.cloudinary.com/dpwysillm/image/upload/v1744687445/INTR_survery_j0xjys.png",
          //       resume:
          //         "https://res.cloudinary.com/dpwysillm/image/upload/v1744687446/Massid-_Udayan_Anand_sl8cd7.pdf",
          //     },
          //   ],
          // };
          // setAssignedMentorData(mentorData.mentors);
          // setSelectedExpertKey(res.data.mentors[0].mentor_id);
          setSelectedExpertKey(res.data.mentors[0].mentor_id);
        }
      } catch (error) {
        console.error("Error fetching assigned mentors", error);
      }
    };

    fetchAssignedMentors();
  }, []);

  useEffect(() => {
    if (selectedExpertKey == null) return;

    console.log("userDatttaDegree---", degree);
    //  const stored = localStorage.getItem("degree"); //degree has user_id
    const degreeData = degree ? JSON.parse(degree) : null;
    const user_id = degreeData?.user_id;

    const fetchProgressData = async () => {
      try {
        const res = await axios.get(`${baseURL}/progress/enhanced`, {
          params: {
            user_id: user_id,
            mentor_id: selectedExpertKey,
            // mentor_id:2
          },
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(res.data) && res.data.length > 0) {
          console.log("trueeeeeee");
          setSelectedExpertData(res.data[0]);
        }
        // const data = [
        //   {
        //     latest_feedback: {
        //       created_at: "Tue, 22 Apr 2025 16:09:55 GMT",
        //       milestone: "project discussion",
        //       milestone_achieved: true,
        //       progress_rating: 5,
        //     },
        //     metadata: {
        //       last_updated: "Tue, 22 Apr 2025 16:09:01 GMT",
        //       mentor_id: 2,
        //       total_feedback_entries: 2,
        //       user_id: 40,
        //     },
        //     milestones: {
        //       completed: [
        //         {
        //           completed: true,
        //           completion_date: "Tue, 22 Apr 2025 16:09:55 GMT",
        //           description: "discussion",
        //           expected_completion_date: "2025-04-24",
        //           id: 1,
        //           mentor_fees: "100",
        //           milestone: "Project discussion",
        //           progress_rating: 5,
        //         },
        //       ],
        //       pending: [
        //         {
        //           completed: false,
        //           completion_date: null,
        //           description: "coding",
        //           expected_completion_date: "2025-04-30",
        //           id: 2,
        //           mentor_fees: "200",
        //           milestone: "coding",
        //           progress_rating: null,
        //         },
        //       ],
        //     },
        //     progress_summary: {
        //       completed_count: 1,
        //       milestones_completed: "1/2",
        //       pending_count: 1,
        //       progress_percentage: 50,
        //       total_milestones: 2,
        //     },
        //   },
        // ];
        // setSelectedExpertData(data[0]);
        // if (res.data && res.data.length > 0) {
        //   if (data && data.length > 0) {
        //   setSelectedExpertData(data[0]);
        // }
        //  else {
        //   setSelectedExpertData(null);
        // }
      } catch (error) {
        console.error("Error fetching progress data", error);
      }
    };

    fetchProgressData();
  }, [selectedExpertKey]);

  useEffect(() => {
    const fetchAllData = async () => {
      const token = localStorage.getItem("token");
      const degreeData = degree ? JSON.parse(degree) : null;
      const stream = degreeData.stream_name;
      console.log("Stream==--", stream);

      if (!stream) return;

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        // Try all three primary APIs in parallel
        const [courseRes, certificateRes, competitionRes] = await Promise.all([
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
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="flex flex-col gap-6">
        <div className="bg-white rounded-2xl p-6 flex-1 shadow">
          <h2 className="text-2xl font-bold mb-4 ">Recommended for You</h2>

          {/* Courses */}
          <h3 className="py-7 pt-3 text-xl font-bold flex justify-center">
            Recommended Courses
          </h3>
          <div className="flex flex-wrap gap-x-3 gap-y-5">
            {course.length ? (
              course.map((item, i) => (
                <div
                  key={i}
                  className="border-2 border-slate-200 w-[300px] rounded-lg shadow-lg"
                >
                  <img src={coding} alt="Course" className="mb-2" />
                  <button className="bg-orange-400 text-white px-2 rounded-2xl text-xs my-2 mx-4">
                    Course
                  </button>
                  <h3 className="font-semibold text-gray-800 px-4 pb-2">
                    {item}
                  </h3>
                </div>
              ))
            ) : (
              <div className="flex justify-center">
                <p>No recommendations available</p>
              </div>
            )}
          </div>

          {/* Certifications */}
          <h3 className="py-7 text-xl font-bold flex justify-center">
            Recommended Certifications
          </h3>
          <div className="flex flex-wrap gap-x-3 gap-y-5">
            {certificate.length ? (
              certificate.map((item, i) => (
                <div
                  key={i}
                  className="border-2 border-slate-200 w-[300px] rounded-lg shadow-lg"
                >
                  <img src={coding} alt="Certification" className="mb-2" />
                  <button className="bg-blue-500 text-white px-2 rounded-2xl text-xs my-2 mx-4">
                    Certification
                  </button>
                  <h3 className="font-semibold text-gray-800 px-4 py-2">
                    {item}
                  </h3>
                </div>
              ))
            ) : (
              <p>No recommendations available</p>
            )}
          </div>

          {/* Competitions */}
          <h3 className="py-7 text-xl font-bold flex justify-center">
            Recommended Competitions
          </h3>
          <div className="flex flex-wrap gap-x-3 gap-y-5">
            {competition.length ? (
              competition.map((item, i) => (
                <div
                  key={i}
                  className="border-2 border-slate-200 w-[300px] rounded-lg shadow-lg"
                >
                  <img src={coding} alt="Competition" className="mb-2" />
                  <button className="bg-green-400 text-white px-2 rounded-2xl text-xs my-2 mx-4">
                    Competition
                  </button>
                  <h3 className="font-semibold text-gray-800 px-4 pb-2">
                    {item}
                  </h3>
                </div>
              ))
            ) : (
              <p>No recommendations available</p>
            )}
          </div>
        </div>

        {/* Expert Section */}
        <div className="flex flex-col lg:flex-row gap-5 w-full">
          {/* Expert List */}
          <div className="bg-white rounded-2xl shadow p-6 w-[400px]">
            <h2 className="text-2xl font-bold mb-4">Your Experts</h2>
            <div className="space-y-4 w-[350px]">
              {assignedMentorData.length < 1
                ? "No Assigned Mentor"
                : assignedMentorData.map((mentor) => (
                    <div
                      key={mentor.mentor_id}
                      onClick={() => setSelectedExpertKey(mentor.mentor_id)}
                      className={`border rounded-xl px-4 py-2 flex justify-between items-center cursor-pointer ${
                        selectedExpertKey === mentor.mentor_id
                          ? "border-emerald-500"
                          : ""
                      }`}
                    >
                      <div className="flex gap-2">
                        <img src={pic} alt="mentor" width={70} />
                        <div className="flex flex-col justify-center">
                          <p className="font-medium text-gray-800">
                            {mentor.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {mentor.expertise}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            {/* <div className="mt-6 flex justify-center">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-600 flex gap-2">
                Find More Experts <Search size={20} />
              </button>
            </div> */}
          </div>

          {/* Expert Progress */}
          <div className="bg-white rounded-2xl shadow p-6 flex-1">
            <h2 className="text-2xl mb-4 font-bold text-center">
              Progress with Experts
            </h2>
            {selectedExpertData ? (
              <>
                <div className="my-3">
                  <div className="flex justify-between text-sm font-semibold text-gray-700 mb-1">
                    <div>
                      Milestones Completed:{" "}
                      <span>
                        {
                          selectedExpertData.progress_summary
                            .milestones_completed
                        }
                      </span>
                    </div>
                    <div>
                      {selectedExpertData.progress_summary.progress_percentage}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{
                        width: `${selectedExpertData.progress_summary.progress_percentage}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-semibold text-gray-700">
                    Latest Feedback
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedExpertData.latest_feedback.milestone}
                  </div>
                </div>
                {/* Milestones */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 text-sm mb-1">
                    {/* Milestones ({selectedExpertData.milestones.completed.milestone}) */}
                    Milestones Completed
                  </h4>
                  {/* <ul className="text-sm text-gray-600 list-disc ml-5">
                {selectedExpertData?.milestones.completed.description}{selectedExpertData?.milestones.completed.completion_date}
              </ul>
            </div> */}
                  <ul className="text-sm text-gray-600 list-disc ml-5">
                    {selectedExpertData?.milestones?.completed?.map(
                      (milestone, index) => (
                        <li key={index}>
                          {/* {milestone.milestone} - {milestone.completion_date} */}
                          {milestone.milestone} ({milestone.description}) -{" "}
                          {milestone.completion_date
                            ? new Date(
                                milestone.completion_date
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "Not completed yet"}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 text-sm mb-1">
                    Pending Task
                  </h4>
                  <ul className="text-sm text-gray-600 list-disc ml-5">
                    {selectedExpertData?.milestones?.pending?.map(
                      (pending, index) => (
                        <li key={index}>
                          {/* {milestone.milestone} - {milestone.completion_date} */}
                          {pending.milestone} ({pending.description}) -{" "}
                          {new Date(
                            pending.expected_completion_date
                          ).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </li>
                      )
                    )}
                    {/* {selectedExpert.pending.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))} */}
                  </ul>
                </div>

                {/* Completed Tasks */}
                {/* <div>
              <h4 className="font-semibold text-gray-700 text-sm mb-1">
                Completed Tasks
              </h4>
              <ul className="text-sm text-gray-600 list-disc ml-5">
                {selectedExpertData?.milestones?.progress_summary?.map((pending, index) => (
      <li key={index}>
        {/* {milestone.milestone} - {milestone.completion_date} */}
                {/* {pending.milestone} ({pending.description}) - {pending.expected_completion_date}
      </li>
    ))}
              
              </ul> */}
                {/* </div>    */}
              </>
            ) : (
              <p>Loading expert progress...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingDashboard;
