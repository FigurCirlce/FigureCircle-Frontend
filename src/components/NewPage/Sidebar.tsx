
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Menu, Calendar, User, GraduationCap, CalendarX2 } from 'lucide-react';
import logo from "../../assets/image (1).png";
import pic from '../../assets/pic.jpg';
import { LayoutDashboard } from 'lucide-react';

interface MenuItem {
  title: string;
  icon: React.ReactElement;
}

interface SidebarProps {
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActivePage }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(true);
  const [activeItem, setActiveItem] = useState<string>('Dashboard'); // 💡 Track active item

  const toggleSidebar = () => setIsOpen(!isOpen);
  const HomeMenu: MenuItem[] = [
    { title: 'Dashboard', icon: <LayoutDashboard /> },
    { title: 'Schedule Meeting', icon: <Calendar /> },
    { title: 'My Profile', icon: <User /> },
    // { title: 'My Experts', icon: <GraduationCap /> },
    { title: 'Trial Meetings', icon: <CalendarX2 /> },
  ];

  const handleItemClick = (title: string) => {
    setActiveItem(title);           // ✅ Set active item
    setActivePage(title);           // 🔄 Also notify parent
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden" onClick={toggleSidebar} />
      )}
      <div className={`fixed top-0 left-0 h-full w-[20.5rem] bg-white z-40 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}>
        <div className="px-4 py-3 flex items-center justify-between">
          <img src={logo} alt="Logo" width={50} className="hidden md:block" />
          <IconButton onClick={toggleSidebar} className="text-black">
            <Menu />
          </IconButton>
        </div>

        <div className="flex items-center gap-3 p-3 border-2 border-slate-300 shadow-lg rounded-md w-[90%] mx-3 my-3">
          <img src={pic} alt="profile" className="rounded-full w-10" />
          <div>
            <h1 className="font-semibold">Hi, Harsh</h1>
            <h2 className="text-sm text-slate-500">Free Plan</h2>
          </div>
        </div>

        <div className="flex-grow px-4 overflow-hidden">
          <div className="mt-6">
            {isMainMenuOpen && (
              <div className="mt-2 space-y-3">
                {HomeMenu.map((item, index) => {
                  const isActive = activeItem === item.title;
                  return (
                    <div
                      key={index}
                      onClick={() => handleItemClick(item.title)}
                      className={`flex items-center gap-3 p-2 rounded cursor-pointer transition 
                        ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-100 text-gray-700'}`}
                    >
                      <div className={`${isActive ? 'text-blue-700' : ''}`}>{item.icon}</div>
                      <span>{item.title}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
