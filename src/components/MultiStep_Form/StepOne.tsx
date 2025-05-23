import React from 'react';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import { useState } from 'react';

// interface FormData {
//   fullName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;

// }

// interface StepOneProps {
//   formData: FormData;
//   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
//   errors: {
//     [key: string]: string;
//   };
// }

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
