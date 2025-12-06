// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Loader2, Plus } from "lucide-react";

// interface IntentPrice {
//   intent: string;
//   price: number;
// }

// const MentorProfileWidget=() =>{
//   const [mentor, setMentor] = useState<any>({
//     name: "",
//     email: "",
//     phone: "",
//     linkedin: "",
//     expertise: "",
//     background: "",
//     fee: "",
//     milestones: 0,
//     intent_price: [],
//   });

//   const [loading, setLoading] = useState(false);

//   // Mock API fetch
//   useEffect(() => {
//     async function fetchMentor() {
//       // Replace with your GET /mentor/me
//       const data = {
//         name: "John Doessss",
//         email: "newRandomMentor121@gmail.com",
//         phone: "+1234567890",
//         linkedin: "https://linkedin.com/in/johndoe",
//         expertise: "Data Science, AI",
//         background: "5 years in AI research and development.",
//         fee: "100",
//         milestones: 5,
//         intent_price: [
//           { intent: "Career Guidance", price: 100.0 },
//           { intent: "Technical Interview Prep", price: 150.0 },
//           { intent: "Resume Review", price: 75.0 },
//         ],
//       };

//       setMentor(data);
//     }

//     fetchMentor();
//   }, []);

//   const updateField = (field: string, value: any) => {
//     setMentor((prev: any) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const updateIntent = (index: number, field: string, value: any) => {
//     setMentor((prev: any) => {
//       const updated = [...prev.intent_price];
//       updated[index][field] = value;
//       return { ...prev, intent_price: updated };
//     });
//   };

//   const addIntent = () => {
//     setMentor((prev: any) => ({
//       ...prev,
//       intent_price: [...prev.intent_price, { intent: "", price: 0 }],
//     }));
//   };

//   const saveProfile = async () => {
//     setLoading(true);

//     try {
//       // Replace with PUT /mentor/me - your backend API
//       console.log("Saving mentor data:", mentor);

//       setTimeout(() => {
//         setLoading(false);
//       }, 1200);
//     } catch (err) {
//       console.error("Error saving profile", err);
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="shadow-sm rounded-2xl ">
//       <CardContent className="p-6 space-y-6 ">
//         <h2 className="text-xl font-semibold">Mentor Profile</h2>

//         <div className="grid gap-5 sm:grid-cols-2">
//           <div>
//             <Label>Name</Label>
//             <Input
//               value={mentor.name}
//               onChange={(e) => updateField("name", e.target.value)}
//             />
//           </div>

//           <div>
//             <Label>Email</Label>
//             <Input
//               value={mentor.email}
//               onChange={(e) => updateField("email", e.target.value)}
//             />
//           </div>

//           <div>
//             <Label>Phone</Label>
//             <Input
//               value={mentor.phone}
//               onChange={(e) => updateField("phone", e.target.value)}
//             />
//           </div>

//           <div>
//             <Label>LinkedIn</Label>
//             <Input
//               value={mentor.linkedin}
//               onChange={(e) => updateField("linkedin", e.target.value)}
//             />
//           </div>

//           <div>
//             <Label>Expertise</Label>
//             <Input
//               value={mentor.expertise}
//               onChange={(e) => updateField("expertise", e.target.value)}
//               placeholder="Data Science, AI, etc."
//             />
//           </div>

//           <div>
//             <Label>Total Fee</Label>
//             <Input
//               type="number"
//               value={mentor.fee}
//               onChange={(e) => updateField("fee", e.target.value)}
//             />
//           </div>

//           <div>
//             <Label>Milestones Count</Label>
//             <Input
//               type="number"
//               value={mentor.milestones}
//               onChange={(e) => updateField("milestones", Number(e.target.value))}
//             />
//           </div>
//         </div>

//         <div>
//           <Label>Background</Label>
//           <Input
//             value={mentor.background}
//             onChange={(e) => updateField("background", e.target.value)}
//           />
//         </div>

