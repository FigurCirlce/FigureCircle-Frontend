import { useEffect, useMemo, useState } from "react";
import {
  Video,
  ClipboardList,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  
} from "lucide-react";
import { X } from "lucide-react";
import axios from "axios";
import baseURL from "@/config/config";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
import FeedbackPopup from "@/components/NewPage/FeedbackPopup";
import MilestonePopup from "@/components/NewPage/MilestonePopup";
import { Dialog, DialogContent } from "@mui/material";
import { Goal } from "lucide-react";

// —— Types ——
interface Mentor {
  mentor_id: number;
  mentor_name: string;
  profile_picture: string;
  availability: { day: string; startTime: string; endTime: string }[];
  name: string;
  email: string;
  phone: string;
  linkedin: string;
}
interface user_info {
  email: string;
  user_id: number;
  first_name: string;
}
interface Schedule {
  id: number;
  name: string;
  email: string;
  start_date: string;
  duration: string;
  mentor_id: string;
  user_id: string;
  mentor_email?: string;
  mentor_phone?: string;
  mentor_linkedin?: string;
  timezone?: string;
  user_info: user_info;
}
interface user_work {
  industry: string;
  role: string;
  role_based: string;
  work_experience: string;
}
interface user_education {
  high_education: string;
}
interface Intent {
  id: number;
  user_id: number;
  mentor_id: number;
  email: string;
  useruniqid: string;
  goal_challenge: string;
  support_types: string;
  area_exploring: string | null;
  created_at: string;
  user_work: user_work;
  user_info: user_info;
  user_education: user_education;
}
interface Meeting {
  id: string;
  mentor: Mentor;
  dateISO: string;
  start_datetime: string;
  duration: string;
  link: string;
  milestonesUrl: string;
  feedbackUrl: string;
  mentor_name: string;
  user_id: number;
  mentorName: string;
  mentor_email: string;
  email: string;
  name: string;
  mentor_id: number;
  end_datetime: string;
  created_at: string;
  intent: Intent;
}
interface Availability {
  day: string;
  startTime: string;
  endTime: string;
}
interface CalendarCell {
  date: Date;
  inMonth: boolean;
}

export type MentorSchedule = { day: string; start: string; end: string };
type MentorScheduleEditorProps = { onSave: (schedule: Availability[]) => void };

