import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  
  TextField,
  MenuItem,
  
  Typography,
  Paper,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import MeetingTable from "../ScheduleMeeting/MeetingTable.tsx";
import axios from "axios";
import baseURL from "@/config/config.tsx";
import { useEffect } from "react";
import CryptoJS from "crypto-js";

interface Schedule {
  id: number;
  name: string;
  email: string;
  start_date: string;
  duration: string;
  mentor_id: number;
  user_id: string;
  mentor_email?: string;
  mentor_phone?: string;
  mentor_linkedin?: string;
  timezone?: string;
}

interface ScheduleMeetingProps {
  setCount: (value: any) => void;
  count: any;
}

interface Slot {
  day: string;
  startTime: string;
  endTime: string;
}


export interface Mentor {
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
  availability: Slot[];
}

export interface MentorResponse {
  mentors: Mentor[];
}

const ScheduleMeeting: React.FC<ScheduleMeetingProps> = (
) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
 
 
  const [durationOpen, setDurationOpen] = useState(false);
  // const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [mentorsList, setMentorsList] = useState<
    {
      email: string;
      mentor_id: number | null;
      name: string;
      phone: string;
      linkedin: string;
    }[]
  >([]);

  //@ts-ignore
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
 
  //@ts-ignore
  const [userDetails, setUserDetails] = useState<any>({
    user_id: "",
    name: "",
    email: "",
  });

  //  const[user_id,setUser_id]=useState(0);
  const [assignedMentorData, setAssignedMentorData] = useState<Mentor[]>([]);
  const token = localStorage.getItem("token");
  // const [user_id, setUser_id] = useState<number | null>(() => {
  //   const stored = localStorage.getItem("degree");
  //   if (stored) {
  //     try {
  //       const parsed = JSON.parse(stored);
  //       return parsed?.user_id ?? null;
  //     } catch {
  //       return null;
  //     }
  //   }
  //   return null;
  // });

  {
    /**Reused */
  }
  const [formData, setFormData] = useState<Schedule>({
    id: 0,
    name: "",
    email: "",
    start_date: "",
    duration: "30",
    mentor_id:null; 
    user_id: "",
    mentor_email: "",
    mentor_phone: "",
    mentor_linkedin: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  {
    /**NEW APIs */
  }
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

  {/**Converting into ISO format */}
  const convertDateAndTimeToISO = (date: Date, timeString: string): void => {
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

    const start_date: string = `${year}-${month}-${day}T${hour}:${minute}`;
    setFormData((prev) => ({ ...prev, start_date }));
  };

  const handleSelect = (date: Date, time: string) => {
    setSelectedSlot(time);
    const isoDateTime = convertDateAndTimeToISO(date, time);
    console.log("ISODatetime:", isoDateTime);
    setDurationOpen(true);
  };

  {
    /**Reused */
  }
  // const [mentorsList, setMentorsList] = useState<
  //   {
  //     email: string;
  //     mentor_id: number;
  //     name: string;
  //     phone: string;
  //     linkedin: string;
  //   }[]
  // >([]);

  // //@ts-ignore
  // const [schedules, setSchedules] = useState<Schedule[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string>("");
  // const [successMessage, setSuccessMessage] = useState<string>("");
  // //@ts-ignore
  // const [userDetails, setUserDetails] = useState<any>({
  //   user_id: "",
  //   name: "",
  //   email: "",
  // });

  const durationOptions = [
    { value: "30", label: "30 Minutes" },
    { value: "60", label: "1 Hour" },
  ];

  // Calculate end date based on start date and duration
  const calculateEndDate = (
    startDate: string,
    durationMinutes: string
  ): string => {
    const date = new Date(startDate);
    date.setMinutes(date.getMinutes() + parseInt(durationMinutes));
    return date.toISOString().slice(0, 16); // Format to match datetime-local input
  };

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${baseURL}/get_assigned_mentors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(
          "response.data.mentorstype",
          typeof response.data.mentors[0].mentor_id
        );
        console.log(
          "response.data.mentors.availability",
          response.data.mentors[0].availability
        );
        console.log("response.data.mentors", response.data.mentors);
        setMentorsList(response.data.mentors);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleMentorSelection = (mentorId: string) => {
  //   const selectedMentor = mentorsList.find(
  //     (mentor) => mentor.mentor_id.toString() === mentorId
  //   );
  //   if (selectedMentor) {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       mentor_id: mentorId,
  //       mentor_email: selectedMentor.email,
  //       mentor_phone: selectedMentor.phone,
  //       mentor_linkedin: selectedMentor.linkedin,
  //     }));
  //   }
  // };

  const handleMentorSelection = (mentorId: number) => {
    const selectedMentor = mentorsList.find(
      (mentor) => mentor.mentor_id === mentorId
    );
    if (selectedMentor) {
      console.log("selectedMentor", selectedMentor);
      setFormData((prevData) => ({
        ...prevData,
        mentor_id: mentorId,
        mentor_email: selectedMentor.email,
        mentor_phone: selectedMentor.phone,
        mentor_linkedin: selectedMentor.linkedin,
      }));
      MentorSlot(mentorId);
    }
    // } else {

    //   setFormData((prevData) => ({
    //     ...prevData,
    //     mentor_id: "",
    //     mentor_email: "",
    //     mentor_phone: "",
    //     mentor_linkedin: "",
    //   }));
    // }
  };

  const MentorSlot = (mentorId: number) => {
    const selectedMentor = assignedMentorData.find(
      (mentor) => mentor.mentor_id === mentorId
    );
    console.log(
      "selectedMentor----MentorSlot-----",
      selectedMentor?.availability
    );
  };

  useEffect(() => {
    const userData = localStorage.getItem("degree");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUserDetails({ user_id: parsedUserData.id });
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // setCount(count + 1);
    try {
      e.preventDefault();
      console.log("formdata----", formData);
      //  setCount(count + 1);
      // setLoading(true);
      // setError("");
      // setSuccessMessage("");

      const userData = localStorage.getItem("userlocaldata");
      const userData2 = localStorage.getItem("degree");

      console.log("userData---", userData);
      console.log("userData2", userData2);
      if (userData && userData2) {
        const parsedUserData = JSON.parse(userData);
        const parsedUserData2 = JSON.parse(userData2);
        console.log("parsedUserData---", parsedUserData);
        console.log("parsedUserData2----", parsedUserData2);

        const randomId = Math.floor(Math.random() * 1000);
        const roomid = Math.floor(Math.random() * 1000);
        const password = Math.random().toString(36).substring(2, 8);
        console.log("randomId---", randomId);
        console.log("roomid----", roomid);
        console.log("password----", password);

        const secretKey = "meetingkeys";
        console.log("secretKey----", secretKey);
        const startDate = formData.start_date;
        console.log("startDate----", startDate);
        const endDate = calculateEndDate(startDate, formData.duration);
        console.log("endDate----", endDate);
        //  console.log("secretKey----",secretKey);
        //  console.log("startDate----",startDate);
        //   console.log("endDate----",endDate);

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
        const scheduleData = {
          name: parsedUserData2.first_name || "",
          email: parsedUserData.username || "",
          start_datetime: startDate,
          end_datetime: endDate,
          duration: formData.duration,
          link: meetingLink,
          user_id: parsedUserData2.user_id,
          mentor_id: formData.mentor_id,
          mentor_name:
            mentorsList.find(
              (mentor) => mentor.mentor_id === formData.mentor_id
            )?.name || "",
          mentor_email: formData.mentor_email,
          roomid: roomid,
          password: password,
          timezone: formData.timezone,
        };
        console.log("scheduleData-----", scheduleData);
        const response = await axios.post<{ message: string; id: number }>(
          `${baseURL}/api/schedule`,
          scheduleData
        );
        alert(response.data.message);
        setSuccessMessage(response.data.message);
        setSchedules((prev) => [
          ...prev,
          {
            ...formData,
            id: response.data.id,
            user_id: parsedUserData.user_id,
          },
        ]);
        setFormData({
          id: 0,
          name: "",
          email: "",
          start_date: "",
          duration: "30",
          mentor_id: 0,
          user_id: "",
          mentor_email: "",
          mentor_phone: "",
          mentor_linkedin: "",
        });
      } else {
        setError("User data not found in localStorage.");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };



 
  // Helper to convert "HH:mm" to Date object
  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // Format Date to "h:mm A" format
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 === 0 ? 12 : hours % 12;
    return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  // Generate 30-minute intervals
  const getTimeSlots = (start, end) => {
    const slots = [];
    const startDate = parseTime(start);
    const endDate = parseTime(end);
    const current = new Date(startDate);

    while (current <= endDate) {
      slots.push(new Date(current));
      current.setMinutes(current.getMinutes() + 30);
    }

    return slots;
  };

  return (
    <Paper elevation={4} className="p-6 w-full  mx-auto  rounded-2xl">
      <Typography
        variant="h6"
        className="text-center text-gray-700 !mb-6 !font-bold"
      >
        Schedule Meeting
      </Typography>

      {/* Mentor Selection at Top */}
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div className="flex justify-center w-full">
          <div className="flex gap-5 w-[70%]">
            <div className="mb-6 w-full">
              <Typography className="mb-2 text-md text-gray-600 !font-semibold">
                Select a Mentor
              </Typography>
              <TextField
                name="mentor_id"
                value={formData.mentor_id}
                required
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData((prev) => ({ ...prev, mentor_id: value }));
                  console.log("value---", value);
                  console.log("typevalue---", typeof value);
                  handleMentorSelection(value);
                }}
                select
                fullWidth
                size="small"
                // value={selectedMentor}
                // onChange={(e) => setSelectedMentor(e.target.value)}
              >
                {assignedMentorData.map((mentor) => (
                  <MenuItem
                    key={mentor.mentor_id}
                    value={mentor.mentor_id}
                    onClick={() => setSelectedMentor(mentor.id)}
                  >
                    {mentor.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            {formData.mentor_id && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email:
                  <input
                    type="text"
                    name="mentor_email"
                    value={formData.mentor_email}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                  />
                </label>
              </div>
            )}
        
  
          </div>
        </div>

        {/* Calendar and Time Slots Side by Side */}
        <div className="flex flex-col md:flex-row gap-2 mb-1">
          {/* Calendar */}
          <div className={`w-full ${durationOpen ? "md:w-[40%]" : "md:w-1/2"}`}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateCalendar
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                className="!font-semibold"
                shouldDisableDate={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const target = new Date(date);
                  target.setHours(0, 0, 0, 0);

                  return target.getTime() !== today.getTime();
                }}
              />
            </LocalizationProvider>
          </div>

          {/* Time Slots */}
          <div className={`w-[250px]`}>
            <Typography className="mb-4 text-sm text-gray-600">
              Pick a time interval
            </Typography>
            <div className={`w-full `}>
              <div className="w-full">
              

                {assignedMentorData?.map((mentor, mentorIndex) => (
                  <div key={mentorIndex} className="mb-6 w-full">
                    {mentor.availability?.map((slot, slotIndex) => {
                      const intervals = getTimeSlots(
                        slot.startTime,
                        slot.endTime
                      );

                      return (
                        <div key={slotIndex} className="mb-3">
                          <p className="text-sm text-gray-500 mb-1">
                            {slot.day}
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {intervals.map((time, timeIndex) => {
                              const formatted = formatTime(time);
                              const isSelected = selectedSlot === formatted;

                              return (
                                <button
                                  key={timeIndex}
                                  onClick={() => {
                                    setSelectedSlot(formatted);
                                    handleSelect(selectedDate, formatted);
                                  }}
                                  className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 
                    ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                    }
                  `}
                                >
                                  {formatted}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/**Duration */}
          {durationOpen && (
            <div className="flex gap-5  ">
              <div className="w-full ">
                <label className="block text-sm  text-gray-700">
                  Duration:
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {durationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500">
                    Your Timezone: {formData.timezone}
                  </p>
                </label>
              </div>

              <div className="pt-6 ">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 w-[150px] bg-indigo-500 text-white rounded-md hover:bg-indigo-600 disabled:bg-indigo-300 text-[14px]"
                >
                  {loading ? "Submitting..." : "Schedule Meeting"}
                </button>
              </div>
            </div>
          )}
        </div>
      </form>

      <MeetingTable user_id={user_id} />
    </Paper>
  );
};

export default ScheduleMeeting;