//         {/* INTENT + PRICE SECTION */}
//         <div className="space-y-3">
//           <div className="flex items-center justify-between">
//             <Label>Intent Pricing</Label>
//             <Button size="sm" variant="secondary" onClick={addIntent}>
//               <Plus className="h-4 w-4 mr-1" /> Add
//             </Button>
//           </div>

//           {mentor.intent_price.map((item: IntentPrice, index: number) => (
//             <div
//               key={index}
//               className="grid gap-3 sm:grid-cols-2 border p-3 rounded-xl"
//             >
//               <div>
//                 <Label>Intent</Label>
//                 <Input
//                   value={item.intent}
//                   onChange={(e) => updateIntent(index, "intent", e.target.value)}
//                 />
//               </div>

//               <div>
//                 <Label>Price</Label>
//                 <Input
//                   type="number"
//                   value={item.price}
//                   onChange={(e) =>
//                     updateIntent(index, "price", Number(e.target.value))
//                   }
//                 />
//               </div>
//             </div>
//           ))}
//         </div>

//         <Button
//           className="w-full mt-4"
//           onClick={saveProfile}
//           disabled={loading}
//         >
//           {loading ? (
//             <Loader2 className="animate-spin h-4 w-4" />
//           ) : (
//             "Save Profile"
//           )}
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }
// export default MentorProfileWidget;
// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";

// const OPTIONS = [
//   { id: "skill-roadmap", label: "Skill Roadmapping" },
//   { id: "career-clarity", label: "Career Clarity & Connections" },
// ];

// const MentorProfileWidget = () => {
//   const [mentor, setMentor] = useState<any>({
//     name: "",
//     email: "",
//     phone: "",
//     linkedin: "",
//     expertise: "",
//     background: "",
//     fee: 0,
//     milestones: 0,
//     intent_price: [],
//   });

//   const [loading, setLoading] = useState(false);

//   // Mock initial data
//   useEffect(() => {
//     const data = {
//       name: "John Doe",
//       email: "newRandomMentor121@gmail.com",
//       phone: "+1234567890",
//       linkedin: "https://linkedin.com/in/johndoe",
//       expertise: "Data Science, AI",
//       background: "5 years in AI research and development.",
//       fee: 0,
//       milestones: 5,
//       intent_price: [
//         { id: "skill-roadmap", label: "Skill Roadmapping", price: 800 },
//       ],
//     };

//     setMentor(data);
//   }, []);

//   const updateField = (field: string, value: any) => {
//     setMentor((prev: any) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   // Add or remove intent
//   const toggleIntent = (option: any) => {
//     setMentor((prev: any) => {
//       const exists = prev.intent_price.find((i: any) => i.id === option.id);

//       let updated;

//       if (exists) {
//         // Remove
//         updated = prev.intent_price.filter((i: any) => i.id !== option.id);
//       } else {
//         // Add with empty price
//         updated = [
//           ...prev.intent_price,
//           { id: option.id, label: option.label, price: 0 },
//         ];
//       }

//       // Recalculate total fee
//       const total = updated.reduce((sum: number, item: any) => sum + (item.price || 0), 0);

//       return { ...prev, intent_price: updated, fee: total };
//     });
//   };

//   const updateIntentPrice = (id: string, newPrice: number) => {
//     setMentor((prev: any) => {
//       const updated = prev.intent_price.map((item: any) =>
//         item.id === id ? { ...item, price: newPrice } : item
//       );

//       const total = updated.reduce((sum: number, item: any) => sum + (item.price || 0), 0);

//       return { ...prev, intent_price: updated, fee: total };
//     });
//   };

//   const saveProfile = async () => {
//     setLoading(true);

//     try {
//       console.log("Saving mentor profile:", mentor);

//       setTimeout(() => {
//         setLoading(false);
//       }, 1200);
//     } catch (err) {
//       setLoading(false);
//       console.error("Error:", err);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto w-full">
//     <Card className="shadow-sm rounded-2xl">
//       <CardContent className="p-6 space-y-6">
//         <h2 className="text-xl font-semibold">Mentor Profile</h2>

