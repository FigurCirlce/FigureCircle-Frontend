// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { CheckCircle } from "lucide-react"

// export default function NewHomepage() {
//   return (
//     <div className="flex flex-col">
//       {/* Hero Section */}
//       <section className="bg-gray-50 py-20 px-6 text-center flex flex-col items-center">
//         <h1 className="text-4xl font-bold mb-4 max-w-2xl">
//           Don’t just learn skills. Learn the <span className="text-blue-600">right skills</span> — with expert guidance.
//         </h1>
//         <p className="text-lg text-gray-600 mb-6 max-w-xl">
//           Our mentors help you focus on the skills and strategies that matter for your dream role.
//         </p>
//         <Button size="lg" className="mb-8">Talk to a Mentor</Button>
//         <img
//           src="https://illustrations.popsy.co/gray/career-path.svg"
//           alt="Career guidance illustration"
//           className="max-w-md"
//         />
//       </section>

//       {/* How It Works */}
//       <section className="py-16 px-6 bg-white text-center">
//         <h2 className="text-2xl font-bold mb-10">How It Works</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//           <Card>
//             <CardContent className="p-6 space-y-2">
//               <h3 className="font-semibold text-lg">1. Tell us your background & intent</h3>
//               <p className="text-gray-600 text-sm">Share your education, experience, and goals.</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6 space-y-2">
//               <h3 className="font-semibold text-lg">2. Get personalized role & skill recommendations</h3>
//               <p className="text-gray-600 text-sm">We suggest dream roles, courses, and skills you need to grow.</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6 space-y-2">
//               <h3 className="font-semibold text-lg">3. Work with experts to reach milestones</h3>
//               <p className="text-gray-600 text-sm">Mentors provide insights, roadmaps, and feedback tailored to you.</p>
//             </CardContent>
//           </Card>
//         </div>
//       </section>

//       {/* Why Us */}
//       <section className="py-16 px-6 bg-gray-50 text-center">
//         <h2 className="text-2xl font-bold mb-10">Why Choose Us?</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
//           {[
//             "Industry-specific skill roadmaps",
//             "Mentorship for strategic advice & insights",
//             "Curated course & competition recommendations",
//             "Profile feedback to improve resumes & portfolios",
//           ].map((point, i) => (
//             <div key={i} className="flex items-start space-x-3">
//               <CheckCircle className="text-blue-600 h-6 w-6 mt-1" />
//               <p className="text-gray-700">{point}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className="bg-white py-20 px-6 text-center">
//         <h2 className="text-3xl font-bold mb-6">Ready to find your path?</h2>
//         <Button size="lg">Talk to a Mentor</Button>
//       </section>
//     </div>
//   )
// }

