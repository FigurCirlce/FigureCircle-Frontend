import { useState, useEffect } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Search, Bell, MessageCircle } from "lucide-react";
import baseURL from "@/config/config";
import {
  Save,
  X,
  Users,
  Sparkles,
  BookOpen,
  Award,
  Trophy,
  Wrench,
  MessageSquare,
} from "lucide-react";


interface EducationItem {
  id: number;
  description: string;
  name: string;
  created_at: string;
  updated_at: string;
}

const ROLE_OPTIONS = [
  "Software Engineer",
  "Data Analyst",
  "Data Scientist",
  "Product Manager",
  "Cloud / DevOps Engineer",
  "Cybersecurity Analyst",
]

// const EDUCATION_OPTIONS = [
//   "High School Diploma",
//   "Bachelor's in Computer Science",
//   "Bachelor's in Business Administration",
//   "Master of Business Administration",
//   "Master's in Data Science",
//   "PhD in Computer Science",
// ]

const EXPERIENCE_OPTIONS = [
  "0–1 years",
  "1–3 years",
  "3–5 years",
  "5–7 years",
  "7–10 years",
  "10+ years",
]

// const RECO_LIB = {
//   "Software Engineer": {
//     courses: [
//       { title: "Full-Stack with React & Node", provider: "Meta" },
//       { title: "System Design Fundamentals", provider: "Educative" },
//       { title: "API Design & REST", provider: "Udemy" },
//       { title: "Clean Code", provider: "Robert C. Martin" },
//       { title: "Data Structures & Algorithms", provider: "Coursera" },
//     ],
//     certs: [
//       { title: "AWS Developer Associate", by: "Amazon" },
//       { title: "Azure Fundamentals (AZ-900)", by: "Microsoft" },
//       { title: "Google Associate Cloud Engineer", by: "Google" },
//       { title: "Oracle Java SE", by: "Oracle" },
//     ],
//     comps: [
//       { title: "LeetCode Weekly", host: "LeetCode" },
//       { title: "Facebook Hacker Cup", host: "Meta" },
//       { title: "Codeforces Rounds", host: "Codeforces" },
//       { title: "Google Code Jam (archived)", host: "Google" },
//     ],
//   },
//   "Data Analyst": {
//     courses: [
//       { title: "Google Data Analytics", provider: "Google" },
//       { title: "SQL for Analytics", provider: "Mode" },
//       { title: "Excel to MySQL", provider: "Duke" },
//       { title: "Data Visualization", provider: "Tableau" },
//     ],
//     certs: [
//       { title: "Tableau Desktop Specialist", by: "Tableau" },
//       { title: "Power BI Data Analyst", by: "Microsoft" },
//       { title: "Google Data Analytics Certificate", by: "Google" },
//       { title: "Looker Business Analyst", by: "Google" },
//     ],
//     comps: [
//       { title: "Kaggle Competitions", host: "Kaggle" },
//       { title: "TDI Milestone Challenges", host: "The Data Incubator" },
//       { title: "Makeover Monday", host: "Community" },
//       { title: "Analytics Vidhya Hackathons", host: "AV" },
//     ],
//   },
// }

// const START = {
//   name: "harsh bansal",
//   email: "harsh6@gmail.com",
//   education: "Master of Business Administration",
//   industry: "Medical and healthcare services",
//   experience: "3–5 years",
//   dreamRole: "Software Engineer",
//   intent: { clarity: true, roadmap: true },
// }

