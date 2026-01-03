import React, { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "@/config/config";
import FeedbackPopup from "../FeedbackPopup.tsx";

// interface FeedbackData {
//   check_id: number;
//   check_meeting_id: number;
//   created_at: string;
//   feedback_id: number;
//   mentor_id: number;
//   mentor_responsibility: boolean;
//   milestone: string;
//   milestone_achieved: boolean;
//   next_steps_identified: boolean;
//   progress_rating: number;
//   user_id: number;
//   user_responsibility: boolean;
// }

// interface FeedbackPopupProps {
//   isOpen: boolean;
//   onClose: () => void;
//   feedbackData: FeedbackData[];
//   // meetingId: number;
// }

interface Meeting {
  user_id: number;
  mentorName: string;
  milestoneLink: string;
  feedbackLink: string;
  mentor_email: string;
  email: string;
  link: string;
  mentor_name: string;
  start_datetime: string;
  name: string;
  mentor_id: number;
  id: number;
  end_datetime: string;
  duration: string;
  created_at: string;
}

function convertDateTime(datetimeStr: string | number | Date): string {
  const dateObj = new Date(datetimeStr);

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  let hours = dateObj.getHours();
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  const time = `${hours}:${minutes} ${ampm}`;
  const formattedDate = `${day}/${month}/${year}`;

  return `${formattedDate} ${time}`;
}

type MeetingTableProps = {
  user_id: number;
  refreshKey?: number;
};
//@ts-ignore
const MeetingTable: React.FC<MeetingTableProps> = ({ user_id, refreshKey }) => {
  const [meetingData, setMeetingData] = useState<Meeting[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedfeedbackData, setSelectedFeedbackData] = useState<any>([]);

  const pageSize = 5;

  const totalPages = Math.ceil(meetingData.length / pageSize);
  const paginatedData = meetingData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function extractMeetingId(url: string) {
    const match = url.match(/\/v2\/meetingcall\/(\d+)/); //return an array
    if (match) {
      return Number(match[1]);
    } else {
      return null; // return null if no meeting ID found
    }
  }
const user = localStorage.getItem("user");
    const parsedUserData = user ? JSON.parse(user) : null;
    const degree=localStorage.getItem("degree");
    const parsedDegree=degree?JSON.parse(degree):null;
  const fetchMeetingData = async () => {
    // const user = localStorage.getItem("user");
    // const parsedUserData = user ? JSON.parse(user) : null;

    console.log("user_id FetchMeetingData----", user_id);
    try {
      const response = await axios.get(`${baseURL}/api/schedules`, {
        // params: { user_id: 3},
        params: parsedUserData.is_mentor
          ? { mentor_id: user_id }
          : { user_id: user_id },
      });

      if (response.data) {
        const sortedData = [...response.data].sort(
          (a, b) =>
            new Date(b.start_datetime).getTime() -
            new Date(a.start_datetime).getTime()
        );
        console.log("sortedData-----", sortedData);
        setMeetingData(sortedData);
      } else {
        console.log("No meetings found.");
      }
    } catch (error) {
      console.error("Error fetching meeting data:", error);
    }
  };

  useEffect(() => {
    fetchMeetingData();
    console.log("refreshkey---");
  }, [user_id, refreshKey]);

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
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Scheduled Meetings</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          {/* <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Mentor Name</th>
               <th className="p-2 border ">Email</th>
              <th className="p-2 border">Date / Time</th>
               <th className="p-2 border">Duration</th>
              <th className="p-2 border">Meeting Link</th>
              <th className="p-2 border">Milestone Link</th>
              <th className="p-2 border">Feedback Link</th>
              
            </tr>
          </thead> */}
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border w-1/6">Mentor Name</th>
              <th className="p-2 border w-1/6">Email</th>
              <th className="p-2 border w-1/6">Date / Time</th>
              <th className="p-2 border w-1/12">Duration</th>
              <th className="p-2 border w-1/6">Meeting Link</th>
              <th className="p-2 border w-1/6">Milestone Link</th>
              <th className="p-2 border w-1/6">Feedback Link</th>
              {/* <th className="p-2 border">Actions</th> */}
            </tr>
          </thead>

          <tbody>
            {paginatedData.length === 0 ? (
              <div className="flex justify-center w-full">No Meeting Data </div>
            ) : (
              paginatedData.map((meeting) => (
                <tr key={meeting.id} className="hover:bg-gray-50">
                  <td className="p-2 border text-sm">{meeting.mentor_name}</td>
                  <td className="p-2 border text-sm">{meeting.mentor_email}</td>

                  <td className="p-2 border text-sm">
                    {convertDateTime(meeting.start_datetime)}
                  </td>
                  <td className="p-2 border text-sm">
                    {meeting.duration} mins
                  </td>
                  <td className="p-2 border">
                    <a
                      href={meeting.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      Link
                    </a>
                  </td>

                  <td className="p-2 border">
                    <a
                      href={meeting.milestoneLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      Milestone
                    </a>
                  </td>
                  <td className="p-2 border">
                    <button
                      // onClick={() =>
                      //   handleFeedbackPopup(
                      //     meeting.user_id,
                      //     meeting.mentor_id,
                      //     extractMeetingId(meeting.link)
                      //   )
                      // } //in this i have to send user_id and mentor_id to fetch feedback then I have to fetch feedback data and there I should also set meeting id
                      className="text-blue-600 underline hover:text-blue-800"
                      onClick={() => {
  const meetingId = extractMeetingId(meeting.link);
  if (meeting.user_id && meeting.mentor_id && meetingId !== null) {
    handleFeedbackPopup(
      Number(meeting.user_id),   // in case these are strings
      Number(meeting.mentor_id),
      meetingId                  // already a number
    );
  }
}}
                    >
                      Feedback
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            &lt;
          </button>
          <span className="self-center text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
      <FeedbackPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        feedbackData={selectedfeedbackData}
      userId={parsedUserData?.is_mentor?parsedDegree?.mentor_id:parsedUserData?.user_id}
                    userType={parsedUserData?.is_mentor}
      />
    </div>
  );
};

export default MeetingTable;
