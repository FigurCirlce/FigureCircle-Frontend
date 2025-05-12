import { Outlet } from "react-router-dom";


const ProtectedRoutesOutlet = () => {
    return <>
        {/* Header | Footer | Drawer for Public Routes add here */}
        
        <Outlet />
    </>;
}

export default ProtectedRoutesOutlet;