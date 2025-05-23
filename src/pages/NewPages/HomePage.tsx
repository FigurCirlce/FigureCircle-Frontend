import React, { useEffect, useState } from "react";
import logo from "../../assets/image (1).png";
import hero from "../../assets/Hero.png";
import call from "../../assets/call.png";
import schedule from "../../assets/schedule.png";
import milestone from "../../assets/milestone.png";
import image1 from "../../assets/image1.png";
import dream_profile_banner from "../../assets/dream_profile_banner.jpg";
import axios from "axios";
import baseURL from "@/config/config";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import StepOne from "../../components/MultiStep_Form/StepOne";
import Stepper1 from "../../components/MultiStep_Form/Stepper";
import StepTwo from "@/components/MultiStep_Form/StepTwo";
import StepThree from "../../components/MultiStep_Form/StepThree";
// import ReusableModal from "../../components/Modal";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Stepper } from "@mantine/core";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Login from "../Login";

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
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HomePage: React.FC = () => {
  const [allMentorData, setAllMentorData] = useState<MentorData[]>([]);
  const [allReviewData, setReviewData] = useState<ReviewData[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const handleNext = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);

  const handleDialogClickOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleLoginDialogClickOpen = () => {
    setOpenLoginDialog(true);
  };

  const handleLoginDialogClose = () => {
    setOpenLoginDialog(false);
  };

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
    // dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    cssEase: "linear",
    responsive: [
      // {
      //   breakpoint: 1024,
      //   settings: {
      //     slidesToShow: 3,
      //     slidesToScroll: 3,
      //     infinite: true,
      //   },
      // },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  {
    /**Mentor Slider Next Arrow */
  }
  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="custom-next absolute bottom-[50%] right-[0%] cursor-pointer"
      >
        ▶
      </div>
    );
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
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
        },
      },
      //  {
      //   breakpoint: 900,
      //   settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 1,
      //     initialSlide: 2,
      //     infinite: true,
      //   },
      // },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  {
    /**Redirect to contact us page */
  }
  const handleContact = () => {
    navigate("/contact");
  };

  const stepsList = ["Login/Register", "Basic Info", "Select Profile"];

  const handleSubmit = () => {
    alert("form Submit");
  };

  return (
    <div className="min-h-screen  ">
      <div className="font-sans text-gray-800 ">
        {/* Navbar */}

        <header className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 md:px-[5%] py-3 bg-white shadow-md z-10">
          <img src={logo} width={50} className="object-contain" />
          {/* <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link to="/homepage" className="hover:text-blue-600 text-xl">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-blue-600 text-xl">
            Dashboard
          </Link>
          <Link to="/ask-ai" className="hover:text-blue-600 text-xl">
            Ask AI
          </Link>
        </nav> */}

          <div className="hidden md:flex gap-2">
            <button
              onClick={handleLoginDialogClickOpen}
              className="text-blue-600 hover:text-slate-400 text-sm md:text-lg font-semibold"
            >
              Login
            </button>
            <button className="bg-blue-600 text-white px-3 md:px-4 py-1 md:py-2 rounded-2xl text-xs md:text-sm hover:bg-blue-700">
              Sign Up
            </button>
          </div>
          {/**Login Button Modal */}
          <Dialog
            open={openLoginDialog}
            slots={{
              transition: Transition,
            }}
            keepMounted
            onClose={handleLoginDialogClose}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{
              style: {
                width: "50vw",
                height: "90vh",
                maxWidth: "none", // Override default maxWidth
                maxHeight: "none", // Override default maxHeight
              },
            }}
          >
            <DialogContent className="">
              <DialogContentText id="alert-dialog-slide-description">
                <Login type="" />
              </DialogContentText>
            </DialogContent>

            <DialogActions className="absolute top-0 right-2">
              <Button onClick={handleLoginDialogClose}>
                <X size={40} color="black" />
              </Button>
            </DialogActions>
          </Dialog>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile menu dropdown */}
          {menuOpen && (
            <div className="absolute top-full right-4 mt-2 bg-white shadow-md rounded-lg p-4 flex flex-col gap-2 md:hidden z-20">
              <button className="text-blue-600 hover:text-slate-400 text-sm font-semibold">
                Login
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl text-sm hover:bg-blue-700">
                Sign Up
              </button>
            </div>
          )}
        </header>

        {/**Dream Profile Banner Section */}

        <section className="w-full relative bg-blue-100">
          <img src={dream_profile_banner} className="w-full object-cover" />
          <div className="absolute top-[45%] md:top-1/3  left-1/2 transform -translate-x-1/2 text-center px-4">
            <h1 className="text-lg md:text-4xl lg:text-5xl font-bold text-black">
              Find Your Dream Profile,
            </h1>
            <h2 className="text-lg md:text-4xl lg:text-5xl font-bold text-black">
              Build Your Future
            </h2>
          </div>
        </section>

        {/* Mentor Banner Section */}

        <section className="relative">
          <img src={hero} className="w-full object-cover" />
          {/* <div className="absolute top-[2%] md:top-[10%] left-1/2 transform -translate-x-1/2 px-4 text-center bg-black w-auto sm:bg-none sm:w-auto"> */}
          <div className="absolute top-[2%] md:top-[10%] left-1/2 transform -translate-x-1/2 px-4 text-center ">
            <h1 className="text-sm sm:text-lg md:text-4xl lg:text-5xl font-bold text-white pb-4">
              Learn What You Need. <br />
              Grow on Your Terms.
            </h1>
            <p className="text-[8px] sm:text-2xl md:text-xl text-white max-w-lg sm:max-w-xl mx-auto">
              Whether you're starting out, switching paths, or leveling up—get
              expert guidance, smart tools, and clear milestones tailored to
              you.
            </p>
          </div>
        </section>

        {/**Features */}

        <section className="py-12 bg-white px-4 md:px-[5%]">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
            Features
          </h1>

          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="relative w-full  md:w-1/3 ">
              <img src={call} className="w-full h-[250px] md:h-[70%] " />
              <div className="absolute top-[10%] left-5 text-black">
                <h1 className="text-xl md:text-3xl font-bold">Work 1-on-1</h1>
                <p className="pt-2 md:pt-5 text-base md:text-xl">
                  With professionals from leading companies and universities
                </p>
              </div>
            </div>

            <div className="relative w-full md:w-2/3">
              <img src={schedule} className="w-full h-full sm:h-[70%]" />
              <div className="absolute top-[10%] left-5 text-black">
                <p className="text-lg md:text-2xl font-bold">
                  Get practical, relevant advice rooted in real experience
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full mt-4 ">
            <img src={milestone} className="w-full xl:w-1/2  " />
            <div className="absolute top-[10%] left-5 text-black">
              <h1 className="text-xl md:text-3xl font-bold">
                Communicate clearly and consistently—
              </h1>
              <p className="pt-2 md:pt-5 text-base md:text-xl">
                at your pace, on your terms
              </p>
            </div>
          </div>
        </section>

        {/**Discover Mentors */}

        <section id="mentor" className="">
          <h1 className="flex justify-center text-xl sm:text-4xl font-bold pb-[3%]">
            Discover Best Mentors
          </h1>

          <div className="relative max-w-full px-[4.5%]">
            <Slider
              {...Mentorsettings}
              nextArrow={<NextArrow />}
              className="bg-slate-100"
            >
              {allMentorData.map((item, index) => (
                <div key={index} className="w-full px-2 ml-2 py-2">
                  <div className="w-[350px] h-[420px] lg:w-[320px] xl:w-[350px] flex flex-col justify-between items-center gap-2 shadow-xl shadow-slate-300 py-5 rounded-lg bg-white">
                    <div className="flex flex-col items-center">
                      <div className="w-[150px] h-[150px] mb-3">
                        <img
                          src={item.profile_picture}
                          alt={`${item.name} profile`}
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
                      {/* <Button variant="default" onClick={open}>
                    Schedule First Call
                  </Button> */}
                      <button
                        onClick={handleDialogClickOpen}
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        Schedule First Call
                      </button>
                      {/* <Modal
        opened={opened}
        onClose={close}
        title="Schedule First Call"
        centered
        fullScreen
      >
        <Stepper active={step - 1}>
          <Stepper.Step label="Step 1"><StepOne/></Stepper.Step>
          <Stepper.Step label="Step 2"><StepTwo/></Stepper.Step>
          <Stepper.Step label="Step 3"><StepOne/></Stepper.Step>
        </Stepper>

        <div className="mt-4 flex gap-2">
          {step > 1 && <Button onClick={prevStep}>Back</Button>}
          {step < 3 && <Button onClick={handleNext}>Next</Button>}
          {step === 3 && <Button onClick={handleSubmit}>Submit</Button>}
        </div>
      </Modal> */}

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
        {/** Schedule First Call Modal  */}
        <Dialog
          open={openDialog}
          slots={{
            transition: Transition,
          }}
          keepMounted
          onClose={handleDialogClose}
          aria-describedby="alert-dialog-slide-description"
          PaperProps={{
            style: {
              width: "90vw",
              height: "100vh",
              maxWidth: "none", // Override default maxWidth
              maxHeight: "none", // Override default maxHeight
            },
          }}
        >
          <DialogContent className="">
            <DialogContentText id="alert-dialog-slide-description">
              <div className="bg-white  rounded shadow-md  min-w-full">
                {/**Modal Pages */}
                <Stepper1 step={step} steps={stepsList} />
                {step === 1 && <StepOne />}
                {step === 2 && <StepTwo />}
                {step === 3 && <StepThree />}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleDialogClose}> */}
            <div className="flex gap-5 mt-3">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Back
                </button>
              )}
              {step < 3 && (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Next
                </button>
              )}
              {step == 3 && (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Submit
                </button>
              )}
            </div>
            {/* </Button> */}
          </DialogActions>
          <DialogActions className="absolute top-0 right-2">
            <Button onClick={handleDialogClose}>
              <X size={40} color="black" />
            </Button>
          </DialogActions>
        </Dialog>

        {/**    How It Works**/}
        <section id="works" className="py-10 bg-white w-full px-[5%]">
          <h1 className="flex justify-center text-xl sm:text-4xl font-bold pt-[2rem] pb-[2.5rem]">
            How It Works?
          </h1>
          <div className="flex flex-col items-center gap-5 sm:flex sm:flex-row sm:gap-[5%] ">
            <div className="w-full sm:w-1/2  h-[200px] sm:h-[300px] lg:h-[250px]  p-5 flex flex-col gap-5 bg-slate-100 rounded-3xl border-2 border-slate-400 hover:bg-blue-400 cursor-pointer shadow-md shadow-slate-400">
              <h1 className="flex justify-center font-bold text-2xl">
                Registration
              </h1>
              <p className="px-5 text-xl sm:text-sm md:text-xl font-bold">
                Get a roadmap built around your current goals—academic or
                professional
              </p>
            </div>
            <div className=" w-full sm:w-1/2  h-[200px] sm:h-[300px] lg:h-[250px] p-5 flex flex-col gap-5 bg-slate-100 rounded-3xl  border-2 border-slate-400 hover:bg-blue-400 cursor-pointer shadow-md shadow-slate-400">
              <h1 className="flex justify-center font-bold text-2xl">
                Find Your Dream Profile
              </h1>
              <p className="px-5 text-xl sm:text-sm md:text-xl font-bold">
                {" "}
                Find the right courses, certifications, or opportunities for
                your next step{" "}
              </p>
            </div>
            <div className="w-full sm:w-1/2  h-[200px] sm:h-[300px] lg:h-[250px]  p-5 flex flex-col gap-5 bg-slate-100 rounded-3xl border-2 border-slate-400 hover:bg-blue-400 cursor-pointer shadow-md shadow-slate-400">
              <h1 className="flex justify-center font-bold text-2xl">
                Meeting with Expert
              </h1>
              <p className="px-5 text-xl sm:text-sm md:text-xl font-bold">
                Connect with mentors who understand your journey and field{" "}
              </p>
            </div>
          </div>
        </section>

        {/**Reviews */}
        <section className="px-[5%]">
          <h1 className="flex justify-center text-4xl font-bold py-[2rem]">
            User Reviews
          </h1>
          <div className=" relative max-w-full ">
            <Slider {...Reviewsettings} className="">
              {allReviewData.map((item, index) => (
                <div key={index} className="px-3 box-border py-2">
                  {/**Slider Card */}
                  <div className="rounded-lg shadow-md shadow-slate-500 p-5 w-[350px] border-2 border-slate-500 bg-white">
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
        <section className="flex justify-center pt-[5%] px-[5%]">
          <div className="bg-blue-600 rounded-lg w-full h-[150px] flex flex-col items-center justify-center">
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
    </div>
  );
};

export default HomePage;
