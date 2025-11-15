import { useEffect, useMemo, useState } from "react";
import {
  Video,
  ClipboardList,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import baseURL from "@/config/config";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
import FeedbackPopup from "@/components/NewPage/FeedbackPopup";
import MilestonePopup from "@/components/NewPage/MilestonePopup";

// —— Types ——
interface Mentor {
  mentor_id: number;
  mentor_name: string;
  profile_picture: string;
  availability: string[];
  name: string;
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
const MeetingSchedulerPreview = () => {
  const [assignedMentorData, setAssignedMentorData] = useState<Mentor[]>([]);
  const [refreshKey, setRefreshKey] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
   const [isMilestonePopupOpen, setIsMilestonePopupOpen] = useState(false);
  const [selectedfeedbackData, setSelectedFeedbackData] = useState<any>([]);
    const [selectedMilestoneData, setSelectedMilestoneData] = useState<any>([]);
  const [mentorId,setMentorId]=useState("");
  const token = localStorage.getItem("token");

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

  const defaultSlots: string[] = [
    "09:30 AM",
    "11:00 AM",
    "02:00 PM",
    "04:30 PM",
    "07:00 PM",
  ];

  const notifySuccess = (msg = "Schedule created successfully!") => {
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
    }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const user = localStorage.getItem("user");
    const parsedUserData = user ? JSON.parse(user) : null;

  // Calculate pagination indices
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMeetings = meetings.slice(startIndex, endIndex);

  const totalPages = Math.ceil(meetings.length / itemsPerPage);

  // —— Calendar helpers ——
  const monthMatrix = useMemo(() => buildMonthMatrix(viewDate), [viewDate]);
  const monthLabel = useMemo(
    () =>
      viewDate.toLocaleString(undefined, { month: "long", year: "numeric" }),
    [viewDate]
  );

  // Slots based on day (weekend logic)
  const slotsForDate = (d: Date | null): string[] => {
    if (!d) return [];
    const day = d.getDay();
    if (day === 0) return ["10:00 AM", "12:00 PM", "03:00 PM"]; // Sunday
    if (day === 6) return ["11:00 AM", "01:30 PM", "05:00 PM"]; // Saturday
    return defaultSlots;
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
          ? { mentor_id: mentorId}
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
  };



  useEffect(() => {
    fetchMeetingData();
    if(parsedUserData.is_mentor){
      fetchMentorData();
    }
  }, []);

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
      
      const parsedUser =  userData?JSON.parse(userData):null;

      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const meetingLink = `/v2/meetingcall/${randomId}/${parsedUser?.user_id}?start=${encodeURIComponent(
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
      setLoading(false);
    } catch (err: any) {
      console.log(err);
      setRefreshKey(false);
      alert("An error occurred while confirming meeting");
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

  // Available days from selected mentor
  const availableDayIndices =
    selectedMentor?.availability?.map((a: any) => dayMap[a.day]) || [];

  const handleMentorSelection = (mentorId: any) => {
    const handleselectedMentor = mentorsList.find(
      (mentor) => mentor.mentor_id === mentorId
    );
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
          const data=response.data;
          setMentorId(data.mentor_id);
        } else {
          console.log("No Mentors found.");
        }
      } catch (error) {
        console.error("Error fetching Assigned Mentors:", error);
      }
    };
  
    useEffect(() => {
      fetchMeetingData();
    }, [mentorId]);


    const handleMilestone=async(mentorId:Number | null)=>{
    try {
      const response = await axios.get(`${baseURL}/api/milestone`,
        
         {
          params:{
            mentor_id:mentorId,
            user_id:parsedUserData.user_id
          },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response-milestone---",response.data);
       setSelectedMilestoneData(response.data);
      setIsMilestonePopupOpen(true);
    }
    catch(e){
console.log(e);
    }
    }

  return (
    <div className="mx-auto max-w-6xl p-3 space-y-5">
      {/* Mentor pills */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {assignedMentorData.length === 0 ? (
          <div className="font-bold text-md">No Mentor Assigned</div>
        ) : (
          assignedMentorData?.map((m, index) => (
            <button
              key={index}
              // onClick={() => setSelectedMentor(m)}
              onClick={() => handleMentorSelection(m?.mentor_id)}
              className={`flex items-center gap-3 rounded-2xl border px-3 py-2 transition shadow-sm hover:shadow ${
                selectedMentor?.mentor_id === m?.mentor_id
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
        )}
      </div>

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
          <div className="mt-1 grid grid-cols-7 gap-1">
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
                  onClick={() => setSelectedDate(cell.date)}
                  className={`aspect-square rounded-lg border text-xs transition flex items-center justify-center
                ${
                  isDisabled
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-gray-50"
                }
                ${
                  isAvailableDay
                    ? "bg-blue-50 border-blue-300"
                    : "border-gray-200 bg-white"
                }
                ${
                  isSelected ? "border-blue-600 bg-blue-100 font-semibold" : ""
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
            <p className="text-sm text-gray-500">
              Select a date to see available time slots.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {slotsForDate(selectedDate).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedSlot(t)}
                  className={`rounded-xl border px-3 py-1.5 text-sm transition
                ${
                  selectedSlot === t
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                >
                  {t}
                </button>
              ))}
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
                  <div className="font-semibold">{parsedUserData.is_mentor?m.name:m.mentor_name}</div>
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
                    <Video className="h-4 w-4" /> Join
                  </a>
                  <button className="inline-flex items-center gap-1 rounded-xl border px-3 py-2 text-sm font-medium hover:bg-gray-50"
                  onClick={()=>handleMilestone(m.mentor_id)}
                  >
                    <ClipboardList className="h-4 w-4" /> Milestones
                  </button>
                  <MilestonePopup
        isOpen={isMilestonePopupOpen}
        onClose={() => setIsMilestonePopupOpen(false)}
        MilestoneData={selectedMilestoneData}
      />
                  <button
                    className="inline-flex items-center gap-1 rounded-xl border px-3 py-2 text-sm font-medium hover:bg-gray-50"
                    onClick={() => {
                      const meetingId = extractMeetingId(m.link);
                      if (
                        m.user_id &&
                        m.mentor_id &&
                        meetingId !== null
                      ) {
                        handleFeedbackPopup(
                          Number(m.user_id), // in case these are strings
                          Number(m.mentor_id),
                          meetingId // already a number
                        );
                      }
                    }}
                  >
                    <MessageSquare className="h-4 w-4" /> Feedback
                  </button>
 <FeedbackPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        feedbackData={selectedfeedbackData}
      />
                </div>
                 
              </div>
            ))}

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-3 pt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg border text-sm ${
                  currentPage === 1
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
                className={`px-3 py-1 rounded-lg border text-sm ${
                  currentPage === totalPages
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
        <div className="fixed bottom-4 left-[60%] z-50 w-[min(900px,92vw)] -translate-x-1/2 rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-xl backdrop-blur">
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
