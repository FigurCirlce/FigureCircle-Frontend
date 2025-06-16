import React, { useState, useMemo } from "react";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Linkedin } from "lucide-react";
import { GraduationCap } from "lucide-react";
// import { Banknote } from "lucide-react";
import { IndianRupee } from "lucide-react";

// Replace with your actual arrow component
const NextArrow = () => <div className="text-black">→</div>;

interface AvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
}

interface Mentor {
  name: string;
  expertise: string;
  background: string;
  profile_picture: string;
  linkedin: string;
  resume: string;
  availability: AvailabilitySlot[];
  degree: string;
  fee: string;
}

interface MentorSectionProps {
  allMentorData: Mentor[];
}

const TrialMeeting: React.FC<MentorSectionProps> = ({ allMentorData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMentors = useMemo(() => {
    return allMentorData.filter((mentor) => {
      const lower = searchTerm.toLowerCase();
      return (
        mentor.name.toLowerCase().includes(lower) ||
        mentor.expertise.toLowerCase().includes(lower) ||
        mentor.background.toLowerCase().includes(lower)
      );
    });
  }, [searchTerm, allMentorData]);

  //@ts-ignore
  const Mentorsettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section id="mentor" className="py-10 bg-gray-50">
      <h1 className="flex justify-center text-xl sm:text-4xl font-bold pb-6">
        Recommended Mentors For You
      </h1>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name, expertise or background..."
          className="w-[80%] md:w-[60%] border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="relative max-w-full px-[4.5%]">
        {filteredMentors.length === 0 ? (
          <p className="text-center text-gray-500">No mentors found.</p>
        ) : (
          // <Slider {...Mentorsettings} className="bg-slate-100 py-4 px-2 rounded-xl ">
          <div className="flex flex-wrap gap-5">
            //@ts-ignore
            {filteredMentors.map((item, index) => (
              <div key={index} className="px-2 py-2">
                <div className="w-[350px] h-[450px] flex flex-col justify-between items-center gap-2 shadow-xl shadow-slate-300 py-5 rounded-lg bg-white mx-auto">
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
                      {/* <div className="inline-flex items-center px-3 py-0 bg-white text-gray-800 text-sm font-medium rounded-full border-2 border-slate-300">
                        &#9733; 4/5
                      </div> */}

                      <div className="inline-flex items-center px-3 ml-1 py-0 bg-white text-gray-800 text-sm font-medium rounded-full border-2 border-slate-300">
                        <GraduationCap className="mr-1" /> {item.degree}
                      </div>
                      {/* <div className="inline-flex items-center px-3 py-0 bg-white text-gray-800 text-sm font-medium rounded-full border-2 border-slate-300">
                      <Banknote/>{item.fee}
                      </div> */}
                    </div>
                    <div className="inline-flex items-center px-3 py-0 my-1 bg-white text-gray-800 text-sm font-medium rounded-full border-2 border-slate-300">
                      Book Call At-{item.fee}
                      <IndianRupee size={15} />
                    </div>

                    <div className="px-5 mt-3 text-center text-slate-400 text-sm line-clamp-3">
                      {item.background}
                    </div>
                    {/* <div className="mt-2 text-sm text-gray-600 text-center">
                      {item.availability.map((slot, index) => (
                        <div key={index}>
                          {slot.day}: {slot.startTime} - {slot.endTime}
                        </div>
                      ))}
                    </div> */}
                    <div className="flex justify-between mt-1 ">
                      {/* <a
                        href={item.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="!text-blue-400 cursor-pointer" />
                      </a> */}

                      <div className="px-5 mt-3 text-center text-slate-400 text-sm line-clamp-3">
                        <a
                          href={item.resume}
                          className="underline text-blue-400"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Resume Link
                        </a>
                      </div>

                      <div className="flex items-end">
                        <a
                          // href={item.linkedin}
                          href={`https://www.linkedin.com/${item.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="!text-blue-400 cursor-pointer" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-around w-full mt-4 px-5">
                    <button
                      //   onClick={() => alert("Schedule call modal here")}
                      className="bg-blue-500 text-white p-2 rounded text-sm"
                    >
                      Schedule Call
                    </button>

                    <button className="bg-white text-blue-400 w-[130px] rounded-xl hover:bg-blue-700 hover:text-white text-sm border-2 border-blue-400 py-2">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {/* // </Slider> */}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrialMeeting;
