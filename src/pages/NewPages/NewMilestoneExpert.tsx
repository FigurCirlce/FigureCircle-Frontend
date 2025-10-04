import { useState} from "react"
import { Button } from "@/components/ui/button"
import {
  Phone,
  Search,
  Users,
  BarChart3,
  Lightbulb,
  Flag,
  ChevronRight,
  ChevronDown,
  Map,
  BookOpen,
  ClipboardCheck,
  Briefcase,
  LucideIcon,
} from "lucide-react"

// --------------------
// Type Definitions
// --------------------
type ViewType = "skill" | "clarity"

interface Milestone {
  id: number
  title: string
  icon: LucideIcon
  status: string
  desc: string
}

interface TaskDetails {
  subtitle: string
  bullets: string[]
}

interface ExpertTimelineBaseProps {
  milestones: Milestone[]
  tasks: Record<number, TaskDetails>
}

// ===================
// USER VIEW (with toggle between Skill & Clarity)
// ===================
const MilestoneFlowExpertTimeline=()=> {
  const [view, setView] = useState<ViewType>("clarity")
  const [selectedId, setSelectedId] = useState(0)

  // --- DATA: Skill Roadmap flow ---
  const skillMilestones: Milestone[] = [
    { id: 0, title: "Free Intro Call", icon: Phone, status: "Free", desc: "Discuss goals, review skills, align on milestones." },
    { id: 1, title: "Foundation", icon: Search, status: "Not Started", desc: "Identify roles, map skill gaps, create roadmap." },
    { id: 2, title: "Skill Building", icon: BarChart3, status: "Not Started", desc: "Start learning in key areas and complete a mini-project." },
    { id: 3, title: "Applied Project", icon: Users, status: "Not Started", desc: "Execute a guided project and iterate with feedback." },
    { id: 4, title: "Industry Prep", icon: Lightbulb, status: "Not Started", desc: "Assignments, mock interview, and portfolio refinement." },
    { id: 5, title: "Final Review", icon: Flag, status: "Not Started", desc: "Review outcomes and set next learning goals." },
  ]

  const skillTasks: Record<number, TaskDetails> = {
    0: { subtitle: "Free intro call", bullets: ["Clarify target roles & interests", "Quick profile review", "Agree on 3–5 tasks per milestone", "Timeline & expectations"] },
    1: { subtitle: "Foundation (examples)", bullets: ["Collect 2–3 JDs & extract skills", "Run skill-gap check", "Draft a 90-day roadmap", "Set up tracking (sheet/Notion/repo)"] },
    2: { subtitle: "Skill building (examples)", bullets: ["Pick 1–2 core topics/resources", "Complete first mini-project/case", "Weekly check-in & blockers review", "Document outcomes to portfolio"] },
    3: { subtitle: "Applied project (examples)", bullets: ["Define scope & success criteria", "Implement v1, review with expert", "Refactor with best practices", "Write short readme/case write-up"] },
    4: { subtitle: "Industry prep (examples)", bullets: ["Solve 2 role-specific assignments", "1 mock interview + feedback", "Polish resume/LinkedIn/portfolio", "Targeted outreach plan (5 contacts)"] },
    5: { subtitle: "Final review (examples)", bullets: ["Skills & outcomes retrospective", "Update long-term plan", "Map next 3 months deliverables", "Option to start new series"] },
  }

  // --- DATA: Clarity & Feedback flow ---
  const clarityMilestones: Milestone[] = [
    { id: 0, title: "Free Intro Call", icon: Phone, status: "Free", desc: "Understand the user’s goals, career stage, and areas of confusion." },
    { id: 1, title: "Self-Assessment", icon: Search, status: "Not Started", desc: "Help the user reflect on strengths, gaps, and career motivations." },
    { id: 2, title: "Profile Feedback", icon: Users, status: "Not Started", desc: "Review resume/LinkedIn and provide actionable feedback." },
    { id: 3, title: "Industry Insights", icon: BarChart3, status: "Not Started", desc: "Share trends and in-demand roles for their background." },
    { id: 4, title: "Strategic Advice", icon: Lightbulb, status: "Not Started", desc: "Give clarity on possible career paths and next steps." },
    { id: 5, title: "Final Review", icon: Flag, status: "Not Started", desc: "Summarize insights, refine strategy, and map long-term plan." },
  ]

  const clarityTasks: Record<number, TaskDetails> = {
    0: { subtitle: "User’s first free intro call", bullets: ["Share background & goals", "Discuss areas of confusion", "Set expectations for guidance", "Outline milestones for clarity & feedback"] },
    1: { subtitle: "Self-assessment phase", bullets: ["Complete guided self-reflection", "List strengths/skills/interests", "Highlight challenges & uncertainties"] },
    2: { subtitle: "Profile feedback phase", bullets: ["Expert reviews resume & LinkedIn", "Find gaps in positioning", "3–5 improvement suggestions"] },
    3: { subtitle: "Industry insights phase", bullets: ["Discuss 2–3 relevant industries", "In-demand roles & skills", "Compare fit vs. opportunities"] },
    4: { subtitle: "Strategic advice phase", bullets: ["Tailored career pathways", "Immediate vs long-term goals", "Networking & mentorship avenues"] },
    5: { subtitle: "Final review phase", bullets: ["Summarize insights & feedback", "Refine career direction", "Create a 3–6 month plan"] },
  }

  // pick active set
  const milestones = view === "skill" ? skillMilestones : clarityMilestones
  const tasks = view === "skill" ? skillTasks : clarityTasks

  const onSwitch = (v: ViewType) => {
    setView(v)
    setSelectedId(0)
  }

  return (
    <div className="flex flex-col items-center p-6 max-w-4xl mx-auto">
      {/* Segmented toggle */}
      <div className="mb-4 inline-flex rounded-lg border bg-white p-1 shadow-sm">
        <Button variant={view === "skill" ? "default" : "ghost"} size="sm" className={`${view === "skill" ? "" : "text-gray-600"} rounded-md`} onClick={() => onSwitch("skill")}>
          Skill Roadmap
        </Button>
        <Button variant={view === "clarity" ? "default" : "ghost"} size="sm" className={`${view === "clarity" ? "" : "text-gray-600"} rounded-md`} onClick={() => onSwitch("clarity")}>
          Clarity & Feedback
        </Button>
      </div>

      {/* Directional label */}
      <p className="text-xs text-gray-500 mb-3">
        {view === "skill" ? "Start → Learn → Apply → Prepare → Finish" : "Explore → Reflect → Get Feedback → Learn → Decide → Plan"}
      </p>

      {/* Timeline */}
      <div className="flex flex-col md:flex-row md:space-x-0 items-center justify-center w-full">
        {milestones.map((m, index) => {
          const Icon = m.icon
          const isSelected = selectedId === m.id
          const isLast = index === milestones.length - 1
          return (
            <div key={`${view}-${m.id}`} className="flex items-center md:mr-2 md:last:mr-0">
              <button
                onClick={() => setSelectedId(m.id)}
                className="flex flex-col items-center text-center relative group focus:outline-none"
                aria-pressed={isSelected}
              >
                <div
                  className={`transition-transform duration-200 w-12 h-12 md:w-12 md:h-12 flex items-center justify-center rounded-full border-2 ${
                    m.id === 0 ? "border-green-500 bg-green-50" : "border-blue-500 bg-blue-50"
                  } ${isSelected ? "scale-110 ring-4 ring-blue-200" : "hover:scale-105"}`}
                >
                  <span className="absolute -top-4 text-[10px] font-bold text-gray-600">{m.id}</span>
                  <Icon className={`text-blue-600 ${isSelected ? "w-7 h-7" : "w-6 h-6"}`} />
                </div>
                <p className={`text-xs font-medium mt-2 ${isSelected ? "text-blue-700" : "text-gray-800"}`}>{m.title}</p>
                <span className="text-[10px] text-gray-500">{m.status}</span>

                {/* Hover Tooltip (desktop) */}
                <div className="hidden md:block absolute bottom-16 w-44 bg-white border text-xs text-gray-700 p-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition">
                  {m.desc}
                </div>
              </button>

              {/* Directional connectors */}
              {!isLast && (
                <div className="flex flex-col items-center md:flex-row md:items-center">
                  {/* Mobile vertical line + arrow */}
                  <div className="md:hidden flex flex-col items-center my-2">
                    <div className="w-0.5 h-6 bg-gray-300" />
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                    <div className="w-0.5 h-6 bg-gray-300" />
                  </div>
                  {/* Desktop horizontal line + arrow */}
                  <div className="hidden md:flex items-center mx-1">
                    <div className="w-10 h-0.5 bg-gray-300" />
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <div className="w-10 h-0.5 bg-gray-300" />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Selected details panel */}
      <div className="mt-6 w-full">
        <div className="rounded-xl border p-5 shadow-sm">
          {(() => {
            const sel = milestones.find((x) => x.id === selectedId)!
            const SelIcon = sel.icon
            const { subtitle, bullets } = tasks[selectedId]
            return (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 border border-blue-200 relative">
                    <SelIcon className="w-6 h-6 text-blue-600" />
                    <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-[10px] font-bold text-gray-600">{sel.id}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">
                      {sel.id}. {sel.title}
                    </h3>
                    <p className="text-xs text-gray-600">{sel.desc}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">{subtitle}</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {bullets.map((b, i) => (
                      <li key={i} className="text-xs text-gray-700">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                {selectedId === 0 && (
                  <div className="pt-2">
                    <Button variant="outline" size="sm">
                      Schedule Free Call
                    </Button>
                  </div>
                )}
              </div>
            )
          })()}
        </div>
      </div>
    </div>
  )
}

// ===================
// EXPERT VIEW (no toggle)
// ===================
function ExpertTimelineBase({ milestones, tasks }: ExpertTimelineBaseProps) {
  const [selectedId, setSelectedId] = useState(0)
  return (
    <div className="flex flex-col items-center p-6 max-w-4xl mx-auto">
      <p className="text-xs text-gray-500 mb-3">Expert view</p>
      <div className="flex flex-col md:flex-row md:space-x-0 items-center justify-center w-full">
        {milestones.map((m, index) => {
          const Icon = m.icon
          const isSelected = selectedId === m.id
          const isLast = index === milestones.length - 1
          return (
            <div key={`expert-${m.id}`} className="flex items-center md:mr-2 md:last:mr-0">
              <button onClick={() => setSelectedId(m.id)} className="flex flex-col items-center text-center relative group focus:outline-none" aria-pressed={isSelected}>
                <div
                  className={`transition-transform duration-200 w-12 h-12 flex items-center justify-center rounded-full border-2 ${
                    m.id === 0 ? "border-green-500 bg-green-50" : "border-blue-500 bg-blue-50"
                  } ${isSelected ? "scale-110 ring-4 ring-blue-200" : "hover:scale-105"}`}
                >
                  <span className="absolute -top-4 text-[10px] font-bold text-gray-600">{m.id}</span>
                  <Icon className={`text-blue-600 ${isSelected ? "w-7 h-7" : "w-6 h-6"}`} />
                </div>
                <p className={`text-xs font-medium mt-2 ${isSelected ? "text-blue-700" : "text-gray-800"}`}>{m.title}</p>
                <span className="text-[10px] text-gray-500">{m.status}</span>
                <div className="hidden md:block absolute bottom-16 w-44 bg-white border text-xs text-gray-700 p-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition">
                  {m.desc}
                </div>
              </button>
              {!isLast && (
                <div className="hidden md:flex items-center mx-1">
                  <div className="w-10 h-0.5 bg-gray-300" />
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <div className="w-10 h-0.5 bg-gray-300" />
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className="mt-6 w-full">
        <div className="rounded-xl border p-5 shadow-sm">
          {(() => {
            const sel = milestones.find((x) => x.id === selectedId)!
            const SelIcon = sel.icon
            const { subtitle, bullets } = tasks[selectedId]
            return (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 border border-blue-200 relative">
                    <SelIcon className="w-6 h-6 text-blue-600" />
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-600">{sel.id}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">
                      {sel.id}. {sel.title}
                    </h3>
                    <p className="text-xs text-gray-600">{sel.desc}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">{subtitle}</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {bullets.map((b, i) => (
                      <li key={i} className="text-xs text-gray-700">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                {selectedId === 0 && (
                  <div className="pt-2">
                    <Button variant="outline" size="sm">
                      Schedule Free Call
                    </Button>
                  </div>
                )}
              </div>
            )
          })()}
        </div>
      </div>
    </div>
  )
}

// Expert: SKILL ROADMAP (no toggle)
export function ExpertSkillTimeline() {
  const milestones: Milestone[] = [
    { id: 0, title: "Free Intro Call", icon: Phone, status: "Free", desc: "Understand the user’s goals, review skills, and align on milestones." },
    { id: 1, title: "Foundation", icon: Map, status: "Not Started", desc: "Help the user identify roles, map skill gaps, and create a roadmap." },
    { id: 2, title: "Skill Building", icon: BookOpen, status: "Not Started", desc: "Guide the user through structured learning and a mini-project." },
    { id: 3, title: "Applied Project", icon: ClipboardCheck, status: "Not Started", desc: "Support the user in executing a guided project and provide feedback." },
    { id: 4, title: "Industry Prep", icon: Briefcase, status: "Not Started", desc: "Prepare the user with assignments, mock interviews, and portfolio refinement." },
    { id: 5, title: "Final Review", icon: Flag, status: "Not Started", desc: "Review outcomes, share feedback, and set next learning goals." },
  ]

  const tasks: Record<number, TaskDetails> = {
    0: { subtitle: "Expert’s role in the free intro call", bullets: ["Listen to the user’s goals & context", "Quick profile/skills review", "Propose 3–5 tasks per milestone", "Set collaboration expectations"] },
    1: { subtitle: "Expert’s role in Foundation", bullets: ["Co-collect sample JDs", "Run a skill-gap analysis", "Draft a personalized 90-day roadmap", "Set up progress tracking tools"] },
    2: { subtitle: "Expert’s role in Skill Building", bullets: ["Recommend learning resources", "Design a mini-project", "Weekly check-ins to unblock", "Coach documentation/portfolio"] },
    3: { subtitle: "Expert’s role in Applied Project", bullets: ["Define scope & success criteria", "Review implementation & provide feedback", "Coach best practices", "Guide final write-up/presentation"] },
    4: { subtitle: "Expert’s role in Industry Prep", bullets: ["Create 2 role-specific assignments", "Run a mock interview + debrief", "Give resume/LinkedIn/portfolio feedback", "Suggest targeted outreach plan"] },
    5: { subtitle: "Expert’s role in Final Review", bullets: ["Assess skill growth & outcomes", "Advise long-term learning path", "Map next 3 months of deliverables", "Offer continued mentorship options"] },
  }

  return <ExpertTimelineBase milestones={milestones} tasks={tasks} />
}

// Expert: CLARITY & FEEDBACK (no toggle)
export function ExpertClarityTimeline() {
  const milestones: Milestone[] = [
    { id: 0, title: "Free Intro Call", icon: Phone, status: "Free", desc: "Understand the user’s goals, career stage, and areas of confusion." },
    { id: 1, title: "Self-Assessment", icon: Search, status: "Not Started", desc: "Help the user reflect on strengths, gaps, and motivations." },
    { id: 2, title: "Profile Feedback", icon: Users, status: "Not Started", desc: "Review resume/LinkedIn and provide actionable feedback." },
    { id: 3, title: "Industry Insights", icon: BarChart3, status: "Not Started", desc: "Share trends and in-demand roles for their background." },
    { id: 4, title: "Strategic Advice", icon: Lightbulb, status: "Not Started", desc: "Provide clarity on paths and next steps." },
    { id: 5, title: "Final Review", icon: Flag, status: "Not Started", desc: "Summarize insights, refine strategy, and map long-term plan." },
  ]

  const tasks: Record<number, TaskDetails> = {
    0: { subtitle: "Expert’s role in the free intro call", bullets: ["Elicit background & goals", "Clarify user’s questions", "Explain how milestones will work", "Agree on near-term objectives"] },
    1: { subtitle: "Expert’s role in Self-Assessment", bullets: ["Provide guided reflection prompts", "Identify strengths & gaps collaboratively", "Surface misalignments and opportunities"] },
    2: { subtitle: "Expert’s role in Profile Feedback", bullets: ["Audit resume & LinkedIn", "Pinpoint positioning gaps", "Give 3–5 concrete improvements"] },
    3: { subtitle: "Expert’s role in Industry Insights", bullets: ["Share up-to-date sector trends", "Map in-demand roles & skills", "Discuss fit vs. opportunity tradeoffs"] },
    4: { subtitle: "Expert’s role in Strategic Advice", bullets: ["Outline tailored career paths", "Sequence immediate vs. long-term moves", "Suggest networking/mentors"] },
    5: { subtitle: "Expert’s role in Final Review", bullets: ["Synthesize insights & decisions", "Refine user’s direction", "Create a 3–6 month action plan"] },
  }

  return <ExpertTimelineBase milestones={milestones} tasks={tasks} />
}

export default MilestoneFlowExpertTimeline;