//         {/* BASIC FIELDS */}
//         <div className="grid gap-5 sm:grid-cols-2">
//           <div>
//             <Label>Name</Label>
//             <Input value={mentor.name} onChange={(e) => updateField("name", e.target.value)} />
//           </div>

//           <div>
//             <Label>Email</Label>
//             <Input value={mentor.email} onChange={(e) => updateField("email", e.target.value)} />
//           </div>

//           <div>
//             <Label>Phone</Label>
//             <Input value={mentor.phone} onChange={(e) => updateField("phone", e.target.value)} />
//           </div>

//           <div>
//             <Label>LinkedIn</Label>
//             <Input value={mentor.linkedin} onChange={(e) => updateField("linkedin", e.target.value)} />
//           </div>

//           <div>
//             <Label>Expertise</Label>
//             <Input value={mentor.expertise} onChange={(e) => updateField("expertise", e.target.value)} />
//           </div>

//           {/* <div>
//             <Label>Total Fee (Auto Calculated)</Label>
//             <Input readOnly value={mentor.fee} />
//           </div> */}

//           <div>
//             <Label>Milestones</Label>
//             <Input
//               type="number"
//               value={mentor.milestones}
//               onChange={(e) => updateField("milestones", Number(e.target.value))}
//             />
//           </div>
//         </div>

//         {/* BACKGROUND */}
//         <div>
//           <Label>Background</Label>
//           <Input value={mentor.background} onChange={(e) => updateField("background", e.target.value)} />
//         </div>

//         {/* INTENT OPTIONS */}
//         <div className="space-y-4">
//           <Label className="text-md font-medium">Select Intent Options</Label>

//           <div className="grid gap-4">
//             {OPTIONS.map((opt) => {
//               const selected = mentor.intent_price.find((i: any) => i.id === opt.id);

//               return (
//                 <div key={opt.id} className="border p-4 rounded-xl space-y-3">
//                   <div className="flex items-center justify-between">
//                     <p className="font-medium">{opt.label}</p>

//                     <Button
//                       variant={selected ? "destructive" : "default"}
//                       onClick={() => toggleIntent(opt)}
//                     >
//                       {selected ? "Remove" : "Add"}
//                     </Button>
//                   </div>

//                   {selected && (
//                     <div>
//                       <Label>Fee</Label>
//                       <Input
//                         type="number"
//                         value={selected.price}
//                         onChange={(e) =>
//                           updateIntentPrice(opt.id, Number(e.target.value))
//                         }
//                         placeholder="Enter fee"
//                       />
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* SAVE BUTTON */}
//         <Button className="w-full mt-4" onClick={saveProfile} disabled={loading}>
//           {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Save Profile"}
//         </Button>
//       </CardContent>
//     </Card>
//     </div>
//   );
// };

// export default MentorProfileWidget;

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Users } from "lucide-react";
import axios from "axios";
import baseURL from "@/config/config";

const OPTIONS = [
  { id: "skill-roadmap", label: "Skill Roadmapping" },
  { id: "career-support", label: "Career Clarity, Insights & Connections" },
];

