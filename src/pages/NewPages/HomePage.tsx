import React from "react";
import logo from "../../assets/image (1).png";
import hero from "../../assets/Hero.png";
import call from "../../assets/call.png";
import schedule from "../../assets/schedule.png";
import milestone from "../../assets/milestone.png";
import mentor from "../../assets/mentor.png";
import image1 from "../../assets/image1.png";
import dream1 from "../../assets/dream1.png";
import imagepic from "../../assets/images.jpg";
import roadmap from "../../assets/roadmap.jpg";
import dream_profile_banner from "../../assets/dream_profile_banner.jpg";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  type Mentor = {
    name: string;
    profile_pic: string;
    expertise: string;
    yearsOfExperience: number;
    rating: number;
    availability: string[];
    tags: string[];
    bookings: number;
    desc: string;
  };



  const MentorData: Mentor[] = [
    {
      name: "Smriti",
      profile_pic: image1,
      desc: "Experience in marketing strategies, SEO , Paid Ads Campaigns",
      expertise: "Marketing Specialist",
      yearsOfExperience: 5,
      rating: 4.5,
      availability: ["1pm", "2pm", "3pm"],
      tags: [
        "genpact",
        "seo expert",
        "project-based learning",
        "resume building",
      ],
      bookings: 30,
    },
    {
      name: "Harsh",
      profile_pic: image1,
      desc: "Experience in marketing strategies, SEO , Paid Ads Campaigns",
      expertise: "Data Scientist",
      yearsOfExperience: 7,
      rating: 4.5,
      availability: ["1pm", "2pm", "3pm"],
      tags: ["wipro", "python", "Machine learning", "resume building"],
      bookings: 50,
    },
    {
      name: "Swapnil",
      profile_pic: image1,
      desc: "Experience in marketing strategies, SEO , Paid Ads Campaigns",
      expertise: "Marketing Specialist",
      yearsOfExperience: 5,
      rating: 4.5,
      availability: ["1pm", "2pm", "3pm"],
      tags: [
        "genpact",
        "seo expert",
        "project-based learning",
        "resume building",
      ],
      bookings: 30,
    },
  ];

  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      <header className="fixed flex justify-between items-center px-[5%] py-3 bg-white shadow-md w-full z-10">
        <div className="text-2xl font-bold text-blue-600">
          <img src={logo} width={50} />
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-blue-600 text-xl">
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

      {/**Dream Profile Section */}
      <section className="w-full bg-blue-100 h-screen">
        <img src={dream_profile_banner} className="w-full h-1/2 relative" />
        <div className="absolute top-[25%] left-[15%] ">
          <h1 className="text-5xl font-bold text-center text-black top-[20%] left-[40%] ">
            Find Your Dream Profile, Build Your Future
          </h1>
        </div>

        {/* Hero Section */}
        <img src={hero} className="w-full h-1/2 relative" />
        <div className="absolute bottom-[20%] left-[40%] flex gap-6">
        </div>
        <div className="absolute bottom-[22%] left-[32%] ">
          <h1 className="text-4xl font-bold text-center text-white  pb-[1rem]">
            Learn What You Need. <br />
            Grow on Your Terms.
          </h1>
          <p className="w-[520px] text-[1.1rem] text-white">
            Whether you're starting out, switching paths, or leveling up—get
            expert guidance, smart tools, and clear milestones tailored to you.
          </p>
        </div>
      </section>

      {/* How It Works--create object for this*/}
      {/* <section id="works" className="py-10 bg-white w-full px-[5%]">
        <h1 className="flex justify-center text-4xl font-bold pt-[2rem] pb-[2.5rem]">
          How It Works?
        </h1>
        <div className="flex gap-[5%] ">
          <div className="w-1/3 h-[200px] p-5 flex flex-col gap-5 bg-slate-100 rounded-3xl border-2 border-slate-400 hover:bg-blue-400 cursor-pointer shadow-md shadow-slate-400">
            <h1 className="flex justify-center font-bold text-2xl">Registration</h1> 
            <p className="px-5 text-xl font-bold">
              Get a roadmap built around your current goals—academic or
              professional
            </p>
          </div>
          <div className="w-1/3 h-[200px] p-5 flex flex-col gap-5 bg-slate-100 rounded-3xl  border-2 border-slate-400 hover:bg-blue-400 cursor-pointer shadow-md shadow-slate-400">
            <h1 className="flex justify-center font-bold text-2xl">Find Your Dream Profile</h1> 
            <p className="px-5 text-xl font-bold">
              {" "}
              Find the right courses, certifications, or opportunities for your
              next step{" "}
            </p>
          </div>
          <div className="w-1/3 h-[200px] p-5 flex flex-col gap-5 bg-slate-100 rounded-3xl border-2 border-slate-400 hover:bg-blue-400 cursor-pointer shadow-md shadow-slate-400">
             <h1 className="flex justify-center font-bold text-2xl">Meeting with Expert</h1> 
            <p className="px-5 text-xl font-bold">
              Connect with mentors who understand your journey and field{" "}
            </p>
          </div>
        </div>
      </section> */}

      {/**Features */}

      <section id="features" className="py-[3%]  bg-white  w-full px-[10%]">
        {/* <h1 className="flex justify-center text-4xl font-bold pb-[2rem]">
          Real Experts. Real Progress.{" "}
        </h1> */}
        <h1 className="flex justify-center text-4xl font-bold pb-[2rem]">
          Features
        </h1>
        <div className="flex gap-8">
          <div className="relative w-[30%]">
            <img src={call} />
            <div className="absolute top-[10%] left-5">
              <h1 className="font-bold text-3xl">{"Work 1-on-1 "}</h1>
              <p className="pt-[5%] text-xl">
                With professionals from leading companies and universities
              </p>
            </div>
          </div>
          <div className="relative w-[60%]">
            <img src={schedule} />
            <div className="absolute top-[5%] left-5">
              {/* <h1 className="font-bold text-2xl">Schedule Free First Call </h1> */}
              <p className="pt-[5%] text-2xl font-bold">
                Get practical, relevant advice rooted in real experience
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-8 py-8">
          <div className="relative w-[50%]">
            <img src={milestone} />
            <div className="absolute top-[10%] left-5">
              <h1 className="font-bold text-3xl">
                Communicate clearly and consistently—
              </h1>
              <p className="pt-[5%] text-xl">at your pace, on your terms </p>
            </div>
          </div>
          {/* <div className="relative">
            <img src={mentor}/>
            <div className="absolute top-[10%] left-5">
              <h1 className="font-bold text-2xl">Become  Mentor</h1>
<p className="py-[5%]">Want to become Expert ?</p>
<button className="mt-[15%] ml-[15%] bg-blue-500 font-semibold text-white px-4 py-2 rounded-2xl hover:bg-slate-300 hover:text-white text-sm ">Become Mentor</button>
            </div>
          </div> */}
        </div>
      </section>

      {/**Discover Mentors */}
      <section id="mentor" className="">
        <h1 className="flex justify-center text-4xl font-bold pb-[3%]">
          Discover Best Mentors
        </h1>

        <div className="flex justify-around px-[3%]">
          {/**Mentor card */}
          {MentorData.map((item, index) => (
            <div
              key={index}
              className="w-[350px]  flex flex-col items-center gap-2 shadow-xl shadow-slate-300 py-5 rounded-lg"
            >
              <img src={item.profile_pic} className="h-[150px] rounded-full" />
              <h1 className="font-bold text-lg">{item.name}</h1>
              <div className="flex gap-2 text-slate-400 font-bold">
                <h2>{item.expertise}</h2>
              </div>
              <div>
                <div className="">
                  <div className="inline-flex items-center px-3 py-0 bg-white text-gray-800 text-sm font-medium rounded-full border-2 border-slate-300">
                    &#9733; {item.rating}/5
                  </div>
                  <div className=" inline-flex items-center px-3 ml-1 py-0 bg-white text-gray-800 text-sm font-medium rounded-full border-2 border-slate-300">
                    {item.bookings}+ Bookings
                  </div>
                </div>
              </div>
              <div className="px-5 text-slate-400 ">{item.desc}</div>
              {/* <div className="flex gap-2 w-full px-5">
                <select
                  id="dropdown"
                  className="block w-[230px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {item.availability.map((time, index) => (
                    <option key={index} value={time}>
                      Availablity Today At : {time}
                    </option>
                  ))}
                </select>
                <div className=" inline-flex items-center px-3 ml-1 py-0 bg-white text-gray-800 text-sm font-medium rounded-full border-2 border-slate-300">
                  {item.bookings}+ Bookings
                </div>
              </div> */}
              {/* <div className="flex flex-wrap gap-3 px-5 py-5">
                {item.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center px-3 py-0 bg-white text-gray-800 text-sm font-medium rounded-full border-2 border-slate-300"
                  >
                    {tag}
                  </div>
                ))}
              </div> */}

              <div className="flex justify-around w-full ">
                <button className="bg-white text-blue-400 w-[130px] rounded-xl hover:bg-blue-700 text-sm border-2 border-blue-400">
                  Schedule First Call
                </button>
                <button className="bg-white text-blue-400 px-10 py-2 rounded-xl hover:bg-blue-700 text-sm border-2 border-blue-400">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/**    How It Works--create object for this */}
      <section id="works" className="py-10 bg-white w-full px-[5%]">
        <h1 className="flex justify-center text-4xl font-bold pt-[2rem] pb-[2.5rem]">
          How It Works?
        </h1>
        <div className="flex gap-[5%] ">
          <div className="w-1/3 h-[200px] p-5 flex flex-col gap-5 bg-slate-100 rounded-3xl border-2 border-slate-400 hover:bg-blue-400 cursor-pointer shadow-md shadow-slate-400">
            <h1 className="flex justify-center font-bold text-2xl">
              Registration
            </h1>
            <p className="px-5 text-xl font-bold">
              Get a roadmap built around your current goals—academic or
              professional
            </p>
          </div>
          <div className="w-1/3 h-[200px] p-5 flex flex-col gap-5 bg-slate-100 rounded-3xl  border-2 border-slate-400 hover:bg-blue-400 cursor-pointer shadow-md shadow-slate-400">
            <h1 className="flex justify-center font-bold text-2xl">
              Find Your Dream Profile
            </h1>
            <p className="px-5 text-xl font-bold">
              {" "}
              Find the right courses, certifications, or opportunities for your
              next step{" "}
            </p>
          </div>
          <div className="w-1/3 h-[200px] p-5 flex flex-col gap-5 bg-slate-100 rounded-3xl border-2 border-slate-400 hover:bg-blue-400 cursor-pointer shadow-md shadow-slate-400">
            <h1 className="flex justify-center font-bold text-2xl">
              Meeting with Expert
            </h1>
            <p className="px-5 text-xl font-bold">
              Connect with mentors who understand your journey and field{" "}
            </p>
          </div>
        </div>
      </section>

      {/**Reviews */}
      <section className="px-[5%]">
        <h1 className="flex justify-center text-4xl font-bold py-[2rem]">
          Testinomials
        </h1>
        <div className="flex gap-[5%]">
          <div className="rounded-lg shadow-md shadow-slate-500 p-5 w-[34%]">
            <div className="font-bold text-4xl">&#34;</div>
            <p>
              The progress track is amazing, Great Mentors. Mehak Helped me find
              my dream profile and helped in breaking it into smaller tasks. I
              recommend her to everyone.
            </p>
            <div className="flex gap-[5%] pt-5 ">
              <img src={image1} width={60} className="rounded-full" />
              <div className="flex flex-col">
                <h1>{"smriti"}</h1>
                <h2>{"student"}</h2>
              </div>
            </div>
          </div>
          <div className="rounded-lg shadow-md shadow-slate-500 p-5 w-[34%]">
            <div className="font-bold text-4xl">&#34;</div>
            <p>
              The progress track is amazing, Great Mentors. Mehak Helped me find
              my dream profile and helped in breaking it into smaller tasks. I
              recommend her to everyone.
            </p>
            <div className="flex gap-[5%] pt-5 ">
              <img src={image1} width={60} className="rounded-full" />
              <div className="flex flex-col">
                <h1 className="font-semibold">{"smriti"}</h1>
                <h2>{"student"}</h2>
              </div>
            </div>
          </div>
          <div className="rounded-lg shadow-md shadow-slate-500 p-5 w-[34%]">
            <div className="font-bold text-4xl">&#34;</div>
            <p>
              The progress track is amazing, Great Mentors. Mehak Helped me find
              my dream profile and helped in breaking it into smaller tasks. I
              recommend her to everyone.
            </p>
            <div className="flex gap-[5%] pt-5 ">
              <img src={image1} width={60} className="rounded-full" />
              <div className="flex flex-col">
                <h1 className="font-semibold">{"smriti"}</h1>
                <h2>{"student"}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/**CTA */}
      <section className="flex justify-center pt-[5%]">
        <div className="bg-blue-600 rounded-lg w-[90%] h-[150px] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <h1 className="text-white text-4xl font-bold">Get in Touch</h1>
            <button className="bg-pink-500 w-[150px] mt-[5%] font-semibold text-white px-6 py-3 rounded-2xl hover:bg-slate-300 hover:text-white text-sm">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-6 mt-10">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} FigureCircle. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