// —— MentorScheduleEditor ——
const MentorScheduleEditor: React.FC<MentorScheduleEditorProps> = ({
  onSave,
}) => {
  const [slots, setSlots] = useState([
    { day: "Monday", start: "10:00", end: "12:00" },
  ]);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const addSlot = () =>
    setSlots([...slots, { day: "Monday", start: "", end: "" }]);
  const updateSlot = (i: number, field: string, value: string) => {
    const updated = [...slots];
    (updated[i] as any)[field] = value;
    setSlots(updated);
  };
  const removeSlot = (i: number) =>
    setSlots(slots.filter((_, idx) => idx !== i));
  const handleSave = () => {
    const formatted = slots.map((s) => ({
      day: s.day,
      startTime: s.start,
      endTime: s.end,
    }));
    onSave(formatted);
  };

  return (
    <div className="border rounded-lg p-3 space-y-3 bg-white shadow">
      <h2 className="text-sm font-semibold">Change Your Availability</h2>
      {slots.map((slot, index) => (
        <div
          key={index}
          className="flex gap-1 sm:gap-2 items-center border p-1 rounded"
        >
          <select
            className="border rounded py-1 px-1 text-xs"
            value={slot.day}
            onChange={(e) => updateSlot(index, "day", e.target.value)}
          >
            {days.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <input
            type="time"
            className="border py-1 px-1 rounded text-xs"
            value={slot.start}
            onChange={(e) => updateSlot(index, "start", e.target.value)}
          />
          <input
            type="time"
            className="border py-1 px-1 rounded text-xs"
            value={slot.end}
            onChange={(e) => updateSlot(index, "end", e.target.value)}
          />
          <button
            className="text-red-500 text-sm px-1"
            onClick={() => removeSlot(index)}
          >
            ✕
          </button>
        </div>
      ))}
      <button className="text-blue-600 text-xs font-medium" onClick={addSlot}>
        + Add another slot
      </button>
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs hover:bg-blue-700 block"
      >
        Save Availability
      </button>
    </div>
  );
};

// —— Helpers ——
const parseTimeToDate = (date: Date, timeStr: string) => {
  const d = new Date(date);
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  d.setHours(hours, minutes, 0, 0);
  return d;
};

// —— SupportDetailsCard ——
const SupportDetailsCard = ({ data }: { data: Intent | null }) => (
  <div className="max-w-md rounded-2xl border bg-white p-5 shadow-sm space-y-3">
    <h2 className="text-base font-semibold text-gray-800 flex justify-center">
      Submitted Intent Details
    </h2>
    {data ? (
      <div className="text-sm space-y-1.5">
        <p>
          <span className="font-medium">Name:</span>{" "}
          {data?.user_info.first_name}
        </p>
        <p>
          <span className="font-medium">Education:</span>{" "}
          {data?.user_education.high_education}
        </p>
        <p>
          <span className="font-medium">Dream Role:</span>{" "}
          {data?.user_work?.role_based}
        </p>
        <p>
          <span className="font-medium">Work Experience:</span>{" "}
          {data?.user_work?.work_experience}
        </p>
        <p>
          <span className="font-medium">Industry:</span>{" "}
          {data?.user_work?.industry}
        </p>
        <p>
          <span className="font-medium">Goal / Challenge:</span>{" "}
          {data?.goal_challenge}
        </p>
        <p>
          <span className="font-medium">Support Types:</span>{" "}
          {data?.support_types}
        </p>
        {data?.area_exploring && (
          <p>
            <span className="font-medium">Area Exploring:</span>{" "}
            {data?.area_exploring}
          </p>
        )}
        <p className="text-gray-500 text-xs">
          Created on{" "}
          {new Date(data?.created_at).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    ) : (
      <div className="flex justify-center">No Intent Found</div>
    )}
  </div>
);

// —— MentorSlider ——
// const MentorSlider = ({
//   mentors,
//   loading,
//   selectedMentor,
//   onSelect,
//   onUnassign,
// }: {
//   mentors: Mentor[];
//   loading: boolean;
//   selectedMentor: any;
//   onSelect: (id: number) => void;
//   onUnassign: (m: Mentor) => void;
// }) => {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const scroll = (dir: "left" | "right") => {
//     scrollRef.current?.scrollBy({
//       left: dir === "left" ? -200 : 200,
//       behavior: "smooth",
//     });
//   };

//   if (loading)
//     return (
//       <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
//         <Loader2 size={16} className="animate-spin" /> Loading mentors...
//       </div>
//     );
//   if (mentors.length === 0)
//     return <div className="font-bold text-md mb-3">No Mentor Assigned</div>;

//   return (
//     <div className="flex items-center gap-2 mb-3">
//       {/* Left Arrow */}
//       <button
//         onClick={() => scroll("left")}
//         className="flex-shrink-0 w-7 h-7 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 flex items-center justify-center shadow-sm transition"
//       >
//         <ChevronLeft size={14} />
//       </button>

//       {/* Scrollable track */}
//       <div
//         ref={scrollRef}
//         className="flex gap-2 flex-1 overflow-x-auto"
//         style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//       >
//         {mentors.map((m, index) => (
//           <div
//             key={index}
//             className={`flex-shrink-0 flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 transition shadow-sm hover:shadow
//               ${selectedMentor?.mentor_id === m?.mentor_id ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}`}
//           >
//             <button
//               onClick={() => onSelect(m?.mentor_id)}
//               className="flex items-center gap-3"
//               aria-pressed={selectedMentor?.mentor_id === m?.mentor_id}
//             >
//               <img
//                 src={m?.profile_picture}
//                 alt={m?.name}
//                 className="h-11 w-11 rounded-full object-cover"
//               />
//               <span className="text-base font-semibold whitespace-nowrap">
//                 {m?.name}
//               </span>
//             </button>
//             <button
//               onClick={() => onUnassign(m)}
//               className="text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition ml-2"
//             >
//               Unassign
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Right Arrow */}
//       <button
//         onClick={() => scroll("right")}
//         className="flex-shrink-0 w-7 h-7 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 flex items-center justify-center shadow-sm transition"
//       >
//         <ChevronRight size={14} />
//       </button>
//     </div>
//   );
// };

// —— Main Component ——
// const MeetingSchedulerPreview = () => {
//   const [assignedMentorData, setAssignedMentorData] = useState<Mentor[]>([]);
//   const [refreshKey, setRefreshKey] = useState(false);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isMilestonePopupOpen, setIsMilestonePopupOpen] = useState(false);
//   const [selectedfeedbackData, setSelectedFeedbackData] = useState<any>([]);
//   const [selectedMilestoneData, setSelectedMilestoneData] = useState<any>([]);
//   const [mentorId, setMentorId] = useState("");
//   const [selectedIntent, setSelectedIntent] = useState<any>(null);
//   const [availability, setAvailability] = useState<Availability[]>([]);
//   const [selectedMeetingUserId, setSelectedMeetingUserId] = useState<
//     number | null
//   >(null);
//   const token = localStorage.getItem("token");

//   const fetchAssignedMentor = async () => {
//     try {
//       const response = await axios.get(`${baseURL}/get_assigned_mentors`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.data) {
//         setAssignedMentorData(response.data.mentors);
//         setMentorsList(response.data.mentors);
//       }
//     } catch (error) {
//       console.error("Error fetching Assigned Mentors:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAssignedMentor();
//   }, []);

//   const notifyTimeChangedSuccess = () =>
//     toast.success("Time Availability Changed Successfully!");
//   const notifySuccess = (msg = "Meeting Scheduled successfully!") => {
//     toast.success(msg, {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: "colored",
//     });
//   };

//   const [selectedMentor, setSelectedMentor] = useState<Mentor | any>(
//     assignedMentorData[0],
//   );
//   const [viewDate, setViewDate] = useState<Date>(() => new Date());
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
//   const [meetings, setMeetings] = useState<Meeting[]>([]);
//   const [refreshData, setRefreshData] = useState(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   //@ts-ignore
//   const [formData, setFormData] = useState<Schedule>({
//     id: 0,
//     name: "",
//     email: "",
//     start_date: "",
//     duration: "30",
//     mentor_id: "",
//     user_id: "",
//     mentor_email: "",
//     mentor_phone: "",
//     mentor_linkedin: "",
//     timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//     user_info: { email: "", user_id: 0, first_name: "" },
//   });
//   const [mentorsList, setMentorsList] = useState<
//     {
//       email: string;
//       mentor_id: number;
//       name: string;
//       phone: string;
//       linkedin: string;
//       availability: Availability[];
//     }[]
//   >([]);
//   const [openIntentDialog, setOpenIntentDialog] = useState<boolean>(false);
//   const [showDialog, setShowDialog] = useState(false);
//   const [mentorToUnassign, setMentorToUnassign] = useState<Mentor | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const user = localStorage.getItem("user");
//   const parsedUserData = user ? JSON.parse(user) : null;
//   const degree = localStorage.getItem("degree");
//   const parsedDegree = degree ? JSON.parse(degree) : null;

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentMeetings = meetings.slice(startIndex, startIndex + itemsPerPage);
//   const totalPages = Math.ceil(meetings.length / itemsPerPage);

//   const openUnassignDialog = (mentor: Mentor) => {
//     setMentorToUnassign(mentor);
//     setShowDialog(true);
//   };
//   const closeDialog = () => {
//     setShowDialog(false);
//     setMentorToUnassign(null);
//   };
//   const handleUnassign = async () => {
//     try {
//       await axios.delete(`${baseURL}/unassign_mentor`, {
//         headers: { Authorization: `Bearer ${token}` },
//         data: { mentor_id: mentorToUnassign?.mentor_id },
//       });
//       fetchAssignedMentor();
//     } catch (error) {
//       console.error("Error unassigning mentor:", error);
//     }
//     closeDialog();
//   };

//   const monthMatrix = useMemo(
//     () => buildMonthMatrix(viewDate),
//     [viewDate, refreshData, availability],
//   );
//   const monthLabel = useMemo(
//     () =>
//       viewDate.toLocaleString(undefined, { month: "long", year: "numeric" }),
//     [viewDate],
//   );

//   const dayNames = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   const dayMap: Record<string, number> = {
//     Sunday: 0,
//     Monday: 1,
//     Tuesday: 2,
//     Wednesday: 3,
//     Thursday: 4,
//     Friday: 5,
//     Saturday: 6,
//   };

//   const generateTimeSlots = (start: string, end: string): string[] => {
//     const slots: string[] = [];
//     const [startH, startM] = start.split(":").map(Number);
//     const [endH, endM] = end.split(":").map(Number);
//     const current = new Date();
//     current.setHours(startH, startM, 0, 0);
//     const endTime = new Date();
//     endTime.setHours(endH, endM, 0, 0);
//     while (current <= endTime) {
//       slots.push(
//         current.toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       );
//       current.setHours(current.getHours() + 1);
//     }
//     return slots;
//   };

//   const slotsForDate = (d: Date | string | null): string[] => {
//     if (!d) return [];
//     const dateObj = typeof d === "string" ? new Date(d) : d;
//     if (isNaN(dateObj.getTime())) return [];
//     const dayName = dayNames[dateObj.getDay()];
//     const dataList: Availability[] =
//       availability?.length > 0
//         ? availability
//         : (selectedMentor?.availability ?? []);
//     const slotData = dataList.find((a) => a.day === dayName);
//     if (!slotData) return [];
//     return generateTimeSlots(slotData.startTime, slotData.endTime);
//   };

//   const availableDayIndices = (availability || []).map(
//     (a: any) => dayMap[a.day],
//   );

//   const convertDateAndTimeToISO = (date: Date, timeString: string): string => {
//     const dateObj = new Date(date);
//     const [time, modifier] = timeString.split(" ");
//     let [hours, minutes] = time.split(":").map(Number);
//     if (modifier === "PM" && hours !== 12) hours += 12;
//     if (modifier === "AM" && hours === 12) hours = 0;
//     dateObj.setHours(hours, minutes, 0, 0);
//     const pad = (n: number) => n.toString().padStart(2, "0");
//     return `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(dateObj.getDate())}T${pad(hours)}:${pad(minutes)}`;
//   };

//   const calculateEndDate = (
//     startDate: string,
//     durationMinutes: string,
//   ): string => {
//     const date = new Date(startDate);
//     date.setMinutes(date.getMinutes() + parseInt(durationMinutes));
//     return date.toISOString().slice(0, 16);
//   };

//   const fetchMeetingData = async () => {
//     try {
//       const response = await axios.get(`${baseURL}/api/schedules`, {
//         params: parsedUserData.is_mentor
//           ? { mentor_id: mentorId }
//           : { user_id: parsedUserData.user_id },
//       });
//       if (response.data) {
//         const sortedData = [...response.data].sort(
//           (a, b) =>
//             new Date(b.start_datetime).getTime() -
//             new Date(a.start_datetime).getTime(),
//         );
//         setMeetings(sortedData);
//       }
//     } catch (error) {
//       console.error("Error fetching meeting data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setLoading(true);
//     fetchMeetingData();
//     if (parsedUserData.is_mentor) fetchMentorData();
//   }, []);

//   useEffect(() => {
//     if (refreshKey) fetchMeetingData();
//   }, [refreshKey]);
//   useEffect(() => {
//     fetchMeetingData();
//   }, [mentorId]);

//   const confirmMeeting = async () => {
//     if (!selectedMentor || !selectedDate || !selectedSlot) {
//       alert("Please select a mentor, date, and time");
//       return;
//     }
//     try {
//       setLoading(true);
//       const startDateISO = convertDateAndTimeToISO(selectedDate, selectedSlot);
//       const endDate = calculateEndDate(startDateISO, "45");
//       const randomId = Math.floor(Math.random() * 1000);
//       const roomid = Math.floor(Math.random() * 1000);
//       const password = Math.random().toString(36).substring(2, 8);
//       const secretKey = "meetingkeys";
//       const encryptedStartDate = CryptoJS.AES.encrypt(
//         startDateISO,
//         secretKey,
//       ).toString();
//       const encryptedEndDate = CryptoJS.AES.encrypt(
//         endDate,
//         secretKey,
//       ).toString();
//       const encryptedRoomId = CryptoJS.AES.encrypt(
//         roomid.toString(),
//         secretKey,
//       ).toString();
//       const encryptedPassword = CryptoJS.AES.encrypt(
//         password,
//         secretKey,
//       ).toString();
//       const userData = localStorage.getItem("user");
//       const parsedUser = userData ? JSON.parse(userData) : null;
//       const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//       const meetingLink = `/v2/meetingcall/${randomId}/${parsedUser?.user_id}?start=${encodeURIComponent(encryptedStartDate)}&end=${encodeURIComponent(encryptedEndDate)}&roomid=${encodeURIComponent(encryptedRoomId)}&password=${encodeURIComponent(encryptedPassword)}&timezone=${encodeURIComponent(timeZone)}`;
//       const userDegree = localStorage.getItem("degree");
//       if (!userData || !userDegree) {
//         alert("User data not found");
//         return;
//       }
//       const parsedDegree2 = JSON.parse(userDegree);
//       await axios.post<{ message: string; id: number }>(
//         `${baseURL}/api/schedule`,
//         {
//           name: parsedDegree2.firstname || "",
//           email: parsedUser.username || "",
//           start_datetime: startDateISO,
//           end_datetime: endDate,
//           duration: "60",
//           link: meetingLink,
//           user_id: parsedUser.user_id,
//           mentor_id: selectedMentor.mentor_id,
//           mentor_name: selectedMentor.name,
//           mentor_email: selectedMentor.email,
//           roomid,
//           password,
//           timezone: timeZone,
//         },
//       );
//       notifySuccess();
//       setRefreshKey(true);
//       setSelectedSlot(null);
//     } catch (err: any) {
//       setRefreshKey(false);
//       alert("An error occurred while confirming meeting");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextMonth = () => {
//     const d = new Date(viewDate);
//     d.setMonth(d.getMonth() + 1);
//     setViewDate(d);
//   };
//   const prevMonth = () => {
//     const d = new Date(viewDate);
//     d.setMonth(d.getMonth() - 1);
//     setViewDate(d);
//   };

//   const handleMentorSelection = (mentorId: any) => {
//     const found = mentorsList.find((mentor) => mentor.mentor_id === mentorId);
//     setAvailability(found?.availability ?? []);
//     setSelectedMentor(found);
//     if (found) {
//       setFormData((prev) => ({
//         ...prev,
//         mentor_id: mentorId,
//         mentor_email: found.email,
//         mentor_phone: found.phone,
//         mentor_linkedin: found.linkedin,
//       }));
//     }
//   };

//   useEffect(() => {
//     if (parsedUserData.is_mentor) {
//       setSelectedMentor(parsedDegree);
//       setAvailability(parsedDegree?.availability);
//     }
//   }, []);

//   const handleFeedbackPopup = async (
//     user_id: number,
//     mentor_id: number,
//     meetingId: number,
//   ) => {
//     try {
//       const response = await axios.get(
//         `${baseURL}/feedback?user_id=${user_id}&mentor_id=${mentor_id}&check_meeting_id=${meetingId}`,
//         { headers: { Authorization: `bearer ${token}` } },
//       );
//       setSelectedFeedbackData(response.data);
//       setIsPopupOpen(true);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   function extractMeetingId(url: string) {
//     const match = url.match(/\/v2\/meetingcall\/(\d+)/);
//     return match ? Number(match[1]) : null;
//   }

//   const fetchMentorData = async () => {
//     try {
//       const response = await axios.get(
//         `${baseURL}/api/mentor/details?user_id=${parsedUserData.user_id}`,
//         { headers: { Authorization: `Bearer ${token}` } },
//       );
//       if (response.data) {
//         const data = response.data;
//         if (!localStorage.getItem("degree")) {
//           localStorage.setItem("degree", JSON.stringify(data));
//           setAvailability(data?.availability);
//         }
//         setMentorId(data.mentor_id);
//       }
//     } catch (error) {
//       console.error("Error fetching mentor data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMilestone = async (mentorId: Number | null) => {
//     try {
//       const response = await axios.get(`${baseURL}/api/milestone`, {
//         params: {
//           mentor_id: parsedUserData?.is_mentor
//             ? parsedDegree?.mentor_id
//             : mentorId,
//           user_id: parsedUserData?.is_mentor
//             ? mentorId
//             : parsedUserData.user_id,
//           include_history: true,
//         },
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSelectedMilestoneData(response.data);
//       setIsMilestonePopupOpen(true);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const updateTimeAvailability = async (checkAvailability: any) => {
//     const deg = localStorage.getItem("degree");
//     const pd = deg ? JSON.parse(deg) : null;
//     try {
//       const res = await axios.put(
//         `${baseURL}/update_mentor/${pd?.mentor_id}`,
//         checkAvailability,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         },
//       );
//       if (res.status === 200) {
//         setRefreshData(true);
//         notifyTimeChangedSuccess();
//         localStorage.removeItem("degree");
//         await fetchMentorData();
//       }
//     } catch (error) {
//       console.error("Update availability error:", error);
//     }
//   };

//   // —— Render ——
//   return (
//     <div className="w-full px-[3%] py-4 space-y-4 ">
//       {/* Mentor Slider */}
//       {!parsedUserData.is_mentor ? (
//         <MentorSlider
//           mentors={assignedMentorData}
//           loading={loading}
//           selectedMentor={selectedMentor}
//           onSelect={handleMentorSelection}
//           onUnassign={openUnassignDialog}
//         />
//       ) : (
//         <div />
//       )}

//       {/* Calendar + Time Slots */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//         {/* Calendar */}
//         <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
//           <div className="mb-3 flex items-center justify-between">
//             <button
//               onClick={prevMonth}
//               className="rounded-lg p-1.5 hover:bg-gray-100"
//               aria-label="Previous month"
//             >
//               <ChevronLeft className="h-5 w-5" />
//             </button>
//             <div className="text-lg font-semibold">{monthLabel}</div>
//             <button
//               onClick={nextMonth}
//               className="rounded-lg p-1.5 hover:bg-gray-100"
//               aria-label="Next month"
//             >
//               <ChevronRight className="h-5 w-5" />
//             </button>
//           </div>

//           <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 mb-1">
//             {"SMTWTFS".split("").map((c, i) => (
//               <div key={i} className="py-1">
//                 {c}
//               </div>
//             ))}
//           </div>

//           <div className="grid grid-cols-7 gap-1.5">
//             {monthMatrix.map((cell, idx) => {
//               const dayOfWeek = cell.date.getDay();
//               const isAvailableDay = availableDayIndices.includes(dayOfWeek);
//               const isCurrentMonth = cell.inMonth;
//               const isPast = isPastDay(cell.date);
//               const isDisabled = !isCurrentMonth || isPast || !isAvailableDay;
//               const isSelected =
//                 selectedDate && sameDay(cell.date, selectedDate);
//               return (
//                 <button
//                   key={idx}
//                   disabled={isDisabled}
//                   onClick={() => setSelectedDate(new Date(cell.date))}
//                   className={`aspect-square rounded-lg border text-sm transition flex items-center justify-center font-medium
//                     ${isDisabled ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50"}
//                     ${isAvailableDay ? "bg-blue-50 border-blue-300" : "border-gray-200 bg-white"}
//                     ${isSelected ? "border-blue-600 bg-blue-100 font-semibold" : ""}`}
//                 >
//                   {cell.date.getDate()}
//                 </button>
//               );
//             })}
//           </div>
//           <div className="text-xs text-slate-400 mt-3">
//             Available Dates are Slightly dimmed Vs Unavailable
//           </div>
//         </div>

//         {/* Time Slots */}
//         <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
//           <h2 className="mb-3 text-lg font-semibold">Available Times</h2>

//           {!selectedDate ? (
//             <div>
//               <p className="text-sm text-gray-500">
//                 Select a date to see available time slots.
//               </p>
//               {parsedUserData?.is_mentor && (
//                 <div className="pt-4">
//                   <MentorScheduleEditor
//                     onSave={async (schedule) => {
//                       updateTimeAvailability({
//                         availability: schedule.map((s) => ({
//                           day: s.day,
//                           startTime: s.startTime,
//                           endTime: s.endTime,
//                         })),
//                       });
//                     }}
//                   />
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div>
//               <div className="flex flex-wrap gap-2 max-h-[260px] overflow-auto">
//                 {slotsForDate(selectedDate).map((t) => {
//                   const isPastSlot =
//                     parseTimeToDate(selectedDate, t) <= new Date();
//                   return (
//                     <button
//                       key={t}
//                       disabled={isPastSlot}
//                       onClick={() => setSelectedSlot(t)}
//                       className={`rounded-xl border w-full px-5 py-3 text-sm transition font-medium
//                         ${selectedSlot === t ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:bg-gray-50"}
//                         ${isPastSlot ? "opacity-40 cursor-not-allowed" : ""}`}
//                     >
//                       {t}
//                     </button>
//                   );
//                 })}
//               </div>

//               {/* Inline meeting confirm */}
//               {selectedMentor && selectedDate && selectedSlot && (
//                 <div className="mt-4 p-4 shadow-sm shadow-slate-300 border border-slate-300 rounded-xl">
//                   <div className="text-sm font-semibold mb-2">
//                     Meeting Details
//                   </div>
//                   <div className="text-sm text-gray-700">
//                     <span className="font-semibold">Mentor:</span>{" "}
//                     {selectedMentor.name}
//                     <span className="mx-2">•</span>
//                     <span className="font-semibold">Date:</span>{" "}
//                     {selectedDate.toLocaleDateString()}
//                     <span className="mx-2">•</span>
//                     <span className="font-semibold">Time:</span> {selectedSlot}
//                   </div>
//                   <div className="flex gap-2 mt-3">
//                     <button
//                       onClick={() => setSelectedSlot(null)}
//                       className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 transition"
//                     >
//                       Change
//                     </button>
//                     <button
//                       onClick={confirmMeeting}
//                       className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 shadow transition"
//                     >
//                       Confirm Meeting
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {parsedUserData?.is_mentor && (
//                 <div className="pt-4">
//                   <MentorScheduleEditor
//                     onSave={async (schedule) => {
//                       updateTimeAvailability({
//                         availability: schedule.map((s) => ({
//                           day: s.day,
//                           startTime: s.startTime,
//                           endTime: s.endTime,
//                         })),
//                       });
//                     }}
//                   />
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Scheduled Meetings */}
//       <section className="space-y-2 border border-slate-200 shadow-sm rounded-xl p-4 bg-white">
//         <div className="pb-1">
//           <h2 className="text-base font-semibold">Scheduled Meetings</h2>
//           <p className="text-xs text-gray-500">Your Upcoming Call(s)</p>
//         </div>

//         {meetings.length === 0 ? (
//           <div className="rounded-2xl border border-dashed border-gray-300 p-5 text-center text-gray-500 text-sm">
//             No meetings yet. Pick a date and time with your mentor to get
//             started.
//           </div>
//         ) : (
//           <>
//             {currentMeetings.map((m) => (
//               <div
//                 key={m.id}
//                 className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-3 shadow-sm gap-2 flex-wrap"
//               >
//                 <div>
//                   <div className="font-semibold text-sm">
//                     {parsedUserData.is_mentor
//                       ? m?.intent?.user_info?.email
//                       : m.mentor_name}
//                   </div>
//                   <div className="text-xs text-gray-600 mt-0.5">
//                     • {new Date(m?.start_datetime).toLocaleString()} •{" "}
//                     {m.duration} Minutes
//                   </div>
//                 </div>

//                 <div className="flex gap-1.5 flex-wrap">
//                   {/* Join */}
//                   <a
//                     href={m.link}
//                     className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
//                   >
//                     <Video className="h-3.5 w-3.5" />
//                     <span>Join</span>
//                   </a>

//                   {/* Intent */}
//                   <button
//                     className="inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
//                     onClick={() => {
//                       setSelectedIntent(m.intent);
//                       setOpenIntentDialog(true);
//                     }}
//                   >
//                     <Goal className="h-3.5 w-3.5" />
//                     <span>Intent</span>
//                   </button>

//                   {/* Milestones */}
//                   <button
//                     className="inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
//                     onClick={() => {
//                       setSelectedMeetingUserId(m.intent?.user_info?.user_id);
//                       handleMilestone(
//                         parsedUserData.is_mentor ? m.user_id : m.mentor_id,
//                       );
//                     }}
//                   >
//                     <ClipboardList className="h-3.5 w-3.5" />
//                     <span>Milestones</span>
//                   </button>

//                   {/* Feedback */}
//                   <button
//                     className="inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
//                     onClick={() => {
//                       const meetingId = extractMeetingId(m.link);
//                       if (m.user_id && m.mentor_id && meetingId !== null)
//                         handleFeedbackPopup(
//                           Number(m.user_id),
//                           Number(m.mentor_id),
//                           meetingId,
//                         );
//                     }}
//                   >
//                     <MessageSquare className="h-3.5 w-3.5" />
//                     <span>Feedback</span>
//                   </button>
//                 </div>
//               </div>
//             ))}

//             {/* Pagination */}
//             <div className="flex justify-center items-center gap-3 pt-2">
//               <button
//                 onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                 disabled={currentPage === 1}
//                 className={`px-3 py-1 rounded-lg border text-xs ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}
//               >
//                 Previous
//               </button>
//               <span className="text-xs font-medium">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() =>
//                   setCurrentPage((p) => Math.min(p + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//                 className={`px-3 py-1 rounded-lg border text-xs ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </section>

//       {/* Intent Dialog */}
//       <Dialog
//         open={openIntentDialog}
//         onClose={() => setOpenIntentDialog(false)}
//         hideBackdrop
//       >
//         <DialogContent className="relative">
//           <X
//             onClick={() => setOpenIntentDialog(false)}
//             className="absolute cursor-pointer top-2 right-2 text-red-500 font-bold"
//           />
//           <SupportDetailsCard data={selectedIntent} />
//         </DialogContent>
//       </Dialog>

//       {/* Unassign Confirmation Dialog */}
//       {showDialog && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//           <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-lg">
//             <h3 className="text-base font-semibold text-slate-800">
//               Unassign Mentor
//             </h3>
//             <p className="mt-1.5 text-sm text-slate-600">
//               Are you sure you want to unassign{" "}
//               <span className="font-medium">{mentorToUnassign?.name}</span>?
//             </p>
//             <div className="mt-4 flex justify-end gap-2">
//               <button
//                 onClick={closeDialog}
//                 className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUnassign}
//                 className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm"
//               >
//                 Unassign
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Milestone Popup — single instance at root */}
//       <MilestonePopup
//         isOpen={isMilestonePopupOpen}
//         onClose={() => setIsMilestonePopupOpen(false)}
//         MilestoneData={selectedMilestoneData}
//         is_mentor={parsedUserData?.is_mentor}
//         userId={selectedMeetingUserId}
//       />

//       {/* Feedback Popup — single instance at root */}
//       <FeedbackPopup
//         isOpen={isPopupOpen}
//         onClose={() => setIsPopupOpen(false)}
//         feedbackData={selectedfeedbackData}
//         userId={
//           parsedUserData?.is_mentor
//             ? parsedDegree?.mentor_id
//             : parsedUserData?.user_id
//         }
//         userType={parsedUserData?.is_mentor}
//       />
//     </div>
//   );
// };

const MeetingSchedulerPreview = () => {
  const [assignedMentorData, setAssignedMentorData] = useState<Mentor[]>([]);
  const [refreshKey, setRefreshKey] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMilestonePopupOpen, setIsMilestonePopupOpen] = useState(false);
  const [selectedfeedbackData, setSelectedFeedbackData] = useState<any>([]);
  const [selectedMilestoneData, setSelectedMilestoneData] = useState<any>([]);
  const [mentorId, setMentorId] = useState("");
  const [selectedIntent, setSelectedIntent] = useState<any>(null);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [selectedMeetingUserId, setSelectedMeetingUserId] = useState<number | null>(null);
  const token = localStorage.getItem("token");

  const fetchAssignedMentor = async () => {
    try {
      const response = await axios.get(`${baseURL}/get_assigned_mentors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data) {
        setAssignedMentorData(response.data.mentors);
        setMentorsList(response.data.mentors);
      }
    } catch (error) {
      console.error("Error fetching Assigned Mentors:", error);
    }
  };

  useEffect(() => {
    fetchAssignedMentor();
  }, []);

  const notifyTimeChangedSuccess = () =>
    toast.success("Time Availability Changed Successfully!");
  const notifySuccess = (msg = "Meeting Scheduled successfully!") => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const [selectedMentor, setSelectedMentor] = useState<Mentor | any>(assignedMentorData[0]);
  const [viewDate, setViewDate] = useState<Date>(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [refreshData, setRefreshData] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  //@ts-ignore
  const [formData, setFormData] = useState<Schedule>({
    id: 0,
    name: "",
    email: "",
    start_date: "",
    duration: "30",
    mentor_id: "",
    user_id: "",
    mentor_email: "",
    mentor_phone: "",
    mentor_linkedin: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    user_info: { email: "", user_id: 0, first_name: "" },
  });
  const [mentorsList, setMentorsList] = useState<
    {
      email: string;
      mentor_id: number;
      name: string;
      phone: string;
      linkedin: string;
      availability: Availability[];
    }[]
  >([]);
  const [openIntentDialog, setOpenIntentDialog] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState(false);
  const [mentorToUnassign, setMentorToUnassign] = useState<Mentor | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const user = localStorage.getItem("user");
  const parsedUserData = user ? JSON.parse(user) : null;
  const degree = localStorage.getItem("degree");
  const parsedDegree = degree ? JSON.parse(degree) : null;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMeetings = meetings.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(meetings.length / itemsPerPage);

  const openUnassignDialog = (mentor: Mentor) => {
    setMentorToUnassign(mentor);
    setShowDialog(true);
  };
  const closeDialog = () => {
    setShowDialog(false);
    setMentorToUnassign(null);
  };
  const handleUnassign = async () => {
    try {
      await axios.delete(`${baseURL}/unassign_mentor`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { mentor_id: mentorToUnassign?.mentor_id },
      });
      fetchAssignedMentor();
    } catch (error) {
      console.error("Error unassigning mentor:", error);
    }
    closeDialog();
  };

  const monthMatrix = useMemo(
    () => buildMonthMatrix(viewDate),
    [viewDate, refreshData, availability],
  );
  const monthLabel = useMemo(
    () => viewDate.toLocaleString(undefined, { month: "long", year: "numeric" }),
    [viewDate],
  );

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayMap: Record<string, number> = {
    Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6,
  };

  const generateTimeSlots = (start: string, end: string): string[] => {
    const slots: string[] = [];
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);
    const current = new Date();
    current.setHours(startH, startM, 0, 0);
    const endTime = new Date();
    endTime.setHours(endH, endM, 0, 0);
    while (current <= endTime) {
      slots.push(current.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
      current.setHours(current.getHours() + 1);
    }
    return slots;
  };

  const slotsForDate = (d: Date | string | null): string[] => {
    if (!d) return [];
    const dateObj = typeof d === "string" ? new Date(d) : d;
    if (isNaN(dateObj.getTime())) return [];
    const dayName = dayNames[dateObj.getDay()];
    const dataList: Availability[] =
      availability?.length > 0 ? availability : (selectedMentor?.availability ?? []);
    const slotData = dataList.find((a) => a.day === dayName);
    if (!slotData) return [];
    return generateTimeSlots(slotData.startTime, slotData.endTime);
  };

  const availableDayIndices = (availability || []).map((a: any) => dayMap[a.day]);

  const convertDateAndTimeToISO = (date: Date, timeString: string): string => {
    const dateObj = new Date(date);
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    dateObj.setHours(hours, minutes, 0, 0);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(dateObj.getDate())}T${pad(hours)}:${pad(minutes)}`;
  };

  const calculateEndDate = (startDate: string, durationMinutes: string): string => {
    const date = new Date(startDate);
    date.setMinutes(date.getMinutes() + parseInt(durationMinutes));
    return date.toISOString().slice(0, 16);
  };

  const fetchMeetingData = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/schedules`, {
        params: parsedUserData.is_mentor
          ? { mentor_id: mentorId }
          : { user_id: parsedUserData.user_id },
      });
      if (response.data) {
        const sortedData = [...response.data].sort(
          (a, b) =>
            new Date(b.start_datetime).getTime() - new Date(a.start_datetime).getTime(),
        );
        setMeetings(sortedData);
      }
    } catch (error) {
      console.error("Error fetching meeting data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchMeetingData();
    if (parsedUserData.is_mentor) fetchMentorData();
  }, []);

  useEffect(() => {
    if (refreshKey) fetchMeetingData();
  }, [refreshKey]);

  useEffect(() => {
    fetchMeetingData();
  }, [mentorId]);

  const confirmMeeting = async () => {
    if (!selectedMentor || !selectedDate || !selectedSlot) {
      alert("Please select a mentor, date, and time");
      return;
    }
    try {
      setLoading(true);
      const startDateISO = convertDateAndTimeToISO(selectedDate, selectedSlot);
      const endDate = calculateEndDate(startDateISO, "45");
      const randomId = Math.floor(Math.random() * 1000);
      const roomid = Math.floor(Math.random() * 1000);
      const password = Math.random().toString(36).substring(2, 8);
      const secretKey = "meetingkeys";
      const encryptedStartDate = CryptoJS.AES.encrypt(startDateISO, secretKey).toString();
      const encryptedEndDate = CryptoJS.AES.encrypt(endDate, secretKey).toString();
      const encryptedRoomId = CryptoJS.AES.encrypt(roomid.toString(), secretKey).toString();
      const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
      const userData = localStorage.getItem("user");
      const parsedUser = userData ? JSON.parse(userData) : null;
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const meetingLink = `/v2/meetingcall/${randomId}/${parsedUser?.user_id}?start=${encodeURIComponent(encryptedStartDate)}&end=${encodeURIComponent(encryptedEndDate)}&roomid=${encodeURIComponent(encryptedRoomId)}&password=${encodeURIComponent(encryptedPassword)}&timezone=${encodeURIComponent(timeZone)}`;
      const userDegree = localStorage.getItem("degree");
      if (!userData || !userDegree) {
        alert("User data not found");
        return;
      }
      const parsedDegree2 = JSON.parse(userDegree);
      await axios.post<{ message: string; id: number }>(`${baseURL}/api/schedule`, {
        name: parsedDegree2.firstname || "",
        email: parsedUser.username || "",
        start_datetime: startDateISO,
        end_datetime: endDate,
        duration: "60",
        link: meetingLink,
        user_id: parsedUser.user_id,
        mentor_id: selectedMentor.mentor_id,
        mentor_name: selectedMentor.name,
        mentor_email: selectedMentor.email,
        roomid,
        password,
        timezone: timeZone,
      });
      notifySuccess();
      setRefreshKey(true);
      setSelectedSlot(null);
    } catch (err: any) {
      setRefreshKey(false);
      alert("An error occurred while confirming meeting");
    } finally {
      setLoading(false);
    }
  };

  const nextMonth = () => {
    const d = new Date(viewDate);
    d.setMonth(d.getMonth() + 1);
    setViewDate(d);
  };
  const prevMonth = () => {
    const d = new Date(viewDate);
    d.setMonth(d.getMonth() - 1);
    setViewDate(d);
  };

  const handleMentorSelection = (mentorId: any) => {
    const found = mentorsList.find((mentor) => mentor.mentor_id === mentorId);
    setAvailability(found?.availability ?? []);
    setSelectedMentor(found);
    if (found) {
      setFormData((prev) => ({
        ...prev,
        mentor_id: mentorId,
        mentor_email: found.email,
        mentor_phone: found.phone,
        mentor_linkedin: found.linkedin,
      }));
    }
  };

  useEffect(() => {
    if (parsedUserData.is_mentor) {
      setSelectedMentor(parsedDegree);
      setAvailability(parsedDegree?.availability);
    }
  }, []);

  const handleFeedbackPopup = async (user_id: number, mentor_id: number, meetingId: number) => {
    try {
      const response = await axios.get(
        `${baseURL}/feedback?user_id=${user_id}&mentor_id=${mentor_id}&check_meeting_id=${meetingId}`,
        { headers: { Authorization: `bearer ${token}` } },
      );
      setSelectedFeedbackData(response.data);
      setIsPopupOpen(true);
    } catch (e) {
      console.log(e);
    }
  };

  function extractMeetingId(url: string) {
    const match = url.match(/\/v2\/meetingcall\/(\d+)/);
    return match ? Number(match[1]) : null;
  }

  const fetchMentorData = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/mentor/details?user_id=${parsedUserData.user_id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data) {
        const data = response.data;
        if (!localStorage.getItem("degree")) {
          localStorage.setItem("degree", JSON.stringify(data));
          setAvailability(data?.availability);
        }
        setMentorId(data.mentor_id);
      }
    } catch (error) {
      console.error("Error fetching mentor data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMilestone = async (mentorId: Number | null) => {
    try {
      const response = await axios.get(`${baseURL}/api/milestone`, {
        params: {
          mentor_id: parsedUserData?.is_mentor ? parsedDegree?.mentor_id : mentorId,
          user_id: parsedUserData?.is_mentor ? mentorId : parsedUserData.user_id,
          include_history: true,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedMilestoneData(response.data);
      setIsMilestonePopupOpen(true);
    } catch (e) {
      console.log(e);
    }
  };

  const updateTimeAvailability = async (checkAvailability: any) => {
    const deg = localStorage.getItem("degree");
    const pd = deg ? JSON.parse(deg) : null;
    try {
      const res = await axios.put(
        `${baseURL}/update_mentor/${pd?.mentor_id}`,
        checkAvailability,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (res.status === 200) {
        setRefreshData(true);
        notifyTimeChangedSuccess();
        localStorage.removeItem("degree");
        await fetchMentorData();
      }
    } catch (error) {
      console.error("Update availability error:", error);
    }
  };

  // —— Render ——
  return (
    <div className="w-full px-[5%] py-4 space-y-4">

      {/* ── Assigned Mentor + Calendar + Time Slots ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch" style={{ maxHeight: "calc(100vh - 180px)" }}>

        {/* ── 1. Assigned Mentor Card ── */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col gap-4 min-h-0" style={{ maxHeight: "calc(100vh - 180px)" }}>
          {/* Header */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span className="font-bold text-sm text-slate-800">Assigned Mentor</span>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="animate-pulse rounded-xl border border-gray-100 bg-gray-50 p-3 h-16" />
              ))}
            </div>
          ) : assignedMentorData.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 p-4 text-center text-sm text-slate-400">
              No mentors assigned yet.
            </div>
          ) : (
            <div className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-track]:bg-transparent">
              {assignedMentorData.map((mentor) => {
                const isActive = selectedMentor?.mentor_id === mentor.mentor_id;
                return (
                  <div
                    key={mentor.mentor_id}
                    onClick={() => handleMentorSelection(mentor.mentor_id)}
                    className={`flex items-center gap-2 rounded-xl border p-2.5 cursor-pointer transition
                      ${isActive ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"}`}
                  >
                    {/* Avatar circle */}
                    <img src={mentor.profile_picture} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                      ${isActive ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}/>
                      
                    

                    {/* Name + email */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-semibold truncate ${isActive ? "text-blue-700" : "text-slate-800"}`}>
                        {mentor.name}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">{mentor.email}</p>
                    </div>

                    {/* Active checkmark */}
                    {isActive && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" className="flex-shrink-0">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    )}

                    {/* Unassign ✕ button — always visible */}
                    <button
                      onClick={(e) => { e.stopPropagation(); openUnassignDialog(mentor); }}
                      className="flex-shrink-0 px-2 flex items-center justify-center rounded-md bg-red-50 border border-red-100 text-red-400 hover:bg-red-100 hover:text-red-600 transition"
                      title="Unassign"
                    >
                      Unassign
                     {/* <X size={20}/> */}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Mentor contact info if selected */}
          {selectedMentor && !parsedUserData?.is_mentor && (
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 space-y-1.5">
              {selectedMentor.phone && (
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.06 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                  </svg>
                  <span>{selectedMentor.phone}</span>
                </div>
              )}
              {selectedMentor.linkedin && (
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                  </svg>
                  <a href={selectedMentor.linkedin} target="_blank" rel="noreferrer"
                    className="truncate text-blue-500 hover:underline">
                    LinkedIn Profile
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Mentor schedule editor (mentor view) */}
          {parsedUserData?.is_mentor && (
            <MentorScheduleEditor
              onSave={async (schedule) => {
                updateTimeAvailability({
                  availability: schedule.map((s) => ({
                    day: s.day,
                    startTime: s.startTime,
                    endTime: s.endTime,
                  })),
                });
              }}
            />
          )}
        </div>

        {/* ── 2. Availability Calendar ── */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col overflow-hidden" style={{ maxHeight: "calc(100vh - 180px)" }}>
          {/* Card header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
                <rect x="3" y="4" width="18" height="18" rx="3" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
            <span className="font-bold text-sm text-slate-800">Availability Calendar</span>
            <span className="ml-auto text-[10px] text-slate-400 font-medium">
              IST (GMT+5:30)
            </span>
          </div>

          {/* Month navigation */}
          <div className="mb-3 flex items-center justify-between">
            <button
              onClick={prevMonth}
              className="rounded-lg p-1.5 hover:bg-gray-100 border border-gray-200"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4 text-slate-500" />
            </button>
            <div className="text-sm font-semibold text-slate-800">{monthLabel}</div>
            <button
              onClick={nextMonth}
              className="rounded-lg p-1.5 hover:bg-gray-100 border border-gray-200"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4 text-slate-500" />
            </button>
          </div>

          {/* Day-of-week headers */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-1">
            {"SMTWTFS".split("").map((c, i) => (
              <div key={i} className="py-1">{c}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {monthMatrix.map((cell, idx) => {
              const dayOfWeek = cell.date.getDay();
              const isAvailableDay = availableDayIndices.includes(dayOfWeek);
              const isCurrentMonth = cell.inMonth;
              const isPast = isPastDay(cell.date);
              const isDisabled = !isCurrentMonth || isPast || !isAvailableDay;
              const isSelected = selectedDate && sameDay(cell.date, selectedDate);
              return (
                <button
                  key={idx}
                  disabled={isDisabled}
                  onClick={() => {
                    setSelectedDate(new Date(cell.date));
                    setSelectedSlot(null);
                  }}
                  className={`aspect-square rounded-lg text-xs transition flex items-center justify-center font-medium
                    ${isDisabled ? "opacity-30 cursor-not-allowed" : "hover:bg-blue-50 cursor-pointer"}
                    ${isAvailableDay && isCurrentMonth && !isPast ? "bg-blue-50 text-blue-700" : "text-slate-400"}
                    ${isSelected ? "!bg-blue-600 !text-white font-bold shadow-sm" : ""}
                  `}
                >
                  {cell.date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 3. Select Preferred Time ── */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col gap-4 overflow-hidden" style={{ maxHeight: "calc(100vh - 180px)" }}>
          {/* Header */}
          <div className="flex items-center gap-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Select Preferred Time
            </span>
          </div>

          {!selectedDate ? (
            <p className="text-sm text-gray-400">Select a date on the calendar to see available time slots.</p>
          ) : (
            <>
              {/* Time slot grid — 2 columns */}
              <div className="grid grid-cols-2 gap-2">
                {slotsForDate(selectedDate).map((t) => {
                  const isPastSlot = parseTimeToDate(selectedDate, t) <= new Date();
                  const isSelected = selectedSlot === t;
                  return (
                    <button
                      key={t}
                      disabled={isPastSlot}
                      onClick={() => setSelectedSlot(t)}
                      className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm font-medium transition
                        ${isSelected
                          ? "border-blue-600 bg-blue-50 text-blue-700 font-semibold"
                          : "border-gray-200 text-slate-700 hover:bg-gray-50"
                        }
                        ${isPastSlot ? "opacity-40 cursor-not-allowed" : ""}
                      `}
                    >
                      {isSelected && (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M9 12l2 2 4-4" />
                        </svg>
                      )}
                      {t}
                    </button>
                  );
                })}
              </div>

              

              {/* Confirm appointment button */}
              <button
                onClick={confirmMeeting}
                disabled={!selectedSlot || loading}
                className={`mt-auto w-full rounded-xl py-3 text-sm font-bold tracking-wide transition
                  ${selectedSlot && !loading
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-200 hover:from-blue-700 hover:to-blue-800"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                {loading ? "Confirming…" : "Confirm Appointment"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Scheduled Meetings */}
      <section className="space-y-2 border border-slate-200 shadow-sm rounded-xl p-4 bg-white">
        <div className="pb-1">
          <h2 className="text-base font-semibold">Scheduled Meetings</h2>
          <p className="text-xs text-gray-500">Your Upcoming Call(s)</p>
        </div>

        {meetings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 p-5 text-center text-gray-500 text-sm">
            No meetings yet. Pick a date and time with your mentor to get started.
          </div>
        ) : (
          <>
            {currentMeetings.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-3 shadow-sm gap-2 flex-wrap"
              >
                <div>
                  <div className="font-semibold text-sm">
                    {parsedUserData.is_mentor ? m?.intent?.user_info?.email : m.mentor_name}
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    • {new Date(m?.start_datetime).toLocaleString()} • {m.duration} Minutes
                  </div>
                </div>

                <div className="flex gap-1.5 flex-wrap">
                  <a
                    href={m.link}
                    className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                  >
                    <Video className="h-3.5 w-3.5" />
                    <span>Join</span>
                  </a>
                  <button
                    className="inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
                    onClick={() => { setSelectedIntent(m.intent); setOpenIntentDialog(true); }}
                  >
                    <Goal className="h-3.5 w-3.5" />
                    <span>Intent</span>
                  </button>
                  <button
                    className="inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
                    onClick={() => {
                      setSelectedMeetingUserId(m.intent?.user_info?.user_id);
                      handleMilestone(parsedUserData.is_mentor ? m.user_id : m.mentor_id);
                    }}
                  >
                    <ClipboardList className="h-3.5 w-3.5" />
                    <span>Milestones</span>
                  </button>
                  <button
                    className="inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
                    onClick={() => {
                      const meetingId = extractMeetingId(m.link);
                      if (m.user_id && m.mentor_id && meetingId !== null)
                        handleFeedbackPopup(Number(m.user_id), Number(m.mentor_id), meetingId);
                    }}
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Feedback</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 pt-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg border text-xs ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}
              >
                Previous
              </button>
              <span className="text-xs font-medium">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg border text-xs ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>

      {/* Intent Dialog */}
      <Dialog open={openIntentDialog} onClose={() => setOpenIntentDialog(false)} hideBackdrop>
        <DialogContent className="relative">
          
          <X onClick={() => setOpenIntentDialog(false)} className="absolute cursor-pointer top-2 right-2 text-red-500 font-bold" />
          <SupportDetailsCard data={selectedIntent} />
        </DialogContent>
      </Dialog>

      {/* Unassign Confirmation Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-lg">
            <h3 className="text-base font-semibold text-slate-800">Unassign Mentor</h3>
            <p className="mt-1.5 text-sm text-slate-600">
              Are you sure you want to unassign{" "}
              <span className="font-medium">{mentorToUnassign?.name}</span>?
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={closeDialog} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm">
                Cancel
              </button>
              <button onClick={handleUnassign} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm">
                Unassign
              </button>
            </div>
          </div>
        </div>
      )}

      <MilestonePopup
        isOpen={isMilestonePopupOpen}
        onClose={() => setIsMilestonePopupOpen(false)}
        MilestoneData={selectedMilestoneData}
        is_mentor={parsedUserData?.is_mentor}
        userId={selectedMeetingUserId}
      />

      <FeedbackPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        feedbackData={selectedfeedbackData}
        userId={parsedUserData?.is_mentor ? parsedDegree?.mentor_id : parsedUserData?.user_id}
        userType={parsedUserData?.is_mentor}
      />
    </div>
  );
};

export default MeetingSchedulerPreview;

// —— Utilities ——
function buildMonthMatrix(anchor: Date): CalendarCell[] {
  const firstOfMonth = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const start = new Date(firstOfMonth);
  start.setDate(firstOfMonth.getDate() - firstOfMonth.getDay());
  const cells: CalendarCell[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    cells.push({ date: d, inMonth: d.getMonth() === anchor.getMonth() });
  }
  return cells;
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isPastDay(d: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x < today;
}
