import React, { useEffect, useState } from "react";

import axios from "axios";
import baseURL from "@/config/config";

// Define TypeScript interface for a meeting
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

// Function to convert ISO datetime to "DD/MM/YYYY HH:MM AM/PM"
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
  user_id: number; // or string, depending on your type
};
//@ts-ignore
const MeetingTable: React.FC<MeetingTableProps> = ({ user_id }) => {
  const [meetingData, setMeetingData] = useState<Meeting[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil(meetingData.length / pageSize);
  const paginatedData = meetingData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const fetchMeetingData = async () => {
    console.log("user_id----", user_id);
    try {
      const response = await axios.get(`${baseURL}/api/schedules`, {
        params: { user_id: user_id },
      });

      if (response.data) {
        const sortedData = [...response.data].sort(
          (a, b) =>
            new Date(b.start_datetime).getTime() -
            new Date(a.start_datetime).getTime()
        );

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
  }, []);

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
            {paginatedData.map((meeting) => (
              <tr key={meeting.id} className="hover:bg-gray-50">
                <td className="p-2 border text-sm">{meeting.mentor_name}</td>
                <td className="p-2 border text-sm">{meeting.mentor_email}</td>
                {/* <td className="p-2 border">
                  <a
                    href={meeting.mentor_email}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    <Mail/>
                  </a>
                </td> */}
                <td className="p-2 border text-sm">
                  {convertDateTime(meeting.start_datetime)}
                </td>
                <td className="p-2 border text-sm">{meeting.duration} mins</td>
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
                  <a
                    href={meeting.feedbackLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Feedback
                  </a>
                </td>
                {/* <td className="p-2 border">
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Pen size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td> */}
              </tr>
            ))}
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
    </div>
  );
};

export default MeetingTable;
