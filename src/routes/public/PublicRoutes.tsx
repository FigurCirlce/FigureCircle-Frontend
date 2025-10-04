import MeetingCalls from '@/pages/MeetingCalls';
import Login from 'pages/Login';
import Register from 'pages/Register';
// import HomePage from 'pages/NewPages/HomePage';
import ContactForm from '../../pages/NewPages/ContactUs';
import FeedBackForm from '../../pages/NewPages/FeedbackForm';
import MilestoneTimelineForm from '@/pages/NewPages/MilestoneTimelineForm';
import NewHomepage from '@/pages/NewPages/NewHomepage';
import NewDesignHomepage from '../../pages/NewPages/NewDesignHomepage';
import RegistrationFlow from '@/components/NewPage/Homepage/NewUserLogin';
import MilestoneFlowTimeline from '@/components/NewPage/Homepage/NewMilestoneUser';
import MilestoneFlowExpertTimeline from '@/pages/NewPages/NewMilestoneExpert';
// import RecommendationsPanel from '@/pages/NewPages/CoursesRecommendation';
// import NotificationBell from '@/components/NewPage/NotificationBell';
import ChatWidget from '@/components/NewPage/ChatBox';

// import Dashboard from '../../pages/NewPages/Dashboard'

const PublicRoutes = [
    {
        path: '/login',
        component: <Login/>,
    },
       {
        path: '/feedback_form',
        component: <FeedBackForm />,
    },
    
    {
        path: '/register',
        component: <Register />,
    },
    {
        path: '/v2/meetingcall/:id',
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
        path:'/new-milestone/:id',
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

        {
            path:`/new_milestone_user`,
            component:<MilestoneFlowTimeline/>
        },
        {
            path:`/new_milestone_expert`,
            component:<MilestoneFlowExpertTimeline/>
        },
        {
            path:`/bell`,
            component:<ChatWidget/>
        }
]

export default PublicRoutes;