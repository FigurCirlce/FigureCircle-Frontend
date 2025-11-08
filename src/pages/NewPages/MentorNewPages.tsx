// import React, { useMemo, useState } from "react";
// import { Search, Filter, Star, ChevronDown, ChevronUp, ExternalLink, IndianRupee, Linkedin, FileText } from "lucide-react";

// // --- Sample mentor data (replace with real API later) ---
// const seedMentors = [
//   {
//     id: 1,
//     name: "Swapnil Medical Mentor",
//     expertise: "Data Science for Finance",
//     degree: "Ph.D. Biotechnology",
//     fee: 5000,
//     fees: { roadmap: 5000, clarity: 3500 },
//     email: "swapniltiwari9503005@gmail.com",
//     linkedin: "https://www.linkedin.com/in/swapnil",
//     resumeUrl: "#",
//     bio: "I am very good with everything (placeholder). Focus: ML for finance, career strategy, interview prep.",
//     tags: ["Data Science", "Finance"],
//     recommended: true,
//   },
//   {
//     id: 2,
//     name: "Smriti Mentor 1000",
//     expertise: "Data Science",
//     degree: "M.Tech Computer Science",
//     fee: 4000,
//     fees: { roadmap: 4000, clarity: 2800 },
//     email: "smriti@example.com",
//     linkedin: "https://www.linkedin.com/in/smriti",
//     resumeUrl: "#",
//     bio: "Ex-FAANG DS, helps with roadmaps, projects, and mock interviews.",
//     tags: ["Data Science", "AI/ML"],
//     recommended: true,
//   },
//   {
//     id: 3,
//     name: "Harsh Mentor 2",
//     expertise: "Data Science for Finance",
//     degree: "B.Tech, MS Analytics",
//     fee: 4500,
//     fees: { roadmap: 4500, clarity: 3200 },
//     email: "harsh@example.com",
//     linkedin: "https://www.linkedin.com/in/harsh",
//     resumeUrl: "#",
//     bio: "Python for quant, resume reviews, capstone guidance.",
//     tags: ["Finance", "AI/ML"],
//     recommended: false,
//   },
//   {
//     id: 4,
//     name: "John Doe",
//     expertise: "Web Development",
//     degree: "M.S. Software Engineering",
//     fee: 3500,
//     fees: { roadmap: 3500, clarity: 2500 },
//     email: "john@example.com",
//     linkedin: "https://www.linkedin.com/in/johndoe",
//     resumeUrl: "#",
//     bio: "Full‑stack mentor: React/Next.js, interview prep, portfolio review.",
//     tags: ["Web Dev", "Frontend"],
//     recommended: false,
//   },
//   {
//     id: 5,
//     name: "Aisha Khan",
//     expertise: "AI/ML & Career Strategy",
//     degree: "Ph.D. Machine Learning",
//     fee: 7000,
//     fees: { roadmap: 7000, clarity: 5000 },
//     email: "aisha@example.com",
//     linkedin: "https://www.linkedin.com/in/aishakhan",
//     resumeUrl: "#",
//     bio: "Research to industry transitions, LLM projects, publications.",
//     tags: ["AI/ML", "Research"],
//     recommended: true,
//   },
//   {
//     id: 6,
//     name: "Miguel Reyes",
//     expertise: "Product Analytics",
//     degree: "MBA, B.S. Statistics",
//     fee: 4200,
//     fees: { roadmap: 4200, clarity: 3000 },
//     email: "miguel@example.com",
//     linkedin: "https://www.linkedin.com/in/miguel",
//     resumeUrl: "#",
//     bio: "SQL + experimentation + stakeholder management.",
//     tags: ["Analytics", "Product"],
//     recommended: false,
//   },
//   {
//     id: 7,
//     name: "Priya Patel",
//     expertise: "Cloud & DevOps",
//     degree: "M.S. Computer Science",
//     fee: 4800,
//     fees: { roadmap: 4800, clarity: 3400 },
//     email: "priya@example.com",
//     linkedin: "https://www.linkedin.com/in/priya",
//     resumeUrl: "#",
//     bio: "AWS/GCP, IaC, SRE interviews.",
//     tags: ["Cloud", "DevOps"],
//     recommended: false,
//   },
//   {
//     id: 8,
//     name: "Omar Farooq",
//     expertise: "Cybersecurity",
//     degree: "B.S. Information Security",
//     fee: 3900,
//     fees: { roadmap: 3900, clarity: 2800 },
//     email: "omar@example.com",
//     linkedin: "https://www.linkedin.com/in/omar",
//     resumeUrl: "#",
//     bio: "Red teaming, SOC roles, cert guidance.",
//     tags: ["Security"],
//     recommended: false,
//   },
// ];

// const categories = [
//   { key: "all", label: "All" },
//   { key: "recommended", label: "Recommended" },
//   { key: "Data Science", label: "Data Science" },
//   { key: "AI/ML", label: "AI/ML" },
//   { key: "Finance", label: "Finance" },
//   { key: "Web Dev", label: "Web Dev" },
//   { key: "Analytics", label: "Analytics" },
// ];

// function classNames(...arr) {
//   return arr.filter(Boolean).join(" ");
// }

// function Pill({ active, children, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className={classNames(
//         "px-3 py-1 rounded-full text-sm border transition",
//         active
//           ? "bg-black text-white border-black"
//           : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
//       )}
//     >
//       {children}
//     </button>
//   );
// }

// function MentorCard({ m, expanded, onToggle, scheduled, onSchedule }) {
//   const [hover, setHover] = useState(false);

//   return (
//     <div
//       className="relative"
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//     >
//       <div
//         className={classNames(
//           "w-full rounded-2xl border p-4 shadow-sm transition hover:shadow-md bg-white",
//           expanded ? "ring-2 ring-black" : "border-gray-200"
//         )}
//       >
//         <div className="flex items-start justify-between gap-3">
//           <div className="min-w-0">
//             <div className="flex items-center gap-2">
//               <h3 className="text-lg font-semibold truncate">{m.name}</h3>
//               {/* Recommended badge removed per requirement */}
//             </div>
//             <p className="text-sm text-gray-600 truncate">{m.expertise}</p>
//             <p className="text-sm text-gray-500 truncate">{m.degree}</p>
//             <div className="mt-2 flex flex-wrap gap-1">
//               {m.tags.map((t) => (
//                 <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gray-100">
//                   {t}
//                 </span>
//               ))}
//             </div>
//           </div>
//           {/* Top-right fee removed per request; we keep only actions */}
//           <div className="text-right shrink-0">
//             <div className="mt-3 flex items-center gap-2">
//               {!scheduled ? (
//                 <button
//                   onClick={() => {
//                     onSchedule?.();
//                     alert(`Scheduled a first call with ${m.name}`);
//                   }}
//                   className="px-3 py-1.5 text-sm rounded-xl bg-black text-white hover:opacity-90"
//                 >
//                   Schedule
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => alert(`Pay for ${m.name}`)}
//                   className="px-3 py-1.5 text-sm rounded-xl border border-gray-300 hover:border-gray-500"
//                 >
//                   Pay Now
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         <button
//           className="mt-3 inline-flex items-center gap-1 text-sm text-gray-700 hover:text-black"
//           onClick={onToggle}
//           aria-expanded={expanded}
//         >
//           {expanded ? (
//             <>
//               Hide details <ChevronUp className="h-4 w-4" />
//             </>
//           ) : (
//             <>
//               View profile <ChevronDown className="h-4 w-4" />
//             </>
//           )}
//         </button>

