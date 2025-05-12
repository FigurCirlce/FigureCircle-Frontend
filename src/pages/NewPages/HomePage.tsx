import React from "react";
import logo from '../../assets/image (1).png';
import hero from '../../assets/Hero.png';
import call from '../../assets/call.png';
import schedule from '../../assets/schedule.png';
import milestone from '../../assets/milestone.png';
import mentor from '../../assets/mentor.png';
import image1 from '../../assets/image1.png';
import dream1 from '../../assets/dream1.png';



const HomePage: React.FC = () => {
type Mentor = {
  name: string;
  profile_pic:string;
  expertise: string;
  yearsOfExperience: number;
  rating:number;
  availability:string[];
  tags:string[];
  bookings:number;
  desc:string;
};

type DreamProfile={
profile:string,
image:string,
desc:string,
tags:string[]
}

const MentorData: Mentor[] = [
  { name: "Smriti", profile_pic:image1, desc:'Experience in marketing strategies, SEO , Paid Ads Campaigns',expertise: "Marketing Specialist", yearsOfExperience: 5 , rating:4.5,availability:['1pm','2pm','3pm'],tags:['genpact','seo expert','project-based learning','resume building'],bookings:30},
   { name: "Harsh", profile_pic:image1,desc:'Experience in marketing strategies, SEO , Paid Ads Campaigns',expertise: "Data Scientist", yearsOfExperience: 7 , rating:4.5,availability:['1pm','2pm','3pm'],tags:['wipro','python','Machine learning','resume building'],bookings:50},
    { name: "Swapnil", profile_pic:image1, desc:'Experience in marketing strategies, SEO , Paid Ads Campaigns',expertise: "Marketing Specialist", yearsOfExperience: 5 , rating:4.5,availability:['1pm','2pm','3pm'],tags:['genpact','seo expert','project-based learning','resume building'],bookings:30}
];

const DreamProfileData:DreamProfile[]=[
    {profile:"Software Engineer",image:dream1, desc:"Pre-Requisite, Programming language,Machine Learning",tags:['ML','AI','Python']},
    {profile:"Software Engineer",image:dream1, desc:"Pre-Requisite, Programming language,Machine Learning",tags:['ML','AI','Python']}
]


  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className="fixed flex justify-between items-center px-[5%] py-3 bg-white shadow-md w-full z-10">
        <div className="text-2xl font-bold text-blue-600"><img src={logo} width={50}/></div>
        
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#features" className="hover:text-blue-600 text-xl">Home</a>
          <a href="#experts" className="hover:text-blue-600 text-xl">Dashboard</a>
          <a href="#pricing" className="hover:text-blue-600 text-xl">Ask AI</a>
          
        </nav>
        <div className="flex gap-2">
          <button className="text-blue-600 hover:text-slate-400 text-lg font-semibold mr-3 my-1">Login</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 text-sm">
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full h-screen ">
       <img src={hero} className="w-full  relative"/>
       <div className="absolute top-[48%] left-[40%] flex gap-6">
       <button className="bg-white font-semibold text-blue-400 px-8 py-4 rounded-3xl hover:bg-slate-300 hover:text-white text-sm">
         Find Mentor
       </button>
       <button className="bg-white font-semibold text-blue-400  px-8 py-4 rounded-3xl hover:bg-slate-300 hover:text-white text-sm">
         Become Mentor
       </button>
      
       </div>
       <div className="absolute top-[18%] left-[33%] ">
       <h1 className="text-5xl font-bold text-center text-white top-[20%] left-[40%]">
  Unlock Your Potential <br/> 
   with Expert Mentors <br/> 
 & Courses.
</h1>
       </div>
      </section>

      {/* How It Works--create object for this*/}
      <section id="works" className="py-10 bg-white w-full px-[5%]">
       <h1 className="flex justify-center text-4xl font-bold pb-[2rem]">How It Works?</h1>
       <div className="flex gap-[5%] ">
        
        <div className="w-1/3 h-[200px] p-5 flex flex-col gap-5 bg-slate-100 rounded-3xl border-2 border-slate-400 hover:bg-blue-400 cursor-pointer shadow-md shadow-slate-400">
          <h1 className="flex justify-center font-bold text-2xl">Registration</h1>
          <p className="px-5">Hi please signup and fill you details first</p>
        </div>
        <div className="w-1/3 h-[200px] p-5 flex flex-col gap-5 bg-slate-100 rounded-3xl  border-2 border-slate-400 hover:bg-blue-400 cursor-pointer shadow-md shadow-slate-400">
          <h1 className="flex justify-center font-bold text-2xl">Find Your Dream Profile</h1>
          <p className="px-5"> Find your dream profile and Recommended Mentors - <br/>Courses, Certifications and many more </p>
        </div>
        <div className="w-1/3 h-[200px] p-5 flex flex-col gap-5 bg-slate-100 rounded-3xl border-2 border-slate-400 hover:bg-blue-400 cursor-pointer shadow-md shadow-slate-400">
          <h1 className="flex justify-center font-bold text-2xl">Meeting with Expert</h1>
          <p className="px-5">Schedule First Free Call</p>
        </div>
       </div>
      </section>

      {/**Features */}

      <section id="features" className="py-16  bg-white  w-full px-[10%]">
        <h1 className="flex justify-center text-4xl font-bold pb-[2rem]">Features</h1>
        <div className="flex gap-8">
          <div className="relative">
            <img src={call} />
            <div className="absolute top-[10%] left-5">
              <h1 className="font-bold text-2xl">1:1 Call with Expert</h1>
<p className="pt-[5%]">Get The Best Expert</p>
            </div>
          </div>
          <div className="relative">
            <img src={schedule}/>
            <div className="absolute top-[10%] left-5">
              <h1 className="font-bold text-2xl">Schedule Free First Call </h1>
<p className="pt-[5%]">Take the trial call and decide whether you want to continue or no</p>
            </div>
          </div>
        </div>
        <div className="flex gap-8 py-8">
          <div className="relative">
            <img src={milestone}/>
            <div className="absolute top-[10%] left-5">
              <h1 className="font-bold text-2xl">Clear Milestones & Regular Feedbacks</h1>
<p className="pt-[5%]">Experts provide clear milestone to reach your goals.<br/> Get regular feedbacks and discover  your strength and weakness</p>
            </div>
          </div>
          <div className="relative">
            <img src={mentor}/>
            <div className="absolute top-[10%] left-5">
              <h1 className="font-bold text-2xl">Become  Mentor</h1>
<p className="py-[5%]">Want to become Expert ?</p>
<button className="mt-[15%] ml-[15%] bg-blue-500 font-semibold text-white px-4 py-2 rounded-2xl hover:bg-slate-300 hover:text-white text-sm ">Become Mentor</button>
            </div>
          </div>
        </div>
      </section>

{/**Discover Mentors */}
      <section id="mentor" className="">
<h1 className="flex justify-center text-4xl font-bold pb-5">Discover Best Mentors</h1>

<div className="flex gap-8 px-[3%]">
  {/**Mentor card */}
  {MentorData.map((item,index)=>(
  <div key={index} className="w-[400px] flex flex-col items-center gap-2 shadow-xl shadow-slate-300 py-5 rounded-lg">
    <img src={item.profile_pic} className="h-[200px]"/>
    <h1 className="font-bold text-lg">{item.name}</h1>
    <div className="flex gap-2 text-slate-400 font-bold">
    <h2>{item.expertise}</h2>
    <div className="">
    <div className="inline-flex items-center px-3 py-0 bg-white text-gray-800 text-sm font-medium rounded-full border-2 border-slate-300">
 &#9733; {item.rating}/5</div>
</div>
</div>
<div className="px-5 text-slate-400 ">
  {item.desc}
</div>
<div className="flex gap-2 w-full px-5">
<select id="dropdown" className="block w-[230px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
 {item.availability.map((time,index)=>(
  <option key={index} value={time}>Availablity Today At : {time}</option>
  ))}

</select>
 <div className=" inline-flex items-center px-3 ml-1 py-0 bg-white text-gray-800 text-sm font-medium rounded-full border-2 border-slate-300">
  {item.bookings}+ Bookings</div>
</div>
<div className="flex flex-wrap gap-3 px-5 py-5">
  {item.tags.map((tag,index)=>(
   <div key={index} className="inline-flex items-center px-3 py-0 bg-white text-gray-800 text-sm font-medium rounded-full border-2 border-slate-300">
  {tag}</div>
  ))}
</div>

<div className="flex justify-around w-full ">
  <button className="bg-white text-blue-400 px-10 py-2 rounded-xl hover:bg-blue-700 text-sm border-2 border-blue-400">
    Schedule First Call
  </button>
  <button className="bg-white text-blue-400 px-10 py-2 rounded-xl hover:bg-blue-700 text-sm border-2 border-blue-400">Learn More</button>
</div>
  </div>
 
   ))}
</div>
      </section>

{/**Dream Profile Sections */}
      <section className="py-[5%]">
        <div className="px-[5%] flex ">
        <div className="flex flex-col gap-6 w-[30%]">
          <h1 className="font-semibold text-2xl">Discover</h1>
          <h2 className="font-bold text-4xl">Dream Profile</h2>
          <p>Discover Your Dream Profile or <br/>Lets together find your Dream Profile</p>
          <button className="bg-pink-500 w-[150px] font-semibold text-white px-6 py-3 rounded-2xl hover:bg-slate-300 hover:text-white text-sm">Sign Up Now</button>
        </div>
        {/**Slider Element */}
        <div className="flex gap-8">
            {DreamProfileData.map((item,index)=>(
          <div key={index} className="flex flex-col gap-3 rounded-2xl shadow-md shadow-slate-400 p-3 w-[400px]">
          <img src={item.image} />
          <h1>{item.profile}</h1>
          <p>{item.desc}</p>
          <div className="flex gap-3">
            {item.tags.map((tag,i)=>(
             <div key={i} className="inline-flex items-center px-3 py-0 bg-white text-gray-800 text-sm font-medium rounded-full border-2 border-slate-300">
  {tag}</div>
  
            ))}
    
          </div>
          </div>
          ))}
           
        </div>
        </div>
      </section>

      {/**CTA */}
      <section className="flex justify-center">
        <div className="bg-blue-600 rounded-lg w-[90%] h-[150px] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
             <h1 className="text-white text-4xl font-bold">Getting Started</h1>
          <button className="bg-pink-500 w-[150px] mt-[5%] font-semibold text-white px-6 py-3 rounded-2xl hover:bg-slate-300 hover:text-white text-sm">Sign Up</button>
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
