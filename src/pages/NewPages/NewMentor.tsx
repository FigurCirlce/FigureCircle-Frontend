import React, { useState, useEffect, useMemo } from "react";
import { X, Search, Filter, Linkedin, ExternalLink, FileText, IndianRupee } from "lucide-react";

import baseURL from "@/config/config"; // Replace with actual API URL
import axios from "axios";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
// Simple encryption alternative (for demo - use actual crypto in production)

interface PillProps {
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

interface TimeSlot {
  start: string;
  end: string;
}


interface Slot extends TimeSlot {
  day: string;
}


  

interface IntentPrice {
  intent: string;
  price: number;
}

interface Availability {
  day: string;
  startTime: string;
  endTime: string;
}




interface Mentor {
  background: string;
  created_at: string;
  degree: string;
  email: string;
  expertise: string;
  fee: string; 
  intent_price: IntentPrice[];
  linkedin: string;
  mentor_id: number;
  milestones: number;
  name: string;
  phone: string;
  profile_picture: File | null;
  resume: File | null;
  availability?: Availability[]; 
}

interface Meeting {
  id: string;
  mentor: Mentor;
  dateISO: string;
  start_datetime: string;
  duration: string;
  link: string;
  milestonesUrl: string;
  feedbackUrl: string;
  mentor_name: string;
  user_id: number;
  mentorName: string;
  // milestoneLink: string;
  // feedbackLink: string;
  mentor_email: string;
  email: string;
  name: string;
  mentor_id: number;
  end_datetime: string;
  created_at: string;
}
interface Category {
  key: string;
  label: string;
}

interface Schedule {
  id: number;
  name: string;
  email: string;
  start_date: string;
  duration: string;
  mentor_id: number | null |string;
  user_id: string;
  mentor_email?: string;
  mentor_phone?: string;
  mentor_linkedin?: string;
  timezone?: string;
}

interface MentorCardProps {
  m: Mentor;
  isSelected: boolean;
  onSelect?:()=>void;
  // scheduled: boolean;
  // expanded: boolean;
  scheduled?: boolean;
  // onToggle: () => void;
  onSchedule?: () => void;
}

// const simpleEncrypt = (text: any, key: any) => {
//   return btoa(text + key);
// };

function classNames(...arr: string[]) {
  return arr.filter(Boolean).join(" ");
}

function Pill({ active, children, onClick }:PillProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "px-3 py-1 rounded-full text-sm border transition",
        active
          ? "bg-black text-white border-black"
          : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
      )}
    >
      {children}
    </button>
  );
}

