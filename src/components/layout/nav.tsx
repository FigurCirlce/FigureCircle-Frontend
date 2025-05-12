import React, { useState, useEffect } from 'react';
import logo from '../../assets/image (1).png';
import socket from '../../config/socket'; // Import the socket instance

interface NavProps { }

const Nav: React.FC<NavProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  //@ts-ignore
  const [datafour, setDatafour] = useState<any>({});


  useEffect(() => {
    const degree = localStorage.getItem('degree') || "{}";
    const parsedData = JSON.parse(degree);
    setDatafour(parsedData);


    // Join the notification room and get notifications when user_id is available
    if (parsedData?.user_id) {
      socket.emit('join', { user_id: parsedData?.user_id });


      socket.emit('get_notifications', { user_id: parsedData?.user_id });


      socket.on('notifications', (notificationMessages) => {
        if (Array.isArray(notificationMessages) && notificationMessages.length > 0) {
          setNotifications(notificationMessages);
          setHasNewNotification(true); // Set new notification flag
        } else {
          setNotifications([]);
          setHasNewNotification(false);
        }
      });
    }

    return () => {
      socket.off('notifications');
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const toggleNotifications = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents the event from bubbling up
    setShowNotifications(!showNotifications);
    setHasNewNotification(false);
  };

  const handleNotificationClick = (notification: string) => {
    console.log('Notification clicked:', notification);
    // Add your logic here (e.g., navigate to a page, mark as read, etc.)
  };

  return (
    <nav className="relative bg-white shadow dark:bg-gray-800 mb-10">
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <a href="/">
              <img className="w-auto h-[3rem]" src={logo} alt="Logo" />
            </a>

            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {!isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 ${isOpen
              ? 'translate-x-0 opacity-100'
              : 'opacity-0 -translate-x-full'
              } lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
          >
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
              <a
                href="/"
                className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Home
              </a>
              <a
                href="/basic-info"
                className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Basic Information
              </a>
              <a
                href="/expert"
                className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Experts
              </a>
              <a
                href="/myexpert"
                className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                My Experts
              </a>
              <a
                href="/dashboard"
                className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Dashboard
              </a>
            </div>

            <div className="flex items-center mt-4 lg:mt-0">
              {/* Notification Icon */}
              <button
                type="button"
                onClick={toggleNotifications}
                className="relative focus:outline-none"
                aria-label="notifications"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-700 dark:text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-5-5.917V5a3 3 0 00-6 0v.083A6.002 6.002 0 002 11v3.159c0 .538-.214 1.055-.595 1.436L1 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"
                  />
                </svg>
                {hasNewNotification && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full"></span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className={`absolute right-0 mt-[10rem] w-72 bg-white rounded-md shadow-lg transition-opacity duration-300 ease-in-out ${showNotifications ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="px-4 py-2 text-sm font-semibold text-gray-700">Notifications</div>
                  <ul className="divide-y divide-gray-200">
                    {notifications.length > 0 ? (
                      notifications.map((notif, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleNotificationClick(notif)}
                        >
                          {notif?.message}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-sm text-gray-600">No notifications</li>
                    )}
                  </ul>
                </div>
              )}

              {/* Profile Icon */}
              <button
                type="button"
                className="flex items-center focus:outline-none"
                aria-label="toggle profile dropdown"
              >
                <div className="w-8 h-8 mx-4 overflow-hidden border-2 border-gray-400 rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=60"
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </div>
              </button>

              <h1>{datafour?.first_name} {datafour?.last_name}</h1>

              {/* Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-2 mx-3 text-gray-700 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