//         {expanded && (
//           <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
//             <div className="space-y-1">
//               <p className="text-gray-700">{m.bio}</p>
//             </div>
//             <div className="space-y-2">
//               <div className="flex items-center gap-2">
//                 <span className="font-medium">Email:</span>
//                 <a href={`mailto:${m.email}`} className="underline break-all">{m.email}</a>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Linkedin className="h-4 w-4" />
//                 <a href={m.linkedin} target="_blank" rel="noreferrer" className="underline inline-flex items-center gap-1">
//                   LinkedIn <ExternalLink className="h-3 w-3" />
//                 </a>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FileText className="h-4 w-4" />
//                 <a href={m.resumeUrl} className="underline inline-flex items-center gap-1">
//                   View Resume <ExternalLink className="h-3 w-3" />
//                 </a>
//               </div>

//               {/* Fees section */}
//               <div className="pt-2 border-t">
//                 <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Fees</div>
//                 <div className="grid grid-cols-1 gap-2">
//                   <div className="flex items-center justify-between rounded-xl border p-2">
//                     <div className="text-sm">
//                       <div className="font-medium">Skill Roadmap</div>
//                       <div className="text-gray-500">1st session</div>
//                     </div>
//                     <div className="flex items-center gap-1 font-semibold">
//                       <IndianRupee className="h-4 w-4" />{m.fees?.roadmap ?? m.fee}
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between rounded-xl border p-2">
//                     <div className="text-sm">
//                       <div className="font-medium">Career Clarity, Industry Insights</div>
//                       <div className="text-gray-500">1st session</div>
//                     </div>
//                     <div className="flex items-center gap-1 font-semibold">
//                       <IndianRupee className="h-4 w-4" />{m.fees?.clarity ?? m.fee}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Hover preview tooltip (no fee displayed to keep card clean) */}
//       {!expanded && hover && (
//         <div className="absolute z-20 -top-2 left-2 translate-y-[-100%] w-80 rounded-xl border bg-white p-3 shadow-xl text-sm">
//           <div className="flex items-center justify-between">
//             <strong className="truncate">Quick Preview</strong>
//           </div>
//           <p className="mt-1 text-gray-700 line-clamp-3">{m.bio}</p>
//           <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
//             <Linkedin className="h-3 w-3" /> LinkedIn available • Resume available
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const MentorsWireframe=() =>{
//   const [query, setQuery] = useState("");
//   const [activeCat, setActiveCat] = useState("recommended");
//   const [expandedId, setExpandedId] = useState(null);
//   const [scheduledMap, setScheduledMap] = useState({});
//   const [visible, setVisible] = useState(6);

//   const filtered = useMemo(() => {
//     let list = [...seedMentors];

//     // Category filter
//     if (activeCat === "recommended") {
//       list = list.filter((m) => m.recommended);
//     } else if (activeCat !== "all") {
//       list = list.filter((m) => m.tags.includes(activeCat));
//     }

//     // Search filter
//     if (query.trim()) {
//       const q = query.toLowerCase();
//       list = list.filter(
//         (m) =>
//           m.name.toLowerCase().includes(q) ||
//           m.expertise.toLowerCase().includes(q) ||
//           m.degree.toLowerCase().includes(q) ||
//           m.tags.join(" ").toLowerCase().includes(q)
//       );
//     }

//     return list;
//   }, [query, activeCat]);

//   const display = filtered.slice(0, visible);
//   const canLoadMore = visible < filtered.length;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top nav (simplified) */}
//       <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
//         <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="h-6 w-6 rounded-full bg-black" />
//             <span className="font-semibold">FigureCircle</span>
//           </div>
//           <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
//             <a className="hover:text-black" href="#">Dashboard</a>
//             <a className="hover:text-black" href="#">Schedule</a>
//             <a className="font-semibold text-black" href="#">Mentors</a>
//             <a className="hover:text-black" href="#">Profile</a>
//           </nav>
//           <button className="text-sm rounded-xl border px-3 py-1.5">Log out</button>
//         </div>
//       </header>

//       <main className="mx-auto max-w-6xl px-4 py-8">
//         <h1 className="text-3xl font-bold">Mentors For You</h1>

//         {/* Smart recommendation banner */}
//         <div className="mt-3 rounded-2xl border bg-white p-4 flex items-center gap-3">
//           <Star className="h-5 w-5" />
//           <div className="text-sm">
//             <div className="font-medium">Recommended based on your profile</div>
//             <div className="text-gray-600">Data Science • Finance • Interview Prep</div>
//           </div>
//         </div>

//         {/* Search + Filter row */}
//         <div className="mt-4 flex flex-col md:flex-row gap-3 md:items-center">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search by name, expertise, or background…"
//               className="w-full rounded-xl border border-gray-300 pl-9 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
//             />
//             <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
//           </div>

//           <div className="flex flex-wrap items-center gap-2">
//             {categories.map((c) => (
//               <Pill
//                 key={c.key}
//                 active={activeCat === c.key}
//                 onClick={() => setActiveCat(c.key)}
//               >
//                 {c.label}
//               </Pill>
//             ))}
//           </div>
//         </div>

//         {/* Cards grid */}
//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {display.map((m) => (
//             <MentorCard
//               key={m.id}
//               m={m}
//               expanded={expandedId === m.id}
//               scheduled={!!scheduledMap[m.id]}
//               onSchedule={() => setScheduledMap((prev) => ({ ...prev, [m.id]: true }))}
//               onToggle={() => setExpandedId(expandedId === m.id ? null : m.id)}
//             />
//           ))}
//         </div>

//         {/* Load more */}
//         <div className="mt-6 flex justify-center">
//           {filtered.length === 0 ? (
//             <div className="text-gray-600">No mentors match your search.</div>
//           ) : canLoadMore ? (
//             <button
//               onClick={() => setVisible((v) => v + 6)}
//               className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50"
//             >
//               View more mentors
//             </button>
//           ) : (
//             <div className="text-gray-500 text-sm">You're all caught up.</div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default MentorsWireframe;
// import React, { useMemo, useState } from "react";
// import { Search, Filter, Star, ChevronDown, ChevronUp, ExternalLink, IndianRupee, Linkedin, FileText } from "lucide-react";

// // --- Sample mentor data (replace with real API later) ---
// const seedMentors = [
//   {
//     id: 1,
//     name: "Swapnil Medical Mentor",
//     expertise: "Data Science for Finance",
//     degree: "Ph.D. Biotechnology",
//     fee: 5000,
//     fees: { roadmap: 5000, clarity: 3500 },
//     email: "swapniltiwari9503005@gmail.com",
//     linkedin: "https://www.linkedin.com/in/swapnil",
//     resumeUrl: "#",
//     bio: "I am very good with everything (placeholder). Focus: ML for finance, career strategy, interview prep.",
//     tags: ["Data Science", "Finance"],
//     recommended: true,
//   },
//   {
//     id: 2,
//     name: "Smriti Mentor 1000",
//     expertise: "Data Science",
//     degree: "M.Tech Computer Science",
//     fee: 4000,
//     fees: { roadmap: 4000, clarity: 2800 },
//     email: "smriti@example.com",
//     linkedin: "https://www.linkedin.com/in/smriti",
//     resumeUrl: "#",
//     bio: "Ex-FAANG DS, helps with roadmaps, projects, and mock interviews.",
//     tags: ["Data Science", "AI/ML"],
//     recommended: true,
//   },
//   {
//     id: 3,
//     name: "Harsh Mentor 2",
//     expertise: "Data Science for Finance",
//     degree: "B.Tech, MS Analytics",
//     fee: 4500,
//     fees: { roadmap: 4500, clarity: 3200 },
//     email: "harsh@example.com",
//     linkedin: "https://www.linkedin.com/in/harsh",
//     resumeUrl: "#",
//     bio: "Python for quant, resume reviews, capstone guidance.",
//     tags: ["Finance", "AI/ML"],
//     recommended: false,
//   },
//   {
//     id: 4,
//     name: "John Doe",
//     expertise: "Web Development",
//     degree: "M.S. Software Engineering",
//     fee: 3500,
//     fees: { roadmap: 3500, clarity: 2500 },
//     email: "john@example.com",
//     linkedin: "https://www.linkedin.com/in/johndoe",
//     resumeUrl: "#",
//     bio: "Full‑stack mentor: React/Next.js, interview prep, portfolio review.",
//     tags: ["Web Dev", "Frontend"],
//     recommended: false,
//   },
//   {
//     id: 5,
//     name: "Aisha Khan",
//     expertise: "AI/ML & Career Strategy",
//     degree: "Ph.D. Machine Learning",
//     fee: 7000,
//     fees: { roadmap: 7000, clarity: 5000 },
//     email: "aisha@example.com",
//     linkedin: "https://www.linkedin.com/in/aishakhan",
//     resumeUrl: "#",
//     bio: "Research to industry transitions, LLM projects, publications.",
//     tags: ["AI/ML", "Research"],
//     recommended: true,
//   },
//   {
//     id: 6,
//     name: "Miguel Reyes",
//     expertise: "Product Analytics",
//     degree: "MBA, B.S. Statistics",
//     fee: 4200,
//     fees: { roadmap: 4200, clarity: 3000 },
//     email: "miguel@example.com",
//     linkedin: "https://www.linkedin.com/in/miguel",
//     resumeUrl: "#",
//     bio: "SQL + experimentation + stakeholder management.",
//     tags: ["Analytics", "Product"],
//     recommended: false,
//   },
//   {
//     id: 7,
//     name: "Priya Patel",
//     expertise: "Cloud & DevOps",
//     degree: "M.S. Computer Science",
//     fee: 4800,
//     fees: { roadmap: 4800, clarity: 3400 },
//     email: "priya@example.com",
//     linkedin: "https://www.linkedin.com/in/priya",
//     resumeUrl: "#",
//     bio: "AWS/GCP, IaC, SRE interviews.",
//     tags: ["Cloud", "DevOps"],
//     recommended: false,
//   },
//   {
//     id: 8,
//     name: "Omar Farooq",
//     expertise: "Cybersecurity",
//     degree: "B.S. Information Security",
//     fee: 3900,
//     fees: { roadmap: 3900, clarity: 2800 },
//     email: "omar@example.com",
//     linkedin: "https://www.linkedin.com/in/omar",
//     resumeUrl: "#",
//     bio: "Red teaming, SOC roles, cert guidance.",
//     tags: ["Security"],
//     recommended: false,
//   },
// ];

// const categories = [
//   { key: "all", label: "All" },
//   { key: "recommended", label: "Recommended" },
//   { key: "Data Science", label: "Data Science" },
//   { key: "AI/ML", label: "AI/ML" },
//   { key: "Finance", label: "Finance" },
//   { key: "Web Dev", label: "Web Dev" },
//   { key: "Analytics", label: "Analytics" },
// ];

// function classNames(...arr) {
//   return arr.filter(Boolean).join(" ");
// }

// function Pill({ active, children, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className={classNames(
//         "px-3 py-1 rounded-full text-sm border transition",
//         active
//           ? "bg-black text-white border-black"
//           : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
//       )}
//     >
//       {children}
//     </button>
//   );
// }

// function MentorCard({ m, scheduled, onSchedule, onViewProfile, isSelected }) {
//   return (
//     <div
//       onClick={onViewProfile}
//       className={classNames(
//         "group cursor-pointer rounded-xl border p-4 transition-all duration-200 bg-white",
//         isSelected 
//           ? "ring-2 ring-black shadow-lg" 
//           : "border-gray-200 hover:border-gray-400 hover:shadow-md"
//       )}
//     >
//       <div className="flex items-start justify-between gap-3">
//         <div className="min-w-0 flex-1">
//           <div className="flex items-center gap-2 mb-1">
//             <h3 className="text-base font-semibold truncate">{m.name}</h3>
//             {m.recommended && (
//               <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 shrink-0" />
//             )}
//           </div>
//           <p className="text-sm text-gray-600 truncate">{m.expertise}</p>
//           <p className="text-xs text-gray-500 truncate mt-0.5">{m.degree}</p>
          
//           {/* Compact tags */}
//           <div className="mt-2 flex flex-wrap gap-1">
//             {m.tags.slice(0, 2).map((t) => (
//               <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
//                 {t}
//               </span>
//             ))}
//             {m.tags.length > 2 && (
//               <span className="text-xs px-2 py-0.5 text-gray-500">+{m.tags.length - 2}</span>
//             )}
//           </div>

//           {/* Quick fee preview */}
//           <div className="mt-3 flex items-center gap-1 text-sm font-medium">
//             <IndianRupee className="h-3.5 w-3.5" />
//             <span>{m.fees?.roadmap ?? m.fee}</span>
//             <span className="text-gray-500 text-xs">/ session</span>
//           </div>
//         </div>

//         {/* CTA button */}
//         <div className="shrink-0">
//           {!scheduled ? (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onSchedule?.();
//                 alert(`Scheduled a first call with ${m.name}`);
//               }}
//               className="px-3 py-1.5 text-sm rounded-lg bg-black text-white hover:bg-gray-800 transition"
//             >
//               Book
//             </button>
//           ) : (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 alert(`Pay for ${m.name}`);
//               }}
//               className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:border-gray-500 transition"
//             >
//               Pay
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Quick hover hint */}
//       <div className="mt-2 text-xs text-gray-500 group-hover:text-gray-700 transition">
//         Click to view full profile →
//       </div>
//     </div>
//   );
// }

