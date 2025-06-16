import React from 'react';
import Sidebar from '../../components/NewPage/Sidebar.tsx';
import { useState } from 'react';
import ScheduleMeeting from '../../components/NewPage/ScheduleMeeting/scheduleMeeting.tsx';
import Profile from './Profile.tsx';
import LandingDashboard from './landingDashboard.tsx';
import TrialMeeting from './TrialMeeting.tsx';
import pic from '../../assets/pic.jpg';
import axios from 'axios';
import baseURL from '@/config/config.tsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface Mentor {
  name: string;
  expertise: string;
  background: string;
  profile_picture: string;
  resume:string;
  linkedin:string;
}

// export const mockMentors: Mentor[] = [
//   {
//     name: "Smriti Mentor",
//     expertise: "AI/ML, Deep Learning",
//     background: "AI enthusiast, Published paper in AI and BlockChain",
//     profile_picture: pic,
//   },
//   {
//     name: "Swapnil Mentor",
//     expertise: "Software Development",
//     background: "SDE at Meta, helping build user-centric products.",
//     profile_picture: pic,
//   },
//   {
//     name: "Harsh Mentor",
//     expertise: "Finance  ",
//     background: "Helped companies build strategy and finance advisor",
//     profile_picture: pic,
//   },

// ];





const Dashboard: React.FC = () => {
    const [activePage, setActivePage] = useState("Dashboard");
    const[recommendedMentors,getRecommendedMentors]=useState<Mentor[]>([]);
    const token=localStorage.getItem('token');
    const navigate=useNavigate();

    const fetchRecommendedMentor = async () => {
        try {
          const response = await axios.get(`${baseURL}/get_assigned_mentors`, {
           
             headers: {
                            'Authorization': `Bearer ${token}`,
                        }
          });
    
          if (response.data) {
    
            console.log("response--data",response.data);
            getRecommendedMentors(response.data.mentors);
          } else {
            console.log("No Mentors found.");
          }
        } catch (error) {
          console.error("Error fetching Assigned Mentors:", error);
        }
      };
    
      useEffect(() => {
        fetchRecommendedMentor();
      }, []);

    const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return <div><LandingDashboard/></div>;
      case "Schedule Meeting":
        return <div><ScheduleMeeting/> </div>;
      case "My Profile":
        return <div><Profile/></div>;
      // case "My Experts":
      //   return <div>My Experts Content</div>;
      case "Trial Meetings":
        return <div> <TrialMeeting allMentorData={recommendedMentors}/></div>;
      default:
        return <div>Welcome to the Dashboard!</div>;
    }
  };

   const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  
  return (
    <>
   
    <div className="flex h-screen w-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar setActivePage={setActivePage} />

      {/* Main Content Area */}
      <div className="flex flex-col w-full h-screen overflow-hidden">
        
        {/* Header (not fixed anymore) */}
        <header className="flex-shrink-0 flex justify-end items-center px-4 md:px-[5%] py-3 bg-white shadow-md z-10">
          {/* <img alt="image" width={50} className="object-contain" /> */}
           <button
            className="bg-blue-600 text-white px-3 md:px-4 py-1 md:py-2 rounded-2xl text-xs md:text-sm hover:bg-blue-700" onClick={handleLogout}>
              Log Out
            </button>
        </header>

        {/* Main Scrollable Content */}
        <main className="flex-grow overflow-y-auto px-[3%] py-[3%]">
          {renderContent()}
        </main>
      </div>
    </div>


    </>
  );
};

export default Dashboard;
