import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pic from "../../assets/pic.jpg";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("userlocaldata");
  const parsedUser = user ? JSON.parse(user) : null;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDashboard = () => {
    if (!token) {
      navigate("");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button onClick={toggleDropdown} className="focus:outline-none">
        <img
          src={pic}
          alt="profile"
          className="w-10 h-10 rounded-full border-2 border-yellow-500"
        />
      </button>

      {isOpen && user && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-xl shadow-xl z-50">
          <div className="flex items-center p-4 border-b">
            <img
              src={pic}
              alt="profile"
              className="w-12 h-12 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold text-sm">{parsedUser?.username}</p>
            </div>
          </div>

          <div className="p-3">
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 hover:text-white text-sm font-bold py-2 rounded"
              onClick={handleDashboard}
            >
              My Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileDropdown;
