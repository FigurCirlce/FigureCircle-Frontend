import React, { useState } from "react";
import logo from "../../assets/image (1).png";
import {
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import { GiPartyPopper } from "react-icons/gi";
import axios from "axios";
import baseURL from "@/config/config";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone_number: "",
    description: "",
  });

  const [errors, setErrors] = useState<{
    fullname?: string;
    email?: string;
    phone_number?: string;
    description?: string;
  }>({});
  const [status, setStatus] = useState<"idle" | "success" | "error" | "submitting">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let newErrors = { ...errors };

    if (name === "fullname") {
      newErrors.fullname = value.trim() === "" ? "Full name is required." : "";
    }
    if (name === "email") {
      newErrors.email =
        value.trim() === ""
          ? "Email is required."
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Invalid email format."
          : "";
    }
    if (name === "phone_number") {
      newErrors.phone_number =
        value.trim() === ""
          ? "Phone number is required."
          : !/^\d{10}$/.test(value)
          ? "Phone number must be 10 digits."
          : "";
    }
    if (name === "description") {
      newErrors.description = value.trim() === "" ? "Message is required." : "";
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    let valid = true;
    Object.keys(formData).forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        validateField(field, formData[field as keyof typeof formData]);
        valid = false;
      }
    });
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    if (!validateForm()) {
      setStatus("idle");
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/contact-us`, formData);
      if (response.status === 201) {
        setStatus("success");
        setFormData({
          fullname: "",
          email: "",
          phone_number: "",
          description: "",
        });
        setTimeout(() => setStatus("idle"), 2000);
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="font-sans text-gray-800 min-h-screen bg-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 sm:px-6 md:px-10 py-3 bg-white shadow-md z-10">
        <div className="flex items-center gap-2">
          <img src={logo} width={50} alt="Logo" className="h-10 w-10 object-contain" />
        </div>
        <div className="flex gap-2">
          <button className="text-blue-600 hover:text-slate-400 text-sm sm:text-lg font-semibold">
            Login
          </button>
          <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-2xl hover:bg-blue-700 text-sm">
            Sign Up
          </button>
        </div>
      </header>

      {/* Contact Section */}
      <main className="pt-28 xl:pt-[4rem] px-4 sm:px-6 md:px-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">Get in Touch</h1>
          <p className="text-base sm:text-lg mt-2 text-black">
            We’re here to help! Contact us for any inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <FaPhone className="text-orange-500 text-xl sm:text-2xl" />
              <p className="text-sm sm:text-lg text-slate-900 font-bold">+91 945XXXXXXX</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-orange-500 text-xl sm:text-2xl" />
              <p className="text-sm sm:text-lg text-slate-900 font-bold">
                contact@figurecircle.com
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-orange-500 text-xl sm:text-2xl" />
              <p className="text-sm sm:text-lg text-slate-900 font-bold">abc, New Delhi</p>
            </div>
            <div className="pl-8">
              <h2 className="text-sm sm:text-lg pb-2 font-bold">Follow Us On</h2>
              <div className="flex gap-4">
                <SiInstagram className="text-orange-500 text-2xl" />
                <FaFacebook className="text-orange-500 text-2xl" />
                <FaTwitter className="text-orange-500 text-2xl" />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-slate-900 p-6 sm:p-8 rounded-lg shadow-lg space-y-5"
          >
            {status === "success" && (
              <p className="text-green-400 text-center flex items-center justify-center gap-2">
                <GiPartyPopper className="text-xl" /> Message sent successfully!
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-center">Failed to send. Please try again.</p>
            )}

            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full bg-transparent border-b-2 border-gray-600 text-white text-base py-2 outline-none focus:border-orange-500"
            />
            {errors.fullname && <p className="text-red-400 text-sm">{errors.fullname}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border-b-2 border-gray-600 text-white text-base py-2 outline-none focus:border-orange-500"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}

            <input
              type="tel"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full bg-transparent border-b-2 border-gray-600 text-white text-base py-2 outline-none focus:border-orange-500"
            />
            {errors.phone_number && <p className="text-red-400 text-sm">{errors.phone_number}</p>}

            <textarea
              name="description"
              placeholder="Your Message"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full bg-transparent border-b-2 border-gray-600 text-white text-base py-2 outline-none resize-none focus:border-orange-500"
            />
            {errors.description && <p className="text-red-400 text-sm">{errors.description}</p>}

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-lg text-base font-bold hover:bg-blue-900 transition"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ContactForm;
