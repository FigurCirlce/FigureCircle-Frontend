import { useEffect, useState } from "react";
import { Pen } from "lucide-react";
import pic from "../../assets/pic.jpg";
import dream from "../../assets/dream.jpg";
import baseURL from "@/config/config";
import axios from "axios";
import { toast } from "react-toastify";
// import { useUserContext } from "../../components/context/userContext";
import { Check } from "lucide-react";
import { X } from "lucide-react";
import { Linkedin } from "lucide-react";
import { Phone } from 'lucide-react';
import { Mail } from 'lucide-react';


interface BasicInfo {
  emailid: string;
  firstname: string;
  high_education: string;
  id: number;
  interested_stream: string;
  lastname: string;
  useruniqid: string;
  work_experience: string;
  role_based: string;
  industry: string;
  role: string;
  intent: string[];
}

export interface MentorDetails {
  background: string;
  created_at: string; // or Date if you parse it
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
  user_id: number;
  current_role: string;
}

interface DreamProfileInfo {
  certifications: string[];
  competitions: string[];
  courses: string[];
  degree: string;
  matched_role: string;
}

const InfoCard = ({ setDegree }: { setDegree: (degree: string) => void }) => {
  const [basicinfo, setBasicInfo] = useState<BasicInfo[]>([]);
  const [mentorBasicInfo, setMentorBasicInfo] = useState<MentorDetails[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<BasicInfo>>({});
  const [mentorformData, setmentorFormData] = useState<Partial<MentorDetails>>(
    {}
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [data, setData] = useState<any>();
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [assignedMentors, setAssignedMentors] = useState<MentorDetails[]>([]);

  const token = localStorage.getItem("token");
  const notifySuccess = () => toast.success("Basic info updated successfully!");
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  // const { userData } = useUserContext();

  // const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setSearchQuery(event.target.value);
  // };
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchQuery(value);
    setFormData((prev) => ({
      ...prev,
      interested_stream: value,
    }));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    setFormData((prev) => ({
      ...prev,
      interested_stream: suggestion,
    }));
  };

  // const filteredData = data?.filter((item: any) => {
  //     return item.toLowerCase().includes(searchQuery.toLowerCase());
  // });

  const fetchSuggestions = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/get_information`,
        {
          highest_degree_achieved: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("suggestion fetched------");
        console.log(response);

        setData(response.data.highest_degree_achieved);
      }
    } catch (error) {
      // setStatus("error");
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSuggestions();
  }, [editMode]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
    } else {
      setSuggestions(
        data
          ?.filter((item: any) =>
            item.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 5) // Limit to 5 suggestions
      );
    }
  }, [searchQuery, data]);

  // const handleSuggestionClick = (suggestion: string) => {
  //     setSearchQuery(suggestion);
  //     setSuggestions([]);

  // }

  const fetchBasicInfo = async () => {
    const endpoint = parsedUser.is_mentor
      ? `${baseURL}/api/mentor/details?user_id=${parsedUser.user_id}`
      : `${baseURL}/api/basic-info`;

    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("basicInformation---", response.data);
      if (parsedUser.is_mentor) {
        setMentorBasicInfo([response.data]);
        setmentorFormData(response.data);
      } else {
        setBasicInfo([response.data]);
      }
      // setBasicInfo([response.data]);
      console.log("response.data---setdegreee---", response.data);
      // setDegree(response.data.interested_stream);
      setDegree(response.data.role_based);
      setFormData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAssignedMentors = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/get_assigned_mentors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data?.mentors) {
        setAssignedMentors(response.data.mentors);
      }
    } catch (error) {
      console.error("Error fetching assigned mentors:", error);
    }
  };

  const handleUnassignMentor = async (mentorId: number) => {
    if (!window.confirm("Are you sure you want to unassign this expert?")) return;
    try {
      await axios.delete(`${baseURL}/unassign_mentor`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { mentor_id: mentorId }
      });
      fetchAssignedMentors();
    } catch (error) {
      console.error("Error unassigning mentor:", error);
    }
  };

  const updateBasicInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = parsedUser?.is_mentor ? mentorformData : formData;
      const url = parsedUser?.is_mentor ? `${baseURL}/update_mentor/${mentorformData.mentor_id}` : `${baseURL}/api/basic-info`;
      const response = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Update successful:", response.data);
      notifySuccess();
      setEditMode(false);

      fetchBasicInfo(); // refresh data

    } catch (error) {
      console.error("Error updating basic info:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMentorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setmentorFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (basicinfo.length === 0) {
      fetchBasicInfo();
    }
    if (!parsedUser.is_mentor) {
      fetchAssignedMentors();
    }
  }, []);

  //  const fetchMentorData = async () => {
  //   try {
  //     const response = await axios.get(`${baseURL}/api/mentor/details?user_id=${userData.user_id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.data) {
  //       console.log("response--data---fetchMentor-dattttaa---", response.data);
  //       // setAssignedMentorData(response.data.mentors);
  //     } else {
  //       console.log("No Mentors found.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching Assigned Mentors:", error);
  //   }
  // };

  //   useEffect(() => {
  //   fetchMentorData();
  // }, [userData.user_id]);

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-full md:w-1/2 relative">
      <div className="absolute top-4 right-2 flex gap-2">
        {editMode ? (
          <>
            <button
              className="!text-green-600 bg-green-100 px-3 py-1 text-sm rounded hover:bg-green-300"
              onClick={updateBasicInfo}
            >
              <Check />
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
              onClick={() => {
                setEditMode(false);
                setFormData(basicinfo[0]); // revert to original data
              }}
            >
              <X />
            </button>
          </>
        ) : (
          // <button
          //   className="text-blue-600 hover:text-blue-800"
          //   onClick={() => setEditMode(true)}
          // >
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => {
              setEditMode(true);
              setSearchQuery(formData.interested_stream || ""); // initialize from current data
            }}
          >
            <Pen />
          </button>
        )}
      </div>

      <h2 className="text-xl font-bold mb-4 text-blue-700 flex justify-center">
        Basic Information
      </h2>
      {/* <div className="flex justify-center">
        <img src={pic} alt="image" className="rounded-full" />
      </div> */}
      {basicinfo.length === 0
        ? mentorBasicInfo.map((item) => (
          <div
            key={item.user_id}
            className="space-y-4 text-gray-700 mt-5 px-5"
          >
            <div className="flex justify-center">
              <img
                src={item.profile_picture || pic}
                alt="image"
                className="rounded-full w-20 h-20"
              />
            </div>
            {editMode ? (
              <>
                <div>
                  <label className="font-semibold mr-2">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={mentorformData.name || ""}
                    onChange={handleMentorChange}
                    className="border p-1 rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold mr-2">Email:</label>
                  <input
                    type="text"
                    name="lastname"
                    value={mentorformData.email || ""}
                    onChange={handleMentorChange}
                    className="border p-1 rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold mr-2">Phone:</label>
                  <input
                    type="text"
                    name="high_education"
                    value={mentorformData.phone || ""}
                    onChange={handleMentorChange}
                    className="border p-1 rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold mr-2">Expertise:</label>
                  <input
                    type="text"
                    name="expertise"
                    value={mentorformData.expertise || ""}
                    onChange={(e) => {
                      handleMentorChange(e);
                      // setDegree(e.target.value);
                    }}
                    className="border p-1 rounded"
                  />
                </div>

                <div>
                  <label className="font-semibold mr-2">Background:</label>
                  <input
                    type="text"
                    name="background"
                    value={mentorformData.background || ""}
                    onChange={handleMentorChange}
                    className="border p-1 rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold mr-2">Current Role:</label>
                  <input
                    type="text"
                    name="current_role"
                    value={mentorformData.current_role || ""}
                    onChange={handleMentorChange}
                    className="border p-1 rounded"
                  />
                </div>
                {/* <div>
                    <label className="font-semibold mr-2">Area Of Expertise:</label>
                    <input
                      type="text"
                      name="current_role"
                      value={mentorformData.current_role|| ""}
                      onChange={handleMentorChange}
                      className="border p-1 rounded"
                    />
                  </div> */}
                <div>
                  <label className="font-semibold mr-2">fee:</label>
                  <input
                    type="text"
                    name="fee"
                    value={mentorformData.fee || ""}
                    onChange={handleMentorChange}
                    className="border p-1 rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold mr-2">linkedin:</label>
                  <input
                    type="text"
                    name="linkedin"
                    value={mentorformData.linkedin || ""}
                    onChange={handleMentorChange}
                    className="border p-1 rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold mr-2">milestones:</label>
                  <input
                    type="text"
                    name="milestones"
                    value={mentorformData.milestones || ""}
                    onChange={handleMentorChange}
                    className="border p-1 rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold mr-2">Resume:</label>
                  <input
                    type="text"
                    name="resume"
                    value={mentorformData.resume || ""}
                    onChange={handleMentorChange}
                    className="border p-1 rounded"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="flex flex-col items-center h-[300px] ">
                    <div className="flex gap-2 pt-4">
                      <label className="font-bold text-lg text-center ">
                        Name:
                      </label>
                      <h1 className=" text-lg text-center ">{item.name}</h1>
                    </div>
                    <div className="">
                      <div className="flex gap-2 pt-2">
                        <label className="font-bold text-md "><Phone /></label>
                        <h2 className="text-md text-center ">
                          :{item.phone}
                        </h2>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <label className="font-bold text-md "><Mail /></label>
                        <h2 className="text-md text-center ">
                          : {item.email}
                        </h2>
                      </div>
                    </div>


                    <div className="flex items-center mt-2 pb-2">
                      {/* <div className="inline-flex items-center px-3 py-0 bg-white text-gray-800 text-sm font-medium rounded-full border-2 border-slate-300">
                                 &#9733; 4/5
                               </div> */}

                      <div className="inline-flex items-center py-0 bg-white  text-sm font-medium ">
                        <label className="text-lg pr-1 ">
                          Degree:
                        </label>
                        <h2 className="text-lg">{item.degree}</h2>
                      </div>
                      {/* <div className="inline-flex items-center px-3 py-0 bg-white text-gray-800 text-sm font-medium rounded-full border-2 border-slate-300">
                               <Banknote/>{item.fee}
                               </div> */}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <label className="font-bold text-md">Expertise:</label>
                      <h2 className="text-md text-center ">
                        {item.expertise}
                      </h2>
                    </div>


                    <div className="px-5 mt-3 text-center line-clamp-3">
                      <label className="font-bold text-lg pr-1">
                        Background:
                      </label>
                      {item.background}
                    </div>

                    <div className="inline-flex items-center bg-white  text-sm font-medium">
                      <label className="font-bold text-lg pr-1">Fees:</label>
                      <h2 className="text-lg">{item.fee}</h2>
                    </div>
                    {/* <div className="mt-2 text-sm text-gray-600 text-center">
                               {item.availability.map((slot, index) => (
                                 <div key={index}>
                                   {slot.day}: {slot.startTime} - {slot.endTime}
                                 </div>
                               ))}
                             </div> */}
                    <div className="flex justify-between mt-1 ">
                      {/* <a
                                 href={item.linkedin}
                                 target="_blank"
                                 rel="noopener noreferrer"
                               >
                                 <Linkedin className="!text-blue-400 cursor-pointer" />
                               </a> */}

                      <div className="px-5 mt-3 text-center text-slate-400 text-sm line-clamp-3">
                        <a
                          href={item.resume}
                          className="underline text-blue-400"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Resume Link
                        </a>
                      </div>

                      <div className="flex items-end">
                        <a
                          // href={item.linkedin}
                          href={`https://www.linkedin.com/${item.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="!text-blue-400 cursor-pointer" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))
        : basicinfo.map((item) => (
          <div key={item.id} className="space-y-4 text-gray-700 mt-5 px-5">
            {editMode ? (
              <>
                <div>
                  <label className="font-semibold mr-2">First Name:</label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname || ""}
                    onChange={handleChange}
                    className="border p-1 rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold mr-2">Last Name:</label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname || ""}
                    onChange={handleChange}
                    className="border p-1 rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold mr-2">
                    Highest Education:
                  </label>
                  <input
                    type="text"
                    name="high_education"
                    value={formData.high_education || ""}
                    onChange={handleChange}
                    className="border p-1 rounded"
                  />
                </div>
                {/* <div>
                <label className="font-semibold mr-2">Field Interested:</label>
                <input
                  type="text"
                  name="interested_stream"
                  value={formData.interested_stream || ''}
                  onChange={(e) => {
                    handleChange(e);
                    setDegree(e.target.value);
                  }}
                  className="border p-1 rounded"
                />
              </div> */}
                {/* <div>
                 <label className="font-semibold mr-2">Field Interested:</label>
                <input
                        type="text"
                        placeholder="Search"
                        className="block mt-2 w-[25rem] placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                  
                    {suggestions.length > 0 && (
                        <ul className="absolute bottom-25 bg-white border border-gray-300 w-[25rem] rounded-lg shadow-lg z-10">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                    </div> */}
                <div className="relative">
                  <label className="font-semibold mr-2">
                    Field Interested:
                  </label>
                  <input
                    type="text"
                    placeholder="Search"
                    className="block mt-2 w-[25rem] placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />

                  {suggestions.length > 0 && (
                    <ul className="absolute top-[5.5rem] bg-white border border-gray-300 w-[25rem] rounded-lg shadow-lg z-10">
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <label className="font-semibold mr-2">Email:</label>
                  <input
                    type="email"
                    name="emailid"
                    value={formData.emailid || ""}
                    onChange={handleChange}
                    className="border p-1 rounded"
                  />
                </div>
                {formData.work_experience ?
                  <p>
                    <label className="font-semibold mr-2">
                      Work Experience:
                    </label>
                    <input
                      type="text"
                      name="work_experience"
                      value={formData.work_experience || ""}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />

                  </p> : ""
                }

                <p>
                  <label className="font-semibold mr-2">Dream Role:</label>
                  <input
                    type="text"
                    name="role_based"
                    value={formData.role_based || ""}
                    onChange={handleChange}
                    className="border p-1 rounded"
                  />
                </p>

                {/* <div className="flex gap-4 mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  onClick={updateBasicInfo}
                >
                  Save
                </button>
                <button
                  className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
                  onClick={() => {
                    setEditMode(false);
                    setFormData(item); // reset to original
                  }}
                >
                  Cancel
                </button>
              </div> */}
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <img
                    src={pic}
                    alt="image"
                    className="rounded-full w-30 h-30"
                  />
                </div>
                <p>
                  <span className="font-semibold mr-2">Name:</span>
                  {item.firstname} {item.lastname}
                </p>
                <p>
                  <span className="font-semibold mr-2">Email:</span>
                  {item.useruniqid}
                </p>
                <p>
                  <span className="font-semibold mr-2">
                    Highest Education:
                  </span>
                  {item.high_education}
                </p>
                {item.industry ?
                  <p>
                    <span className="font-semibold mr-2">Industry:</span>
                    {item.industry}
                  </p> : ''
                }
                {item.role ?
                  <p>
                    <span className="font-semibold mr-2">Job Role:</span>
                    {item.role}
                  </p> : ''
                }

                {item.work_experience ?
                  <p>
                    <span className="font-semibold mr-2">Work Experience:</span>
                    {item.work_experience}<span className="ml-1">years</span>
                  </p> : ''
                }
                <p>
                  <span className="font-semibold mr-2">Dream Role:</span>
                  {item.role_based}
                </p>

                <p>
                  <span className="font-semibold mr-2">Intent:</span>
                  {/* {item.intent.length > 1 ? (
    item.intent.map((i, idx) => (
      <span key={idx} className="block">{i}</span>
    ))
  ) : (
    <span>{item.intent}</span>
  )} */}
                  {item.intent}
                </p>

                {/* <p>
                    <span className="font-semibold mr-2">
                      Field Interested:
                    </span>
                    {item.interested_stream}
                  </p> */}
                {/* <p>
                    <span className="font-semibold mr-2">Email:</span>
                    {item.useruniqid}
                  </p> */}
              </>
            )}
          </div>
        ))}

      {!parsedUser.is_mentor && assignedMentors.length > 0 && (
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-bold mb-4 text-blue-700 flex justify-center">
            Your Assigned Experts
          </h2>
          <div className="grid gap-4">
            {assignedMentors.map((mentor) => (
              <div key={mentor.mentor_id} className="border p-4 rounded-xl flex items-center justify-between hover:shadow-md transition bg-gray-50">
                <div className="flex items-center gap-3">
                  <img
                    src={mentor.profile_picture || pic}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{mentor.name}</p>
                    <p className="text-xs text-gray-500">{mentor.expertise}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleUnassignMentor(mentor.mentor_id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium border border-red-100 px-3 py-1 rounded-lg hover:bg-red-100/50 transition-colors"
                >
                  Unassign
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const DreamProfileCard = ({ degree }: { degree: string }) => {
  const [dreamProfile, setDreamProfile] = useState<DreamProfileInfo[]>([]);

  const fetchDreamProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseURL}/search-degree`, {
        params: { degree },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("dreamProfile---", response.data);
      setDreamProfile([response.data]);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    console.log("degree---", degree);
    if (degree && degree.trim() !== "") {
      fetchDreamProfile();
    }
  }, [degree]);

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-full md:w-1/2 relative">
      {/* <button className="absolute top-4 right-4 text-green-600 hover:text-green-800">
        <Pen />
      </button> */}

      <h2 className="text-xl font-bold mb-4 text-blue-700 flex justify-center">
        🌟 Dream Profile
      </h2>
      <div className="flex justify-center">
        <img src={dream} alt="image" className="rounded-full w-[200px]" />
      </div>

      {dreamProfile.map((item, index) => (
        <div key={index} className="space-y-4 text-gray-700 mt-5 px-5">
          <p>
            <span className="font-semibold mr-2">Degree:</span>
            {item.degree}
          </p>
          <p>
            <span className="font-semibold mr-2">Matched Role:</span>
            {item.matched_role}
          </p>
          <p>
            <span className="font-semibold mr-2">Courses:</span>
            {Array.isArray(item.courses)
              ? item.courses.join(", ")
              : item.courses}
          </p>
          <p>
            <span className="font-semibold mr-2">Certifications:</span>
            {Array.isArray(item.certifications)
              ? item.certifications.join(", ")
              : item.certifications}
          </p>
          <p>
            <span className="font-semibold mr-2">Competitions:</span>
            {Array.isArray(item.competitions)
              ? item.competitions.join(", ")
              : item.competitions}
          </p>
        </div>
      ))}
    </div>
  );
};

const Profile = () => {
  const [degree, setDegree] = useState("");
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  // const { userData } = useUserContext();

  return (
    <div>
      <div
        className={`${parsedUser.is_mentor
          ? "flex justify-center"
          : "flex flex-col md:flex-row gap-6 p-6"
          } bg-gray-50 max-h-screen`}
      >
        <InfoCard setDegree={setDegree} />
        {parsedUser.is_mentor ? "" : <DreamProfileCard degree={degree} />}
      </div>
      {/* {userData.is_mentor ? <ExpertiseInfoRow /> : ""} */}
    </div>
  );
};

export default Profile;
