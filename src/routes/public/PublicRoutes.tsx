import MeetingCalls from '@/pages/MeetingCalls';
import Login from 'pages/Login';
import Register from 'pages/Register';
import HomePage from '@/pages/NewPages/Homepage';

const PublicRoutes = [
    {
        path: '/login',
        component: <Login />,
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
    }
]

export default PublicRoutes;