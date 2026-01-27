import { useEffect, useMemo, useState } from "react";
import {
  Video,
  ClipboardList,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { X } from "lucide-react";
import axios from "axios";
import baseURL from "@/config/config";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
import FeedbackPopup from "@/components/NewPage/FeedbackPopup";
import MilestonePopup from "@/components/NewPage/MilestonePopup";
import { Dialog, DialogContent } from "@mui/material";
import { Lightbulb } from 'lucide-react';


// —— Types ——
interface Mentor {
  mentor_id: number;
  mentor_name: string;
  profile_picture: string;
  availability: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  name: string;
}

interface user_info{
email:string;
user_id:number;
first_name:string;
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
  user_info:user_info;

}

interface user_work{
  industry:string;
role:string;
role_based:string;
work_experience:string;
}

interface user_education{
  high_education:string;
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
  user_work:user_work;
   user_info:user_info;
   user_education:user_education;
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
  // milestoneLink: string;
  // feedbackLink: string;
 
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

/**
 * MeetingSchedulerPreview
 * - Self-contained interactive mock (no external UI libs)
 * - TailwindCSS for styles
 */

export type MentorSchedule = {
  day: string; // YYYY-MM-DD
  start: string; // HH:mm
  end: string; // HH:mm
};

type MentorScheduleEditorProps = {
  // onSave: (schedule: MentorSchedule) => void;
  //  onSave: (slots: Slot[]) => void;
  onSave: (schedule: Availability[]) => void;
};

// const weekdayList = [
//   { label: "Mon", value: 1 },
//   { label: "Tue", value: 2 },
//   { label: "Wed", value: 3 },
//   { label: "Thu", value: 4 },
//   { label: "Fri", value: 5 },
//   { label: "Sat", value: 6 },
//   { label: "Sun", value: 0 },
// ];

// const MentorScheduleEditor: React.FC<MentorScheduleEditorProps> = ({ onSave }) => {
//   const [date, setDate] = useState("");
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");

//   const handleSave = () => {
//     if (!date || !start || !end) return alert("Please fill all fields");

//     onSave({
//       date,
//       start,
//       end,
//     });
//   };

//   return (
//     <div className="border rounded-lg p-4 space-y-4 bg-white shadow">
//       <h2 className="text-lg font-semibold">Set Your Availability</h2>

//       {/* Date */}
//       <div className="flex flex-col">
//         <label className="text-sm font-medium">Date</label>
//         <input
//           type="date"
//           className="border p-2 rounded"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />
//       </div>

//       {/* Start Time */}
//       <div className="flex flex-col">
//         <label className="text-sm font-medium">Start Time</label>
//         <input
//           type="time"
//           className="border p-2 rounded"
//           value={start}
//           onChange={(e) => setStart(e.target.value)}
//         />
//       </div>

//       {/* End Time */}
//       <div className="flex flex-col">
//         <label className="text-sm font-medium">End Time</label>
//         <input
//           type="time"
//           className="border p-2 rounded"
//           value={end}
//           onChange={(e) => setEnd(e.target.value)}
//         />
//       </div>

//       <button
//         onClick={handleSave}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Save Availability
//       </button>
//     </div>
//   );
// };

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

  const addSlot = () => {
    setSlots([...slots, { day: "Monday", start: "", end: "" }]);
  };

  const updateSlot = (i: number, field: string, value: string) => {
    const updated = [...slots];
    (updated[i] as any)[field] = value;
    setSlots(updated);
  };

  const removeSlot = (i: number) => {
    setSlots(slots.filter((_, idx) => idx !== i));
  };

  // const handleSave = () => {
  //   onSave(slots);
  // };
  const handleSave = () => {
    const formatted = slots.map((s) => ({
      day: s.day,
      startTime: s.start,
      endTime: s.end,
    }));
    console.log("formatted---", formatted);

    onSave(formatted);
  };

  return (
    <div className="border rounded-lg p-3 space-y-4 bg-white shadow">
      <h2 className="text-[18px] font-semibold">Change Your Availability</h2>

      {slots.map((slot, index) => (
        <div
          key={index}
          className="flex gap-1 sm:gap-3 items-center border p-1 rounded"
        >
          {/* Day Selector */}
          <select
            className="border rounded py-1 sm:p-2 "
            value={slot.day}
            onChange={(e) => updateSlot(index, "day", e.target.value)}
          >
            {days.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          {/* Start */}
          <input
            type="time"
            className="border py-1 sm:p-2 rounded"
            value={slot.start}
            onChange={(e) => updateSlot(index, "start", e.target.value)}
          />

          {/* End */}
          <input
            type="time"
            className="border py-1 sm:p-2 rounded"
            value={slot.end}
            onChange={(e) => updateSlot(index, "end", e.target.value)}
          />

          {/* Delete */}
          <button
            className="text-red-500 text-xl"
            onClick={() => removeSlot(index)}
          >
            ✕
          </button>
        </div>
      ))}

      <button className="text-blue-600 font-medium" onClick={addSlot}>
        + Add another slot
      </button>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 block"
      >
        Save Availability
      </button>
    </div>
  );
};

const parseTimeToDate = (date: Date, timeStr: string) => {
  const d = new Date(date);
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  d.setHours(hours, minutes, 0, 0);
  return d;
};



const SupportDetailsCard = ({
  data,
}: {
  data: Intent | null;
}) => {
  console.log("dattaaaaa0----", data);

  return (
    <div className="max-w-md rounded-2xl border bg-white p-5 shadow-sm space-y-3">
      <h2 className="text-lg font-semibold text-gray-800 flex justify-center">
        Submitted Intent Details
      </h2>
      {data ?
        <div className="text-sm space-y-2">
          <p>
          <span className="font-medium">Name:</span> {data?.user_info.first_name}
        </p>
        <p>
          <span className="font-medium">Education:</span> {data?.user_education.high_education}
        </p>
         <p>
          <span className="font-medium">Dream Role:</span> {data?.user_work?.role_based}
        </p>
         <p>
          <span className="font-medium">Work Experience:</span> {data?.user_work?.work_experience}
        </p>
        
 <p>
          <span className="font-medium">Industry:</span> {data?.user_work?.industry}
        </p>
       
          <p>
            <span className="font-medium">Goal / Challenge:</span>{" "}
            {data?.goal_challenge}
          </p>

          <p>
            <span className="font-medium">Support Types:</span>{" "}
            {data?.support_types}
          </p>

 {data?.area_exploring &&
 
          <p>
            <span className="font-medium">Area Exploring:</span>{" "}
            {data?.area_exploring ?? "Not specified"}
          </p>
}

          

          {/* <p>
          <span className="font-medium">Mentor ID:</span> {data.mentor_id}
        </p>

        <p>
          <span className="font-medium">User ID:</span> {data.user_id}
        </p> */}

          <p className="text-gray-500 text-xs">
            Created on{" "}
            {new Date(data?.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        : <div className="flex justify-center">{"No Intent Found"}</div>}
    </div>
  );
}

const MeetingSchedulerPreview = () => {
  const [assignedMentorData, setAssignedMentorData] = useState<Mentor[]>([]);
  const [refreshKey, setRefreshKey] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMilestonePopupOpen, setIsMilestonePopupOpen] = useState(false);
  const [selectedfeedbackData, setSelectedFeedbackData] = useState<any>([]);
  const [selectedMilestoneData, setSelectedMilestoneData] = useState<any>([]);
  const [mentorId, setMentorId] = useState("");

  const [selectedIntent, setSelectedIntent] = useState<any>(null);
  // const [loading,setLoading]=useState(false);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const token = localStorage.getItem("token");

  // const notifySuccess = () => toast.success("Time Availability Changed Successfully!");

  const fetchAssignedMentor = async () => {
    try {
      const response = await axios.get(`${baseURL}/get_assigned_mentors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        console.log("response--data", response.data.mentors);
        setAssignedMentorData(response.data.mentors);
        setMentorsList(response.data.mentors);
      } else {
        console.log("No Mentors found.");
      }
    } catch (error) {
      console.error("Error fetching Assigned Mentors:", error);
    }
  };

  useEffect(() => {
    fetchAssignedMentor();
  }, []);

  // const defaultSlots: string[] = [
  //   "09:30 AM",
  //   "11:00 AM",
  //   "02:00 PM",
  //   "04:30 PM",
  //   "07:00 PM",
  // ];

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

  // —— State ——
  const [selectedMentor, setSelectedMentor] = useState<Mentor | any>(
    assignedMentorData[0]
  );
  const [viewDate, setViewDate] = useState<Date>(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [refreshData, setRefreshData] = useState(false);
  // const[checkAvailability,setCheckAvailability]=useState<Availability[]>([]);
  //@ts-ignore
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const user = localStorage.getItem("user");
  const parsedUserData = user ? JSON.parse(user) : null;
  const degree = localStorage.getItem("degree");
  const parsedDegree = degree ? JSON.parse(degree) : null;

  // Calculate pagination indices
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMeetings = meetings.slice(startIndex, endIndex);

  const totalPages = Math.ceil(meetings.length / itemsPerPage);

  // —— Calendar helpers ——
  const monthMatrix = useMemo(
    () => buildMonthMatrix(viewDate),
    [viewDate, refreshData, availability]
  );
  const monthLabel = useMemo(
    () =>
      viewDate.toLocaleString(undefined, { month: "long", year: "numeric" }),
    [viewDate]
  );

  // Slots based on day (weekend logic)
  // const slotsForDate = (d: Date | null): string[] => {
  //   if (!d) return [];
  // console.log("datee-slotsForDate",d);
  //   const dayIndex = d.getDay();
  //   const dayName = dayNames[dayIndex];

  // const dataList:Availability[] = availability?.length>0 ? availability : selectedMentor.availability;

  // console.log("dataList:", dataList);

  // const slotData = dataList.find(a => a.day === dayName);

  // console.log("slotData:", slotData);

  //   if (!slotData) return []; // no availability for this day

  //   // generate slots dynamically
  //   return generateTimeSlots(slotData.startTime, slotData.endTime);
  // };
  const slotsForDate = (d: Date | string | null): string[] => {
    if (!d) return [];

    const dateObj = typeof d === "string" ? new Date(d) : d;

    if (isNaN(dateObj.getTime())) {
      console.error("Invalid Date supplied:", d);
      return [];
    }

    const dayIndex = dateObj.getDay();
    const dayName = dayNames[dayIndex];

    const dataList: Availability[] =
      availability?.length > 0 ? availability : selectedMentor.availability;

    const slotData = dataList.find((a) => a.day === dayName);

    if (!slotData) return [];

    return generateTimeSlots(slotData.startTime, slotData.endTime);
  };

  const dayMap: Record<string, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  // const confirmMeeting = () => {
  //   if (!selectedMentor || !selectedDate || !selectedSlot) return
  //   const id = crypto.randomUUID()
  //   const newMeeting: Meeting = {
  //     id,
  //     mentor: selectedMentor,
  //     dateISO: selectedDate.toISOString(),
  //     time: selectedSlot,
  //     duration: "45 mins",
  //     joinUrl: `/meetings/${id}/join`,
  //     milestonesUrl: `/meetings/${id}/milestones`,
  //     feedbackUrl: `/meetings/${id}/feedback`,
  //   }
  //   setMeetings((m) => [...m, newMeeting])
  //   setSelectedSlot(null)
  // }

  const convertDateAndTimeToISO = (date: Date, timeString: string): string => {
    const dateObj = new Date(date);
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    dateObj.setHours(hours);
    dateObj.setMinutes(minutes);
    dateObj.setSeconds(0);
    dateObj.setMilliseconds(0);

    const pad = (n: number) => n.toString().padStart(2, "0");
    const year = dateObj.getFullYear();
    const month = pad(dateObj.getMonth() + 1);
    const day = pad(dateObj.getDate());
    const hour = pad(dateObj.getHours());
    const minute = pad(dateObj.getMinutes());

    return `${year}-${month}-${day}T${hour}:${minute}`;
  };

  const calculateEndDate = (
    startDate: string,
    durationMinutes: string
  ): string => {
    const date = new Date(startDate);
    date.setMinutes(date.getMinutes() + parseInt(durationMinutes));
    return date.toISOString().slice(0, 16); // Format to match datetime-local input
  };

  const fetchMeetingData = async () => {
    console.log("user_id FetchMeetingData----", parsedUserData.user_id);
    try {
      const response = await axios.get(`${baseURL}/api/schedules`, {
        // params: { user_id: 3},
        params: parsedUserData.is_mentor
          ? { mentor_id: mentorId }
          : { user_id: parsedUserData.user_id },
      });

      if (response.data) {
        const sortedData = [...response.data].sort(
          (a, b) =>
            new Date(b.start_datetime).getTime() -
            new Date(a.start_datetime).getTime()
        );
        console.log("sortedData-----", sortedData);

        setMeetings(sortedData);
      } else {

        console.log("No meetings found.");
      }
    } catch (error) {
      console.error("Error fetching meeting data:", error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchMeetingData();
    if (parsedUserData.is_mentor) {
      // setLoading(true);
      fetchMentorData();
    }
  }, []);

  //   useEffect(()=>{
  // fetchMentorData();
  //   },[refreshData]);

  useEffect(() => {
    console.log("refreshkey---", refreshKey);
    if (refreshKey) {
      fetchMeetingData();
    }
  }, [refreshKey]);

  const confirmMeeting = async () => {
    if (!selectedMentor || !selectedDate || !selectedSlot) {
      alert("Please select a mentor, date, and time");
      return;
    }

    try {
      setLoading(true);

      // Convert date and time to ISO format
      const startDateISO = convertDateAndTimeToISO(selectedDate, selectedSlot);
      const endDate = calculateEndDate(startDateISO, "45");

      // Generate random meeting details
      const randomId = Math.floor(Math.random() * 1000);
      const roomid = Math.floor(Math.random() * 1000);
      const password = Math.random().toString(36).substring(2, 8);
      const secretKey = "meetingkeys";

      // Encrypt sensitive data
      const encryptedStartDate = CryptoJS.AES.encrypt(
        startDateISO,
        secretKey
      ).toString();
      const encryptedEndDate = CryptoJS.AES.encrypt(
        endDate,
        secretKey
      ).toString();
      const encryptedRoomId = CryptoJS.AES.encrypt(
        roomid.toString(),
        secretKey
      ).toString();
      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        secretKey
      ).toString();

      const userData = localStorage.getItem("user");

      const parsedUser = userData ? JSON.parse(userData) : null;

      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // const meetingLink = `/v2/meetingcall/${randomId}/${selectedMentor.mentor_id
      const meetingLink = `/v2/meetingcall/${randomId}/${parsedUser?.user_id
        }?start=${encodeURIComponent(
          encryptedStartDate
        )}&end=${encodeURIComponent(
          encryptedEndDate
        )}&roomid=${encodeURIComponent(
          encryptedRoomId
        )}&password=${encodeURIComponent(
          encryptedPassword
        )}&timezone=${encodeURIComponent(timeZone)}`;

      // Fetch local user data

      const userDegree = localStorage.getItem("degree");
      if (!userData || !userDegree) {
        alert("User data not found");
        return;
      }

      const parsedDegree = JSON.parse(userDegree);

      // Prepare schedule data
      const scheduleData = {
        name: parsedDegree.firstname || "",
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
      };
      console.log("scheduleData-----", scheduleData);
      // @ts-ignore
      const response = await axios.post<{ message: string; id: number }>(
        `${baseURL}/api/schedule`,
        scheduleData
      );

      // Update local state
      // const newMeeting: Meeting = {
      //   id: crypto.randomUUID(),
      //   mentor: selectedMentor,
      //   dateISO: selectedDate.toISOString(),
      //   time: selectedSlot,
      //   duration: "45 mins",
      //   joinUrl: meetingLink,
      //   milestonesUrl: `/meetings/${randomId}/milestones`,
      //   feedbackUrl: `/meetings/${randomId}/feedback`,
      // };

      // setMeetings((prev) => [...prev, newMeeting]);

      notifySuccess();
      setRefreshKey(true);
      setSelectedSlot(null);
      // setSelectedMentor(null);
      // setLoading(false);
    } catch (err: any) {
      console.log(err);
      setRefreshKey(false);
      alert("An error occurred while confirming meeting");
      // setLoading(false);
    }
    finally {
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

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const generateTimeSlots = (start: string, end: string): string[] => {
    const slots: string[] = [];

    let [startH, startM] = start.split(":").map(Number);
    let [endH, endM] = end.split(":").map(Number);

    let current = new Date();
    current.setHours(startH, startM, 0, 0);

    const endTime = new Date();
    endTime.setHours(endH, endM, 0, 0);

    while (current <= endTime) {
      const formatted = current.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      slots.push(formatted);

      current.setHours(current.getHours() + 1); // ⬅ 1-hour increment
    }

    return slots;
  };

  // Available days from selected mentor
  // const availableDayIndices =
  //   selectedMentor?.availability?.map((a: any) => dayMap[a.day]) || [];

  // before: selectedMentor?.availability?.map(...)
  const availableDayIndices = (availability || []).map(
    (a: any) => dayMap[a.day]
  );

  const handleMentorSelection = (mentorId: any) => {
    const handleselectedMentor = mentorsList.find(
      (mentor) => mentor.mentor_id === mentorId
    );
    console.log("handleSelectedMentor", handleselectedMentor?.availability);
    setAvailability(handleselectedMentor?.availability ?? []);

    setSelectedMentor(handleselectedMentor);

    if (selectedMentor) {
      setFormData((prevData) => ({
        ...prevData,
        mentor_id: mentorId,
        mentor_email: selectedMentor?.email,
        mentor_phone: selectedMentor.phone,
        mentor_linkedin: selectedMentor.linkedin,
      }));
    }
  };

  useEffect(() => {
    if (parsedUserData.is_mentor) {
      setSelectedMentor(parsedDegree);
      setAvailability(parsedDegree?.availability);
    }
  }, []);

  const handleFeedbackPopup = async (
    user_id: number,
    mentor_id: number,
    meetingId: number
  ) => {
    console.log("user_id", user_id);
    console.log("mentor_id", mentor_id);
    console.log("meeting_id", meetingId);
    const token = localStorage.getItem("token");
    //fetch feedback API here
    try {
      const response = await axios.get(
        `${baseURL}/feedback?user_id=${user_id}&mentor_id=${mentor_id}&check_meeting_id=${meetingId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      console.log("res-----data-------", response.data);
      setSelectedFeedbackData(response.data);
      setIsPopupOpen(true);
    } catch (e) {
      console.log(e);
    }
  };

  function extractMeetingId(url: string) {
    const match = url.match(/\/v2\/meetingcall\/(\d+)/); //return an array
    if (match) {
      return Number(match[1]);
    } else {
      return null; // return null if no meeting ID found
    }
  }

  const fetchMentorData = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/mentor/details?user_id=${parsedUserData.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        console.log("response--data---fetchMentor-dattttaa---", response.data);
        // setAssignedMentorData(response.data.mentors);
        const data = response.data;
        const degreeData = localStorage.getItem("degree");
        if (!degreeData) {
          localStorage.setItem("degree", JSON.stringify(response.data));
          setAvailability(data?.availability);
        }
        // setLoading(false);
        setMentorId(data.mentor_id);
      } else {
        console.log("No Mentors found.");
      }
    } catch (error) {
      // setLoading(false);
      console.error("Error fetching Assigned Mentors:", error);
    } finally {
      setLoading(false);
    }
  };

  //     const getDayName = (dateStr: string): string => {
  //   const d = new Date(dateStr);
  //   return d.toLocaleString("en-US", { weekday: "long" });
  // };

  useEffect(() => {
    fetchMeetingData();
  }, [mentorId]);

  const handleMilestone = async (mentorId: Number | null) => {
    try {
      const response = await axios.get(
        `${baseURL}/api/milestone`,

        {
          params: {
            mentor_id: parsedUserData?.is_mentor
              ? parsedDegree?.mentor_id
              : mentorId,
            user_id: parsedUserData?.is_mentor
              ? mentorId
              : parsedUserData.user_id,
              include_history:true
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response-milestone---", response.data);
      setSelectedMilestoneData(response.data);
      setIsMilestonePopupOpen(true);
    } catch (e) {
      console.log(e);
    }
  };

  const updateTimeAvailability = async (checkAvailability: any) => {
    const token = localStorage.getItem("token");
    const degree = localStorage.getItem("degree");
    const parsedDegree = degree ? JSON.parse(degree) : null;
    try {
      const res = await axios.put(
        `${baseURL}/update_mentor/${parsedDegree?.mentor_id}`,

        checkAvailability,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("res----data--update--availability", res.data);
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

  return (
    <div className="mx-auto max-w-6xl p-3 space-y-5">
      {/* Mentor pills */}
      {!parsedUserData.is_mentor ? (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {loading ?
            <div className="fixed inset-0 bg-white/70 flex justify-center items-center z-50">
              <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
            </div>
            : (assignedMentorData.length === 0 ? (
              <div className="font-bold text-md">No Mentor Assigned</div>
            ) : (
              assignedMentorData?.map((m, index) => (
                <button
                  key={index}
                  // onClick={() => setSelectedMentor(m)}
                  onClick={() => handleMentorSelection(m?.mentor_id)}
                  className={`flex items-center gap-3 rounded-2xl border px-3 py-2 transition shadow-sm hover:shadow ${selectedMentor?.mentor_id === m?.mentor_id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                    }`}
                  aria-pressed={selectedMentor?.mentor_id === m?.mentor_id}
                >
                  <img
                    src={m?.profile_picture}
                    alt={m?.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm font-medium">{m?.name}</span>
                </button>
              ))
            ))}
        </div>
      ) : (
        <div></div>
      )}

      {/* Calendar + Slots */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
        <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm max-w-sm">
          <div className="mb-2 flex items-center justify-between">
            <button onClick={prevMonth} className="rounded-lg p-1 hover:bg-gray-100" aria-label="Previous month">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="text-base font-semibold">{monthLabel}</div>
            <button onClick={nextMonth} className="rounded-lg p-1 hover:bg-gray-100" aria-label="Next month">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-gray-500">
            {"SMTWTFS".split("").map((c, i) => (
              <div key={i} className="py-0.5">
                {c}
              </div>
            ))}
          </div>

        
          <div className="mt-1 grid grid-cols-7 gap-1">
            {monthMatrix.map((cell, idx) => {
              const isCurrentMonth = cell.inMonth
              const isSelected = selectedDate && sameDay(cell.date, selectedDate)
              const isPast = isPastDay(cell.date)
              return (
                <button
                  key={idx}
                  disabled={!isCurrentMonth || isPast}
                  onClick={() => setSelectedDate(cell.date)}
                  className={`aspect-square rounded-lg border text-xs transition flex items-center justify-center ${
                    isSelected ? "border-blue-600 bg-blue-50 font-semibold" : "border-gray-200 bg-white"
                  } ${!isCurrentMonth ? "opacity-40" : ""} ${
                    isPast ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50"
                  }`}
                  aria-pressed={!!isSelected}
                >
                  {cell.date.getDate()}
                </button>
              )
            })}
          </div>
        </div>

    
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">Available Times</h2>
          {!selectedDate ? (
            <p className="text-sm text-gray-500">Select a date to see available time slots.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {slotsForDate(selectedDate).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedSlot(t)}
                  className={`rounded-xl border px-3 py-1.5 text-sm transition ${
                    selectedSlot === t ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm max-w-sm">
          <div className="mb-2 flex items-center justify-between">
            <button
              onClick={prevMonth}
              className="rounded-lg p-1 hover:bg-gray-100"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="text-base font-semibold">{monthLabel}</div>
            <button
              onClick={nextMonth}
              className="rounded-lg p-1 hover:bg-gray-100"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-gray-500">
            {"SMTWTFS".split("").map((c, i) => (
              <div key={i} className="py-0.5">
                {c}
              </div>
            ))}
          </div>

          {/* Dates grid */}
          <div className="mt-1 grid grid-cols-7 gap-1 ">
            {monthMatrix.map((cell, idx) => {
              const dayOfWeek = cell.date.getDay();
              const isAvailableDay = availableDayIndices.includes(dayOfWeek);
              const isCurrentMonth = cell.inMonth;
              const isPast = isPastDay(cell.date);
              const isDisabled = !isCurrentMonth || isPast || !isAvailableDay;
              const isSelected =
                selectedDate && sameDay(cell.date, selectedDate);

              return (
                <button
                  key={idx}
                  disabled={isDisabled}
                  onClick={() => setSelectedDate(new Date(cell.date))}
                  className={`aspect-square rounded-lg border text-xs transition flex items-center justify-center
                ${isDisabled
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:bg-gray-50"
                    }
                ${isAvailableDay
                      ? "bg-blue-50 border-blue-300"
                      : "border-gray-200 bg-white"
                    }
                ${isSelected ? "border-blue-600 bg-blue-100 font-semibold" : ""
                    }`}
                >
                  {cell.date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">Available Times</h2>

          {!selectedDate ? (
            <div className="">
              <p className="text-sm text-gray-500">
                Select a date to see available time slots.
              </p>
              <div className="pt-10">
                {parsedUserData?.is_mentor && (
                  <MentorScheduleEditor
                    onSave={async (schedule) => {
                      console.log("Mentor schedule saved:", schedule);
                      const payload = {
                        availability: schedule.map((s) => ({
                          day: s.day,
                          startTime: s.startTime,
                          endTime: s.endTime,
                        })),
                      };
                      updateTimeAvailability(payload);
                    }}
                  />
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap gap-2">
                {slotsForDate(selectedDate).map((t) => {
                  const now = new Date();
                  const slotStart = parseTimeToDate(selectedDate, t);

                  const isPastSlot = slotStart <= now;
                  return (
                    <button
                      key={t}
                      disabled={isPastSlot}
                      onClick={() => setSelectedSlot(t)}
                      className={`rounded-xl border px-3 py-1.5 text-sm transition
                ${selectedSlot === t
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                        }
                ${isPastSlot ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
              <div className="pt-10">
                {parsedUserData?.is_mentor && (
                  <MentorScheduleEditor
                    onSave={async (schedule) => {
                      console.log("Mentor schedule saved:", schedule);
                      const payload = {
                        availability: schedule.map((s) => ({
                          day: s.day,
                          startTime: s.startTime,
                          endTime: s.endTime,
                        })),
                      };
                      updateTimeAvailability(payload);
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scheduled meetings */}
      <section className="space-y-3 pb-24">
        <h2 className="text-xl font-semibold">Scheduled Meetings</h2>
        {meetings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 p-6 text-center text-gray-500">
            No meetings yet. Pick a date and time with your mentor to get
            started
          </div>
        ) : (
          <>
            {currentMeetings.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div>
                  <div className="font-semibold">
                    {parsedUserData.is_mentor ? m?.intent?.user_info?.email : m.mentor_name}
                  </div>
                  <div className="text-sm text-gray-600">
                    • {new Date(m?.start_datetime).toLocaleString()} •{" "}
                    {m.duration} Minutes
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={m.link}
                    className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    <Video className="h-4 w-4" />
                    <span className="hidden sm:inline sm:text-base">Join</span>
                  </a>
                  <button
                    className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-medium hover:bg-gray-50"
                    onClick={() => {
                      setSelectedIntent(m.intent);
                      setOpenIntentDialog(true);
                    }}
                  >
                    <Lightbulb className="h-4 w-4" />
                    <span className="hidden sm:inline sm:text-base">Intent</span>
                  </button>

                  {/* Single Dialog */}
                  <Dialog
                    open={openIntentDialog}
                    onClose={() => setOpenIntentDialog(false)}
                    // fullWidth
                    // maxWidth="sm"
                    hideBackdrop
                  >
                    <DialogContent
                      className="relative"
                    >

                      <X onClick={() => setOpenIntentDialog(false)} className="absolute cursor-pointer top-0 right-0 text-red-500 font-bold" />

                      {/* Dialog Body */}
                      {/* {selectedIntent && ( */}
                      <SupportDetailsCard data={selectedIntent} />
                      {/* )} */}
                    </DialogContent>
                  </Dialog>


                  <button
                    className="inline-flex items-center gap-1 rounded-xl border px-3 py-2 text-sm font-medium hover:bg-gray-50"
                    onClick={() =>
                      handleMilestone(
                        parsedUserData.is_mentor ? m.user_id : m.mentor_id
                      )
                    }
                  >
                    <ClipboardList className="h-4 w-4" />{" "}
                    <span className="hidden sm:inline sm:text-base">
                      Milestones
                    </span>
                  </button>
                  <MilestonePopup
                    isOpen={isMilestonePopupOpen}
                    onClose={() => setIsMilestonePopupOpen(false)}
                    MilestoneData={selectedMilestoneData}
                    is_mentor={parsedUserData?.is_mentor}
                    userId={m.intent.user_info.user_id}
                  />
                  <button
                    className="inline-flex items-center gap-1 rounded-xl border px-3 py-2 text-sm font-medium hover:bg-gray-50"
                    onClick={() => {
                      const meetingId = extractMeetingId(m.link);
                      if (m.user_id && m.mentor_id && meetingId !== null) {
                        handleFeedbackPopup(
                          Number(m.user_id), // in case these are strings
                          Number(m.mentor_id),
                          meetingId // already a number
                        );
                      }
                    }}
                  >
                    <MessageSquare className="h-4 w-4" />{" "}
                    <span className="hidden sm:inline sm:text-base">
                      Feedback
                    </span>
                  </button>
                  <FeedbackPopup
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                    feedbackData={selectedfeedbackData}
                    userId={parsedUserData?.is_mentor ? parsedDegree?.mentor_id : parsedUserData?.user_id}
                    userType={parsedUserData?.is_mentor}
                  />
                </div>
              </div>
            ))}

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-3 pt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg border text-sm ${currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-100"
                  }`}
              >
                Previous
              </button>

              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg border text-sm ${currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-100"
                  }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>

      {/* Sticky confirmation bar */}
      {selectedMentor && selectedDate && selectedSlot && (
        <div className="fixed bottom-4 left-[50%] z-50 w-[min(900px,92vw)] -translate-x-1/2 rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-xl backdrop-blur">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-sm">
              <span className="font-semibold">Mentor:</span>{" "}
              {selectedMentor.name} •{" "}
              <span className="font-semibold">Date:</span>{" "}
              {selectedDate.toLocaleDateString()} •{" "}
              <span className="font-semibold">Time:</span> {selectedSlot}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedSlot(null)}
                className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                Change
              </button>
              <button
                onClick={confirmMeeting}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Confirm Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MeetingSchedulerPreview;
// —— Utilities ——
function buildMonthMatrix(anchor: Date): CalendarCell[] {
  const firstOfMonth = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const startDay = firstOfMonth.getDay();
  const start = new Date(firstOfMonth);
  start.setDate(firstOfMonth.getDate() - startDay);

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
// import React, { useEffect, useMemo, useState } from "react"
// import { Video, ClipboardList, ChevronLeft, ChevronRight } from "lucide-react";
// import baseURL from "@/config/config";

// interface Mentor {
//   id: number
//   name: string
//   avatar: string
// }

// interface Meeting {
//   id: string
//   mentor: Mentor
//   dateISO: string
//   time: string
//   duration: string
// }

// export default function MeetingSchedulerPreview() {
//   const [mentors, setMentors] = useState<Mentor[]>([])
//   const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
//   const [selectedDate, setSelectedDate] = useState(new Date())
//   const [selectedTime, setSelectedTime] = useState<string | null>(null)
//   const [meetings, setMeetings] = useState<Meeting[]>([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const daysInMonth = useMemo(() => {
//     const start = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
//     const end = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)
//     const days = []
//     for (let i = 1; i <= end.getDate(); i++) {
//       days.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i))
//     }
//     return days
//   }, [selectedDate])

//   const timeSlots = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"]

//   // Fetch mentors from API
//   useEffect(() => {
//     async function fetchMentors() {
//       const token=localStorage.getItem("tojken")
//       try {
//         setLoading(true)
//         const res = await fetch(`${baseURL}/get_assigned_mentors`
//           {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       }
//     });
//         if (!res.ok) throw new Error("Failed to fetch mentors")
//         const data = await res.json()
//         setMentors(data)
//         setSelectedMentor(data[0] || null)
//       } catch (err: any) {
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchMentors()
//   }, [])

//   async function handleConfirm() {
//     if (!selectedMentor || !selectedTime) return
//     try {
//       setLoading(true)
//       const res = await fetch(`${baseURL}/create_schedule`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           mentor_id: selectedMentor.id,
//           date: selectedDate.toISOString().split("T")[0],
//           time: selectedTime,
//         }),
//       })
//       const result = await res.json()
//       if (result.status === "success") {
//         const newMeeting: Meeting = {
//           id: Math.random().toString(36).substring(7),
//           mentor: selectedMentor,
//           dateISO: selectedDate.toISOString(),
//           time: selectedTime,
//           duration: "30 min",
//         }
//         setMeetings((prev) => [...prev, newMeeting])
//         setSelectedTime(null)
//         alert(result.message)
//       } else {
//         alert("Error: " + result.message)
//       }
//     } catch (err: any) {
//       alert("Failed to schedule meeting: " + err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow">
//       <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
//         <Video className="w-5 h-5 text-blue-500" /> Schedule a Meeting
//       </h2>

//       {loading && <p className="text-gray-500 mb-4">Loading...</p>}
//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       {/* Mentor Selection */}
//       <div className="flex gap-4 overflow-x-auto pb-2 mb-4">
//         {mentors.map((m) => (
//           <button
//             key={m.id}
//             onClick={() => setSelectedMentor(m)}
//             className={`flex items-center gap-3 p-3 rounded-xl border min-w-[160px] transition-all duration-200 ${
//               selectedMentor?.id === m.id
//                 ? "border-blue-500 bg-blue-50"
//                 : "border-gray-200 hover:bg-gray-50"
//             }`}
//           >
//             <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full" />
//             <span className="font-medium">{m.name}</span>
//           </button>
//         ))}
//       </div>

//       {/* Calendar */}
//       <div className="flex items-center justify-between mb-2">
//         <button
//           onClick={() =>
//             setSelectedDate(
//               new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
//             )
//           }
//           className="p-2 rounded-full hover:bg-gray-100"
//         >
//           <ChevronLeft />
//         </button>
//         <h3 className="font-medium">
//           {selectedDate.toLocaleString("default", { month: "long" })} {selectedDate.getFullYear()}
//         </h3>
//         <button
//           onClick={() =>
//             setSelectedDate(
//               new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
//             )
//           }
//           className="p-2 rounded-full hover:bg-gray-100"
//         >
//           <ChevronRight />
//         </button>
//       </div>

//       <div className="grid grid-cols-7 gap-2 mb-4">
//         {daysInMonth.map((day) => {
//           const isSelected =
//             day.toDateString() === new Date(selectedDate).toDateString()
//           return (
//             <button
//               key={day.toISOString()}
//               onClick={() => setSelectedDate(day)}
//               className={`p-2 rounded-xl text-sm border transition-all duration-200 ${
//                 isSelected
//                   ? "bg-blue-500 text-white border-blue-500"
//                   : "border-gray-200 hover:bg-gray-100"
//               }`}
//             >
//               {day.getDate()}
//             </button>
//           )
//         })}
//       </div>

//       {/* Time Slots */}
//       <div className="flex gap-3 flex-wrap mb-4">
//         {timeSlots.map((slot) => (
//           <button
//             key={slot}
//             onClick={() => setSelectedTime(slot)}
//             className={`px-4 py-2 rounded-xl border transition-all duration-200 ${
//               selectedTime === slot
//                 ? "border-blue-500 bg-blue-50"
//                 : "border-gray-200 hover:bg-gray-50"
//             }`}
//           >
//             {slot}
//           </button>
//         ))}
//       </div>

//       {/* Sticky Confirm Bar */}
//       {selectedTime && (
//         <div className="sticky bottom-0 left-0 right-0 bg-blue-600 text-white flex justify-between items-center p-3 rounded-xl shadow-lg">
//           <span>
//             Confirm meeting with <b>{selectedMentor?.name}</b> at {selectedTime} on {selectedDate.toDateString()}
//           </span>
//           <button
//             onClick={handleConfirm}
//             className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100"
//           >
//             {loading ? "Saving..." : "Confirm"}
//           </button>
//         </div>
//       )}

//       {/* Upcoming Meetings */}
//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
//           <ClipboardList className="w-5 h-5 text-green-600" /> Upcoming Meetings
//         </h3>
//         {meetings.length === 0 ? (
//           <p className="text-gray-500">No meetings scheduled yet.</p>
//         ) : (
//           <div className="grid sm:grid-cols-2 gap-4">
//             {meetings.map((meet) => (
//               <div
//                 key={meet.id}
//                 className="border border-gray-200 p-4 rounded-xl shadow-sm flex gap-3 items-center"
//               >
//                 <img
//                   src={meet.mentor.avatar}
//                   alt={meet.mentor.name}
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div>
//                   <p className="font-medium">{meet.mentor.name}</p>
//                   <p className="text-sm text-gray-500">
//                     {new Date(meet.dateISO).toDateString()} at {meet.time}
//                   </p>
//                   <p className="text-xs text-gray-400">Duration: {meet.duration}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