// // Profile detail side panel component
// function ProfilePanel({ mentor, onClose, scheduled, onSchedule }) {
//   if (!mentor) return null;

//   return (
//     <>
//       {/* Backdrop */}
//       <div 
//         className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-fadeIn"
//         onClick={onClose}
//       />
      
//       {/* Side panel */}
//       <div className="fixed right-0 top-0 bottom-0 w-full md:w-[480px] bg-white shadow-2xl z-50 overflow-y-auto animate-slideIn">
//         <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
//           <h2 className="text-xl font-bold">Mentor Profile</h2>
//           <button 
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-lg transition"
//           >
//             <ChevronDown className="h-5 w-5 rotate-90" />
//           </button>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* Header */}
//           <div>
//             <div className="flex items-center gap-2 mb-2">
//               <h3 className="text-2xl font-bold">{mentor.name}</h3>
//               {mentor.recommended && (
//                 <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs">
//                   <Star className="h-3 w-3 fill-current" />
//                   <span>Recommended</span>
//                 </div>
//               )}
//             </div>
//             <p className="text-lg text-gray-700 font-medium">{mentor.expertise}</p>
//             <p className="text-gray-600">{mentor.degree}</p>
            
//             <div className="mt-3 flex flex-wrap gap-2">
//               {mentor.tags.map((t) => (
//                 <span key={t} className="px-3 py-1 rounded-full bg-gray-100 text-sm font-medium">
//                   {t}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Bio */}
//           <div>
//             <h4 className="font-semibold mb-2">About</h4>
//             <p className="text-gray-700 leading-relaxed">{mentor.bio}</p>
//           </div>

