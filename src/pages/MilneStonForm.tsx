import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '@/config/config';
import useRedirectIfNotLoggedIn from '@/customHooks/useRedirectIfNotLoggedIn';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Milestone {
  milestone: string;
  description: string;
  expectedCompletionDate: string;
  mentorFees: string;
}

const MilestoneForm: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([
    { milestone: '', description: '', expectedCompletionDate: '', mentorFees: '' },
  ]);
  useRedirectIfNotLoggedIn()

  // const [userId, setuserId] = useState();
  // const [userIdsec, setuserIdsec] = useState();
  const { id } = useParams<{ id: string }>();

  //validate the user for milestoneform
  const [meetingData, setMeetingData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mentorId, setMentorId] = useState<number | null>(null);
  const [userIdLocal, setUserIdLocal] = useState<number | null>(null);

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedMilestones = [...milestones];
    updatedMilestones[index] = { ...updatedMilestones[index], [name]: value };
    setMilestones(updatedMilestones);
  };

  const addMilestoneRow = () => {
    setMilestones([...milestones, { milestone: '', description: '', expectedCompletionDate: '', mentorFees: '' }]);
  };

  const removeMilestoneRow = (index: number) => {
    const updatedMilestones = milestones.filter((_, i) => i !== index);
    setMilestones(updatedMilestones);
  };

  //gettting data from local storage
  useEffect(() => {
    // Retrieve mentorData and degree from localStorage
    const storedMentorData = localStorage.getItem('mentorData');
    const storedDegree = localStorage.getItem('degree');
    

    if (storedMentorData || storedDegree) {
      const mentorObj = storedMentorData ? JSON.parse(storedMentorData) : null;
      const degreeObj = storedDegree ? JSON.parse(storedDegree) : null;
    
      if (mentorObj) {
        setMentorId(mentorObj.mentor_id);
      }
    
      if (degreeObj) {
        setUserIdLocal(degreeObj.user_id);
      }
    }
  }, []);

  //fetching meeting details and validate the meeting url
  useEffect(() => {
    if (id) {
      const fetchMeetingDetails = async () => {
        try {
          const response = await axios.get(`${baseURL}/api/validMeeting/${id}`);
          setMeetingData(response.data);
        } catch (error: any) {
          if(error.response && error.response.status === 404) setErrorMessage(error.response.data.error);
          if (error.response && error.response.status === 403) {
            setErrorMessage(error.response.data.error);
          } else {
            console.error("Error fetching meeting details:", error);
          }
        }
      };

      fetchMeetingDetails();
    }
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Get token from localStorage
    const token = localStorage.getItem('token');

    // Make sure token exists before proceeding
    if (!token) {
      console.error('Token not found!');
      return;
    }

    if (!meetingData) {
      toast.error('Meeting data not found.');
      return;
    }

    console.log('Meeting Data:', meetingData,"checking twp==>",mentorId,"uselocal==>",userIdLocal)

    let formData: any = {};
    let checkId = null;


    if (mentorId === meetingData.mentor_id) {
      checkId = mentorId;
      formData = {
        mentor_id: mentorId,
        user_id: meetingData.user_id,
      };
    } else if (userIdLocal === meetingData.user_id) {
      checkId = userIdLocal;
      formData = {
        mentor_id: meetingData.mentor_id,
        user_id: userIdLocal,
      };
    } else {
      toast.error('User ID or Mentor ID does not match meeting details.');
      return;
    }

    const data = {
      ...formData,
      milestone: milestones,
      check_meeting_id: id,
      check_id: checkId,
    };



    try {
      // Make API request
      const response = await axios.post(`${baseURL}/milestone`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Milestones stored successfully!');
      console.log('Response:', response.data);
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.error('Milestone already submitted!');
      } else {
        toast.error('Failed to store milestones.');
      }
      console.error('Error storing milestones:', error);
    }
  }

  return (
    <div>
      {errorMessage ? (
        <p className='flex justify-center items-center text-red-600'>{errorMessage}</p>
      ) : (<form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Milestone Form</h1>

        {milestones.map((milestone, index) => (
          <div key={index} className="border border-gray-200 p-6 mb-6 rounded-lg bg-gray-50 shadow-sm">
            <h4 className="text-lg font-semibold mb-4">Milestone {index + 1}</h4>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Milestone Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Milestone</label>
                <input
                  type="text"
                  name="milestone"
                  value={milestone.milestone}
                  onChange={(e) => handleInputChange(index, e)}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  name="description"
                  value={milestone.description}
                  onChange={(e) => handleInputChange(index, e)}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Expected Completion Date Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Expected Completion Date</label>
                <input
                  type="date"
                  name="expectedCompletionDate"
                  value={milestone.expectedCompletionDate}
                  onChange={(e) => handleInputChange(index, e)}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Mentor Fees Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Mentor Fees</label>
                <input
                  type="number"
                  name="mentorFees"
                  value={milestone.mentorFees}
                  onChange={(e) => handleInputChange(index, e)}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Remove Milestone Button */}
            {milestones.length > 1 && (
              <button
                type="button"
                onClick={() => removeMilestoneRow(index)}
                className="mt-4 text-red-600 hover:text-red-800 text-sm font-semibold"
              >
                Remove Milestone
              </button>
            )}
          </div>
        ))}

        {/* Add Milestone Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={addMilestoneRow}
            className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 shadow-md"
          >
            Add Milestone
          </button>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="py-2 px-6 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 shadow-md"
          >
            Submit
          </button>
        </div>
      </form>
      )}
    </div>

  );
};

export default MilestoneForm;
