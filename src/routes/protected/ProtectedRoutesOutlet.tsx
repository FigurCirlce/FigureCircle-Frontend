import { Navigate, Outlet } from "react-router-dom";

interface Auth {
  token?: string | null | undefined;
}

const ProtectedRoutesOutlet = () => {
  const auth: Auth = { token: localStorage.getItem("token") };
  return auth.token ? (
    <>
      {/* Header | Footer | Drawer for Protected Routes add here */}
      {/* <Nav/> */}
      <Outlet />
    </>
  ) : (
    // <Navigate to="/login" />
     <Navigate to="/login" />
  );
};

export default ProtectedRoutesOutlet;
