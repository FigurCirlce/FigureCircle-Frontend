import { useEffect, useState } from "react";
import { Pen } from 'lucide-react';
import pic from '../../assets/pic.jpg';
import dream from '../../assets/dream.jpg';
import baseURL from "@/config/config";
import axios from "axios";
import { toast } from "react-toastify";

interface BasicInfo {
  emailid: string;
  firstname: string;
  high_education: string;
  id: number;
  interested_stream: string;
  lastname: string;
  useruniqid: string;
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
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<BasicInfo>>({});

   const notifySuccess = () => toast.success("Basic info updated successfully!");

  const fetchBasicInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${baseURL}/api/basic-info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
console.log("basicInformation---",response.data);
      setBasicInfo([response.data]);
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
      <div className="flex justify-center">
        <img src={pic} alt="image" className="rounded-full" />
      </div>

      {basicinfo.map((item) => (
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
              <div>
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
              <p><span className="font-semibold mr-2">Name:</span>{item.firstname} {item.lastname}</p>
              <p><span className="font-semibold mr-2">Highest Education:</span>{item.high_education}</p>
              <p><span className="font-semibold mr-2">Field Interested:</span>{item.interested_stream}</p>
              <p><span className="font-semibold mr-2">Email:</span>{item.useruniqid}</p>
            </>
          )}
        </div>
      ))}
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

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 max-h-screen">
      <InfoCard setDegree={setDegree} />
      <DreamProfileCard degree={degree} />
    </div>
  );
};

export default Profile;

