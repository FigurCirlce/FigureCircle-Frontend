import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/image (1).png";
import image1 from "../../assets/image1.png";
import axios from "axios";
import baseURL from "@/config/config";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Stepper1 from "../../components/NewPage/Homepage/MultiStep_Form/Stepper";
import StepTwo from "@/components/NewPage/Homepage/MultiStep_Form/StepTwo";
import { Button } from "@mantine/core";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Login from "../../pages/NewPages/Login";
import Register from "../../pages/NewPages/Register";
import ReusableTab from "@/components/NewPage/Homepage/ReusableTab";
// import banner2 from '../../assets/banner2.png';
import banner6 from "../../assets/banner6.png";
import ProfileDropdown from "@/components/NewPage/ProfileDropdown";
import StepTwoMentor from "@/components/NewPage/Homepage/MultiStepMentor/StepTwo";
import StepThree from "@/components/NewPage/Homepage/MultiStep_Form/StepThree";

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
  //  const handleExpertNext = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);
  const [openDialog, setOpenDialog] = useState(false);
  const[degree,setDegree]=useState({
     emailid:"",
    work_experience: "",
    high_education: "",
    interested_stream:"",
    data_filed: false,
      useruniqid: "",
      firstname:"",
      lastname:"",
  });
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  const[OpenExpertDialog,setOpenExpertDialog]= useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [status, setStatus] = useState<Boolean>(false);
  const [registerData,setRegisterData]=useState({
    fullName:'',
    email:'',
    password:''
  })
