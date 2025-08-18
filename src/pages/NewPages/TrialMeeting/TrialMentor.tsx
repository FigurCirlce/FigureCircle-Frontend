
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useUserContext } from "@/components/context/userContext";
import axios from "axios";
import baseURL from "@/config/config";

import { Linkedin, X } from "lucide-react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import pic from "../../../assets/pic.jpg";

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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ITEMS_PER_PAGE = 3;

const TrialMentor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  // @ts-ignore
  const [allMentorData, setAllMentorData] = useState<Mentor[]>([]);
  const [assignedMentorData, setAssignedMentorData] = useState<Mentor[]>([]);
  const [selectedExpertKey, setSelectedExpertKey] = useState<number | null>(null);
  const [selectedExpertData, setSelectedExpertData] = useState<Mentor | null>(null);
  const [page, setPage] = useState(1);

  // const { userData } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/mentors`);
        setAllMentorData(response.data);
        setAssignedMentorData(response.data);
        if (response.data.length > 0) {
          setSelectedExpertKey(response.data[0].mentor_id);
        }
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };
    fetchMentors();
  }, []);

  // Filter mentors based on search term
  const filteredMentors = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    return assignedMentorData.filter((mentor) => {
      return (
        mentor.name.toLowerCase().includes(lower) ||
        mentor.expertise.toLowerCase().includes(lower) ||
        mentor.background.toLowerCase().includes(lower)
      );
    });
  }, [searchTerm, assignedMentorData]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredMentors.length / ITEMS_PER_PAGE);
  const paginatedMentors = filteredMentors.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Reset page to 1 if filteredMentors changes and current page exceeds totalPages
  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [totalPages, page]);

  // Update selectedExpertData when selectedExpertKey or filteredMentors change
  useEffect(() => {
    if (selectedExpertKey !== null) {
      const found = filteredMentors.find((m) => m.mentor_id === selectedExpertKey);
      if (found) {
        setSelectedExpertData(found);
      } else {
        setSelectedExpertData(null);
      }
    }
  }, [selectedExpertKey, filteredMentors]);

  // Auto-select first mentor if none selected or selected mentor not in filtered list
  useEffect(() => {
    if (
      filteredMentors.length > 0 &&
      !filteredMentors.some((m) => m.mentor_id === selectedExpertKey)
    ) {
      setSelectedExpertKey(filteredMentors[0].mentor_id);
    } else if (filteredMentors.length === 0) {
      setSelectedExpertKey(null);
    }
  }, [filteredMentors, selectedExpertKey]);

  // Handlers for pagination
  const handleNextPage = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  return (
    <div>
      <section id="mentor" className="py-10 bg-gray-50">
        <h1 className="text-center text-xl sm:text-4xl font-bold pb-6">
           Mentors For You
        </h1>

        {/* Search input */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by name, expertise or background..."
            className="w-[80%] md:w-[60%] border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); // reset page on search change
            }}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-5 px-5">
          {/* Mentor list */}
          <div className="bg-white rounded-2xl shadow p-6 w-full lg:w-[400px] flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Mentors</h2>
            <div className="space-y-4 flex-grow overflow-auto max-h-[450px]">
              {paginatedMentors.length === 0 ? (
                <p className="text-gray-500">No mentors found.</p>
              ) : (
                paginatedMentors.map((mentor) => (
                  <div
                    key={mentor.mentor_id}
                    onClick={() => setSelectedExpertKey(mentor.mentor_id)}
                    className={`border rounded-xl p-4 flex items-center cursor-pointer ${
                      selectedExpertKey === mentor.mentor_id
                        ? "border-emerald-500"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={mentor.profile_picture || pic}
                      alt="mentor"
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <p className="font-medium">{mentor.name}</p>
                      <p className="text-sm text-gray-500">{mentor.expertise}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-between mt-4">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="flex items-center font-semibold">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Mentor detail view */}
          <div className="bg-white rounded-2xl shadow p-6 flex-1">
            <h2 className="text-center text-2xl font-bold mb-4">Detailed Description</h2>
            {selectedExpertData ? (
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={selectedExpertData.profile_picture || pic}
                  alt="mentor"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">{selectedExpertData.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{selectedExpertData.expertise}</p>
                  <p className="mb-2">{selectedExpertData.background}</p>
                  <p className="text-gray-600">
                    <strong>Degree:</strong> {selectedExpertData.degree}
                  </p>
                  <p className="text-gray-600">
                    <strong>Fee:</strong> ₹{selectedExpertData.fee}
                  </p>
                  <div className="flex gap-3 mt-4">
                    <a
                      href={selectedExpertData.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline text-sm"
                    >
                      View Resume
                    </a>
                    <a
                      href={`https://www.linkedin.com/${selectedExpertData.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="text-blue-500" size={20} />
                    </a>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => setOpenDialog(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Schedule Call
                    </button>
                    <button
                      onClick={() => navigate(`/expert/${selectedExpertData.mentor_id}`)}
                      className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">Select a mentor to see details.</p>
            )}
          </div>
        </div>
      </section>

      {/* Schedule Call Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{ style: { minWidth: "35vw", maxHeight: "80vh" } }}
      >
        <DialogContent>
          <div className="max-w-lg mx-auto p-4">
            <h3 className="text-xl font-semibold mb-2 text-center">Share Your Intent</h3>
            <p className="text-center text-gray-500 mb-4">
              Help your mentor understand what you're looking for
            </p>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">What area are you exploring?</label>
                <textarea className="w-full border rounded p-2" rows={2} />
              </div>
              <div>
                <label className="block font-medium mb-1">What is your goal or challenge?</label>
                <textarea className="w-full border rounded p-2" rows={2} />
              </div>
              <div>
                <label className="block font-medium mb-1">What kind of support are you looking for?</label>
                <div className="space-y-2">
                  {[
                    "Strategic advice",
                    "Skill development roadmap",
                    "Portfolio or profile feedback",
                    "Industry insights",
                    "Connections or opportunities",
                    "Something else",
                  ].map((option) => (
                    <label key={option} className="flex items-center">
                      <input type="checkbox" className="mr-2" /> {option}
                    </label>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <Button
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                  variant="contained"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="absolute top-0 right-2">
          <Button onClick={() => setOpenDialog(false)}>
            <X size={24} />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TrialMentor;