function IntentCard({ active, title, subtitle, icon: Icon, onClick }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      type="button"
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-2xl border bg-gradient-to-r from-white to-muted/30 p-4 shadow-sm transition ${
        active ? "border-primary bg-primary/5" : "hover:bg-muted/50"
      }`}
    >
      <div
        className={`rounded-lg p-2 ${active ? "bg-primary/10 text-primary" : "bg-muted text-foreground"}`}
      >
        <Icon className="size-5" />
      </div>
      <div>
        <div className="font-medium leading-tight">{title}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>
    </motion.button>
  )
}


const ProfileRecWidget = () => {
  // profile shape is flexible; we will map backend fields defensively
  const [profile, setProfile] = useState<any>([]);
  //@ts-ignore
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [reco, setReco] = useState<any | null>(null);
  //@ts-ignore
  const [ExperienceArray, setExperienceArray] = useState<EducationItem[]>([]);
     const [IndustryArray, setIndustryArray] = useState<EducationItem[]>([]);
     const [educationArray, setEducationArray] = useState<EducationItem[]>([]);
    // const [experience, setExperience] = useState("");
//   const rec = useMemo(() => reco ?? RECO_LIB[profile.dreamRole] ?? RECO_LIB["Software Engineer"], [profile.dreamRole, reco])

  const token = localStorage.getItem("token");
  const userRaw = typeof window !== "undefined" ? localStorage.getItem("user") : null
  const parsedUser = userRaw ? JSON.parse(userRaw) : null

  // helper to map backend basic-info response to local profile shape
  const mapResponseToProfile = (resp: any) => {
    // resp might be either the whole object or nested
    const d = resp?.data ?? resp

    let parsedIntent = d.intent;
  if (typeof parsedIntent === "string") {
    // normalize any string into an object
    parsedIntent = { roadmap: parsedIntent.includes("Roadmap"), clarity: parsedIntent.includes("Clarity") };
  } else if (typeof parsedIntent !== "object" || parsedIntent === null) {
    // default fallback
    parsedIntent = { roadmap: false, clarity: false };
  }
    return {
      name: d.firstname ? `${d.firstname}${d.lastname ? " " + d.lastname : ""}` : d.name ?? profile.name,
      email: d.emailid ?? d.email ?? profile.email,
      education: d.high_education ?? d.education ?? profile.education,
      industry: d.industry ?? profile.industry,
      experience: d.experience ?? d.work_experience ?? profile.experience,
      dreamRole: d.role_based ?? d.dreamRole ?? profile.dreamRole,
      intent: parsedIntent,
      // keep raw backend piece for saving if needed
      __raw: d,
    }
  }

  // fetch basic info (same as InfoCard)
  const fetchBasicInfo = async () => {
    
    setLoading(true)
    try {
      const endpoint = parsedUser?.is_mentor
        ? `${baseURL}/api/mentor/details?user_id=${parsedUser.user_id}`
        : `${baseURL}/api/basic-info`

      const response = await axios.get(endpoint, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })

      // map to our UI model
      const mapped = mapResponseToProfile(response.data)
      setProfile((prev: any) => ({ ...prev, ...mapped }))
    } catch (error) {
      console.error("Error fetching profile:", error)
      // keep default START profile silently
    } finally {
      setLoading(false)
    }
  }

  // fetch recommendations from backend (search-degree). We'll use dreamRole as degree param;
  // backend earlier used /search-degree?degree=...
  const fetchRecommendations = async (degreeParam: string) => {
    if (!degreeParam || degreeParam.trim() === "") return
    try {
      const resp = await axios.get(`${baseURL}/search-degree`, {
        params: { degree: degreeParam },
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
      // backend probably returns { degree, matched_role, courses:[], certifications:[], competitions:[] }
      const data = resp.data
      if (data) {
        setReco({
          courses: Array.isArray(data.courses) ? data.courses.map((c: any) => ({ title: c.title || c, provider: c.provider || c.source || "" })) : [],
          certs: Array.isArray(data.certifications) ? data.certifications.map((c: any) => ({ title: c.title || c, by: c.by || "" })) : [],
          comps: Array.isArray(data.competitions) ? data.competitions.map((c: any) => ({ title: c.title || c, host: c.host || "" })) : [],
        })
      }
    } catch (error) {
      console.warn("Could not fetch backend recommendations, falling back to local RECO_LIB.", error)
      // leave reco null -> use RECO_LIB
    }
  }

  // update basic info (PUT)
  const updateBasicInfo = async () => {
    setSaving(true)
    try {
      // If backend returns __raw (original fields) keep IDs
      const payload = {
        // map our UI profile back to expected backend keys conservatively:
        firstname: profile.name?.split(" ")[0] ?? undefined,
        lastname: profile.name?.split(" ").slice(1).join(" ") ?? undefined,
        emailid: profile.email,
        high_education: profile.education,
        industry: profile.industry,
        work_experience: profile.experience,
        role_based: profile.dreamRole,
        intent: profile.intent,
        // if backend gave mentor-specific data (we preserved in __raw), include ids
        ...(profile.__raw?.id ? { id: profile.__raw.id } : {}),
        ...(profile.__raw?.user_id ? { user_id: profile.__raw.user_id } : {}),
      }

      const url = parsedUser?.is_mentor
        ? // mentor update route from InfoCard: /update_mentor/{mentor_id}
          `${baseURL}/update_mentor/${profile.__raw?.mentor_id ?? profile.__raw?.mentorId ?? ""}`
        : // user basic info update:
          `${baseURL}/api/basic-info`

      // choose HTTP method: InfoCard used PUT for both. Use PUT.
      await axios.put(url, payload, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          "Content-Type": "application/json",
        },
      })

      // refetch to get canonical representation
      await fetchBasicInfo()
      // Optionally show a toast in your app
    } catch (error) {
      console.error("Error saving profile:", error)
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    fetchBasicInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Whenever dreamRole changes we attempt to fetch backend recommendations
  useEffect(() => {
    fetchRecommendations(profile.dreamRole)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.dreamRole]);

   const fetchIndustryData = async () => {
          try {
            const response = await axios.get(`${baseURL}/api/industry`);
            console.log("response-data--industry", response.data.industry);
            setIndustryArray(response.data.industry);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
  
         const fetchExperienceData = async () => {
            try {
              const response = await axios.get(`${baseURL}/api/experience-level`);
              console.log(
                "response-data--api/experience-level",
                response.data.experience_level
              );
              setExperienceArray(response.data.experience_level);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
  
  
          const fetchEducationData = async () => {
              try {
                const response = await axios.get(`${baseURL}/api/education`);
                console.log("response-data--education", response.data.education);
                setEducationArray(response.data.education);
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            };
  
        useEffect(()=>{
          fetchIndustryData();
          fetchExperienceData();
          fetchEducationData();
        },[]);
  

  return (
    <div className="mx-auto w-full max-w-6xl p-6 space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Profile Section */}
        <Card className="border-0 shadow-md backdrop-blur-md">
          <CardHeader className="border-b bg-gradient-to-r from-primary/10 to-transparent rounded-t-2xl">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Users className="size-5 text-primary" /> Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <User className="size-12 border-2 border-primary/20">
                <Search />
                <MessageCircle />
                HB
                <Bell />
              </User>
              <span className="text-xs text-muted-foreground">
                Edit details to personalize recommendations
              </span>
            </div>

            {/* Editable Fields */}
            <div className="space-y-3">
              <div className="grid grid-cols-3 items-center gap-3">
                <Label className="text-sm text-muted-foreground">Name</Label>
                <Input
                  className="col-span-2"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-3 items-center gap-3">
                <Label className="text-sm text-muted-foreground">Email</Label>
                <Input
                  className="col-span-2"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-3 items-center gap-3">
                <Label className="text-sm text-muted-foreground">Education</Label>
                <div className="col-span-2">
                  <Select value={profile.education} onValueChange={(v) => setProfile({ ...profile, education: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Education" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationArray.map((e) => (
                        <SelectItem key={e.id} value={e.name}>
                          {e.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
                <div className="grid grid-cols-3 items-center gap-3">
                <Label className="text-sm text-muted-foreground">Industry</Label>
                <div className="col-span-2">
                  <Select value={profile.industry} onValueChange={(v) => setProfile({ ...profile, industry: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Education" />
                    </SelectTrigger>
                    <SelectContent>
                      {IndustryArray.map((e) => (
                        <SelectItem key={e.id} value={e.name}>
                          {e.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 items-center gap-3">
                <Label className="text-sm text-muted-foreground">Experience</Label>
                <div className="col-span-2">
                  <Select value={profile.experience} onValueChange={(v) => setProfile({ ...profile, experience: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Experience" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE_OPTIONS.map((e) => (
                        <SelectItem key={e} value={e}>
                          {e}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Intent Cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <IntentCard
                active={!!profile.intent?.roadmap}
                title="Skill Roadmapping"
                subtitle="Learn skills for your role."
                icon={Wrench}
                onClick={() => setProfile({ ...profile, intent: { ...profile.intent, roadmap: !profile.intent?.roadmap } })}
              />
              <IntentCard
                active={!!profile.intent?.clarity}
                title="Career Clarity & Connections"
                subtitle="Get insights and networking."
                icon={MessageSquare}
                onClick={() => setProfile({ ...profile, intent: { ...profile.intent, clarity: !profile.intent?.clarity } })}
              />
            </div>

            {/* Dream Role */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Label className="text-sm text-muted-foreground mb-1 block">Dream Role</Label>
                <Select value={profile.dreamRole} onValueChange={(v) => setProfile({ ...profile, dreamRole: v })}>
                  <SelectTrigger className="h-9 w-full border-primary/20">
                    <SelectValue placeholder="Select dream role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Popular Roles</SelectLabel>
                      {ROLE_OPTIONS.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end gap-2">
                <Button onClick={updateBasicInfo} disabled={saving}>
                  <Save className="mr-2" /> {saving ? "Saving..." : "Save"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    fetchBasicInfo()
                  }}
                >
                  <X />
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations Section */}
        <Card className="border-0 shadow-md backdrop-blur-md">
          <CardHeader className="border-b bg-gradient-to-r from-primary/10 to-transparent rounded-t-2xl">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Sparkles className="size-5 text-primary" /> Personalized Recommendations —{" "}
              <span className="text-foreground/70">{profile.dreamRole}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 pt-4">
            {[
              { title: "Courses", icon: BookOpen, list: reco?.courses },
              { title: "Certifications", icon: Award, list: reco?.certs },
              { title: "Competitions", icon: Trophy, list: reco?.comps },
            ].map((block, idx) => {
              const Icon = block.icon as any
              const full = block.list?.length ?? 0
              const visible = full >= 4 ? 4 : Math.min(3, full)
              return (
                <motion.div key={idx} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="rounded-2xl border bg-muted/30 p-4 shadow-sm hover:shadow-md">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary"><Icon className="size-4" /> {block.title}</h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {Array.isArray(block.list) && block.list.slice(0, visible).map((item: any, i: number) => (
                      <motion.div key={i} whileHover={{ scale: 1.02 }} className="rounded-xl bg-background p-3 shadow-sm hover:bg-primary/5 border border-transparent hover:border-primary/30 transition">
                        <div className="font-medium text-sm leading-tight">{item.title}</div>
                        <div className="text-xs text-muted-foreground">{item.provider || item.by || item.host}</div>
                      </motion.div>
                    ))}
                    {(!Array.isArray(block.list) || block.list.length === 0) && (
                      <div className="text-xs text-muted-foreground">No recommendations found for this category.</div>
                    )}
                  </div>
                  {full > 4 && (
                    <div className="pt-1 text-right text-xs text-muted-foreground">+{full - 4} more matched</div>
                  )}
                </motion.div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProfileRecWidget
