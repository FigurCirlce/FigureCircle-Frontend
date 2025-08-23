import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slide from "@mui/material/Slide";
import { Dialog, DialogActions, DialogContent, Button } from "@mui/material";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import pic from "../../../assets/pic.jpg";
import baseURL from "@/config/config";
import { TransitionProps } from "@mui/material/transitions";
import CryptoJS from "crypto-js";

// interface User {
//   access_token:string;
// data_fill:boolean;
// is_mentor2:boolean;
// user_id:number;
// }

interface Schedule {
  id: number;
  name: string;
  email: string;
  start_date: string;
  duration: string;
  mentor_id: number | null;
  user_id: string;
  mentor_email?: string;
  mentor_phone?: string;
  mentor_linkedin?: string;
  timezone?: string;
}

interface AvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
}
type SupportOption =
  | "Strategic advice"
  | "Skill development roadmap"
  | "Portfolio or profile feedback"
  | "Industry insights"
  | "Connections or opportunities"
  | "Something else";

type FormState = {
  area_exploring: string;
  goal_challenge: string;
  support_types: SupportOption[];
};

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
  availability: AvailabilitySlot[];
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ITEMS_PER_PAGE = 3;

const RecommendMentor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [assignedMentorData, setAssignedMentorData] = useState<Mentor[]>([]);
  const [selectedExpertKey, setSelectedExpertKey] = useState<number | null>(
    null
  );
  const [selectedExpertData, setSelectedExpertData] = useState<Mentor | null>(
    null
  );
  // @ts-ignore
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [page, setPage] = useState(1);
  const [form, setForm] = useState<FormState>({
    area_exploring: "",
    goal_challenge: "",
    support_types: [],
  });
  const [formData, setFormData] = useState<Schedule>({
    id: 0,
    name: "",
    email: "",
    start_date: "",
    duration: "30",
    //@ts-ignore
    mentor_id: null,
    user_id: "",
    mentor_email: "",
    mentor_phone: "",
    mentor_linkedin: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const supportOptions: SupportOption[] = [
    "Strategic advice",
    "Skill development roadmap",
    "Portfolio or profile feedback",
    "Industry insights",
    "Connections or opportunities",
    "Something else",
  ];

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const userData2 = localStorage.getItem("degree");
  const user = localStorage.getItem("user");
  //@ts-ignore
  const parsedUser = user ? JSON.parse(user) : null;
  const parsedUserData2 = userData2 ? JSON.parse(userData2) : null;

  const notifySuccess = (msg = "Intent Submitted Successfully!") => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const notifyMeetingScheduledSuccess = (
    msg = "Meeting Scheduled Successfully!"
  ) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  useEffect(() => {
    const fetchAssignedMentors = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/recommend-mentors`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.recommended_mentors?.length) {
          setAssignedMentorData(res.data.recommended_mentors);
          setSelectedExpertKey(res.data.recommended_mentors[0].mentor_id);
        }
      } catch (error) {
        console.error("Error fetching assigned mentors", error);
      }
    };

    fetchAssignedMentors();
  }, [token]);

  // ---------- Filtered & Paginated Mentors ----------
  const filteredMentors = assignedMentorData.filter((mentor) => {
    const lower = searchTerm.toLowerCase();
    return (
      mentor.name.toLowerCase().includes(lower) ||
      mentor.expertise.toLowerCase().includes(lower) ||
      mentor.background.toLowerCase().includes(lower)
    );
  });

  const totalPages = Math.ceil(filteredMentors.length / ITEMS_PER_PAGE);
  const paginatedMentors = filteredMentors.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (selectedExpertKey !== null) {
      const selected = assignedMentorData.find(
        (mentor) => mentor.mentor_id === selectedExpertKey
      );
      if (selected) {
        setSelectedExpertData(selected);
      }
    }
  }, [selectedExpertKey, assignedMentorData]);

  useEffect(() => {
    setPage(1); // Reset page when search term changes
  }, [searchTerm]);

  const handleExpert = (id: number) => {
    navigate(`/expert/${id}`);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  //@ts-ignore
  const handleSubmitIntent = async (
    mentor_id: number | undefined,
    user_id: number
  ) => {
    const token = localStorage.getItem("token");

    const dataToSubmit = {
      ...form,
      user_id: user_id,
      mentor_id: mentor_id,
    };
    try {
      const response = await axios.post(`${baseURL}/api/intent`, dataToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        notifySuccess();
        setForm({
          area_exploring: "",
          goal_challenge: "",
          support_types: [],
        });
        setOpenDialog(false);
        handleSubmit();
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleSubmit = async () => {
    console.log("formdata----", formData);

    // if (!tempSelectedDate || !tempSelectedTime) {
    //   alert("Please select date and time");
    //   return;
    // }

    try {
      // const startDateISO = convertDateAndTimeToISO(
      //   tempSelectedDate,
      //   tempSelectedTime
      // );

      const updatedFormData = {
        ...formData,
        // start_date: startDateISO,
        start_date: new Date().toISOString(),
      };

      // console.log("userData---", userData);
      console.log("userData2", userData2);

      if (user && userData2) {
        // const parsedUserData = JSON.parse(userData);
        // const parsedUserData2 = JSON.parse(userData2);
        const parsedUser = JSON.parse(user);
        // console.log("parsedUserData---", parsedUserData);
        console.log("parsedUserData2----", parsedUserData2);

        const randomId = Math.floor(Math.random() * 1000);
        const roomid = Math.floor(Math.random() * 1000);
        const password = Math.random().toString(36).substring(2, 8);
        console.log("randomId---", randomId);
        console.log("roomid----", roomid);
        console.log("password----", password);

        const secretKey = "meetingkeys";
        console.log("secretKey----", secretKey);

        const startDate = updatedFormData.start_date;
        console.log("startDate----", startDate);

        // Always fixed 60-minute meeting
        const duration = 60;
        const calculateEndDate = (
          startDateISO: string,
          durationMinutes: number
        ): string => {
          const start = new Date(startDateISO);
          start.setMinutes(start.getMinutes() + durationMinutes);
          return start.toISOString();
        };

        const endDate = calculateEndDate(startDate, duration);
        console.log("endDate----", endDate);

        // Encrypt values
        const encryptedStartDate = CryptoJS.AES.encrypt(
          startDate,
          secretKey
        ).toString();
        console.log("encryptedStartDate----", encryptedStartDate);

        const encryptedEndDate = CryptoJS.AES.encrypt(
          endDate,
          secretKey
        ).toString();
        console.log("encryptedEndDate----", encryptedEndDate);

        const encryptedRoomId = CryptoJS.AES.encrypt(
          roomid.toString(),
          secretKey
        ).toString();
        console.log("encryptedRoomId----", encryptedRoomId);

        const encryptedPassword = CryptoJS.AES.encrypt(
          password,
          secretKey
        ).toString();
        console.log("encryptedPassword----", encryptedPassword);

        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log("timeZone----", timeZone);

        const meetingLink = `/v2/meetingcall/${randomId}?start=${encodeURIComponent(
          encryptedStartDate
        )}&end=${encodeURIComponent(
          encryptedEndDate
        )}&roomid=${encodeURIComponent(
          encryptedRoomId
        )}&password=${encodeURIComponent(
          encryptedPassword
        )}&timezone=${encodeURIComponent(timeZone)}`;

        console.log("meetingLink----", meetingLink);

        // Prepare schedule data
        const scheduleData = {
          name: parsedUserData2.firstname || "",
          email: parsedUserData2.emailid || "",
          start_datetime: startDate,
          end_datetime: endDate,
          duration: duration, // always 60
          link: meetingLink,
          user_id: parsedUser.user_id,
          mentor_id: selectedExpertData?.mentor_id, //Take from handleClick
          mentor_name: selectedExpertData?.name,

          mentor_email: selectedExpertData?.email,
          roomid: roomid,
          password: password,
          timezone: timeZone,
        };

        console.log("scheduleData-----", scheduleData);

        const response = await axios.post<{ message: string; id: number }>(
          `${baseURL}/api/trial_ schedule`,
          scheduleData
        );

        notifyMeetingScheduledSuccess();
        // setDurationOpen(false);
        // setSelectedMentorId(null);

        // setRefreshKey(Date.now());
        setSchedules((prev) => [
          ...prev,
          {
            ...formData,
            id: response.data.id,
            user_id: parsedUser.user_id,
          },
        ]);

        setFormData({
          id: 0,
          name: "",
          email: "",
          start_date: "",
          duration: "60", // default reset
          mentor_id: 0,
          user_id: "",
          mentor_email: "",
          mentor_phone: "",
          mentor_linkedin: "",
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        });
      } else {
        //@ts-ignore
        // setError("User data not found in localStorage.");
        console.log("User data not found in localStorage.");
      }
    } catch (err: any) {
      //@ts-ignore
      // setError(err.response?.data?.error || "An error occurred");
      console.log(err.response?.data?.error || "An error occurred");
      alert("An error occurred");
    }
  };

  return (
    <section id="mentor" className="py-10 bg-gray-50">
      <h1 className="flex justify-center text-xl sm:text-4xl font-bold pb-6">
        Recommended Mentors For You
      </h1>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name, expertise or background..."
          className="w-[80%] md:w-[60%] border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-5 w-full px-6">
        {/* Mentor List */}
        <div className="bg-white rounded-2xl shadow p-6 w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4">Mentors</h2>
          <div className="space-y-4">
            {paginatedMentors.length < 1 ? (
              <p>No mentors found</p>
            ) : (
              paginatedMentors.map((mentor) => (
                <div
                  key={mentor.mentor_id}
                  onClick={() => setSelectedExpertKey(mentor.mentor_id)}
                  className={`border rounded-xl px-4 py-2 flex gap-4 items-center cursor-pointer transition-all hover:shadow-md ${
                    selectedExpertKey === mentor.mentor_id
                      ? "border-emerald-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={mentor.profile_picture || pic}
                    alt="mentor"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{mentor.name}</p>
                    <p className="text-sm text-gray-500">{mentor.expertise}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Buttons */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm font-semibold">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Detailed View */}
        <div className="bg-white rounded-2xl shadow p-6 flex-1">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Mentor Details
          </h2>
          {selectedExpertData ? (
            <div className="space-y-4 text-gray-800">
              <div className="flex items-center gap-4">
                <img
                  src={selectedExpertData.profile_picture || pic}
                  alt="mentor"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold">
                    {selectedExpertData.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedExpertData.expertise}
                  </p>
                  <p className="text-sm">{selectedExpertData.degree}</p>
                </div>
              </div>

              <p>{selectedExpertData.background}</p>

              <div className="text-sm text-gray-600">
                <p>
                  <strong>Email:</strong> {selectedExpertData.email}
                </p>
                <p>
                  <strong>Fee:</strong> ₹{selectedExpertData.fee}
                </p>
                <p>
                  <strong>LinkedIn:</strong>{" "}
                  <a
                    href={`https://${selectedExpertData.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {selectedExpertData.linkedin}
                  </a>
                </p>
                <p>
                  <strong>Resume:</strong>{" "}
                  <a
                    href={selectedExpertData.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View PDF
                  </a>
                </p>
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => setOpenDialog(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Schedule Call
                </button>
                <button
                  onClick={() => handleExpert(selectedExpertData.mentor_id)}
                  className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50"
                >
                  Learn More
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Select a mentor to view details
            </p>
          )}
        </div>
      </div>

      {/* Schedule Call Dialog */}
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDialog(false)}
        aria-describedby="schedule-call-dialog"
        PaperProps={{ style: { minWidth: "35vw", maxHeight: "80vh" } }}
      >
        <DialogContent>
          <div className="w-full bg-white rounded-xl p-4">
            <div className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Share Your Intent
              <div className="text-sm font-normal text-gray-500">
                Help your mentor understand what you're looking for
              </div>
            </div>

            <div className="space-y-4">
              <textarea
                rows={2}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="What area are you exploring?"
                value={form.area_exploring}
                onChange={(e) =>
                  setForm({ ...form, area_exploring: e.target.value })
                }
              />
              <textarea
                rows={2}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="What is your goal or challenge?"
                value={form.goal_challenge}
                onChange={(e) =>
                  setForm({ ...form, goal_challenge: e.target.value })
                }
              />
              <div className="space-y-2">
                <label className="font-semibold">
                  What kind of support are you looking for?
                </label>
                {supportOptions.map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={form.support_types.includes(option)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setForm({
                            ...form,
                            support_types: [...form.support_types, option],
                          });
                        } else {
                          setForm({
                            ...form,
                            support_types: form.support_types.filter(
                              (item) => item !== option
                            ),
                          });
                        }
                      }}
                    />
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                  // onClick={() =>
                  //   handleSubmitIntent(
                  //     selectedExpertData?.mentor_id,
                  //     parsedUser?.user_id
                  //   )
                  // }
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </DialogContent>

        <DialogActions className="absolute top-0 right-2">
          <Button onClick={() => setOpenDialog(false)}>
            <X size={30} color="black" />
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default RecommendMentor;