const MentorProfileWidget = () => {
  const [mentor, setMentor] = useState<any>({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    expertise: "",
    background: "",
    milestones: 0,
    intent_price: [],
  });

  const [loading, setLoading] = useState(false);
  const user=localStorage.getItem("user");
  const parsedUser=user?JSON.parse(user):null;
  const degree=localStorage.getItem("degree");
  const parsedDegree=degree?JSON.parse(degree):null;

  const fetchMentorData=async()=>{
const res=await axios.get(`${baseURL}/api/mentor/details?user_id=${parsedUser?.user_id}`);
console.log("fecthdata0--mentor",res.data);
const data=res.data;
 setMentor(data);
}
  useEffect(() => {
    // const data = {
    //   name: "John Doe",
    //   email: "newRandomMentor121@gmail.com",
    //   phone: "+1234567890",
    //   linkedin: "https://linkedin.com/in/johndoe",
    //   expertise: "Data Science, AI",
    //   background: "5 years in AI research and development.",
    //   milestones: 5,
    //   intent_price: [
    //     { intent: "Career Guidance", price: 100 },
    //   ],
    // };


fetchMentorData();
   
  }, []);

  const updateField = (field: string, value: any) => {
    setMentor((prev: any) => ({ ...prev, [field]: value }));
  };

  // Add / remove an intent
  const toggleIntent = (opt: any) => {
    setMentor((prev: any) => {
      const exists = prev.intent_price.find((i: any) => i.intent === opt.label);

      let updated;
      if (exists) {
        updated = prev.intent_price.filter((i: any) => i.intent !== opt.label);
      } else {
        updated = [...prev.intent_price, { intent: opt.label, price: 0 }];
      }

      return { ...prev, intent_price: updated };
    });
  };

  // Update price for selected intent
  const updateIntentPrice = (label: string, price: number) => {
    setMentor((prev: any) => {
      const updated = prev.intent_price.map((item: any) =>
        item.intent === label ? { ...item, price } : item
      );

      return { ...prev, intent_price: updated };
    });
  };

  const saveProfile = async () => {
    setLoading(true);
    try {
        const token=localStorage.getItem("token");
        const res=await axios.put(`${baseURL}/update_mentor/${parsedDegree?.mentor_id}`,mentor,
             {
      headers: {
        Authorization: `Bearer ${token}`,  
        "Content-Type": "application/json",
      },
    }
        );
        console.log("res---update--mentor",res.data);
    //   console.log("Saving mentor data:", mentor);

      setTimeout(() => {
        setLoading(false);
        fetchMentorData();
    }, 1200);

    } catch (err) {
      console.error("Error saving profile", err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full"> 
      <Card className="shadow-sm rounded-2xl w-full">
        <CardContent className="p-4 px-6 space-y-6">
        <CardHeader className="border-b bg-gradient-to-r from-primary/10 to-transparent rounded-t-2xl">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Users className="size-5 text-primary" /> Your Profile
            </CardTitle>
          </CardHeader>

          {/* BASIC INFO */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label>Name</Label>
              <Input value={mentor.name} onChange={(e) => updateField("name", e.target.value)} />
            </div>

            <div>
              <Label>Email</Label>
              <Input value={mentor.email} onChange={(e) => updateField("email", e.target.value)} />
            </div>

            <div>
              <Label>Phone</Label>
              <Input value={mentor.phone} onChange={(e) => updateField("phone", e.target.value)} />
            </div>

            <div>
              <Label>LinkedIn</Label>
              <Input value={mentor.linkedin} onChange={(e) => updateField("linkedin", e.target.value)} />
            </div>

            <div>
              <Label>Expertise</Label>
              <Input value={mentor.expertise} onChange={(e) => updateField("expertise", e.target.value)} />
            </div>

            <div>
              <Label>Milestones Count</Label>
              <Input
                type="number"
                value={mentor.milestones}
                onChange={(e) => updateField("milestones", Number(e.target.value))}
              />
            </div>
          </div>

          {/* BACKGROUND */}
          <div>
            <Label>Background</Label>
            <Input value={mentor.background} onChange={(e) => updateField("background", e.target.value)} />
          </div>

          {/* INTENT PRICING */}
          <div className="space-y-4">
            <Label className="text-md font-medium">Intent Pricing</Label>

            <div className="grid gap-4">
              {OPTIONS.map((opt) => {
                const selected = mentor.intent_price.find((i: any) => i.intent === opt.label);

                return (
                  <div key={opt.id} className="border p-4 rounded-xl space-y-3 w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{opt.label}</p>

                      <Button
                        variant={selected ? "destructive" : "default"}
                        onClick={() => toggleIntent(opt)}
                      >
                        {selected ? "Remove" : "Add"}
                      </Button>
                    </div>

                    {selected && (
                      <div>
                        <Label>Price</Label>
                        <Input
                          type="number"
                          value={selected.price}
                          onChange={(e) => updateIntentPrice(opt.label, Number(e.target.value))}
                          placeholder="Enter price"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* SAVE BUTTON */}
          <Button className="w-full mt-4" onClick={saveProfile} disabled={loading}>
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Save Profile"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentorProfileWidget;