//           {/* Contact */}
//           <div className="space-y-3">
//             <h4 className="font-semibold">Contact & Links</h4>
//             <a 
//               href={`mailto:${mentor.email}`}
//               className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition"
//             >
//               <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
//                 📧
//               </div>
//               <div className="min-w-0 flex-1">
//                 <div className="text-sm font-medium">Email</div>
//                 <div className="text-sm text-gray-600 truncate">{mentor.email}</div>
//               </div>
//             </a>
            
//             <a 
//               href={mentor.linkedin}
//               target="_blank"
//               rel="noreferrer"
//               className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition"
//             >
//               <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
//                 <Linkedin className="h-5 w-5 text-blue-600" />
//               </div>
//               <div className="min-w-0 flex-1">
//                 <div className="text-sm font-medium">LinkedIn Profile</div>
//                 <div className="text-sm text-gray-600">View professional background</div>
//               </div>
//               <ExternalLink className="h-4 w-4 text-gray-400" />
//             </a>

//             <a 
//               href={mentor.resumeUrl}
//               className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition"
//             >
//               <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center">
//                 <FileText className="h-5 w-5 text-green-600" />
//               </div>
//               <div className="min-w-0 flex-1">
//                 <div className="text-sm font-medium">Resume</div>
//                 <div className="text-sm text-gray-600">Download CV</div>
//               </div>
//               <ExternalLink className="h-4 w-4 text-gray-400" />
//             </a>
//           </div>

//           {/* Pricing */}
//           <div>
//             <h4 className="font-semibold mb-3">Session Pricing</h4>
//             <div className="space-y-3">
//               <div className="p-4 rounded-xl border-2 border-gray-200 hover:border-black transition">
//                 <div className="flex items-center justify-between mb-2">
//                   <div>
//                     <div className="font-semibold">Skill Roadmap Session</div>
//                     <div className="text-sm text-gray-600">First session • 60 min</div>
//                   </div>
//                   <div className="flex items-center gap-1 text-xl font-bold">
//                     <IndianRupee className="h-5 w-5" />
//                     {mentor.fees?.roadmap ?? mentor.fee}
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-600">
//                   Get a personalized roadmap for your career goals
//                 </p>
//               </div>

//               <div className="p-4 rounded-xl border-2 border-gray-200 hover:border-black transition">
//                 <div className="flex items-center justify-between mb-2">
//                   <div>
//                     <div className="font-semibold">Career Clarity & Insights</div>
//                     <div className="text-sm text-gray-600">First session • 60 min</div>
//                   </div>
//                   <div className="flex items-center gap-1 text-xl font-bold">
//                     <IndianRupee className="h-5 w-5" />
//                     {mentor.fees?.clarity ?? mentor.fee}
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-600">
//                   Industry insights and career strategy guidance
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Action buttons */}
//           <div className="space-y-3 pt-4 border-t">
//             {!scheduled ? (
//               <button
//                 onClick={() => {
//                   onSchedule?.();
//                   alert(`Scheduled a first call with ${mentor.name}`);
//                 }}
//                 className="w-full py-3 px-4 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition"
//               >
//                 Schedule First Call
//               </button>
//             ) : (
//               <button
//                 onClick={() => alert(`Pay for ${mentor.name}`)}
//                 className="w-full py-3 px-4 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition"
//               >
//                 Pay Now
//               </button>
//             )}
//             <button
//               onClick={onClose}
//               className="w-full py-3 px-4 rounded-xl border border-gray-300 font-medium hover:bg-gray-50 transition"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes slideIn {
//           from { transform: translateX(100%); }
//           to { transform: translateX(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }
//         .animate-slideIn {
//           animation: slideIn 0.3s ease-out;
//         }
//       `}</style>
//     </>
//   );
// }

// const MentorsWireframe = () => {
//   const [query, setQuery] = useState("");
//   const [activeCat, setActiveCat] = useState("recommended");
//   const [selectedMentor, setSelectedMentor] = useState(null);
//   const [scheduledMap, setScheduledMap] = useState({});
//   const [visible, setVisible] = useState(12);

//   const filtered = useMemo(() => {
//     let list = [...seedMentors];

//     // Category filter
//     if (activeCat === "recommended") {
//       list = list.filter((m) => m.recommended);
//     } else if (activeCat !== "all") {
//       list = list.filter((m) => m.tags.includes(activeCat));
//     }

//     // Search filter
//     if (query.trim()) {
//       const q = query.toLowerCase();
//       list = list.filter(
//         (m) =>
//           m.name.toLowerCase().includes(q) ||
//           m.expertise.toLowerCase().includes(q) ||
//           m.degree.toLowerCase().includes(q) ||
//           m.tags.join(" ").toLowerCase().includes(q)
//       );
//     }

//     return list;
//   }, [query, activeCat]);

//   const display = filtered.slice(0, visible);
//   const canLoadMore = visible < filtered.length;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top nav (simplified) */}
//       <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
//         <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="h-6 w-6 rounded-full bg-black" />
//             <span className="font-semibold">FigureCircle</span>
//           </div>
//           <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
//             <a className="hover:text-black" href="#">Dashboard</a>
//             <a className="hover:text-black" href="#">Schedule</a>
//             <a className="font-semibold text-black" href="#">Mentors</a>
//             <a className="hover:text-black" href="#">Profile</a>
//           </nav>
//           <button className="text-sm rounded-xl border px-3 py-1.5">Log out</button>
//         </div>
//       </header>

