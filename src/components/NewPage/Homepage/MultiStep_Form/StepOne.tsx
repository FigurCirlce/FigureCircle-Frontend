import Login from "../../../../pages/Login";
import Register from "../../../../pages/Register";
import { useState } from "react";

const StepOne = () => {
  const [view, setView] = useState("login");

  return (
    <>
      {view === "register" ? (
        <Register type="modal" setShowLogin={() => setView("login")} />
      ) : (
        <Login type="modal" setShowRegister={() => setView("register")} />
      )}
    </>
  );
};

export default StepOne;
