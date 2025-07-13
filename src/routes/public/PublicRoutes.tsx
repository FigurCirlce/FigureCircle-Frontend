import MeetingCalls from '@/pages/MeetingCalls';
import Login from 'pages/Login';
import Register from 'pages/Register';
import HomePage from 'pages/NewPages/HomePage';
import ContactForm from '../../pages/NewPages/ContactUs';
import FeedBackForm from '../../pages/NewPages/FeedbackForm';
import MilestoneTimelineForm from '@/pages/NewPages/MilestoneTimelineForm';

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
    {
        path:'/',
        component:<HomePage/>
    },
      {
        path:'/contact',
        component:<ContactForm/>
    },
     {
        path:'/new-milestone/:id',
        component:<MilestoneTimelineForm/>
    },
    //  {
    //          path: `/homepage/dashboard`,
    //         component: <Dashboard />,
    //     }
]

export default PublicRoutes;