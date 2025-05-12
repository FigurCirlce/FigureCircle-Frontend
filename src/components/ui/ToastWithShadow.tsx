import React from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./ToastWithShadow.css"; // You can define your shadow styles in this CSS file

const ToastWithShadow: React.FC = () => {
  const notify = () => toast("Hello, Toast!");

  return (
    <div className="toast-container">
      <button onClick={notify}>Show Toast</button>
      <ToastContainer
        transition={Slide}
        position="top-right"
        autoClose={3000}
        hideProgressBar
      />
    </div>
  );
};

export default ToastWithShadow;