//       <main className="mx-auto max-w-6xl px-4 py-8">
//         <h1 className="text-3xl font-bold">Mentors For You</h1>

//         {/* Smart recommendation banner */}
//         <div className="mt-3 rounded-2xl border bg-white p-4 flex items-center gap-3">
//           <Star className="h-5 w-5" />
//           <div className="text-sm">
//             <div className="font-medium">Recommended based on your profile</div>
//             <div className="text-gray-600">Data Science • Finance • Interview Prep</div>
//           </div>
//         </div>

//         {/* Search + Filter row */}
//         <div className="mt-4 flex flex-col md:flex-row gap-3 md:items-center">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search by name, expertise, or background…"
//               className="w-full rounded-xl border border-gray-300 pl-9 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
//             />
//             <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
//           </div>

//           <div className="flex flex-wrap items-center gap-2">
//             {categories.map((c) => (
//               <Pill
//                 key={c.key}
//                 active={activeCat === c.key}
//                 onClick={() => setActiveCat(c.key)}
//               >
//                 {c.label}
//               </Pill>
//             ))}
//           </div>
//         </div>

//         {/* Cards grid - more compact, 4 columns on large screens */}
//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//           {display.map((m) => (
//             <MentorCard
//               key={m.id}
//               m={m}
//               isSelected={selectedMentor?.id === m.id}
//               scheduled={!!scheduledMap[m.id]}
//               onSchedule={() => setScheduledMap((prev) => ({ ...prev, [m.id]: true }))}
//               onViewProfile={() => setSelectedMentor(m)}
//             />
//           ))}
//         </div>

//         {/* Load more */}
//         <div className="mt-8 flex justify-center">
//           {filtered.length === 0 ? (
//             <div className="text-center py-12">
//               <div className="text-gray-400 text-5xl mb-3">🔍</div>
//               <div className="text-gray-600 font-medium">No mentors match your search</div>
//               <div className="text-sm text-gray-500 mt-1">Try adjusting your filters or search terms</div>
//             </div>
//           ) : canLoadMore ? (
//             <button
//               onClick={() => setVisible((v) => v + 12)}
//               className="px-6 py-2.5 rounded-xl border-2 border-gray-200 bg-white hover:border-black hover:bg-gray-50 transition font-medium"
//             >
//               Load more mentors ({filtered.length - visible} remaining)
//             </button>
//           ) : filtered.length > 0 ? (
//             <div className="text-gray-500 text-sm">
//               Showing all {filtered.length} mentors
//             </div>
//           ) : null}
//         </div>
//       </main>

//       {/* Profile detail panel */}
//       <ProfilePanel
//         mentor={selectedMentor}
//         scheduled={selectedMentor && scheduledMap[selectedMentor.id]}
//         onSchedule={() => {
//           if (selectedMentor) {
//             setScheduledMap((prev) => ({ ...prev, [selectedMentor.id]: true }));
//           }
//         }}
//         onClose={() => setSelectedMentor(null)}
//       />
//     </div>
//   );
// };

// export default MentorsWireframe;
// import React, { useMemo, useState } from "react";
// import { Search, Star, X, Mail, Linkedin, FileText, ExternalLink, IndianRupee, ChevronRight, Sparkles } from "lucide-react";

// // --- Sample mentor data ---
// const seedMentors = [
//   {
//     id: 1,
//     name: "Swapnil Medical Mentor",
//     expertise: "Data Science for Finance",
//     degree: "Ph.D. Biotechnology",
//     fee: 5000,
//     fees: { roadmap: 5000, clarity: 3500 },
//     email: "swapniltiwari9503005@gmail.com",
//     linkedin: "https://www.linkedin.com/in/swapnil",
//     resumeUrl: "#",
//     bio: "I am very good with everything (placeholder). Focus: ML for finance, career strategy, interview prep.",
//     tags: ["Data Science", "Finance"],
//     recommended: true,
//   },
//   {
//     id: 2,
//     name: "Smriti Mentor 1000",
//     expertise: "Data Science",
//     degree: "M.Tech Computer Science",
//     fee: 4000,
//     fees: { roadmap: 4000, clarity: 2800 },
//     email: "smriti@example.com",
//     linkedin: "https://www.linkedin.com/in/smriti",
//     resumeUrl: "#",
//     bio: "Ex-FAANG DS, helps with roadmaps, projects, and mock interviews.",
//     tags: ["Data Science", "AI/ML"],
//     recommended: true,
//   },
//   {
//     id: 3,
//     name: "Harsh Mentor 2",
//     expertise: "Data Science for Finance",
//     degree: "B.Tech, MS Analytics",
//     fee: 4500,
//     fees: { roadmap: 4500, clarity: 3200 },
//     email: "harsh@example.com",
//     linkedin: "https://www.linkedin.com/in/harsh",
//     resumeUrl: "#",
//     bio: "Python for quant, resume reviews, capstone guidance.",
//     tags: ["Finance", "AI/ML"],
//     recommended: false,
//   },
//   {
//     id: 4,
//     name: "John Doe",
//     expertise: "Web Development",
//     degree: "M.S. Software Engineering",
//     fee: 3500,
//     fees: { roadmap: 3500, clarity: 2500 },
//     email: "john@example.com",
//     linkedin: "https://www.linkedin.com/in/johndoe",
//     resumeUrl: "#",
//     bio: "Full‑stack mentor: React/Next.js, interview prep, portfolio review.",
//     tags: ["Web Dev", "Frontend"],
//     recommended: false,
//   },
//   {
//     id: 5,
//     name: "Aisha Khan",
//     expertise: "AI/ML & Career Strategy",
//     degree: "Ph.D. Machine Learning",
//     fee: 7000,
//     fees: { roadmap: 7000, clarity: 5000 },
//     email: "aisha@example.com",
//     linkedin: "https://www.linkedin.com/in/aishakhan",
//     resumeUrl: "#",
//     bio: "Research to industry transitions, LLM projects, publications.",
//     tags: ["AI/ML", "Research"],
//     recommended: true,
//   },
//   {
//     id: 6,
//     name: "Miguel Reyes",
//     expertise: "Product Analytics",
//     degree: "MBA, B.S. Statistics",
//     fee: 4200,
//     fees: { roadmap: 4200, clarity: 3000 },
//     email: "miguel@example.com",
//     linkedin: "https://www.linkedin.com/in/miguel",
//     resumeUrl: "#",
//     bio: "SQL + experimentation + stakeholder management.",
//     tags: ["Analytics", "Product"],
//     recommended: false,
//   },
//   {
//     id: 7,
//     name: "Priya Patel",
//     expertise: "Cloud & DevOps",
//     degree: "M.S. Computer Science",
//     fee: 4800,
//     fees: { roadmap: 4800, clarity: 3400 },
//     email: "priya@example.com",
//     linkedin: "https://www.linkedin.com/in/priya",
//     resumeUrl: "#",
//     bio: "AWS/GCP, IaC, SRE interviews.",
//     tags: ["Cloud", "DevOps"],
//     recommended: false,
//   },
//   {
//     id: 8,
//     name: "Omar Farooq",
//     expertise: "Cybersecurity",
//     degree: "B.S. Information Security",
//     fee: 3900,
//     fees: { roadmap: 3900, clarity: 2800 },
//     email: "omar@example.com",
//     linkedin: "https://www.linkedin.com/in/omar",
//     resumeUrl: "#",
//     bio: "Red teaming, SOC roles, cert guidance.",
//     tags: ["Security"],
//     recommended: false,
//   },
// ];

