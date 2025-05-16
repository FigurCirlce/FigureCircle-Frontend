import React, { useEffect, useState } from "react";
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
import axios from "axios";
import baseURL from "@/config/config";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

interface MentorData {
  background: string;
  created_at: string;
  degree: string;
  email: string;
  expertise: string;
  fee: number;
  linkedin: string;
  mentor_id: number;
  milestones: number;
  name: string;
  phone: number;
  profile_picture: string;
  resume: string;
  user_id: number;
  rating?: number;
  bookings?: number;
}

interface ReviewData {
  ReviewIndetail: string;
  date: string;
  id: number;
  userDetails: {
    email: string;
    name: string;
    user_id: number;
  };
  valid: boolean;
}

const HomePage: React.FC = () => {
  const [allMentorData, setAllMentorData] = useState<MentorData[]>([]);
  const [allReviewData, setReviewData] = useState<ReviewData[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllMentorData();
    fetchAllReviews();
  }, []);

  {
    /**Fetching and setting Mentors data */
  }
  const fetchAllMentorData = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/mentors`);
      setAllMentorData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  {
    /**Fetching and setting Review data */
  }
  const fetchAllReviews = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/reviews`);
      console.log("reviewData", response.data);
      setReviewData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  {
    /**Mentor Slider setting */
  }
  const Mentorsettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  {
    /**Testinomial Slider setting */
  }
  const Reviewsettings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: true,
  };

  {
    /**Redirect to contact us page */
  }
  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      <header className="fixed flex justify-between items-center px-[5%] py-3 bg-white shadow-md w-full z-10">
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

      {/**Dream Profile Banner Section */}
      <section className="w-full bg-blue-100 h-screen">
        <img src={dream_profile_banner} className="w-full h-1/2 relative" />
        <div className="absolute top-[25%] left-[15%] ">
          <h1 className="text-5xl font-bold text-center text-black top-[20%] left-[40%] ">
            Find Your Dream Profile, Build Your Future
          </h1>
        </div>

        {/* Mentor Banner Section */}
        <img src={hero} className="w-full h-1/2 relative" />
        <div className="absolute bottom-[20%] left-[40%] flex gap-6"></div>
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

        {/* <div className="flex flex-wrap justify-around px-[3%] gap-[2%]">  */}
        <div className="relative max-w-full  px-[2.5%]">
          <Slider {...Mentorsettings}>
            {allMentorData.map((item, index) => (
              <div key={index} className="w-full  px-2 ml-2">
                <div
                  key={index}
                  className="w-[350px] h-[420px] flex flex-col justify-between items-center gap-2 shadow-xl shadow-slate-300 py-5 rounded-lg"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-[150px] h-[150px] mb-3">
                      <img
                        src={item.profile_picture}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>

                    <h1 className="font-bold text-lg text-center">
                      {item.name}
                    </h1>
                    <div className="flex gap-2 text-slate-400 font-bold text-sm">
                      <h2>{item.expertise}</h2>
                    </div>

                    <div className="flex items-center mt-2">
                      <div className="inline-flex items-center px-3 py-0 bg-white text-gray-800 text-sm font-medium rounded-full border-2 border-slate-300">
                        &#9733; 4/5
                      </div>

                      <div className="inline-flex items-center px-3 ml-1 py-0 bg-white text-gray-800 text-sm font-medium rounded-full border-2 border-slate-300">
                        30+ Bookings
                      </div>
                    </div>

                    <div className="px-5 mt-3 text-center text-slate-400 text-sm line-clamp-3">
                      {item.background}
                    </div>
                  </div>

                  <div className="flex justify-around w-full mt-4 px-5">
                    <button className="bg-white text-blue-400 w-[130px] rounded-xl hover:bg-blue-700 hover:text-white text-sm border-2 border-blue-400 py-2">
                      Schedule First Call
                    </button>
                    <button className="bg-white text-blue-400 w-[130px] rounded-xl hover:bg-blue-700 hover:text-white text-sm border-2 border-blue-400 py-2">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/**    How It Works**/}
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
        <div className=" relative max-w-full px-[2.5%]">
          <Slider {...Reviewsettings}>
            {allReviewData.map((item, index) => (
              <div key={index} className="px-3 box-border">
                <div className="rounded-lg shadow-md shadow-slate-500 p-5 w-[350px] border-2 border-slate-500">
                  <div className="font-bold text-4xl">&#34;</div>
                  <p>{item.ReviewIndetail}</p>
                  <div className="flex gap-[5%] pt-5">
                    <img src={image1} width={60} className="rounded-full" />
                    <div className="flex flex-col">
                      <h1>{item.userDetails.name}</h1>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* </div> */}
          </Slider>
        </div>
      </section>
      {/**CTA */}
      <section className="flex justify-center pt-[5%]">
        <div className="bg-blue-600 rounded-lg w-[90%] h-[150px] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <h1 className="text-white text-4xl font-bold">Get in Touch</h1>
            <button
              className="bg-pink-500 w-[150px] mt-[5%] font-semibold text-white px-6 py-3 rounded-2xl hover:bg-slate-300 hover:text-white text-sm"
              onClick={handleContact}
            >
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
