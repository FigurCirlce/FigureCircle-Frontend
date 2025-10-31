import React from 'react';
// import Sidebar from '../../components/NewPage/Sidebar.tsx';
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
import baseURL from '@/config/config.tsx';
import NotificationBell from '@/components/NewPage/NotificationBell.tsx';
import ChatWidget from '@/components/NewPage/ChatBox.tsx';
import MeetingSchedulerPreview from '@/pages/NewPages/NewMeetingScheduler.tsx';
import Navbar from '@/components/NewPage/Navbar.tsx';

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
    // @ts-ignore
    const[meetingData,setMeetingData]=useState([]);
    const token=localStorage.getItem('token');
    // @ts-ignore
    const[close,setClose]=useState(false);
    const navigate=useNavigate();

    const fetchRecommendedMentor = async () => {
        try {
          const response = await axios.get(`https://figurecircle.com/api/get_assigned_mentors`, {
           
             headers: {
                            'Authorization': `Bearer ${token}`,
                        }
          });
    
          if (response.status==200) {
    
            console.log("response--data",response.data?.recommended_mentors);
            getRecommendedMentors(response.data?.recommended_mentors);
          } else {
            console.log("No Mentors found.");
          }
        } catch (error) {
          console.error("Error fetching Assigned Mentors:", error);
        }
      };
 const fetchMeetingData = async () => {
    const user = localStorage.getItem("user");
    const parsedUserData = user ? JSON.parse(user) : null;

    console.log("user_id FetchMeetingData----", parsedUserData.user_id);
    try {
      const response = await axios.get(`${baseURL}/api/schedules`, {
        // params: { user_id: 3},
        params: parsedUserData.is_mentor
          ? { mentor_id: parsedUserData.user_id }
          : { user_id: parsedUserData.user_id },
      });

      if (response.data) {
        
        
        setMeetingData(response.data);
      } else {
        console.log("No meetings found.");
      }
    } catch (error) {
      console.error("Error fetching meeting data:", error);
    }
  };

    
      useEffect(() => {
        fetchRecommendedMentor();
        fetchMeetingData();
      }, []);

      //  useEffect(() => {
        
      //   fetchMeetingData();
      // }, [meetingData || close]);

    const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return <div><LandingDashboard/></div>;

        
      case "Schedule Meeting":
        //@ts-ignore
         return <div><MeetingSchedulerPreview/> </div>;
    // if(meetingData.length !== 0){
    //   setClose(true);
    //      return <div><ScheduleMeeting/> </div>;
    // }
    // else{
    //   return [];
    // }
      //   if (meetingData.length === 0) {
      //   return <div>No mentors available to schedule a meeting.</div>;
      // }
      
     
    
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
      {/* <Sidebar setActivePage={setActivePage} close={close}/> */}
<Navbar setActivePage={setActivePage} close={false} />
      
      <div className="flex flex-col w-full h-screen overflow-hidden">
        
    
        <header className="flex-shrink-0 flex justify-end items-center px-4 md:px-[5%] py-3 bg-white shadow-md z-10">
        
          <button className='mr-5 text-blue-600 font-semibold text-lg' onClick={handleHome}>
            Home
          </button>
               <div className="mr-3">
          <NotificationBell/>
          </div>
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
<ChatWidget/>

    </>
  );
};

export default Dashboard;
