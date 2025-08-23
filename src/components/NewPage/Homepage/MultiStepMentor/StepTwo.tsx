import React, { useState, ChangeEvent } from "react";
import {
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
} from "react";
import baseURL from "@/config/config";
import axios from "axios";
import { toast } from "react-toastify";

interface FormData {
  linkedin: string;
  expertise: string;
  degree: string;
  background: string;
  fee: string;
  milestones: number;
  profile_picture: File | null;
  resume:File | null;
  availability: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  current_role: string;
  work_experience: string;
  interested_field: string;
  intent_price: {
    intent: string;
    price: number;
  }[];
};


interface StepTwoProps {
  formData: {
    fullName: string;
    email: string;
    phone:string;
  };
}

const StepTwoMentor: ForwardRefRenderFunction<any, StepTwoProps> = (
  { formData },
  ref
) => {
  const [form, setForm] = useState<FormData>({
    linkedin: "https://linkedin.com/in/",
    expertise: "",
    degree: "",
    background: "",
    resume: null,
    current_role: "",
    work_experience: "",
    interested_field: "",
    profile_picture: null,
    fee: "100",
    milestones: 5,
    availability: [
      {
        day: "Monday",
        startTime: "10:00",
        endTime: "12:00",
      },
    ],
    intent_price:[],
  });
// State for intent_price array
const [intentPrice, setIntentPrice] = useState< { intent: string; price: number }[]>([
  { intent: "", price: 0 }, // initial row
]);

  // const [errors, setErrors] = useState<Errors>({});

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "profile_picture" | "resume"
  ) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, [field]: file }));
  };

  const notifySuccess = () => toast.success("Mentor Registered Successful!");
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = "dpwysillm";
    const uploadPreset = "figurecircule";
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(cloudinaryUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw new Error("Failed to upload file.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("-------formdata------", formData);

    const profileImageUrl = form.profile_picture
      ? await uploadToCloudinary(form.profile_picture)
      : null;
    const resumeUrl = form.resume
      ? await uploadToCloudinary(form.resume)
      : null;

    const newMentorData = {
      ...form,
      name: formData.fullName,
      email: formData.email,
      profile_picture: profileImageUrl,
      resume: resumeUrl,
      interested_field:"N/A",
      phone:formData.phone,
      intent_price: form.intent_price.map(item => ({
    ...item,
    price: parseFloat(item.price.toFixed(2)), // ensures float
  }))

    };

    //   const newMentorData={

    // name: "John Doe",
    // email: "testing.doe@examplesssssss.com",
    // phone: "+1234567890",
    // linkedin: "https://linkedin.com/in/johndoe",
    // expertise: "Data Science, AI",
    // degree: "MSc Computer Science",
    // background: "5 years in AI research and development.",
    // fee: "100",
    // milestones: 5,
    // profile_picture: "https://example.com/profile.jpg",
    // resume: "https://example.com/resume.pdf",
    // availability: [
    //   {
    //     "day": "Monday",
    //     "startTime": "10:00",
    //     "endTime": "12:00"
    //   },
    //   {
    //     "day": "Wednesday",
    //     "startTime": "14:00",
    //     "endTime": "16:00"
    //   }
    // ],
    // current_role: "Senior Data Scientist",
    // work_experience: "7 years",
    // interested_field: "Machine Learning, NLP"

    //   }
    // setUserInfo(prev => ({ ...prev, data_filed: true }));
    console.log("newUSERINFO----------", newMentorData);
     const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${baseURL}/add_new_mentor`,

        newMentorData,
        {
          headers: {
            //             Authorization: `Bearer ${

            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        //   setStatus("success");
        notifySuccess();
        // navigate('/dashboard');
        // alert("mentor created successfully");
      }
    } catch (error) {
      alert("Submission failed. Please try again.");
      console.error("Error submitting data:", error);
      // setStatus("error");
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    <div className="max-w-full mx-auto p-4 bg-white rounded-2xl shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3 w-full">
          <div>
            <label className="block text-sm font-medium mb-1">
              Highest Education
            </label>
            <input
              name="degree"
              value={form.degree}
              onChange={handleChange}
              className="w-[250px] rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter Your Highest Education"
            />
            {/* {errors.degree && <p className="text-xs text-red-600 mt-1">{errors.degree}</p>} */}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              LinkedIn (optional)
            </label>
            <input
              name="linkedin"
              value={form.linkedin}
              onChange={handleChange}
              className="w-[250px] rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="https://www.linkedin.com/in"
            />
          </div>
        </div>
        <div className="flex gap-3 w-full">
          <div>
            <label className="block text-sm font-medium mb-1">
              Work Experience (years)
            </label>
            <input
              name="work_experience"
              value={form.work_experience}
              onChange={handleChange}
              className="w-[250px] rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="e.g. 2 or 2.5"
            />
            {/* {errors.work_experience && <p className="text-xs text-red-600 mt-1">{errors.work_experience}</p>} */}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Current Role
            </label>
            <input
              name="current_role"
              value={form.current_role}
              onChange={handleChange}
              className="w-[250px] rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="e.g. Full-Stack Developer"
            />
            {/* {errors.current_role && <p className="text-xs text-red-600 mt-1">{errors.current_role}</p>} */}
          </div>
        </div>

        <div className="flex gap-3 w-full">
          <div>
            <label className="block text-sm font-medium mb-1">Subject Expertise</label>
            <select
              name="expertise"
              value={form.expertise}
              onChange={handleChange}
              className="w-[250px] rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select a field</option>
              <option>AI / Machine Learning</option>
              <option>Web Development</option>
              <option>DevOps</option>
              <option>Data Science</option>
              <option>Product Management</option>
              <option>Other</option>
            </select>
            {/* {errors.expertise && <p className="text-xs text-red-600 mt-1">{errors.expertise}</p>} */}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Resume upload (PDF / DOC / DOCX)
            </label>
            <input
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileChange(e, "resume")}
            />

            {/* {errors.resume && <p className="text-xs text-red-600 mt-1">{errors.resume}</p>} */}
          </div>
        </div>

        <div className="flex gap-3 w-full">
          <div>
            <label className="block text-sm font-medium mb-1">Background</label>
            <input
              name="background"
              value={form.background}
              onChange={handleChange}
              className="w-[250px] rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter Your Background"
            />
            {/* {errors.background && <p className="text-xs text-red-600 mt-1">{errors.background}</p>} */}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Profile Picture
            </label>
            <input
              name="profile_picture"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileChange(e, "profile_picture")}
            />

            {/* {errors.profile_picture && <p className="text-xs text-red-600 mt-1">{errors.profile_picture}</p>} */}
          </div>
          
   

        </div>
           <div className="">
  <h1 className="mb-2 font-semibold">Share Your Expertise</h1>
  {intentPrice.map((item, index) => (
    <div key={index} className="flex space-x-3 mb-2">
      {/* Intent Name */}
      <input
        type="text"
        name={`intent${index}`}
        value={item.intent}
        onChange={(e) => {
          const updated = [...intentPrice];
          updated[index].intent = e.target.value;
          setIntentPrice(updated);

          // Update parent form data
          setForm({
      ...form,
      intent_price: updated,
    });
        }}
        placeholder="e.g. Career Guidance"
        className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Price */}
      {/* <input
        type="number"
        name={`price${index}`}
        value={item.price}
        onChange={(e) => {
          const updated = [...intentPrice];
          updated[index].price = Number(e.target.value);
          setIntentPrice(updated);

          // Update parent form data
          setForm({
      ...form,
      intent_price: updated,
    });
        }}
        placeholder="Enter Price"
        className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      /> */}


<input
  type="number"
  step="0.01"   // ✅ allows decimals
  min="0"
  name={`price${index}`}
  value={item.price === 0 ? "" : item.price}
  onChange={(e) => {
    const val = e.target.value;
    const updated = [...intentPrice];
    updated[index].price = val === "" ? 0.0 : parseFloat(val);
    setIntentPrice(updated);
    setForm({ ...form, intent_price: updated });
  }}
  placeholder="Enter Price"
  className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
/>


      {/* Add / Remove Button */}
     {index === intentPrice.length - 1 ? (
  <button
    type="button"
    onClick={() => {
      const updated = [...intentPrice, { intent: "", price: 0 }];
      setIntentPrice(updated);
      setForm({ ...form, intent_price: updated });
    }}
    className="px-3 py-2 h-[40px] bg-green-500 text-white rounded hover:bg-green-600"
  >
    +
  </button>
) : (
  <button
    type="button"
    onClick={() => {
      const filtered = intentPrice.filter((_, i) => i !== index);
      setIntentPrice(filtered);
      setForm({ ...form, intent_price: filtered });
    }}
    className="px-2 py-2 h-[40px] bg-red-500 text-white rounded hover:bg-red-600"
  >
    ❌
  </button>
)}

    </div>
  ))}
</div>

      </form>
    </div>
  );
};
export default forwardRef(StepTwoMentor);
