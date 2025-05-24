import MeetingCalls from '@/pages/MeetingCalls';
import Login from 'pages/Login';
import Register from 'pages/Register';
import HomePage from 'pages/NewPages/HomePage';
import ContactForm from '../../pages/NewPages/ContactUs';

const PublicRoutes = [
    {
        path: '/login',
        component: <Login/>,
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
        path:'/homepage',
        component:<HomePage/>
    },
      {
        path:'/contact',
        component:<ContactForm/>
    }
]

export default PublicRoutes;