import { Button } from "@/components/ui/button";
import { CheckCircle, Target, BookOpen, Users, X, Menu } from "lucide-react";
import logo from "../../assets/image (1).png";
// import ProfileDropdown from "@/components/NewPage/ProfileDropdown";
import NotificationBell from "@/components/NewPage/NotificationBell";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import Login from "../../pages/NewPages/Login";
// import Stepper1 from "@/components/NewPage/Homepage/MultiStep_Form/Stepper";
// import Register from "../../pages/NewPages/Register";
import { ArrowRight } from "lucide-react";
// import StepTwoMentor from "@/components/NewPage/Homepage/MultiStepMentor/StepTwo";
// import axios from "axios";
// import baseURL from "@/config/config";
import RegistrationFlow from "@/components/NewPage/Homepage/NewUserLogin";
import career from "../../assets/career.jpg";
// import ExpertOnboardingPreview from "@/components/NewPage/ExpertLogin";
import ExpertOnboardingCompact from "@/components/NewPage/ExpertUserFinalForm";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewHomepage = () => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  const [OpenExpertDialog, setOpenExpertDialog] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // const [step, setStep] = useState(1);
  //@ts-ignore
  const [degree, setDegree] = useState({
    emailid: "",
    work_experience: "",
    high_education: "",
    interested_stream: "",
    data_filed: false,
    useruniqid: "",
    firstname: "",
    lastname: "",
  });
  //@ts-ignore
  const [openDialog, setOpenDialog] = useState(false);
  // const [registerData, setRegisterData] = useState({
  //   fullName: "",
  //   email: "",
  //   password: "",
  //   phone: "",
  // });
  //@ts-ignore
  const [status, setStatus] = useState<Boolean>(false);
  //  const handleExpertNext = () => setStep((s) => s + 1);
  // const prevStep = () => setStep((s) => s - 1);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  // const handleNext = async(type:string,step:any,e: React.FormEvent) => {
  //    e.preventDefault();

  //   if(type==="signUp" && step===1){

  //    await handleUserSubmit(e);

  //   }
  //   if(type==="signUp" && step===2){

  //    handleUserStep2Submit(e);

  //   }

  //  setTimeout(() => {

  //   setStep((s) => s + 1);

  // }, 1000);

  // }

  //  const handleUserSubmit =async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // setStatus(true);
  //   if (registerRef.current?.handleSubmit) {
  //     await registerRef.current.handleSubmit(e);

  //   }

  // };

  // const handleSubmit =async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // setStatus(true);
  //   // if (registerRef.current?.handleSubmit) {
  //   //   registerRef.current.handleSubmit(e);
  //   // }

  //   if (stepthreeRef.current?.handleSubmit) {
  //    await stepthreeRef.current.handleSubmit(e);
  //    await handleLogin(registerData);
  //   }
  //   // setStatus(false);

  //   // setTimeout(() => {
  //   //   handleLogin(registerData);
  //   //   setStatus(false);
  //   //   setOpenRegisterDialog(false);
  //   //   setOpenExpertDialog(false);
  //   //   setOpenDialog(false);

  //   // }, 2000);
  // };

  // const handleExpertNext = (type: string, step: any, e: React.FormEvent) => {
  //   if (type === "signUp" && step === 1) {
  //     handleExpertSubmit(e);
  //   }
  //   setStep((s) => s + 1);
  // };

  // const handleExpertSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // setStatus(true);
  //   if (registerRef.current?.handleSubmit) {
  //     await registerRef.current.handleSubmit(e);
  //     await handleLogin(registerData, "mentor");
  //   }

  //   // if (stepTwoMentorRef.current?.handleSubmit) {
  //   //  await stepTwoMentorRef.current.handleSubmit(e);

  //   // }

  //   // setTimeout(() => {
  //   //   setStatus(false);
  //   //   setOpenRegisterDialog(false);
  //   //   setOpenExpertDialog(false);
  //   //   setOpenDialog(false);

  //   // }, 2000);
  // };

  const token = localStorage.getItem("token");
  // const handleLogin = async (user: any, type?: any) => {
  //   console.log("userLogin", user);
  //   const dataToLogin = {
  //     username: user.email,
  //     password: user.password,
  //   };
  //   try {
  //     const response = await axios.post(`${baseURL}/login`, dataToLogin);
  //     console.log("responseLoginnnnn-------", response);
  //     console.log("response", response.data.access_token);

  //     const token = response.data.access_token;
  //     document.cookie = `token=${token}; expires=${new Date(
  //       Date.now() + 7 * 24 * 60 * 60 * 1000
  //     ).toUTCString()}; path=/`;
  //     localStorage.setItem("user", JSON.stringify(response.data));
  //     localStorage.setItem("token", token);
  //     localStorage.setItem("userlocaldata", JSON.stringify(user));

  //     // dispatch(setUser(user));

  //     // Show success toast
  //     console.log("Login successful");
  //     // navigate(`/dashboard`);
  //     if (type !== "mentor") {
  //       if (response.data.data_fill === true) {
  //         console.log("---fetchbasicInfo-----");
  //         await fetchBasicInfo();
  //         navigate("/dashboard");
  //       } else {
  //         navigate("/basic-info");
  //       }
  //     } else {
  //       console.log("mentor--loginnnn");
  //       fetchMentorInfo();
  //     }
  //     //  if (response.data.is_mentor) {
  //     //     console.log("Mentor login detected");
  //     //     await fetchMentorInfo(); // if you have this function
  //     //     navigate("/dashboard"); // or wherever mentors should go
  //     //   } else {
  //     //     // if (response.data.data_fill === true) {
  //     //       console.log("---fetchbasicInfo-----");
  //     //       await fetchBasicInfo();
  //     //       navigate("/dashboard");
  //     //     // } else {
  //     //     //   navigate("/basic-info");
  //     //     // }
  //     //   }
  //   } catch (error) {
  //     // notifyError(error); // Show error toast
  //     console.error("Login failed:", error);
  //   } finally {
  //     // setLoading(false);
  //   }
  // };

  // const fetchMentorInfo = async () => {
  //   const user = localStorage.getItem("user");
  //   const parsedUser = user ? JSON.parse(user) : null;
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(
  //       `${baseURL}/api/mentor/details?user_id=${parsedUser.user_id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log("basicInformation---", response.data);
  //     localStorage.setItem("degree", JSON.stringify(response.data));

  //     // setBasicInfo([response.data]);
  //     // setDegree(response.data.interested_stream);
  //     // setFormData(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const fetchBasicInfo = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(`${baseURL}/api/basic-info`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log("basicInformation---", response.data);
  //     localStorage.setItem("degree", JSON.stringify(response.data));

  //     // setBasicInfo([response.data]);
  //     // setDegree(response.data.interested_stream);
  //     // setFormData(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleExpertBasicInfoSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setStatus(true);

  //   try {
  //     // login first and wait for token
  //     // await handleLogin(registerData);

  //     // then run step two with that token
  //     if (stepTwoMentorRef.current?.handleSubmit) {
  //       // const token=localStorage.getItem("token");
  //       await stepTwoMentorRef.current.handleSubmit(e);
  //       // await fetchBasicInfo();
  //       await fetchMentorInfo();
  //     }

  //     // cleanup dialogs
  //     setStatus(false);
  //     setOpenRegisterDialog(false);
  //     setOpenExpertDialog(false);
  //     setOpenDialog(false);
  //     navigate(`/dashboard`);
  //   } catch (error) {
  //     console.error("Error in expert registration flow:", error);
  //     setStatus(false);
  //   }
  // };

  //  const handleUserStep2Submit =async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     // setStatus(true);
  //     if (stepTwoRef.current?.handleSubmit) {
  //       await stepTwoRef.current.handleSubmit(e);
  //     }

  //   };

  // const handleRegisterData = (data: any) => {
  //   console.log("data----", data);
  //   setRegisterData({
  //     fullName: data.fullName,
  //     email: data.email,
  //     password: data.password,
  //     phone: data?.phone,
  //   });
  // };

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

  const handleDashboard = () => {
    navigate(`/dashboard`);
  };
  // const registerRef = useRef<any>(null);
  // const stepTwoRef = useRef<any>(null);
  // const stepTwoMentorRef = useRef<any>(null);
  // const stepthreeRef=useRef<any>(null);

  // const stepsList = ["Login/Register", "Basic Info","Dream Role"];
  // const stepsMentorList = ["Login/Register", "Basic Info"];
  //@ts-ignore
  const handlesetdegree = (data: any) => {
    console.log("data degreee", data);
    setDegree(data);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 md:px-[5%] py-3 bg-white shadow-md z-10">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" width={50} />
          <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">
            FigureCircle
          </h1>
        </div>

        <div>
          {token && (
            <div className="hidden md:block">
              <button
                className="px-2 py-2 border-2 border-black w-[150px] flex gap-1 rounded-lg bg-black text-white"
                onClick={handleDashboard}
              >
                My Dashboard
                <ArrowRight />
              </button>
            </div>
          )}

        </div>
        <div className="hidden md:flex gap-2  ">
          {token ? (
            <>
              {/* <div className="mr-3">
                        <ProfileDropdown />
                      </div> */}
              <div className="flex">
                <div className="flex gap-2">
                  <div className="mr-3">
                    <NotificationBell />
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-blue-600 hover:text-slate-400 text-sm md:text-lg font-semibold"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={handleLoginDialogClickOpen}
                className="text-blue-600 hover:text-slate-400 text-sm md:text-lg font-semibold pr-2"
              >
                Login
              </button>
              <button
                onClick={handleRegisterDialogClickOpen}
                className="bg-black text-white px-3 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm hover:bg-blue-700"
              >
                Sign Up
              </button>

              <button
                onClick={handleExpertDialogClickOpen}
                className="bg-white text-blue-500 border-2 border-blue-500 px-3 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm hover:bg-blue-600 hover:text-white"
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
              <X size={40} color="white" />
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
          fullScreen={window.innerWidth < 640} // sm breakpoint
          PaperProps={{
            sx: {
              width: { xs: "100vw", sm: "90vw", md: "600px" },
              maxHeight: { xs: "100vh", sm: "90vh" },
              borderRadius: { xs: 0, sm: 2 },
            },
          }}
        >
          <DialogContent className="sm:flex sm:flex-col sm:items-content sm:justify-center">
            .
            <RegistrationFlow />
            {/* <div className="bg-white  rounded shadow-md  min-w-full"> */}
            {/**Modal Pages */}
            {/* <Stepper1 step={step} steps={stepsList} /> */}
            {/* {step === 1 && (
                       <div className="flex flex-col justify-center py-5">
                           
                            <Register ref={registerRef}/>
                           </div>)} */}
            {/* <div
                        className={`flex flex-col justify-center py-5 ${
                          step === 1 ? "" : "hidden"
                        }`}
                      >
                        <Register ref={registerRef} sendData={handleRegisterData}/>
                      </div> */}
            {/* {step === 2 && (
                        <div className=" flex flex-col justify-center py-5">
                          <StepTwo ref={stepTwoRef} formData={registerData} degree={handlesetdegree} />
                        </div>
                      )} */}
            {/* {step === 3 && (
                        <div className="flex flex-col justify-center py-5 px-10">
                          {/* <Login type="" /> */}
            {/* <StepThree ref={stepthreeRef} degree={degree}/>
                        </div> */}
            {/* </div> */}
          </DialogContent>
          {/* <DialogActions> */}
          {/* <Button onClick={handleDialogClose}> */}
          {/* <div className="flex gap-5 mt-3">
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
                    </div> */}
          {/* </Button> */}
          {/* </DialogActions> */}
          <DialogActions className="absolute top-0 right-2">
            <Button onClick={handleRegisterDialogClose}>
              <X size={20} />
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
              width: "100vw",
              minHeight: "90vh",
              // maxWidth: "none", // Override default maxWidth
              // maxHeight: "none", // Override default maxHeight
            },
          }}
        >
          {/* <DialogContent className="flex flex-col items-content justify-center">
            <div className="bg-white  rounded shadow-md  min-w-full">
              
              <Stepper1 step={step} steps={stepsMentorList} />
             
              <div
                className={`flex flex-col justify-center py-5 ${
                  step === 1 ? "" : "hidden"
                }`}
              >
                <Register
                  ref={registerRef}
                  sendData={handleRegisterData}
                  type="mentor"
                />
              </div>

              {step === 2 && (
                <div className=" flex flex-col justify-center pb-5">
                  <StepTwoMentor
                    ref={stepTwoMentorRef}
                    formData={registerData}
                  />
                </div>
              )}
            </div>
          </DialogContent> */}
          <DialogContent>
            {/* <ExpertOnboardingPreview/> */}
            <ExpertOnboardingCompact />
          </DialogContent>
          {/* <DialogActions>
          
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
                  onClick={(e) => handleExpertNext("signUp", step, e)}
                 
                  className={`px-4 py-2 text-white rounded !bg-blue-600`}
                 
                >
                  Next
                </button>
              )}

              {step == 2 && (
                <button
                  // onClick={handleExpertSubmit}
                  onClick={(e) => handleExpertBasicInfoSubmit(e)}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {status ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          
          </DialogActions> */}
          <DialogActions className="absolute top-0 right-2">
            <Button onClick={handleExpertDialogClose}>
              <X size={20} />
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
        {menuOpen ? token ? (
          <div className="absolute top-full right-4 mt-2 bg-white shadow-md rounded-lg p-4 flex flex-col gap-2 md:hidden z-20">

            <button
              onClick={handleDashboard}
              className="bg-blue-600 text-white px-4 py-2 rounded-2xl text-sm hover:bg-blue-700"
            >
              Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="text-blue-600 hover:text-slate-400 text-sm font-semibold"
            >
              Logout
            </button>
          </div>
        ) :
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
            <button
              onClick={handleExpertDialogClickOpen}
              className="bg-blue-600 text-white px-4 py-2 rounded-2xl text-sm hover:bg-blue-700"
            >
              Join As Expert
            </button>
          </div> : ""}
      </header>
      <section className="bg-white py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Learn <span className="text-blue-600">the right skills</span> with
            expert mentorship.
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Our mentors don’t just teach you skills — they guide you toward the
            exact strategies and tools needed for your dream career.
          </p>
          {/* <Button
            size="lg"
            className="px-8 py-6 text-lg rounded-xl shadow-md hover:scale-105 transition"
          >
            Talk to a Mentor
          </Button> */}
        </div>
        <div className="flex justify-center">
          <img
            src={career}
            alt="Career guidance illustration"
            className="max-w-md"
          />
        </div>
      </section>

      {/* How It Works - Vertical Steps */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold">How It Works</h2>
        </div>
        <div className="space-y-12 max-w-3xl mx-auto">
          {[
            {
              title: "Tell us your background & intent",
              desc: "Share your education, experience, and goals.",
              icon: Target,
            },
            {
              title: "Get personalized role & skill recommendations",
              desc: "We suggest dream roles, courses, and skills you need to grow.",
              icon: BookOpen,
            },
            {
              title: "Work with experts to reach milestones",
              desc: "Mentors provide insights, roadmaps, and feedback tailored to you.",
              icon: Users,
            },
          ].map((step, i) => (
            <div key={i} className="flex items-start space-x-6 relative">
              <div className="flex flex-col items-center">
                <step.icon className="h-10 w-10 text-blue-600" />
                {i < 2 && <div className="w-1 h-16 bg-blue-100 mt-2"></div>}
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-1">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us - Dark Section */}
      <section className="bg-gray-900 py-20 px-6 text-center text-white">
        <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto text-left">
          {[
            "Industry-specific skill roadmaps",
            "Mentorship for strategic advice & insights",
            "Curated course & competition recommendations",
            "Profile feedback to improve resumes & portfolios",
          ].map((point, i) => (
            <div
              key={i}
              className="flex items-start space-x-4 bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition"
            >
              <CheckCircle className="text-blue-400 h-6 w-6 mt-1 flex-shrink-0" />
              <p className="text-gray-200">{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA - Pattern Background */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-60"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold mb-6">
            Ready to shape your future?
          </h2>
          <p className="mb-8 text-lg text-gray-700">
            Start your journey with expert guidance tailored just for you.
          </p>
          <Button
            size="lg"
            className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-6 text-lg rounded-xl shadow-lg"
            onClick={handleRegisterDialogClickOpen}
          >
            Talk to a Mentor
          </Button>
        </div>
      </section>
    </div>
  );
};

export default NewHomepage;
