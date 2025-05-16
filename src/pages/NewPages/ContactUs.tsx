import React from "react";
import logo from "../../assets/image (1).png";
import { Link } from "react-router-dom";
import {
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import { useState } from "react";
import { GiPartyPopper } from "react-icons/gi";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "submitting"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/contact@figurecircle.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _captcha: "false",
          }),
        }
      );

      const result = await res.json();
      if (result.success === "true") {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };
  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      <header className=" fixed flex justify-between items-center px-[5%] py-3 bg-white shadow-md w-full z-10 ">
        <div className="text-2xl font-bold text-blue-600">
          <img src={logo} width={50} />
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link to="/homepage" className="hover:text-blue-600 text-xl">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-blue-600 text-xl">
            Dashboard
          </Link>
          <Link to="/ask-ai" className="hover:text-blue-600 text-xl">
            Ask AI
          </Link>
        </nav>
        <div className="flex gap-2">
          <button className="text-blue-600 hover:text-slate-400 text-lg font-semibold mr-3 my-1">
            Login
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 text-sm">
            Sign Up
          </button>
        </div>
      </header>

      <div className="flex flex-col items-center pt-[6%] ">
        {/* Title & Description */}
        <h1 className="text-5xl font-bold text-black ">Get in Touch</h1>
        <p className="text-lg mt-3 text-black mb-[1%]">
          We’re here to help! Contact us for any inquiries.
        </p>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-12 w-full max-w-5xl py-[0.5rem]">
          {/* CONTACT INFO */}
          <div className="space-y-6 mt-[10%] ">
            <div className="flex items-center space-x-4">
              <FaPhone className="!text-orange-500 text-2xl" />
              <p className="text-lg text-slate-900 font-bold">+91 945XXXXXXX</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="!text-orange-500 text-2xl" />

              <p className="text-lg text-slate-900 font-bold">
                contact@figurecircle.com
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="!text-orange-500 text-2xl" />
              <p className="text-lg text-slate-900 font-bold">abc, New Delhi</p>
            </div>
            <div className="ml-[45px]">
              <h1 className="text-lg pb-2 font-bold"> Follow Us On</h1>
              <div className="flex gap-5">
                <SiInstagram className="!text-orange-500 text-[30px]" />
                <FaFacebook className="!text-orange-500 text-[30px]" />
                <FaTwitter className="!text-orange-500 text-[30px]" />
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <form
            className="bg-slate-900 p-8 rounded-lg shadow-lg space-y-6 w-full"
            onSubmit={handleSubmit}
          >
            {status === "success" && (
              <p className="text-green-400 text-center flex items-center justify-center gap-2">
                <GiPartyPopper className="text-xl" />
                Message sent successfully!
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-center">
                Failed to send. Please try again.
              </p>
            )}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent border-b-2 border-gray-600 outline-none text-white text-lg py-2 focus:border-orange-500 transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border-b-2 border-gray-600 outline-none text-white text-lg py-2 focus:border-orange-500 transition"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-transparent border-b-2 border-gray-600 outline-none text-white text-lg py-2 focus:border-orange-500 transition resize-none"
            />

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-blue-700 text-white py-3 rounded-lg text-lg font-bold hover:bg-blue-900 transition cursor-pointer"
            >
              {status === "submitting" ? (
                <div className="flex justify-center items-center">
                  <div className="w-8 h-8 border-4 border-white border-dashed rounded-full animate-spin"></div>
                </div>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