// const categories = ["All", "Recommended", "Data Science", "AI/ML", "Finance", "Web Dev", "Analytics", "Cloud", "Security"];

// const MentorsWireframe = () => {
//   const [query, setQuery] = useState("");
//   const [activeCat, setActiveCat] = useState("Recommended");
//   const [selectedMentor, setSelectedMentor] = useState(seedMentors[0]);
//   const [scheduledMap, setScheduledMap] = useState({});

//   const filtered = useMemo(() => {
//     let list = [...seedMentors];

//     if (activeCat === "Recommended") {
//       list = list.filter((m) => m.recommended);
//     } else if (activeCat !== "All") {
//       list = list.filter((m) => m.tags.includes(activeCat));
//     }

//     if (query.trim()) {
//       const q = query.toLowerCase();
//       list = list.filter(
//         (m) =>
//           m.name.toLowerCase().includes(q) ||
//           m.expertise.toLowerCase().includes(q) ||
//           m.degree.toLowerCase().includes(q) ||
//           m.tags.join(" ").toLowerCase().includes(q)
//       );
//     }

//     return list;
//   }, [query, activeCat]);

//   return (
//     <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Top Header */}
//       <header className="bg-white border-b px-6 py-4 flex items-center justify-between shrink-0">
//         <div className="flex items-center gap-3">
//           <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600" />
//           <span className="font-bold text-xl">FigureCircle</span>
//         </div>
//         <nav className="hidden md:flex items-center gap-6 text-sm">
//           <a className="text-gray-600 hover:text-black" href="#">Dashboard</a>
//           <a className="text-gray-600 hover:text-black" href="#">Schedule</a>
//           <a className="font-semibold text-black border-b-2 border-black pb-1" href="#">Mentors</a>
//           <a className="text-gray-600 hover:text-black" href="#">Profile</a>
//         </nav>
//         <button className="px-4 py-2 rounded-lg border hover:bg-gray-50 text-sm">Sign Out</button>
//       </header>

//       {/* Main Split View */}
//       <div className="flex-1 flex overflow-hidden">
//         {/* LEFT PANEL - Mentor List */}
//         <div className="w-full md:w-[420px] lg:w-[480px] bg-white border-r flex flex-col">
//           {/* Search & Filters */}
//           <div className="p-4 border-b space-y-3 shrink-0">
//             <div className="flex items-center gap-2">
//               <h2 className="text-xl font-bold flex-1">Discover Mentors</h2>
//               <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-50 text-purple-700 text-xs font-medium">
//                 <Sparkles className="h-3 w-3" />
//                 AI Matched
//               </div>
//             </div>
            
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search mentors..."
//                 className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
//               />
//             </div>

//             <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
//               {categories.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => setActiveCat(cat)}
//                   className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
//                     activeCat === cat
//                       ? "bg-black text-white"
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Mentor List - Scrollable */}
//           <div className="flex-1 overflow-y-auto">
//             {filtered.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8 text-center">
//                 <div className="text-4xl mb-3">🔍</div>
//                 <p className="font-medium">No mentors found</p>
//                 <p className="text-sm">Try adjusting your filters</p>
//               </div>
//             ) : (
//               <div className="divide-y">
//                 {filtered.map((m) => (
//                   <button
//                     key={m.id}
//                     onClick={() => setSelectedMentor(m)}
//                     className={`w-full text-left p-4 hover:bg-gray-50 transition group ${
//                       selectedMentor?.id === m.id ? "bg-purple-50 hover:bg-purple-50" : ""
//                     }`}
//                   >
//                     <div className="flex items-start gap-3">
//                       <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 shrink-0 flex items-center justify-center text-white font-bold text-lg">
//                         {m.name[0]}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-2 mb-1">
//                           <h3 className="font-semibold truncate">{m.name}</h3>
//                           {m.recommended && (
//                             <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 shrink-0" />
//                           )}
//                         </div>
//                         <p className="text-sm text-gray-600 truncate">{m.expertise}</p>
//                         <p className="text-xs text-gray-500 truncate mt-0.5">{m.degree}</p>
//                         <div className="flex items-center gap-2 mt-2">
//                           <div className="flex items-center gap-1 text-sm font-semibold">
//                             <IndianRupee className="h-3.5 w-3.5" />
//                             {m.fees.roadmap}
//                           </div>
//                           <div className="flex gap-1">
//                             {m.tags.slice(0, 2).map((t) => (
//                               <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gray-100">
//                                 {t}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                       <ChevronRight className={`h-5 w-5 text-gray-400 transition ${
//                         selectedMentor?.id === m.id ? "text-purple-600" : "group-hover:translate-x-0.5"
//                       }`} />
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* RIGHT PANEL - Mentor Detail */}
//         <div className="flex-1 flex flex-col bg-white overflow-y-auto">
//           {selectedMentor ? (
//             <div className="max-w-3xl mx-auto w-full p-8">
//               {/* Header */}
//               <div className="mb-8">
//                 <div className="flex items-start gap-4 mb-4">
//                   <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-purple-400 to-blue-400 shrink-0 flex items-center justify-center text-white font-bold text-3xl">
//                     {selectedMentor.name[0]}
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-2">
//                       <h1 className="text-3xl font-bold">{selectedMentor.name}</h1>
//                       {selectedMentor.recommended && (
//                         <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-sm">
//                           <Star className="h-4 w-4 fill-current" />
//                           Recommended
//                         </div>
//                       )}
//                     </div>
//                     <p className="text-xl text-gray-700 font-medium mb-1">{selectedMentor.expertise}</p>
//                     <p className="text-gray-600">{selectedMentor.degree}</p>
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap gap-2 mb-6">
//                   {selectedMentor.tags.map((t) => (
//                     <span key={t} className="px-4 py-2 rounded-full bg-gray-100 font-medium">
//                       {t}
//                     </span>
//                   ))}
//                 </div>

//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => {
//                       setScheduledMap((prev) => ({ ...prev, [selectedMentor.id]: true }));
//                       alert(`Scheduled with ${selectedMentor.name}`);
//                     }}
//                     className="flex-1 py-3 px-6 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
//                   >
//                     {scheduledMap[selectedMentor.id] ? "Pay Now" : "Book Session"}
//                   </button>
//                   <button className="px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-400 transition">
//                     <Mail className="h-5 w-5" />
//                   </button>
//                 </div>
//               </div>

