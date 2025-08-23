import React from 'react';
import Sidebar from '../../components/NewPage/Sidebar.tsx';
import { useState } from 'react';
//@ts-ignore
import ScheduleMeeting from '../../components/NewPage/ScheduleMeeting/scheduleMeeting.tsx';
import Profile from './Profile.tsx';
//@ts-ignore
import LandingDashboard from './landingDashboard.tsx';
// import TrialMeeting from './TrialMeeting.tsx';
//@ts-ignore
// import pic from '../../assets/pic.jpg';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewRecommendMentor from './NewRecommendMentor.tsx';

export interface Mentor {
  name: string;
  expertise: string;
  background: string;
  profile_picture: string;
  resume:string;
  linkedin:string;
}


const Dashboard: React.FC = () => {
    const [activePage, setActivePage] = useState("Dashboard");
     {/*@ts-ignore*/}
    const[recommendedMentors,getRecommendedMentors]=useState<Mentor[]>([]);
    const token=localStorage.getItem('token');
    const navigate=useNavigate();

    const fetchRecommendedMentor = async () => {
        try {
          const response = await axios.get(`https://figurecircle.com/api/get_assigned_mentors`, {
           
             headers: {
                            'Authorization': `Bearer ${token}`,
                        }
          });
    
          if (response.status==200) {
    
            console.log("response--data",response.data.recommended_mentors);
            // getRecommendedMentors(response.data.recommended_mentors);
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
        //@ts-ignore
        return <div><ScheduleMeeting/> </div>;
      case "My Profile":
        return <div><Profile/></div>;
      // case "My Experts":
      //   return <div>My Experts Content</div>;
      // case "Trial Meetings":
      //   //@ts-ignore
      //   return <div> <TrialMeeting allMentorData={recommendedMentors}/></div>;
         case "Mentors":
        //@ts-ignore
        return <div> <NewRecommendMentor/></div>;
      default:
        return <div>Welcome to the Dashboard!</div>;
    }
  };

   const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleHome=()=>{
    navigate('/');
  }
  
  return (
    <>
   
    <div className="flex h-screen w-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar setActivePage={setActivePage} />

      
      <div className="flex flex-col w-full h-screen overflow-hidden">
        
    
        <header className="flex-shrink-0 flex justify-end items-center px-4 md:px-[5%] py-3 bg-white shadow-md z-10">
          {/* <img alt="image" width={50} className="object-contain" /> */}
          <button className='mr-5 text-blue-600 font-semibold text-lg' onClick={handleHome}>
            Home
          </button>
           <button
            className="bg-blue-600 text-white px-3 md:px-4 py-1 md:py-2 rounded-2xl text-xs md:text-sm hover:bg-blue-700" onClick={handleLogout}>
              Log Out
            </button>
        </header>

        
        <main className="flex-grow overflow-y-auto px-[3%] py-[3%]">
          {renderContent()}
        </main>
      </div>
    </div>


    </>
  );
};

export default Dashboard;
