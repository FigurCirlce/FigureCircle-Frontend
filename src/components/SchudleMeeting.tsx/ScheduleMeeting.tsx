import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import baseURL from "@/config/config";
//@ts-ignore
import CryptoJS from "crypto-js";

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

interface ScheduleMeetingProps {
  setCount: (value: any) => void;
  count: any;
}

//@ts-ignore
const ScheduleMeeting: React.FC<ScheduleMeetingProps> = ({ setCount, count }) => {
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

  const [mentorsList, setMentorsList] = useState<{
    email: string;
    mentor_id: number;
    name: string;
    phone: string;
    linkedin: string;
  }[]>([]);

  //@ts-ignore
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  //@ts-ignore
  const [userDetails, setUserDetails] = useState<any>({
    user_id: "",
    name: "",
    email: ""
  });

  const durationOptions = [
    { value: "30", label: "30 Minutes" },
    { value: "60", label: "1 Hour" }
  ];

  // Calculate end date based on start date and duration
  const calculateEndDate = (startDate: string, durationMinutes: string): string => {
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

  const handleMentorSelection = (mentorId: string) => {
    const selectedMentor = mentorsList.find(
      (mentor) => mentor.mentor_id.toString() === mentorId
    );
    if (selectedMentor) {
      setFormData((prevData) => ({
        ...prevData,
        mentor_id: mentorId,
        mentor_email: selectedMentor.email,
        mentor_phone: selectedMentor.phone,
        mentor_linkedin: selectedMentor.linkedin,
      }));
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("degree");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUserDetails({ user_id: parsedUserData.id });
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setCount(count + 1);
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const userData = localStorage.getItem("userlocaldata");
      const userData2 = localStorage.getItem("degree");

      if (userData && userData2) {
        const parsedUserData = JSON.parse(userData);
        const parsedUserData2 = JSON.parse(userData2);

        const randomId = Math.floor(Math.random() * 1000);
        const roomid = Math.floor(Math.random() * 1000);
        const password = Math.random().toString(36).substring(2, 8);

        const secretKey = "meetingkeys";
        const startDate = formData.start_date;
        const endDate = calculateEndDate(startDate, formData.duration);

        const encryptedStartDate = CryptoJS.AES.encrypt(
          startDate,
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
        const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();

        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const meetingLink = `/v2/meetingcall/${randomId}?start=${encodeURIComponent(
          encryptedStartDate
        )}&end=${encodeURIComponent(encryptedEndDate)}&roomid=${encodeURIComponent(
          encryptedRoomId
        )}&password=${encodeURIComponent(encryptedPassword)}&timezone=${encodeURIComponent(timeZone)}`;

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
              (mentor) => mentor.mentor_id.toString() === formData.mentor_id
            )?.name || "",
          mentor_email: formData.mentor_email,
          roomid: roomid,
          password: password,
          timezone: formData.timezone,
        };

        const response = await axios.post<{ message: string; id: number }>(
          `${baseURL}/api/schedule`,
          scheduleData
        );

        setSuccessMessage(response.data.message);
        setSchedules((prev) => [
          ...prev,
          { ...formData, id: response.data.id, user_id: parsedUserData.user_id },
        ]);
        setFormData({
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

  return (
    <div className="max-w-4xl  p-4">
      <h2 className="text-2xl font-semibold mb-4">Schedule a Meeting</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {successMessage && (
        <div className="text-green-500 mb-4">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mentor:
            <select
              name="mentor_id"
              value={formData.mentor_id}
              onChange={(e) => handleMentorSelection(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select a mentor</option>
              {mentorsList.map((mentor) => (
                <option key={mentor.mentor_id} value={mentor.mentor_id}>
                  {mentor.name}
                </option>
              ))}
            </select>
          </label>
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

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date:
            <input
              type="datetime-local"
              name="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            <p className="text-sm text-gray-500">
              Your Timezone: {formData.timezone}
            </p>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
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
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 disabled:bg-indigo-300"
        >
          {loading ? "Submitting..." : "Schedule Meeting"}
        </button>
      </form>
    </div>
  );
};

export default ScheduleMeeting;