//               {/* About */}
//               <div className="mb-8">
//                 <h2 className="text-lg font-bold mb-3">About</h2>
//                 <p className="text-gray-700 leading-relaxed">{selectedMentor.bio}</p>
//               </div>

//               {/* Contact */}
//               <div className="mb-8">
//                 <h2 className="text-lg font-bold mb-3">Connect</h2>
//                 <div className="grid gap-3">
//                   <a 
//                     href={`mailto:${selectedMentor.email}`}
//                     className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-gray-300 transition"
//                   >
//                     <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center">
//                       <Mail className="h-6 w-6 text-gray-600" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <div className="font-semibold">Email</div>
//                       <div className="text-sm text-gray-600 truncate">{selectedMentor.email}</div>
//                     </div>
//                     <ExternalLink className="h-5 w-5 text-gray-400" />
//                   </a>

//                   <a 
//                     href={selectedMentor.linkedin}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-gray-300 transition"
//                   >
//                     <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">
//                       <Linkedin className="h-6 w-6 text-blue-600" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="font-semibold">LinkedIn</div>
//                       <div className="text-sm text-gray-600">Professional profile</div>
//                     </div>
//                     <ExternalLink className="h-5 w-5 text-gray-400" />
//                   </a>

//                   <a 
//                     href={selectedMentor.resumeUrl}
//                     className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-gray-300 transition"
//                   >
//                     <div className="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center">
//                       <FileText className="h-6 w-6 text-green-600" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="font-semibold">Resume</div>
//                       <div className="text-sm text-gray-600">Download CV</div>
//                     </div>
//                     <ExternalLink className="h-5 w-5 text-gray-400" />
//                   </a>
//                 </div>
//               </div>

//               {/* Pricing */}
//               <div>
//                 <h2 className="text-lg font-bold mb-3">Session Options</h2>
//                 <div className="grid gap-4">
//                   <div className="p-6 rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-transparent">
//                     <div className="flex items-start justify-between mb-3">
//                       <div>
//                         <h3 className="font-bold text-lg mb-1">Skill Roadmap Session</h3>
//                         <p className="text-sm text-gray-600">First session • 60 minutes</p>
//                       </div>
//                       <div className="flex items-center gap-1 text-2xl font-bold">
//                         <IndianRupee className="h-6 w-6" />
//                         {selectedMentor.fees.roadmap}
//                       </div>
//                     </div>
//                     <p className="text-gray-700">
//                       Get a personalized roadmap tailored to your career goals and current skill level.
//                     </p>
//                   </div>

//                   <div className="p-6 rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-transparent">
//                     <div className="flex items-start justify-between mb-3">
//                       <div>
//                         <h3 className="font-bold text-lg mb-1">Career Clarity & Insights</h3>
//                         <p className="text-sm text-gray-600">First session • 60 minutes</p>
//                       </div>
//                       <div className="flex items-center gap-1 text-2xl font-bold">
//                         <IndianRupee className="h-6 w-6" />
//                         {selectedMentor.fees.clarity}
//                       </div>
//                     </div>
//                     <p className="text-gray-700">
//                       Industry insights, career strategy guidance, and answers to your burning questions.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex-1 flex items-center justify-center text-gray-400">
//               <div className="text-center">
//                 <div className="text-6xl mb-4">👈</div>
//                 <p className="text-lg font-medium">Select a mentor to view details</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <style>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default MentorsWireframe;
import { useMemo, useState } from "react";
import { Search, Star, X, Heart, Info, Mail, Linkedin, FileText, IndianRupee, ChevronLeft, ChevronRight, Bookmark } from "lucide-react";

// --- Sample mentor data ---
const seedMentors = [
  {
    id: 1,
    name: "Swapnil Medical Mentor",
    expertise: "Data Science for Finance",
    degree: "Ph.D. Biotechnology",
    fee: 5000,
    fees: { roadmap: 5000, clarity: 3500 },
    email: "swapniltiwari9503005@gmail.com",
    linkedin: "https://www.linkedin.com/in/swapnil",
    resumeUrl: "#",
    bio: "I am very good with everything (placeholder). Focus: ML for finance, career strategy, interview prep.",
    tags: ["Data Science", "Finance"],
    recommended: true,
  },
  {
    id: 2,
    name: "Smriti Mentor 1000",
    expertise: "Data Science",
    degree: "M.Tech Computer Science",
    fee: 4000,
    fees: { roadmap: 4000, clarity: 2800 },
    email: "smriti@example.com",
    linkedin: "https://www.linkedin.com/in/smriti",
    resumeUrl: "#",
    bio: "Ex-FAANG DS, helps with roadmaps, projects, and mock interviews.",
    tags: ["Data Science", "AI/ML"],
    recommended: true,
  },
  {
    id: 3,
    name: "Harsh Mentor 2",
    expertise: "Data Science for Finance",
    degree: "B.Tech, MS Analytics",
    fee: 4500,
    fees: { roadmap: 4500, clarity: 3200 },
    email: "harsh@example.com",
    linkedin: "https://www.linkedin.com/in/harsh",
    resumeUrl: "#",
    bio: "Python for quant, resume reviews, capstone guidance.",
    tags: ["Finance", "AI/ML"],
    recommended: false,
  },
  {
    id: 4,
    name: "John Doe",
    expertise: "Web Development",
    degree: "M.S. Software Engineering",
    fee: 3500,
    fees: { roadmap: 3500, clarity: 2500 },
    email: "john@example.com",
    linkedin: "https://www.linkedin.com/in/johndoe",
    resumeUrl: "#",
    bio: "Full‑stack mentor: React/Next.js, interview prep, portfolio review.",
    tags: ["Web Dev", "Frontend"],
    recommended: false,
  },
  {
    id: 5,
    name: "Aisha Khan",
    expertise: "AI/ML & Career Strategy",
    degree: "Ph.D. Machine Learning",
    fee: 7000,
    fees: { roadmap: 7000, clarity: 5000 },
    email: "aisha@example.com",
    linkedin: "https://www.linkedin.com/in/aishakhan",
    resumeUrl: "#",
    bio: "Research to industry transitions, LLM projects, publications.",
    tags: ["AI/ML", "Research"],
    recommended: true,
  },
  {
    id: 6,
    name: "Miguel Reyes",
    expertise: "Product Analytics",
    degree: "MBA, B.S. Statistics",
    fee: 4200,
    fees: { roadmap: 4200, clarity: 3000 },
    email: "miguel@example.com",
    linkedin: "https://www.linkedin.com/in/miguel",
    resumeUrl: "#",
    bio: "SQL + experimentation + stakeholder management.",
    tags: ["Analytics", "Product"],
    recommended: false,
  },
  {
    id: 7,
    name: "Priya Patel",
    expertise: "Cloud & DevOps",
    degree: "M.S. Computer Science",
    fee: 4800,
    fees: { roadmap: 4800, clarity: 3400 },
    email: "priya@example.com",
    linkedin: "https://www.linkedin.com/in/priya",
    resumeUrl: "#",
    bio: "AWS/GCP, IaC, SRE interviews.",
    tags: ["Cloud", "DevOps"],
    recommended: false,
  },
  {
    id: 8,
    name: "Omar Farooq",
    expertise: "Cybersecurity",
    degree: "B.S. Information Security",
    fee: 3900,
    fees: { roadmap: 3900, clarity: 2800 },
    email: "omar@example.com",
    linkedin: "https://www.linkedin.com/in/omar",
    resumeUrl: "#",
    bio: "Red teaming, SOC roles, cert guidance.",
    tags: ["Security"],
    recommended: false,
  },
];

