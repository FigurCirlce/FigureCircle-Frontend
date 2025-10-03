import React, { useState } from "react";
import { Bell, X } from "lucide-react";

interface NotificationItem {
  id: number;
  message: string;
  time: string;
}

const notificationsData: NotificationItem[] = [
  { id: 1, message: "Meeting scheduled with Mentor", time: "Just now" },
  { id: 2, message: "New message from Mentor", time: "10 mins ago" },
];

const NotificationBell: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationsData);

  const toggleDropdown = () => setOpen(!open);

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button 
        className="relative p-2 rounded-full hover:bg-gray-200" 
        onClick={toggleDropdown}
      >
        <Bell className="w-6 h-6" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="flex justify-between items-center p-2 border-b border-gray-100">
            <span className="font-semibold text-gray-700">Notifications</span>
            <button onClick={() => setNotifications([])}>
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <ul className="max-h-60 overflow-y-auto">
            {notifications.length === 0 ? (
              <li className="p-4 text-center text-gray-500">No notifications</li>
            ) : (
              notifications.map((n) => (
                <li key={n.id} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                  <p className="text-gray-700">{n.message}</p>
                  <span className="text-xs text-gray-400">{n.time}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
