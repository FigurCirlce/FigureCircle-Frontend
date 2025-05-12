import MeetingCalls from '@/pages/MeetingCalls';
import Login from 'pages/Login';
import Register from 'pages/Register';

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
]

export default PublicRoutes;