const categories = ["All", "Recommended", "Data Science", "AI/ML", "Finance", "Web Dev", "Analytics"];

const MentorsWireframe = () => {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("Recommended");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [savedMentors, setSavedMentors] = useState<number[]>([]);
  const [passedMentors, setPassedMentors] = useState<number[]>([]);

  const filtered = useMemo(() => {
    let list = [...seedMentors];

    if (activeCat === "Recommended") {
      list = list.filter((m) => m.recommended);
    } else if (activeCat !== "All") {
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

    // Filter out saved and passed mentors
    return list.filter(m => !savedMentors.includes(m.id) && !passedMentors.includes(m.id));
  }, [query, activeCat, savedMentors, passedMentors]);

  const currentMentor = filtered[currentIndex];

  const handleNext = () => {
    if (currentIndex < filtered.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowDetails(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowDetails(false);
    }
  };

  const handleSave = () => {
    if (currentMentor) {
      setSavedMentors([...savedMentors, currentMentor.id]);
      handleNext();
    }
  };

  const handlePass = () => {
    if (currentMentor) {
      setPassedMentors([...passedMentors, currentMentor.id]);
      handleNext();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50">
      {/* Top Header */}
      <header className="bg-white/80 backdrop-blur border-b px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-rose-500 to-purple-600" />
          <span className="font-bold text-xl">FigureCircle</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              setCurrentIndex(0);
              setSavedMentors([]);
              setPassedMentors([]);
            }}
            className="text-sm text-gray-600 hover:text-black"
          >
            Reset
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
            <Bookmark className="h-4 w-4" />
            {savedMentors.length} Saved
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="bg-white/80 backdrop-blur border-b px-6 py-4 shrink-0">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentIndex(0);
              }}
              placeholder="Search by name, expertise, or skills..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCat(cat);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  activeCat === cat
                    ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Card Area */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
        {currentMentor ? (
          <div className="max-w-lg w-full">
            {/* Progress indicator */}
            <div className="mb-4 flex items-center justify-center gap-2">
              <span className="text-sm font-medium text-gray-600">
                {currentIndex + 1} / {filtered.length}
              </span>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header with gradient */}
              <div className="relative h-48 bg-gradient-to-br from-rose-400 via-purple-500 to-blue-500 flex items-end p-6">
                <div className="absolute top-4 right-4 flex gap-2">
                  {currentMentor.recommended && (
                    <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-purple-700 text-xs font-bold flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      TOP PICK
                    </div>
                  )}
                </div>
                <div className="h-24 w-24 rounded-2xl bg-white flex items-center justify-center text-4xl font-bold text-purple-600 shadow-lg">
                  {currentMentor.name[0]}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-1">{currentMentor.name}</h2>
                <p className="text-lg text-purple-600 font-medium mb-2">{currentMentor.expertise}</p>
                <p className="text-gray-600 mb-4">{currentMentor.degree}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {currentMentor.tags.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                      {t}
                    </span>
                  ))}
                </div>

                {!showDetails ? (
                  <>
                    <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
                      {currentMentor.bio}
                    </p>
                    <button
                      onClick={() => setShowDetails(true)}
                      className="text-purple-600 font-medium flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      View full profile <Info className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    <div>
                      <h3 className="font-semibold mb-2">About</h3>
                      <p className="text-gray-700 leading-relaxed">{currentMentor.bio}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Contact</h3>
                      <div className="space-y-2 text-sm">
                        <a href={`mailto:${currentMentor.email}`} className="flex items-center gap-2 text-gray-700 hover:text-purple-600">
                          <Mail className="h-4 w-4" />
                          {currentMentor.email}
                        </a>
                        <a href={currentMentor.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-purple-600">
                          <Linkedin className="h-4 w-4" />
                          LinkedIn Profile
                        </a>
                        <a href={currentMentor.resumeUrl} className="flex items-center gap-2 text-gray-700 hover:text-purple-600">
                          <FileText className="h-4 w-4" />
                          View Resume
                        </a>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Pricing</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50">
                          <span className="text-sm">Skill Roadmap</span>
                          <span className="font-bold flex items-center gap-1">
                            <IndianRupee className="h-4 w-4" />
                            {currentMentor.fees.roadmap}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                          <span className="text-sm">Career Clarity</span>
                          <span className="font-bold flex items-center gap-1">
                            <IndianRupee className="h-4 w-4" />
                            {currentMentor.fees.clarity}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowDetails(false)}
                      className="text-gray-600 text-sm hover:text-black"
                    >
                      ← Show less
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center justify-center gap-6">
                <button
                  onClick={handlePass}
                  className="h-16 w-16 rounded-full border-4 border-gray-200 bg-white hover:border-gray-400 hover:scale-110 transition-all shadow-lg flex items-center justify-center group"
                  title="Pass"
                >
                  <X className="h-8 w-8 text-gray-400 group-hover:text-gray-600" />
                </button>

                <button
                  onClick={handleSave}
                  className="h-20 w-20 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 hover:scale-110 transition-all shadow-xl flex items-center justify-center group"
                  title="Save to shortlist"
                >
                  <Heart className="h-10 w-10 text-white fill-white" />
                </button>

                <button
                  onClick={() => {
                    alert(`Booking session with ${currentMentor.name}`);
                  }}
                  className="h-16 w-16 rounded-full border-4 border-purple-200 bg-white hover:border-purple-400 hover:scale-110 transition-all shadow-lg flex items-center justify-center group"
                  title="Book immediately"
                >
                  <Bookmark className="h-7 w-7 text-purple-600 group-hover:fill-purple-600" />
                </button>
              </div>

              {/* Navigation */}
              <div className="px-6 pb-6 flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === filtered.length - 1}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Keyboard hints */}
            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-500">
              <span>← Pass</span>
              <span>♥ Save</span>
              <span>→ Next</span>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">You've reviewed all mentors!</h2>
            <p className="text-gray-600 mb-6">
              {savedMentors.length > 0 
                ? `You saved ${savedMentors.length} mentor${savedMentors.length > 1 ? 's' : ''} to your shortlist.`
                : "No mentors saved yet."}
            </p>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setSavedMentors([]);
                setPassedMentors([]);
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold hover:shadow-lg transition"
            >
              Start Over
            </button>
          </div>
        )}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default MentorsWireframe;