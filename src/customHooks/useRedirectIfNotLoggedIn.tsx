import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRedirectIfNotLoggedIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the 'degree' object from localStorage
    const storedDegreeString = localStorage.getItem("degree");
    let degree = null;

    try {
      degree = storedDegreeString ? JSON.parse(storedDegreeString) : null;
    } catch (error) {
      console.error("Failed to parse 'degree' from localStorage:", error);
    }

    console.log("Parsed degree object from localStorage:", degree);

    // Redirect if data_filled is false
    if (degree?.data_filled === false) {
      console.log("Redirecting to /basic-info...");
      navigate("/basic-info", { replace: true });
    }
  }, [navigate]);
};

export default useRedirectIfNotLoggedIn;