function MentorCard({ m, isSelected, onSelect, scheduled, onSchedule }:MentorCardProps) {
  return (
    <div
      className={classNames(
        "relative rounded-xl border p-3 shadow-sm bg-white transition hover:shadow-md cursor-pointer h-[155px] flex flex-col justify-between",
        isSelected ? "ring-2 ring-black" : "border-gray-200"
      )}
      onClick={onSelect}
    >
      <div>
        <h3 className="text-base font-semibold truncate">{m.name}</h3>
        <p className="text-sm text-gray-600 truncate">{m.expertise}</p>
        <p className="text-xs text-gray-500 truncate">{m.degree}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {m.intent_price?.slice(0, 2).map((t, idx) => (
            <span key={idx} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 truncate">
              {t.intent}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        {!scheduled ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSchedule?.();
            }}
            className="px-3 py-1 text-xs rounded-lg bg-black text-white hover:opacity-90"
          >
            Schedule
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert(`Payment for ${m.name} - ₹${m.fee || m.intent_price?.[0]?.price}`);
            }}
            className="px-3 py-1 text-xs rounded-lg border border-gray-300 hover:border-gray-500"
          >
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
}

function MentorInspector({ m, scheduled, onSchedule, onClose }:any) {
    //  const [meetings, setMeetings] = useState<Meeting[]>([]);
  if (!m) return null;
  
  // const profilePicUrl = m.profile_picture || "/default-profile.png";
  const resumeUrl = m.resume || "#";

  

  return (
    <aside className="sticky top-20 self-start w-full md:w-[360px] lg:w-[400px] xl:w-[440px]">
      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="flex items-start justify-between p-4 border-b">
          <div className="flex gap-3">
            <img src={m.profile_picture} alt={m.name} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <h3 className="text-lg font-semibold">{m.name}</h3>
              <p className="text-sm text-gray-600">{m.expertise}</p>
              <p className="text-sm text-gray-500">{m.degree}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4 space-y-4 text-sm">
          <p className="text-gray-700">{m.background}</p>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">Email:</span>
              <a href={`mailto:${m.email}`} className="underline break-all text-xs">{m.email}</a>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4 flex-shrink-0" />
              <a href={`https://${m.linkedin}`} target="_blank" rel="noreferrer" className="underline inline-flex items-center gap-1">
                LinkedIn <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 flex-shrink-0" />
              <a href={resumeUrl} target="_blank" rel="noreferrer" className="underline inline-flex items-center gap-1">
                View Resume <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="pt-2 border-t">
            <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Fees</div>
            <div className="grid grid-cols-1 gap-2">
              {m.intent_price?.map((item:any, idx:any) => (
                <div key={idx} className="flex items-center justify-between rounded-xl border p-2">
                  <div className="text-sm">
                    <div className="font-medium">{item.intent}</div>
                    <div className="text-gray-500">1st session</div>
                  </div>
                  <div className="flex items-center gap-1 font-semibold">
                    <IndianRupee className="h-4 w-4" />₹{item.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t">
          {!scheduled ? (
            <button
              onClick={onSchedule}
              className="w-full px-4 py-2 rounded-xl bg-black text-white hover:opacity-90"
            >
              Schedule Call
            </button>
          ) : (
            <button
              onClick={() => alert(`Payment for ${m.name}`)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 hover:border-gray-500"
            >
              Pay Now
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

function IntentDialog({ open, onClose, onSubmit }:any) {
  const [support, setSupport] = useState("");
  const [goalChallenge, setGoalChallenge] = useState("");

  const intents = [
    { id: 1, title: "Skill Roadmapping", desc: "Skills needed for target role and how to build them." },
    { id: 2, title: "Career Clarity, Insights & Connections", desc: "Expert advice, profile feedback, and networking." },
  ];

  const handleSubmit = () => {
    if (!support || !goalChallenge) {
      alert("Please select an intent and describe your challenges");
      return;
    }
    onSubmit(support, goalChallenge);
    setSupport("");
    setGoalChallenge("");
  };

  if (!open) return null;

  


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold">What do you want to focus on?</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {intents.map((intent) => (
            <div
              key={intent.id}
              onClick={() => setSupport(intent.title)}
              className={`cursor-pointer border-2 rounded-xl p-4 transition ${
                support === intent.title ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <h3 className="font-semibold text-lg mb-2">{intent.title}</h3>
              <p className="text-sm text-gray-600">{intent.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">What challenges are you facing?</label>
          <textarea
            placeholder="e.g., I'm confused between data science and product management"
            value={goalChallenge}
            onChange={(e) => setGoalChallenge(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!support || !goalChallenge}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function TimeSlotDialog({ open, onClose, availability, onSubmit}:any) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<Slot|null>(null);

  useEffect(() => {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    setSelectedDate(dateStr);
  }, [open]);

  
  if (!open) return null;

  const generateTimeSlots = (start: string, end: string) :TimeSlot[]=> {
     const slots: TimeSlot[] = [];
    let current = parseInt(start.split(':')[0]);
    const endHour = parseInt(end.split(':')[0]);
    
    while (current < endHour) {
      slots.push({
        start: `${current.toString().padStart(2, '0')}:00`,
        end: `${(current + 1).toString().padStart(2, '0')}:00`
      });
      current++;
    }
    return slots;
  };

  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date(selectedDate).getDay()];
  };

  const todayAvailability = availability?.filter((slot: Slot) => slot.day === getCurrentDay()) || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold">Select a Time Slot</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSelectedSlot(null);
            }}
            min={new Date().toISOString().split('T')[0]}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4 mb-6">
          {todayAvailability.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No availability for {getCurrentDay()}</p>
          ) : (
            todayAvailability.map((slot:Slot | any, index:any) => {
              const timeSlots = generateTimeSlots(slot.startTime, slot.endTime);
              return (
                <div key={index}>
                  <p className="font-semibold mb-2">{slot.day}</p>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((t, idx) => (
                      <button
                        key={idx}
                        className={`px-4 py-2 rounded-lg border transition ${
                          selectedSlot?.start === t.start && selectedSlot?.end === t.end
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-gray-100 hover:bg-blue-50 border-gray-200"
                        }`}
                        //  onClick={() => setSelectedSlot({ date: selectedDate, ...t })}
                        onClick={() => setSelectedSlot({ day: selectedDate, ...t })}
                      >
                        {t.start} - {t.end}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <button
          onClick={() => onSubmit(selectedSlot)}
          disabled={!selectedSlot}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}


const MentorsWireframe2 = () => {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("recommended");
  const [selectedId, setSelectedId] = useState<any>(null);
  // const [scheduledMap, setScheduledMap] = useState({});
  //@ts-ignore
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    //@ts-ignore
  const [scheduledMap, setScheduledMap] = useState<Record<number, boolean>>({});
const[dialogMentorId,setDialogMentorId]=useState<any>(null);
  const [visible, setVisible] = useState(9);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [allMentors, setAllMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(false);
  const [intentDialogOpen, setIntentDialogOpen] = useState(false);
  const [timeDialogOpen, setTimeDialogOpen] = useState(false);
  //@ts-ignore
   const [assignedMentorData, setAssignedMentorData] = useState<Mentor[]>([]);
    const [allMentorsData, setAllMentorsData] = useState<Mentor[]>([]);
    //@ts-ignore
    const [selectedExpertKey, setSelectedExpertKey] = useState<number | null>(null);
    const [selectedExpertData, setSelectedExpertData] = useState<Mentor | null>(null);
    // const [hasMeetingScheduled, setHasMeetingScheduled] = useState(false);
    //@ts-ignore
     const[openTime,setOpenTime]=useState(false);
      //@ts-ignore
      const [schedules, setSchedules] = useState<Schedule[]>([]);
       const [formData, setFormData] = useState<Schedule>({
          id: 0,
          name: "",
          email: "",
          start_date: "",
          duration: "30",
          mentor_id: "",
          user_id: "",
          mentor_email: "",
          mentor_phone: "",
          mentor_linkedin: "",
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        });
   
      
    const user=localStorage.getItem("user");
    const userData=user?JSON.parse(user):null;

  // Mock user data (replace with actual localStorage in production)
  // const [userData] = useState({
  //   user_id: 1,
  //   firstname: "John",
  //   emailid: "john@example.com",
  //   is_mentor: false
  // });

  // Mock data for demo
  const token=localStorage.getItem("token");

//    useEffect(()=>{
//       const selectedMentor = allMentorsData.find(
//   (m) => m.mentor_id === selectedId
// ) ||null;
// setSelectedExpertData(selectedMentor);
//     },[selectedId]);
useEffect(() => {
  if (!selectedId || !allMentorsData.length) return;

  const selectedMentor = allMentorsData.find(
    (m) => m.mentor_id === selectedId
  );

  setSelectedExpertData(selectedMentor || null);
}, [selectedId, allMentorsData]);



 useEffect(() => {
    const fetchMentors = async () => {
      try {
        //Fetch recommended mentors
        const recommendedRes = await axios.get(`${baseURL}/api/recommend-mentors?allmentor=false`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("recommendedRes--recommendedRes",recommendedRes.data);
        if (recommendedRes.data?.recommended_mentors?.length) {
          setAssignedMentorData(recommendedRes.data.recommended_mentors);
          setSelectedExpertKey(recommendedRes.data.recommended_mentors[0].mentor_id);
        }

        // Fetch all mentors
        const allRes = await axios.get(`${baseURL}/api/recommend-mentors?allmentor=true`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("allRes--allRes",allRes.data);
        if (allRes.data?.recommended_mentors?.length) {
          setAllMentorsData(allRes.data.recommended_mentors);
          if (!recommendedRes.data?.recommended_mentors?.length) {
            setSelectedExpertKey(allRes.data.mentors[0].mentor_id);
          }
        }
      } catch (error) {
        console.error("Error fetching mentors", error);
      }
    };

    fetchMentors();
    // fetchMeetingData();
    
  }, [token]);

  // const fetchMeetingData = async () => {
  //     const user=localStorage.getItem("user");
  //     const parsedUser=user?JSON.parse(user):null;
  
  //     console.log("user_id FetchMeetingData----", parsedUser.user_id);
  //     try {
  //       const response = await axios.get(`${baseURL}/api/schedules`, {
  //         // params: { user_id: 3},
  //         params: parsedUser.is_mentor
  //           ? { mentor_id: m.mentor_id}
  //           : { user_id: parsedUser.user_id },
  //       });
  
  //       if (response.data) {
  //         const sortedData = [...response.data].sort(
  //           (a, b) =>
  //             new Date(b.start_datetime).getTime() -
  //             new Date(a.start_datetime).getTime()
  //         );
  //         console.log("sortedData-----", sortedData);
  //         setMeetings(sortedData);
  //       } else {
  //         console.log("No meetings found.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching meeting data:", error);
  //     }
  //   };

  //   useEffect(()=>{
  //     fetchMeetingData();
  //   },[]);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setMentors(allMentorsData);
      setAllMentors(allMentorsData);
      if (allMentorsData.length > 0) {
        setSelectedId(allMentorsData[0].mentor_id);
      }
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setMentors(allMentorsData);
      setAllMentors(allMentorsData);
      if (allMentorsData.length > 0) {
        setSelectedId(allMentorsData[0].mentor_id);
      }
      setLoading(false);
    }, 500);
  }, [allMentorsData]);

  const handleSchedule = (mentorId:Number | null|undefined) => {
    setSelectedId(mentorId);
    setDialogMentorId(mentorId); 
    setIntentDialogOpen(true);
  };

  // const handleIntentSubmit = async (support: any, goalChallenge: any) => {
  //   // Simulate API call
  //   console.log("Intent submitted:", { support, goalChallenge, mentorId: selectedId, userId: userData.user_id });
    
  //   setIntentDialogOpen(false);
  //   setTimeDialogOpen(true);
    
  //   // Show success message
  //   alert("Intent submitted successfully!");
  // };
 const handleSubmitIntent = async (
        mentor_id: number | undefined,
        user_id: number | string,
         support: string,
  goalChallenge: string
      ) => {
        const token = localStorage.getItem("token");
    console.log("mentor_id",mentor_id);
    console.log("user_id",user_id);
        const dataToSubmit = {
          goal_challenge:goalChallenge,
          support_types:support,
          user_id: user_id,
          mentor_id: mentor_id,
        };
        try {
          const response = await axios.post(`${baseURL}/api/intent`, dataToSubmit, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          if (response.status === 201) {
          //   notifySuccess();
          // setSupport("");
          // setGoalChallenge("");
            //   setTimeDialogOpen(true);

            //  handleSubmit();
            setIntentDialogOpen(false);
   setTimeDialogOpen(true);
            // setOpenTime(true);
             fetchMeetingData();
          }
        } catch (error) {
          console.log("error");
        }
      };


  // const handleTimeSlotSubmit = async (slot: { date: any; start: any; end: any; }) => {
  //   if (!slot) return;

  //   const selected = currentMentors.find(m => m.mentor_id === selectedId);
    
  //   // Simulate API call
  //   console.log("Meeting scheduled:", {
  //     mentor: selected?.name,
  //     date: slot.date,
  //     time: `${slot.start} - ${slot.end}`,
  //     userId: userData.user_id
  //   });

  //   setScheduledMap(prev => ({ ...prev, [selectedId]: true }));
  //   setTimeDialogOpen(false);
  //   alert(`Meeting scheduled with ${selected?.name} on ${slot.date} at ${slot.start}`);
  // };

  const currentMentors = activeCat === "recommended" ? mentors : 
                        activeCat === "all" ? allMentors : mentors;

  // const categories = useMemo(() => {
  //   const tagSet = new Set();
  //   currentMentors.forEach((m) => m.intent_price?.forEach((t) => tagSet.add(t.intent)));
  //   return [
  //     { key: "recommended", label: "Recommended" },
  //     { key: "all", label: "All" },
  //     ...Array.from(tagSet).sort().map((t) => ({ key: t, label: t })),
  //   ];
  // }, [currentMentors]);

const categories = useMemo<Category[]>(() => {
  const tagSet = new Set<string>();

  currentMentors.forEach((m) => {
    m.intent_price?.forEach((t) => tagSet.add(t.intent));
  });

  return [
    { key: "recommended", label: "Recommended" },
    { key: "all", label: "All" },
    ...Array.from(tagSet)
      .sort()
      .map((t) => ({
        key: t,       // <- now t is string, not unknown
        label: t
      }))
  ];
}, [currentMentors]);


  const filtered = useMemo(() => {
    let list = [...currentMentors];
    if (activeCat !== "recommended" && activeCat !== "all") {
      list = list.filter((m) => m.intent_price?.some(ip => ip.intent === activeCat));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.expertise.toLowerCase().includes(q) ||
          m.degree.toLowerCase().includes(q) ||
          m.background?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [query, activeCat, currentMentors]);

  const display = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;
  const selected = display.find((m) => m.mentor_id === selectedId) || null;

  useEffect(() => {
    setVisible(9);
  }, [activeCat, query]);

  // useEffect(() => {
  //   if (!selectedId && display.length > 0) setSelectedId(display[0].mentor_id);
  //   if (selectedId && !filtered.some((m) => m.mentor_id === selectedId)) {
  //     if (display.length > 0) setSelectedId(display[0].mentor_id);
  //     else setSelectedId(null);
  //   }
  // }, [display, filtered, selectedId]);
  useEffect(() => {
  if (display.length === 0) {
    if (selectedId !== null) setSelectedId(null);
    return;
  }

  const isValid = filtered.some(m => m.mentor_id === selectedId);

  if (!isValid) {
    const newId = display[0].mentor_id;
    if (selectedId !== newId) setSelectedId(newId);
  }
}, [display, filtered]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading mentors...</div>
      </div>
    );
  }

   const fetchMeetingData = async () => {
      const user=localStorage.getItem("user");
      const parsedUser=user?JSON.parse(user):null;
  
      console.log("user_id FetchMeetingData----", parsedUser.user_id);
      try {
        const response = await axios.get(`${baseURL}/api/schedules`, {
          // params: { user_id: 3},
          params: parsedUser.is_mentor
            ? { mentor_id: parsedUser.mentor_id}
            : { user_id: parsedUser.user_id },
        });
  
        if (response.data) {
          const sortedData = [...response.data].sort(
            (a, b) =>
              new Date(b.start_datetime).getTime() -
              new Date(a.start_datetime).getTime()
          );
          console.log("sortedData-----", sortedData);
          setMeetings(sortedData);
        } else {
          console.log("No meetings found.");
        }
      } catch (error) {
        console.error("Error fetching meeting data:", error);
      }
    };

 const convertDateAndTimeToISO = (dateStr: string, timeStr: string): string => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute] = timeStr.split(":").map(Number);

  const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute));

  return utcDate.toISOString();
};

 const notifyMeetingScheduledSuccess = (
    msg = "Meeting Scheduled Successfully!"
  ) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };


      const handleSubmit = async (selectedSlot: any) => {
      // console.log("formdata----", formData);
  setTimeDialogOpen(true);
  // console.log("SelectedTiemSlot",selectedSlot);
    const userData2 = localStorage.getItem("degree");
  
  const parsedUserData2 = userData2 ? JSON.parse(userData2) : null;
  
      try {
        
        const updatedFormData = {
          ...formData,
          // start_date: startDateISO,
          start_date: convertDateAndTimeToISO(selectedSlot.date, selectedSlot.start),
        };
  
        // console.log("userData---", userData);
        console.log("userData2", userData2);
  
        if (user && userData2) {
          // const parsedUserData = JSON.parse(userData);
          // const parsedUserData2 = JSON.parse(userData2);
          const parsedUser = JSON.parse(user);
          // console.log("parsedUserData---", parsedUserData);
          console.log("parsedUserData2----", parsedUserData2);
  
          const randomId = Math.floor(Math.random() * 1000);
          const roomid = Math.floor(Math.random() * 1000);
          const password = Math.random().toString(36).substring(2, 8);
          // console.log("randomId---", randomId);
          // console.log("roomid----", roomid);
          // console.log("password----", password);
  
          const secretKey = "meetingkeys";
          // console.log("secretKey----", secretKey);
  
          const startDate = updatedFormData.start_date;
          // console.log("startDate----", startDate);
  
  
          const endDate = convertDateAndTimeToISO(selectedSlot.date, selectedSlot.end);
          console.log("endDate----", endDate);
  
          // Encrypt values
          const encryptedStartDate = CryptoJS.AES.encrypt(
            startDate,
            secretKey
          ).toString();
          console.log("encryptedStartDate----", encryptedStartDate);
  
          const encryptedEndDate = CryptoJS.AES.encrypt(
            endDate,
            secretKey
          ).toString();
          console.log("encryptedEndDate----", encryptedEndDate);
  
          const encryptedRoomId = CryptoJS.AES.encrypt(
            roomid.toString(),
            secretKey
          ).toString();
          console.log("encryptedRoomId----", encryptedRoomId);
  
          const encryptedPassword = CryptoJS.AES.encrypt(
            password,
            secretKey
          ).toString();
          console.log("encryptedPassword----", encryptedPassword);
  
          const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          console.log("timeZone----", timeZone);
  
          const meetingLink = `/v2/meetingcall/${randomId}?start=${encodeURIComponent(
            encryptedStartDate
          )}&end=${encodeURIComponent(
            encryptedEndDate
          )}&roomid=${encodeURIComponent(
            encryptedRoomId
          )}&password=${encodeURIComponent(
            encryptedPassword
          )}&timezone=${encodeURIComponent(timeZone)}`;
  
          console.log("meetingLink----", meetingLink);
  
          // Prepare schedule data
          const scheduleData = {
            name: parsedUser.firstname || "",
            email: parsedUser.emailid || "",
            start_datetime: startDate,
            end_datetime: endDate,
            duration: 60, // always 60
            link: meetingLink,
            user_id: parsedUser.user_id,
            mentor_id: selectedExpertData?.mentor_id, //Take from handleClick
            mentor_name: selectedExpertData?.name,
  
            mentor_email: selectedExpertData?.email,
            roomid: roomid,
            password: password,
            timezone: timeZone,
          };
  
          console.log("scheduleData-----", scheduleData);
  
          const response = await axios.post<{ message: string; id: number }>(
            `${baseURL}/api/trial_ schedule`,
            scheduleData
          );
  
          notifyMeetingScheduledSuccess();
          // setDurationOpen(false);
          // setSelectedMentorId(null);
  
          // setRefreshKey(Date.now());
          setSchedules((prev) => [
            ...prev,
            {
              ...formData,
              id: response.data.id,
              user_id: parsedUser.user_id,
            },
          ]);
  
          setFormData({
            id: 0,
            name: "",
            email: "",
            start_date: "",
            duration: "60", 
            mentor_id: 0,
            user_id: "",
            mentor_email: "",
            mentor_phone: "",
            mentor_linkedin: "",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          });
          setOpenTime(false);
        } else {
          //@ts-ignore
          // setError("User data not found in localStorage.");
          console.log("User data not found in localStorage.");
        }
      } catch (err: any) {
        //@ts-ignore
        // setError(err.response?.data?.error || "An error occurred");
        console.log(err|| "An error occurred");
        alert("An error occurred");
      }
    };

      // Update mentor list whenever API data arrives

     

  return (
    <div className="min-h-screen w-full ">
    

      <main className="">
        <h1 className="text-3xl font-bold ">Mentors For You</h1>

        <div className="mt-4 flex flex-col md:flex-row gap-3 md:items-center">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, expertise, or background…"
                className="w-[280px] md:w-[420px] rounded-xl border border-gray-300 pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 hover:bg-gray-50">
              <Filter className="h-4 w-4" /> Filters
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <Pill key={c.key} active={activeCat === c.key} onClick={() => setActiveCat(c.key)}>
                {c.label}
              </Pill>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-6">
          <div className="grid gap-3 sm:gap-4 [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]">
            {filtered.map((m) => (
              <MentorCard
                key={m.mentor_id}
                m={m}
                isSelected={selectedId === m.mentor_id}
                scheduled={!!scheduledMap[m.mentor_id]}
                onSchedule={() => handleSchedule(m.mentor_id)}
                onSelect={() => setSelectedId(m.mentor_id)}
              />
            ))}
          </div>

          <div className="hidden lg:block">
            <MentorInspector
              m={selected}
              scheduled={!!(selected && scheduledMap[selected.mentor_id])}
              onSchedule={() => handleSchedule(selected?.mentor_id)}
              onClose={() => setSelectedId(null)}
            />
          </div>
        </div>

        {selected && (
          <div className="lg:hidden fixed inset-x-0 bottom-0 z-40">
            <div className="mx-auto max-w-2xl rounded-t-2xl border-t border-x bg-white shadow-2xl">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-base font-semibold truncate">{selected.name}</h3>
                <button onClick={() => setSelectedId(null)} className="p-1 rounded-md hover:bg-gray-100">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                <MentorInspector
                  m={selected}
                  scheduled={!!scheduledMap[selected.mentor_id]}
                  onSchedule={() => handleSchedule(selected?.mentor_id)}
                  onClose={() => setSelectedId(null)}
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          {filtered.length === 0 ? (
            <div className="text-gray-600">No mentors match your search.</div>
          ) : canLoadMore ? (
            <button
              onClick={() => setVisible((v) => v + 9)}
              className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50 transition"
            >
              View more mentors
            </button>
          ) : (
            <div className="text-gray-500 text-sm">You're all caught up.</div>
          )}
        </div>
      </main>

      <IntentDialog
        open={intentDialogOpen}
        onClose={() => setIntentDialogOpen(false)}
        // onSubmit={()=>handleSubmitIntent(selectedExpertData?.mentor_id,userData?.user_id)}
        onSubmit={(support: string, goalChallenge: string) =>
    // handleSubmitIntent(selectedExpertData?.mentor_id, userData?.user_id, support, goalChallenge)
     handleSubmitIntent(dialogMentorId, userData?.user_id, support, goalChallenge)
  }
      />

      <TimeSlotDialog
        open={timeDialogOpen}
        onClose={() => setTimeDialogOpen(false)}
        availability={selectedExpertData?.availability}
        onSubmit={handleSubmit}
        // selected={selectedExpertData}
      />
    </div>
  );
};

export default MentorsWireframe2;


