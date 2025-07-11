import { useEffect, useState } from "react";
import { Pen } from 'lucide-react';
import pic from '../../assets/pic.jpg';
import dream from '../../assets/dream.jpg';
import baseURL from "@/config/config";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserContext } from "../../components/context/userContext"


interface BasicInfo {
  emailid: string;
  firstname: string;
  high_education: string;
  id: number;
  interested_stream: string;
  lastname: string;
  useruniqid: string;
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
  const [mentorBasicInfo,setMentorBasicInfo]=useState<MentorDetails[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<BasicInfo>>({});
  const [mentorformData, setmentorFormData] = useState<Partial<MentorDetails>>({});
   const [searchQuery, setSearchQuery] = useState<string>('');
    const [data, setData] = useState<any>();
   const [suggestions, setSuggestions] = useState<any[]>([]);

   const token=localStorage.getItem("token");
   const notifySuccess = () => toast.success("Basic info updated successfully!");
   const { userData} = useUserContext();

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    // const filteredData = data?.filter((item: any) => {
    //     return item.toLowerCase().includes(searchQuery.toLowerCase());
    // });


   const fetchSuggestions=async()=>{
    
      try {
          const response = await axios.post(`${baseURL}/get_information`, {
  "highest_degree_achieved": true
},{
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
}
);
          if (response.status === 200){
           console.log("suggestion fetched------");
           console.log(response);

           setData(response.data.highest_degree_achieved);
          }
        } catch (error) {
          // setStatus("error");
          console.log(error);
        }
        
   }
   useEffect(()=>{
fetchSuggestions();
   },[editMode]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSuggestions([]);
        } else {
            setSuggestions(
                data?.filter((item: any) =>
                    item.toLowerCase().includes(searchQuery.toLowerCase())
                ).slice(0, 5) // Limit to 5 suggestions
            );
        }
    }, [searchQuery, data]);

    const handleSuggestionClick = (suggestion: string) => {
        setSearchQuery(suggestion); 
        setSuggestions([]); 

    }

  const fetchBasicInfo = async () => {
  const endpoint = userData.is_mentor
  ? `${baseURL}/api/mentor/details?user_id=${userData.user_id}`
  : `${baseURL}/api/basic-info`;


    try {

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
console.log("basicInformation---",response.data);
if(userData.is_mentor){
setMentorBasicInfo([response.data]);
setmentorFormData(response.data);
}
else{
 setBasicInfo([response.data]);
}
      // setBasicInfo([response.data]);
      setDegree(response.data.interested_stream);
      setFormData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBasicInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${baseURL}/api/basic-info`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Update successful:', response.data);
      notifySuccess();
      setEditMode(false);
      fetchBasicInfo(); // refresh data
    } catch (error) {
      console.error('Error updating basic info:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (basicinfo.length === 0) {
      fetchBasicInfo();
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
      <div className="absolute top-4 right-4 flex gap-2">
  {editMode ? (
    <>
      <button
        className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600"
        onClick={updateBasicInfo}
      >
        Save
      </button>
      <button
        className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
        onClick={() => {
          setEditMode(false);
          setFormData(basicinfo[0]); // revert to original data
        }}
      >
        Cancel
      </button>
    </>
  ) : (
    <button
      className="text-blue-600 hover:text-blue-800"
      onClick={() => setEditMode(true)}
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
{basicinfo.length===0?mentorBasicInfo.map((item)=>(
  
     <div key={item.user_id} className="space-y-4 text-gray-700 mt-5 px-5">
       <div className="flex justify-center">
        <img src={item.profile_picture || pic} alt="image" className="rounded-full w-20 h-20" />
      </div>
          {editMode ? (
            <>
              <div>
                <label className="font-semibold mr-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={mentorformData.name || ''}
                  onChange={handleChange}
                  className="border p-1 rounded"
                />
              </div>
              <div>
                <label className="font-semibold mr-2">Email:</label>
                <input
                  type="text"
                  name="lastname"
                  value={mentorformData.email|| ''}
                  onChange={handleChange}
                  className="border p-1 rounded"
                />
              </div>
              <div>
                <label className="font-semibold mr-2">Phone:</label>
                <input
                  type="text"
                  name="high_education"
                  value={mentorformData.phone || ''}
                  onChange={handleChange}
                  className="border p-1 rounded"
                />
              </div>
              <div>
                <label className="font-semibold mr-2">Expertise:</label>
                <input
                  type="text"
                  name="expertise"
                  value={mentorformData.expertise|| ''}
                  onChange={(e) => {
                    handleChange(e);
                    // setDegree(e.target.value);
                  }}
                  className="border p-1 rounded"
                />
              </div>
              {/* <div>
                 <label className="font-semibold mr-2">Field Interested:</label>
                <input
                        type="text"
                        placeholder="Search"
                        className="block mt-2 w-[25rem] placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    {/* Auto-Suggestion Dropdown */}
                    {/* {suggestions.length > 0 && (
                        <ul className="absolute top-12 bg-white border border-gray-300 w-[25rem] rounded-lg shadow-lg z-10">
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
                    </div>  */}
              <div>
                <label className="font-semibold mr-2">Background:</label>
                <input
                  type="text"
                  name="background"
                  value={mentorformData.background|| ''}
                  onChange={handleChange}
                  className="border p-1 rounded"
                />
              </div>
              <div>
                <label className="font-semibold mr-2">fee:</label>
                <input
                  type="text"
                  name="fee"
                  value={mentorformData.fee|| ''}
                  onChange={handleChange}
                  className="border p-1 rounded"
                />
              </div>
              <div>
                <label className="font-semibold mr-2">linkedin:</label>
                <input
                  type="text"
                  name="linkedin"
                  value={mentorformData.linkedin|| ''}
                  onChange={handleChange}
                  className="border p-1 rounded"
                />
              </div>
              <div>
                <label className="font-semibold mr-2">milestones:</label>
                <input
                  type="text"
                  name="milestones"
                  value={mentorformData.milestones|| ''}
                  onChange={handleChange}
                  className="border p-1 rounded"
                />
              </div>
              <div>
                <label className="font-semibold mr-2">Resume:</label>
                <input
                  type="text"
                  name="resume"
                  value={mentorformData.resume|| ''}
                  onChange={handleChange}
                  className="border p-1 rounded"
                />
              </div>
             
             
            </>
          ) : (
            <>
              <p><span className="font-semibold mr-2">Name:</span>{item.name}</p>
               <p><span className="font-semibold mr-2">Email:</span>{item.email}</p>
                <p><span className="font-semibold mr-2">Phone:</span>{item.phone}</p>
                <p><span className="font-semibold mr-2">Degree:</span>{item.degree}</p>
                <p><span className="font-semibold mr-2">Background:</span>{item.background}</p>
              <p><span className="font-semibold mr-2">Expertise:</span>{item.expertise}</p>
              <p><span className="font-semibold mr-2">Fee:</span>{item.fee}</p>
              <p><span className="font-semibold mr-2">Resume:</span>{item.resume}</p>
             
            </>
          )}
        </div>
)):
     ( basicinfo.map((item) => (
        <div key={item.id} className="space-y-4 text-gray-700 mt-5 px-5">
          {editMode ? (
            <>
              <div>
                <label className="font-semibold mr-2">First Name:</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname || ''}
                  onChange={handleChange}
                  className="border p-1 rounded"
                />
              </div>
              <div>
                <label className="font-semibold mr-2">Last Name:</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname || ''}
                  onChange={handleChange}
                  className="border p-1 rounded"
                />
              </div>
              <div>
                <label className="font-semibold mr-2">Highest Education:</label>
                <input
                  type="text"
                  name="high_education"
                  value={formData.high_education || ''}
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
              <div>
                 <label className="font-semibold mr-2">Field Interested:</label>
                <input
                        type="text"
                        placeholder="Search"
                        className="block mt-2 w-[25rem] placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    {/* Auto-Suggestion Dropdown */}
                    {suggestions.length > 0 && (
                        <ul className="absolute top-12 bg-white border border-gray-300 w-[25rem] rounded-lg shadow-lg z-10">
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
                  value={formData.emailid || ''}
                  onChange={handleChange}
                  className="border p-1 rounded"
                />
              </div>
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
        <img src={pic} alt="image" className="rounded-full w-30 h-30" />
      </div>
              <p><span className="font-semibold mr-2">Name:</span>{item.firstname} {item.lastname}</p>
              <p><span className="font-semibold mr-2">Highest Education:</span>{item.high_education}</p>
              <p><span className="font-semibold mr-2">Field Interested:</span>{item.interested_stream}</p>
              <p><span className="font-semibold mr-2">Email:</span>{item.useruniqid}</p>
            </>
          )}
        </div>
      )))
    }
    </div>
  );
};



const DreamProfileCard = ({ degree }: { degree: string }) => {
  const [dreamProfile, setDreamProfile] = useState<DreamProfileInfo[]>([]);

  const fetchDreamProfile = async () => {
    try {
      const token = localStorage.getItem('token');
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
    if (degree && degree.trim() !== '') {
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
    <p><span className="font-semibold mr-2">Degree:</span>{item.degree}</p>
    <p><span className="font-semibold mr-2">Matched Role:</span>{item.matched_role}</p>
    <p><span className="font-semibold mr-2">Courses:</span>{Array.isArray(item.courses) ? item.courses.join(", ") : item.courses}</p>
    <p><span className="font-semibold mr-2">Certifications:</span>{Array.isArray(item.certifications) ? item.certifications.join(", ") : item.certifications}</p>
    <p><span className="font-semibold mr-2">Competitions:</span>{Array.isArray(item.competitions) ? item.competitions.join(", ") : item.competitions}</p>
  </div>
))}

    </div>
  );
};

const Profile = () => {
  const [degree, setDegree] = useState('');
  const { userData} = useUserContext();

  return (
    <div className={`${userData.is_mentor?'flex justify-center':'flex flex-col md:flex-row gap-6 p-6'} bg-gray-50 max-h-screen`}>
      <InfoCard setDegree={setDegree} />
      {userData.is_mentor?"":<DreamProfileCard degree={degree} />}
      
    </div>
  );
};

export default Profile;

