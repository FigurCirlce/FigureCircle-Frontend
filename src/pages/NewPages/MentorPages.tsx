import  { useMemo, useState } from "react";
import { Search, Filter, Star, ExternalLink, IndianRupee, Linkedin, FileText } from "lucide-react";


interface PillProps {
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

interface Mentor {
  name: string;
  expertise: string;
  degree: string;
  tags: string[];
  bio: string;
  email: string;
  linkedin: string;
  resumeUrl: string;
  fee?: number;
  fees?: {
    roadmap?: number;
    clarity?: number;
  };
}

interface MentorCardProps {
  m: Mentor;
  expanded: boolean;
  scheduled?: boolean;
  onToggle: () => void;
  onSchedule?: () => void;
}

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

function MentorCard({ m, expanded, onToggle, scheduled, onSchedule }:MentorCardProps) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      onClick={(e) => {
        // Don’t toggle when clicking actionable elements
        const target=e.target as HTMLElement;
        if (target.closest("button, a")) return;
        onToggle();
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={classNames(
          "w-full rounded-2xl border p-4 shadow-sm transition hover:shadow-md bg-white",
          expanded ? "ring-2 ring-black" : "border-gray-200"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold truncate">{m.name}</h3>
            <p className="text-sm text-gray-600 truncate">{m.expertise}</p>
            <p className="text-sm text-gray-500 truncate">{m.degree}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {m.tags.map((t) => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gray-100">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="mt-3 flex items-center gap-2 flex-nowrap">
              {!scheduled ? (
                <button
                  onClick={() => {
                    onSchedule?.();
                    alert(`Scheduled a first call with ${m.name}`);
                  }}
                  className="px-3 py-1.5 text-sm rounded-xl bg-black text-white hover:opacity-90"
                >
                  Schedule
                </button>
              ) : (
                <button
                  onClick={() => alert(`Pay for ${m.name}`)}
                  className="px-3 py-1.5 text-sm rounded-xl border border-gray-300 hover:border-gray-500"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        </div>

        {expanded && (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="space-y-1">
              <p className="text-gray-700">{m.bio}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Email:</span>
                <a href={`mailto:${m.email}`} className="underline break-all">{m.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <a href={m.linkedin} target="_blank" rel="noreferrer" className="underline inline-flex items-center gap-1">
                  LinkedIn <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <a href={m.resumeUrl} className="underline inline-flex items-center gap-1">
                  View Resume <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Fees section */}
              <div className="pt-2 border-t">
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Fees</div>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center justify-between rounded-xl border p-2">
                    <div className="text-sm">
                      <div className="font-medium">Skill Roadmap</div>
                      <div className="text-gray-500">1st session</div>
                    </div>
                    <div className="flex items-center gap-1 font-semibold">
                      <IndianRupee className="h-4 w-4" />{m.fees?.roadmap ?? m.fee}
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border p-2">
                    <div className="text-sm">
                      <div className="font-medium">Career Clarity, Industry Insights</div>
                      <div className="text-gray-500">1st session</div>
                    </div>
                    <div className="flex items-center gap-1 font-semibold">
                      <IndianRupee className="h-4 w-4" />{m.fees?.clarity ?? m.fee}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hover quick preview */}
      {!expanded && hover && (
        <div className="absolute z-20 left-0 top-full mt-2 w-[22rem] max-w-[80vw] rounded-xl border bg-white p-3 shadow-xl text-sm">
          <div className="flex items-center justify-between">
            <strong className="truncate">Quick Preview</strong>
          </div>
          <p className="mt-1 text-gray-700 line-clamp-3">{m.bio}</p>
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
            <Linkedin className="h-3 w-3" /> LinkedIn available • Resume available
          </div>
        </div>
      )}
    </div>
  );
}

const MentorsWireframe1=() =>{
  // ---- STATE ----
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("recommended");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  // const [scheduledMap, setScheduledMap] = useState({});
  const [scheduledMap, setScheduledMap] = useState<Record<number, boolean>>({});

  const [visible, setVisible] = useState(6);

  // ---- DATA ----
  const mentors = [
    { id: 1, name: "Swapnil Medical Mentor", expertise: "Data Science for Finance", degree: "Ph.D. Biotechnology", fee: 5000, fees: { roadmap: 5000, clarity: 3500 }, email: "swapnil@example.com", linkedin: "#", resumeUrl: "#", bio: "ML for finance, career strategy, interview prep.", tags: ["Data Science", "Finance"], recommended: true },
    { id: 2, name: "Smriti Mentor 1000", expertise: "Data Science", degree: "M.Tech Computer Science", fee: 4000, fees: { roadmap: 4000, clarity: 2800 }, email: "smriti@example.com", linkedin: "#", resumeUrl: "#", bio: "Ex-FAANG DS, helps with roadmaps, projects, and mock interviews.", tags: ["Data Science", "AI/ML"], recommended: true },
    { id: 3, name: "Harsh Mentor 2", expertise: "Data Science for Finance", degree: "B.Tech, MS Analytics", fee: 4500, fees: { roadmap: 4500, clarity: 3200 }, email: "harsh@example.com", linkedin: "#", resumeUrl: "#", bio: "Python for quant, resume reviews, capstone guidance.", tags: ["Finance", "AI/ML"], recommended: false },
    { id: 4, name: "John Doe", expertise: "Web Development", degree: "M.S. Software Engineering", fee: 3500, fees: { roadmap: 3500, clarity: 2500 }, email: "john@example.com", linkedin: "#", resumeUrl: "#", bio: "Full‑stack mentor: React/Next.js, interview prep, portfolio review.", tags: ["Web Dev", "Frontend"], recommended: false },
    { id: 5, name: "Aisha Khan", expertise: "AI/ML & Career Strategy", degree: "Ph.D. Machine Learning", fee: 7000, fees: { roadmap: 7000, clarity: 5000 }, email: "aisha@example.com", linkedin: "#", resumeUrl: "#", bio: "Research to industry transitions, LLM projects, publications.", tags: ["AI/ML", "Research"], recommended: true },
    { id: 6, name: "Miguel Reyes", expertise: "Product Analytics", degree: "MBA, B.S. Statistics", fee: 4200, fees: { roadmap: 4200, clarity: 3000 }, email: "miguel@example.com", linkedin: "#", resumeUrl: "#", bio: "SQL + experimentation + stakeholder management.", tags: ["Analytics", "Product"], recommended: false },
    { id: 7, name: "Priya Patel", expertise: "Cloud & DevOps", degree: "M.S. Computer Science", fee: 4800, fees: { roadmap: 4800, clarity: 3400 }, email: "priya@example.com", linkedin: "#", resumeUrl: "#", bio: "AWS/GCP, IaC, SRE interviews.", tags: ["Cloud", "DevOps"], recommended: false },
    { id: 8, name: "Omar Farooq", expertise: "Cybersecurity", degree: "B.S. Information Security", fee: 3900, fees: { roadmap: 3900, clarity: 2800 }, email: "omar@example.com", linkedin: "#", resumeUrl: "#", bio: "Red teaming, SOC roles, cert guidance.", tags: ["Security"], recommended: false },
  ];

  const categories = [
    { key: "all", label: "All" },
    { key: "recommended", label: "Recommended" },
    { key: "Data Science", label: "Data Science" },
    { key: "AI/ML", label: "AI/ML" },
    { key: "Finance", label: "Finance" },
    { key: "Web Dev", label: "Web Dev" },
    { key: "Analytics", label: "Analytics" },
    { key: "Security", label: "Security" },
  ];

  // ---- FILTERING ----
  const filtered = useMemo(() => {
    let list = [...mentors];

    if (activeCat === "recommended") {
      list = list.filter((m) => m.recommended);
    } else if (activeCat !== "all") {
      list = list.filter((m) => m.tags.includes(activeCat));
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.expertise.toLowerCase().includes(q) ||
          m.degree.toLowerCase().includes(q) ||
          m.tags.join(" ").toLowerCase().includes(q)
      );
    }

    return list;
  }, [query, activeCat]);

  const display = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-black" />
            <span className="font-semibold">FigureCircle</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            <a className="hover:text-black" href="#">Dashboard</a>
            <a className="hover:text-black" href="#">Schedule</a>
            <a className="font-semibold text-black" href="#">Mentors</a>
            <a className="hover:text-black" href="#">Profile</a>
          </nav>
          <button className="text-sm rounded-xl border px-3 py-1.5">Log out</button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-bold">Mentors For You</h1>

        {/* Recommendation banner */}
        <div className="mt-3 rounded-2xl border bg-white p-4 flex items-center gap-3">
          <Star className="h-5 w-5" />
          <div className="text-sm">
            <div className="font-medium">Recommended based on your profile</div>
            <div className="text-gray-600">Data Science • Finance • Interview Prep</div>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="mt-4 flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, expertise, or background…"
              className="w-full rounded-xl border border-gray-300 pl-9 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <Pill key={c.key} active={activeCat === c.key} onClick={() => setActiveCat(c.key)}>
                {c.label}
              </Pill>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="mt-6 grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(320px,1fr))]">
          {display.map((m) => (
            <MentorCard
              key={m.id}
              m={m}
              expanded={expandedId === m.id}
              scheduled={!!scheduledMap[m.id]}
              onSchedule={() => setScheduledMap((prev) => ({ ...prev, [m.id]: true }))}
              onToggle={() => setExpandedId(expandedId === m.id ? null : m.id)}
            />
          ))}
        </div>

        {/* Load more */}
        <div className="mt-6 flex justify-center">
          {filtered.length === 0 ? (
            <div className="text-gray-600">No mentors match your search.</div>
          ) : canLoadMore ? (
            <button
              onClick={() => setVisible((v) => v + 6)}
              className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50"
            >
              View more mentors
            </button>
          ) : (
            <div className="text-gray-500 text-sm">You're all caught up.</div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MentorsWireframe1;