// const[nextButton,setNextButton]=useState<Boolean>(false);
  const registerRef = useRef<any>(null);
  const stepTwoRef = useRef<any>(null);
  const stepTwoMentorRef = useRef<any>(null);
  const stepthreeRef=useRef<any>(null);

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
  const handleRegisterDialogClickOpen = () => {
    setOpenRegisterDialog(true);
  };

  const handleExpertDialogClickOpen = () => {
    setOpenExpertDialog(true);
  };

  const handleRegisterDialogClose = () => {
    setOpenRegisterDialog(false);
  };

   const handleExpertDialogClose = () => {
    setOpenExpertDialog(false);
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

  const stepsList = ["Login/Register", "Basic Info","Dream Role"];
  const stepsMentorList = ["Login/Register", "Basic Info"];


   const fetchBasicInfo = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${baseURL}/api/basic-info`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    console.log("basicInformation---",response.data);
  localStorage.setItem("degree", JSON.stringify(response.data));
  
          // setBasicInfo([response.data]);
          // setDegree(response.data.interested_stream);
          // setFormData(response.data);
        } catch (error) {
          console.log(error);
        }
      };

    const handleLogin = async (user: any) => {
      console.log("userLogin",user);
      const dataToLogin={
        username:user.email,
        password:user.password
      }
    try {
      const response = await axios.post(`${baseURL}/login`, dataToLogin);
console.log("responseLoginnnnn-------",response);
      console.log("response", response.data.access_token);

      const token = response.data.access_token;
      document.cookie = `token=${token}; expires=${new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toUTCString()}; path=/`;
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", token);
      localStorage.setItem("userlocaldata", JSON.stringify(user));

      // dispatch(setUser(user));

      // Show success toast
      console.log("Login successful");
      if (response.data.data_fill === true) {
          console.log("---fetchbasicInfo-----");
          fetchBasicInfo();
        navigate("/dashboard");
      }
      // }else{
      //   navigate('/basic-info');
      // }
    } catch (error) {
      // notifyError(error); // Show error toast
      console.error("Login failed:", error);
    } finally {
      // setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(true);
    // if (registerRef.current?.handleSubmit) {
    //   registerRef.current.handleSubmit(e);
    // }

    if (stepthreeRef.current?.handleSubmit) {
      stepthreeRef.current.handleSubmit(e);
    
    }
    setStatus(false);

    setTimeout(() => {
      handleLogin(registerData);
      setStatus(false);
      setOpenRegisterDialog(false);
      setOpenExpertDialog(false);
      setOpenDialog(false);

    }, 2000);
  };

    const handleExpertSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    // setStatus(true);
    if (registerRef.current?.handleSubmit) {
      await registerRef.current.handleSubmit(e);
    }

    // if (stepTwoMentorRef.current?.handleSubmit) {
    //  await stepTwoMentorRef.current.handleSubmit(e);
    
    // }
    

    // setTimeout(() => {
    //   setStatus(false);
    //   setOpenRegisterDialog(false);
    //   setOpenExpertDialog(false);
    //   setOpenDialog(false);

    // }, 2000);
  };

    const handleExpertBasicInfoSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(true);
    

    if (stepTwoMentorRef.current?.handleSubmit) {
     await stepTwoMentorRef.current.handleSubmit(e);
    
    }
    

    setTimeout(() => {
      handleLogin(registerData);
      setStatus(false);
      setOpenRegisterDialog(false);
      setOpenExpertDialog(false);
      setOpenDialog(false);

    }, 2000);
  };


    const handleUserSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    // setStatus(true);
    if (registerRef.current?.handleSubmit) {
      await registerRef.current.handleSubmit(e);
     
    }
 
   
  };

   const handleUserStep2Submit =async (e: React.FormEvent) => {
    e.preventDefault();
    // setStatus(true);
    if (stepTwoRef.current?.handleSubmit) {
      await stepTwoRef.current.handleSubmit(e);
    }

   
  };

  const tabs = [
    { label: "Login", content: <Login /> },
    {
      label: "Register",
      content: <Register ref={registerRef} setTabIndex={setTabIndex} />,
    },
  ];

  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   const checkStatus = () => {
  //     const status = localStorage.getItem('registerStatus');
  //     if (status === 'true') {
  //       setMoveNext(true);
  //     }
  //   };

  //   window.addEventListener("storage", checkStatus);
  //   return () => window.removeEventListener("storage", checkStatus);
  // }, []);

  //  useEffect(() => {
  //   const status = localStorage.getItem('registerStatus');
  //   setMoveNext(!!status); // true if present
  // }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

const handleExpert=(id:number)=>{
  navigate(`/expert/${id}`);
}

const handleRegisterData=(data:any)=>{

console.log("data----",data);
setRegisterData({
  fullName:data.fullName,
  email:data.email,
  password:data.password
})
}

const handleNext2=()=>{
    setStep((s) => s + 1);
}

const handleNext = async(type:string,step:any,e: React.FormEvent) => {
   e.preventDefault();
   
   
  if(type==="signUp" && step===1){
  
   await handleUserSubmit(e);
 
   
  }
  if(type==="signUp" && step===2){
    
   handleUserStep2Submit(e);
    
   
  }
  
 setTimeout(() => {
  
  setStep((s) => s + 1);
  
}, 1000); 

}

const handleExpertNext = (type:string,step:any,e: React.FormEvent) => {
  if(type==="signUp" && step===1){
   handleExpertSubmit(e);
   
  }



  setStep((s) => s + 1);
}


const handlesetdegree=(data:any)=>{
console.log("data degreee",data);
setDegree(data);
}
  return (
    <div className="min-h-screen  ">
      <div className="font-sans text-gray-800 ">
        {/* Navbar */}

        <header className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 md:px-[5%] py-3 bg-white shadow-md z-10">
          <img src={logo} width={50} className="object-contain" />

          <div className="hidden md:flex gap-2">
            {token ? (
              <>
                <div className="mr-3">
                  <ProfileDropdown />
                </div>

                <button
                  onClick={handleLogout}
                  className="text-blue-600 hover:text-slate-400 text-sm md:text-lg font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLoginDialogClickOpen}
                  className="text-blue-600 hover:text-slate-400 text-sm md:text-lg font-semibold"
                >
                  Login
                </button>
                <button
                  onClick={handleRegisterDialogClickOpen}
                  className="bg-blue-600 text-white px-3 md:px-4 py-1 md:py-2 rounded-2xl text-xs md:text-sm hover:bg-blue-700"
                >
                  Sign Up
                </button>

                   <button
                  onClick={handleExpertDialogClickOpen}
                  className="bg-blue-600 text-white px-3 md:px-4 py-1 md:py-2 rounded-2xl text-xs md:text-sm hover:bg-blue-700"
                >
                  Join As Expert
                </button>
              </>
            )}
          
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
                minWidth: "35vw",
                maxHeight: "75vh",
              },
            }}
          >
            <DialogContent className="">
              <Login type="" />
            </DialogContent>

            <DialogActions className="absolute top-0 right-2">
              <Button onClick={handleLoginDialogClose}>
                <X size={40} color="black" />
              </Button>
            </DialogActions>
          </Dialog>

          {/**Register Button Modal */}

          <Dialog
            open={openRegisterDialog}
            slots={{
              transition: Transition,
            }}
            keepMounted
            onClose={handleRegisterDialogClose}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{
              style: {
                width: "90vw",
                minHeight: "100vh",
                // maxWidth: "none", // Override default maxWidth
                // maxHeight: "none", // Override default maxHeight
              },
            }}
          >
            <DialogContent className="flex flex-col items-content justify-center">
              <div className="bg-white  rounded shadow-md  min-w-full">
                {/**Modal Pages */}
                <Stepper1 step={step} steps={stepsList} />
                {/* {step === 1 && (
                 <div className="flex flex-col justify-center py-5">
                     
                      <Register ref={registerRef}/>
                     </div>)} */}
                <div
                  className={`flex flex-col justify-center py-5 ${
                    step === 1 ? "" : "hidden"
                  }`}
                >
                  <Register ref={registerRef} sendData={handleRegisterData}/>
                </div>

                {step === 2 && (
                  <div className=" flex flex-col justify-center py-5">
                    <StepTwo ref={stepTwoRef} formData={registerData} degree={handlesetdegree} />
                  </div>
                )}
                {step === 3 && (
                  <div className="flex flex-col justify-center py-5 px-10">
                    {/* <Login type="" /> */}
           <StepThree ref={stepthreeRef} degree={degree}/>
                  </div>
                )}
              </div>
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
                 {step ===1 && (
                  <button
                    // onClick={handleUserSubmit}
                    onClick={(e)=>handleNext("signUp",step,e)}
                    className={`px-4 py-2 text-white rounded !bg-blue-600`}
                  >
                  Next
                  </button>
                )}
                {step ===2 && (
                  <button
                    onClick={(e)=>handleNext("signUp",step,e)}
                    // className={`px-4 py-2 text-white rounded ${moveNext ? '!bg-blue-600' : '!bg-slate-400'}`}
                    className={`px-4 py-2 text-white rounded !bg-blue-600`}
                    // disabled={!moveNext}
                  >
                    Next
                  </button>
                )}

                {step == 3 && (
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    {status ? "Submitting..." : "Submit"}
                  </button>
                )}
              </div>
              {/* </Button> */}
            </DialogActions>
            <DialogActions className="absolute top-0 right-2">
              <Button onClick={handleRegisterDialogClose}>
                <X size={40} color="black" />
              </Button>
            </DialogActions>
          </Dialog>

{/**Expert Modal */}
   <Dialog
            open={OpenExpertDialog}
            slots={{
              transition: Transition,
            }}
            keepMounted
            onClose={handleExpertDialogClose}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{
              style: {
                width: "90vw",
                minHeight: "100vh",
                // maxWidth: "none", // Override default maxWidth
                // maxHeight: "none", // Override default maxHeight
              },
            }}
          >
            <DialogContent className="flex flex-col items-content justify-center">
              <div className="bg-white  rounded shadow-md  min-w-full">
                {/**Modal Pages */}
                <Stepper1 step={step} steps={stepsMentorList} />
                {/* {step === 1 && (
                 <div className="flex flex-col justify-center py-5">
                     
                      <Register ref={registerRef}/>
                     </div>)} */}
                <div
                  className={`flex flex-col justify-center py-5 ${
                    step === 1 ? "" : "hidden"
                  }`}
                >
                  <Register ref={registerRef} sendData={handleRegisterData}/>
                </div>

                {step === 2 && (
                  <div className=" flex flex-col justify-center pb-5">
                    <StepTwoMentor ref={stepTwoMentorRef} formData={registerData} />
                  </div>
                )}
              
              </div>
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
                {step === 1 && (
                  <button
                   onClick={(e)=>handleExpertNext("signUp",step,e)}
                    // className={`px-4 py-2 text-white rounded ${moveNext ? '!bg-blue-600' : '!bg-slate-400'}`}
                    className={`px-4 py-2 text-white rounded !bg-blue-600`}
                    // disabled={!moveNext}
                  >
                    Next
                  </button>
                )}

                {step == 2 && (
                  <button
                    // onClick={handleExpertSubmit}
                    onClick={(e)=>handleExpertBasicInfoSubmit(e)}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    {status ? "Submitting..." : "Submit"}
                  </button>
                )}
              </div>
              {/* </Button> */}
            </DialogActions>
            <DialogActions className="absolute top-0 right-2">
              <Button onClick={handleExpertDialogClose}>
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
              <button
                onClick={handleLoginDialogClickOpen}
                className="text-blue-600 hover:text-slate-400 text-sm font-semibold"
              >
                Login
              </button>
              <button
                onClick={handleRegisterDialogClickOpen}
                className="bg-blue-600 text-white px-4 py-2 rounded-2xl text-sm hover:bg-blue-700"
              >
                Sign Up
              </button>
            </div>
          )}
        </header>

        <section className="flex px-[5%] pt-[5%]">
          <div className="w-full relative ">
            {/* <img src={dream_profile_banner} className="w-[600px] h-[300px]" /> */}
            <img src={banner6} className="w-full h-[300px]" />
            <div className="absolute top-[45%] md:top-[10%]  left-[50%] transform -translate-x-1/2 text-center px-4">
              <h1 className="text-lg md:text-4xl font-bold text-grey-600">
                Find Your Dream Profile,
              </h1>
              <h2 className="text-lg md:text-4xl  font-bold text-grey-600">
                Build Your Future
              </h2>
            </div>
          </div>
        </section>
        <div className="w-full py-[5%] px-[5%]">
          <h2 className="text-4xl font-bold text-center text-black mb-4">
            Find Your Path to a Professional Career
          </h2>

          {/* Recommendation Section */}
          <div className="flex gap-6 w-full h-[200px]">
            <div className="bg-yellow-100 p-3 rounded-md space-y-4 w-1/3">
              <div className="flex items-center gap-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="icon"
                  className="w-20 h-20"
                />
                <p className="text-lg font-medium">Get Recommendations</p>
              </div>
              <p className="text-md text-gray-600">
                For degree courses, certifications, exams and more
              </p>
              <div className="flex gap-2 text-md">
                <span className="bg-blue-200 px-2 py-1 rounded">
                  Data Science
                </span>
                <span className="bg-purple-200 px-2 py-1 rounded">
                  Machine Learning
                </span>
              </div>
            </div>

            {/* Mentor Section */}
            <div className="bg-green-100 p-3 rounded-md space-y-4 w-1/3">
              <div className="flex items-center gap-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/921/921347.png"
                  alt="icon"
                  className="w-20 h-20"
                />
                <p className="text-lg font-medium">Get Recommended Mentors</p>
              </div>
              <p className="text-[15px] text-gray-600">
                Professionals from leading companies and universities
              </p>
              <button className="text-md bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600">
                View Mentors
              </button>
            </div>

            {/* Progress Section */}
            <div className="bg-blue-100 p-3 rounded-md space-y-4 w-1/3">
              <div className="flex items-center gap-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2920/2920244.png"
                  alt="icon"
                  className="w-20 h-20"
                />
                <p className="text-lg font-medium">
                  Get Feedback and Track Progress
                </p>
              </div>
              <p className="text-md text-gray-600">
                Work with mentors and achieve milestones
              </p>
              <button className="text-md bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                View Progress
              </button>
            </div>

            {/* </div> */}
          </div>
        </div>

        {/**Discover Mentors */}

        <section id="mentor" className="">
          <h1 className="flex justify-center text-xl sm:text-4xl font-bold mb-4">
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
                  <div className="w-[350px] h-[380px] lg:w-[320px] xl:w-[350px] flex flex-col justify-between items-center gap-2 shadow-xl shadow-slate-300 py-5 rounded-lg bg-white">
                    <div className="flex flex-col items-center">
                      <div className="w-[150px] h-[150px] mb-1">
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

                      <div className="flex items-center mt-1">
                        <div className="inline-flex items-center px-3 py-0 bg-white text-gray-800 text-sm font-medium rounded-full border-2 border-slate-300">
                          &#9733; 4/5
                        </div>

                        <div className="inline-flex items-center px-3 ml-1 py-0 bg-white text-gray-800 text-sm font-medium rounded-full border-2 border-slate-300">
                          30+ Bookings
                        </div>
                      </div>

                      <div className="px-5 mt-1 text-center text-slate-400 text-sm line-clamp-3">
                        {item.background}
                      </div>
                    </div>

                    <div className="flex justify-around w-full mt-1 px-5">
                      {/* <Button variant="default" onClick={open}>
                    Schedule First Call
                  </Button> */}
                      <button
                        onClick={handleDialogClickOpen}
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        Schedule First Call
                      </button>

                      <button onClick={()=>handleExpert(item.user_id)} className="bg-white text-blue-400 w-[130px] rounded-xl hover:bg-blue-700 hover:text-white text-sm border-2 border-blue-400 py-2">
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
              width: "60vw",
              height: "100vh",
              maxWidth: "none",
              maxHeight: "none",
            },
          }}
        >
          <DialogContent className="">
            <DialogContentText id="alert-dialog-slide-description">
              <div className="bg-white  rounded shadow-md  min-w-full">
                {/**Modal Pages */}
                <Stepper1 step={step} steps={stepsList} />
                {/* {step === 1 &&  */}
                <div
                  className={`flex flex-col justify-center py-5 ${
                    step === 1 ? "" : "hidden"
                  }`}
                >
                  <ReusableTab
                    tabs={tabs}
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                  />
                </div>
                {/* } */}

                {step === 2 && <StepTwo ref={stepTwoRef} formData={registerData}/>}
                {/* {step === 3 && <StepThree />} */}
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
              {step < 2 && (
                <button
                  onClick={handleNext2}
                  className={`px-4 py-2 text-white rounded !bg-blue-600`}
                >
                  Next
                </button>
              )}
              {step == 2 && (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {status ? "Submitting..." : "Submit"}
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
        <section id="works" className="py-[5%] bg-white w-full px-[5%]">
          <h1 className="flex justify-center text-xl sm:text-4xl font-bold mb-4">
            How It Works?
          </h1>
          <div className="flex flex-col items-center gap-5 sm:flex sm:flex-row sm:gap-[5%] ">
            <div className="w-full sm:w-1/2  h-[200px] sm:h-[300px] lg:h-[200px]  p-5 flex flex-col gap-5 bg-slate-100 rounded-3xl border-2 border-slate-400 hover:bg-blue-400 cursor-pointer shadow-md shadow-slate-400">
              <h1 className="flex justify-center font-bold text-2xl">
                Registration
              </h1>
              <p className="px-5 text-xl sm:text-sm md:text-xl font-bold">
                Get a roadmap built around your current goals—academic or
                professional
              </p>
            </div>
            <div className=" w-full sm:w-1/2  h-[200px] sm:h-[300px] lg:h-[200px] p-5 flex flex-col gap-5 bg-slate-100 rounded-3xl  border-2 border-slate-400 hover:bg-blue-400 cursor-pointer shadow-md shadow-slate-400">
              <h1 className="flex justify-center font-bold text-2xl">
                Find Your Dream Profile
              </h1>
              <p className="px-5 text-xl sm:text-sm md:text-xl font-bold">
                {" "}
                Find the right courses, certifications, or opportunities for
                your next step{" "}
              </p>
            </div>
            <div className="w-full sm:w-1/2  h-[200px] sm:h-[300px] lg:h-[200px]  p-5 flex flex-col gap-5 bg-slate-100 rounded-3xl border-2 border-slate-400 hover:bg-blue-400 cursor-pointer shadow-md shadow-slate-400">
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
          <h1 className="flex justify-center text-4xl font-bold mb-4">
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
