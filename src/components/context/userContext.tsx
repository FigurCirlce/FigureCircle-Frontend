// userContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  access_token: string;
  is_mentor: boolean;
  user_id: string | null;
  data_fill:boolean;
}

interface ScheduleData {
  created_at: string;
  duration: string;
  email: string;
  end_datetime: string;
  id: number;
  link: string;
  mentor_email: string;
  mentor_id: number;
  mentor_name: string;
  name: string;
  start_datetime: string;
  timezone: string;
  user_id: number;
}

interface UserContextType {
  userData: UserData;
  updateUser: (user: UserData) => void;
  
   scheduleData: ScheduleData | null;
  setSchedule: (data: ScheduleData) => void;
 
}

const defaultUser: UserData = {
  access_token: '',
  is_mentor: false,
  user_id: null,
  data_fill:false
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    const saved = localStorage.getItem("userData") ?? localStorage.getItem("user");
    return saved ? JSON.parse(saved) : defaultUser;
  });

  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(() => {
    const saved = localStorage.getItem("scheduleData");
    return saved ? JSON.parse(saved) : null;
  });

  const updateUser = (user: UserData) => {
    localStorage.setItem("userData", JSON.stringify(user));
    setUserData(user);
  };
const setSchedule = (data: ScheduleData) => {
    localStorage.setItem("scheduleData", JSON.stringify(data));
    setScheduleData(data);
  };
 
  console.log("CTX", {
    userData,
    scheduleData,
    typeofUserId: typeof userData.user_id,
    isMentor: userData.is_mentor,
  });

  return (
    <UserContext.Provider value={{ userData, updateUser, scheduleData,
        setSchedule, }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUserContext = () => {
  const ctx = useContext(UserContext);
  
  if (!ctx) throw new Error("useUserContext must be used inside <UserProvider>");
  return ctx;
};
