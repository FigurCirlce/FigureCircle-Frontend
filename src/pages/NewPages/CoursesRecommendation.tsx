// // import { useState, FC } from "react"
// // import { Button } from "@/components/ui/button"
// // import { BadgeCheck, GraduationCap, Trophy, LucideIcon } from "lucide-react"

// // interface RecommendationsPanelProps {
// //   profile?: "student" | "professional" | "other"
// //   initialTab?: "courses" | "certifications" | "competitions"
// // }

// // interface Item {
// //   id: string
// //   title: string
// // }

// // const sampleData: Record<"courses" | "certifications" | "competitions", Item[]> = {
// //   courses: [
// //     { id: "c1", title: "Intro to Product Analytics" },
// //     { id: "c2", title: "Practical SQL for Data" },
// //   ],
// //   certifications: [
// //     { id: "ct1", title: "AWS Cloud Practitioner" },
// //     { id: "ct2", title: "Google Data Analytics" },
// //   ],
// //   competitions: [
// //     { id: "cp1", title: "Kaggle – Tabular Playground" },
// //     { id: "cp2", title: "UX Case Hackathon" },
// //   ],
// // }

// // const icons: Record<"courses" | "certifications" | "competitions", LucideIcon> = {
// //   courses: GraduationCap,
// //   certifications: BadgeCheck,
// //   competitions: Trophy,
// // }

// // const RecommendationsPanel: FC<RecommendationsPanelProps> = ({ profile, initialTab = "courses" }) => {
// //   const [tab, setTab] = useState<"courses" | "certifications" | "competitions">(initialTab)
// //   const items = sampleData[tab] ?? []
// //   const Icon = icons[tab]

// //   return (
// //     <div className="max-w-3xl mx-auto p-6">
// //       <h2 className="text-2xl font-semibold mb-4 text-center">
// //         Recommended for You {profile ? <span className="text-gray-500 text-sm">· {profile}</span> : null}
// //       </h2>

// //       <div className="rounded-2xl border bg-white shadow-sm">
// //         <div className="p-5 sm:p-6">
// //           {/* Toggle / Segmented Control */}
// //           <div className="mb-5 flex justify-center">
// //             <div className="inline-flex rounded-lg border bg-white p-1 shadow-sm">
// //               {(["courses", "certifications", "competitions"] as const).map((t) => (
// //                 <Button
// //                   key={t}
// //                   size="sm"
// //                   variant={tab === t ? "default" : "ghost"}
// //                   className={`${tab === t ? "" : "text-gray-600"} rounded-md`}
// //                   onClick={() => setTab(t)}
// //                 >
// //                   {t.charAt(0).toUpperCase() + t.slice(1)}
// //                 </Button>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Content */}
// //           {items.length === 0 ? (
// //             <div className="mx-auto max-w-md rounded-md border p-4 text-gray-600 text-sm text-center">
// //               No recommendations available
// //             </div>
// //           ) : (
// //             <div className="mx-auto max-w-md">
// //               <ul className="list-disc list-inside space-y-2 text-sm text-left">
// //                 {items.map((it) => (
// //                   <li key={it.id} className="flex items-center gap-2">
// //                     <Icon className="w-4 h-4 text-blue-600" /> {it.title}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }



// // // ——— Dev-only sanity check ———
// // function validate(ds: Record<string, Item[]>) {
// //   for (const [key, arr] of Object.entries(ds)) {
// //     if (!Array.isArray(arr)) throw new Error(`Data for ${key} must be an array`)
// //     arr.forEach((it, i) => {
// //       if (!it.id || !it.title) throw new Error(`Missing id/title in ${key}[${i}]`)
// //     })
// //   }
// // }

// // if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
// //   try {
// //     validate({
// //       courses: [{ id: "ok", title: "ok" }],
// //       certifications: [{ id: "ok", title: "ok" }],
// //       competitions: [{ id: "ok", title: "ok" }],
// //     })
// //     try {
// //       validate({ courses: [{ id: "", title: "" }] } as any)
// //       console.warn("Expected validation error not thrown for negative case")
// //     } catch {}
// //   } catch (e) {
// //     console.error(e)
// //   }
// // }

// // export default RecommendationsPanel;
// import { useState, FC } from "react"
// import { Button } from "@/components/ui/button"
// // import coding from "../../assets/coding.jpg";

// interface RecommendationsPanelProps {
//   course: string[]
//   certificate: string[]
//   competition: string[]
//   profile?: "student" | "professional" | "other"
// }

