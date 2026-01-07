import MeetingCalls from '@/pages/MeetingCalls';
// import Login from 'pages/Login';
import Register from 'pages/Register';
// import HomePage from 'pages/NewPages/HomePage';
import ContactForm from '../../pages/NewPages/ContactUs';
import FeedBackForm from '../../pages/NewPages/FeedbackForm';
import MilestoneTimelineForm from '@/pages/NewPages/MilestoneTimelineForm';
import NewHomepage from '@/pages/NewPages/NewHomepage';
import NewDesignHomepage from '../../pages/NewPages/NewDesignHomepage';
import RegistrationFlow from '@/components/NewPage/Homepage/NewUserLogin';
// import MilestoneFlowTimeline from '@/components/NewPage/Homepage/NewMilestoneUser';
import MilestoneFlowExpertTimeline from '@/pages/NewPages/NewMilestoneExpert';
// import RecommendationsPanel from '@/pages/NewPages/CoursesRecommendation';
// import NotificationBell from '@/components/NewPage/NotificationBell';
// import ChatWidget from '@/components/NewPage/ChatBox';
// import ExpertOnboardingPreview from '@/components/NewPage/ExpertLogin';
//  import ExpertOnboardingCompact from '@/components/NewPage/ExpertUserFinalForm';
// import SocketTest from '@/components/NewPage/Notification';
// import MentorsWireframe from '@/pages/NewPages/MentorNewPages';
// import MentorsWireframe1 from '@/pages/NewPages/MentorPages';
// import NewRecommendMentor from '@/pages/NewPages/NewRecommendMentor';
import MilestoneRoadmapPreview from '@/pages/NewPages/TrialNewMilestone';


// import Dashboard from '../../pages/NewPages/Dashboard'

const PublicRoutes = [
    // {
    //     path: '/login',
    //     // component: <Login/>,
    //     component:<NewHomepage/>,
    // },
       {
        path: '/feedback_form',
        component: <FeedBackForm />,
    },
    
    {
        path: '/register',
        component: <Register />,
    },
    {
        path: '/v2/meetingcall/:id/:userId',
        component: <MeetingCalls/>,
    },
    // {
    //     path:'/',
    //     component:<HomePage/>
    // },
      {
        path:'/contact',
        component:<ContactForm/>
    },
     {
        path:'/new-milestone/:userId/:mentorId',
        component:<MilestoneTimelineForm/>
    },
     {
        path:'/',
        component:<NewHomepage/>
    },
    {
        path:'/new',
        component:<NewDesignHomepage/>
    },
    //  {
    //          path: `/homepage/dashboard`,
    //         component: <Dashboard />,
    //     }
      {
             path: `/register-new`,
            component: <RegistrationFlow />,
        },

        // {
        //     path:`/new_milestone_user`,
        //     component:<MilestoneFlowTimeline/>
        // },
        {
            path:`/new_milestone_expert`,
            component:<MilestoneFlowExpertTimeline/>
        },
        // {
        //     path:`/bell`,
        //     component:<ChatWidget/>
        // },
        {
            path:`/test`,
            // component:<MentorsWireframe/>
            // component:<NewRecommendMentor/>
            component:<MilestoneRoadmapPreview/>
        },
        //  {
        //     path:`/test`,
        //     component:<SocketTest/>
        // },
        //shared by harsh
        //  {
        //     path:`/test2`,
        //     component:<MentorsWireframe1/>
        // },
        // {
        //     path:`/test3`,
        //     component:<ExpertOnboardingCompact/>
        // }
     
]

export default PublicRoutes;