// const RecommendationsPanel: FC<RecommendationsPanelProps> = ({
//   course,
//   certificate,
//    competition,
//   profile,
// }) => {
//    const [tab, setTab] = useState<"courses" | "certifications" | "competitions">(
//     // const [tab, setTab] = useState<"courses" | "certifications">(
//     "courses"
//   )

//   const tabs = ["courses", "certifications","competitions"] as const

//   const renderCards = () => {
//     let items: string[] = []
//     // let typeLabel = ""
//     // let bgColor = ""

//     switch (tab) {
//       case "courses":
//         items = course
//         // typeLabel = "Course"
//         // bgColor = "bg-orange-400"
//         break
//       case "certifications":
//         items = certificate
//         // typeLabel = "Certification"
//         // bgColor = "bg-blue-500"
//         break
//       case "competitions":
//         items = competition
//         // typeLabel = "Competition"
//         // bgColor = "bg-green-400"
//         break
//     }

//     if (!items || items.length === 0) {
//       return (
//         <div className="flex justify-center">
//           <p>No recommendations available</p>
//         </div>
//       )
//     }

//     return (
//       <div className="flex flex-wrap gap-x-3 gap-y-5 mx-5">
//         {items.map((item, i) => (
//           <div
//             key={i}
//             className="border-2 border-slate-200 w-[200px] max-h-[200px] rounded-lg shadow-lg"
//           >
//             {/* <img src={coding} alt={typeLabel} className="mb-2" />
//             <button
//               className={`${bgColor} text-white px-2 rounded-2xl text-xs my-2 mx-4`}
//             >
//               {typeLabel}
//             </button> */}
//             <h3 className="font-semibold text-gray-800 px-4 pb-2 text-sm">
//               {item}
//             </h3>
//           </div>
//         ))}
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col gap-6">
//       <div className="bg-white rounded-2xl p-6 flex-1 shadow">
//         <h2 className="text-2xl font-bold text-center">
//           Recommended for You {profile ? `· ${profile}` : ""}
//         </h2>

//         {/* Tab Buttons */}
//         <div className="flex justify-center gap-3 py-4">
//           {tabs.map((t) => (
//             <Button
//               key={t}
//               size="sm"
//               variant={tab === t ? "default" : "ghost"}
//               className={`${tab === t ? "" : "text-gray-600"} rounded-md`}
//               onClick={() => setTab(t)}
//             >
//               {t.charAt(0).toUpperCase() + t.slice(1)}
//             </Button>
//           ))}
//         </div>

//         {/* Cards inside the tab */}
//         <div className="w-full flex justify-center p-3 items-center">  {renderCards()}</div>
      
//       </div>
//     </div>
//   )
// }

// export default RecommendationsPanel
import { useState, FC } from "react"
// import { Button } from "@/components/ui/button"

interface RecommendationsPanelProps {
  course: string[]
  certificate: string[]
  competition: string[]
  profile?: "student" | "professional" | "other"
}

const RecommendationsPanel: FC<RecommendationsPanelProps> = ({
  course,
  certificate,
  competition,
  profile,
}) => {
  const [tab, setTab] = useState<"courses" | "certifications" | "competitions">(
    "courses"
  )

  const tabs = ["courses", "certifications", "competitions"] as const

  const renderCards = () => {
    let items: string[] = []

    switch (tab) {
      case "courses":
        items = course
        break
      case "certifications":
        items = certificate
        break
      case "competitions":
        items = competition
        break
    }

    if (!items || items.length === 0) {
      return (
        <p className="text-sm text-gray-500">
          No recommendations available
        </p>
      )
    }

    return (
      <div className="flex flex-wrap justify-center gap-4 ">
        {items.map((item) => (
          <div
            key={item}
            className="
              
              rounded-lg
              border border-gray-200
              bg-white
              px-4 py-3
              shadow-sm
            "
          >
            <h3 className="text-sm font-medium text-gray-800">
              {item}
            </h3>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex justify-center w-full">
      <div className="w-full  bg-white rounded-2xl shadow p-6">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Recommended for You {profile ? `· ${profile}` : ""}
        </h2>

        {/* Tabs – NAVBAR STYLE (LIKE IMAGE) */}
        <div className="flex justify-center mt-6">
          <div className="flex gap-1 bg-gray-100 rounded-full p-1">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`
                  flex items-center gap-2
                  px-4 py-2
                  text-sm rounded-full
                  transition-all
                  ${
                    tab === t
                      ? "bg-white text-blue-600 shadow-sm font-medium"
                      : "text-gray-600 hover:text-gray-900"
                  }
                `}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="mt-6 flex justify-center">
          {renderCards()}
        </div>

      </div>
    </div>
  )
}

export default RecommendationsPanel

