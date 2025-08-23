import React from "react";

const cardData = [
  {
    title: "Sharing Expertise on Following",
    description:(
 <>
  <p className="text-sm text-gray-600 mb-3 font-semibold">
        Select the areas where you'd like to offer guidance. You can choose multiple.
      </p>

      <div className="flex flex-col gap-2">
        <label className="inline-flex items-center">
          <input type="checkbox" className="form-checkbox text-blue-600" />
          <span className="ml-2">Strategic Advice</span>
        </label>
        <label className="inline-flex items-center">
          <input type="checkbox" className="form-checkbox text-blue-600" />
          <span className="ml-2">Skill Development Roadmap</span>
        </label>
        <label className="inline-flex items-center">
          <input type="checkbox" className="form-checkbox text-blue-600" />
          <span className="ml-2">Portfolio Or Profile Feedback</span>
        </label>
        <label className="inline-flex items-center">
          <input type="checkbox" className="form-checkbox text-blue-600" />
          <span className="ml-2">Industry Insights</span>
        </label>
         <label className="inline-flex items-center">
          <input type="checkbox" className="form-checkbox text-blue-600" />
          <span className="ml-2">Connections And Opportunities</span>
        </label>
      
      </div>
 </>
    ),
  },
  {
    title: "Define Milestones",
    description: (
      <>
        Break down your help into clear outcomes. Example milestone:{" "}
        <span className="italic">“Basic introduction to Topic”</span>
      </>
    ),
  },
  {
    title: "Set fees for each expertise selected",
    description:(
        <>
        
            <div className="font-bold text-black ">
                *Fee Per Session=Total Fees/Number of Milestones;
            </div>
            <p className="mt-5">
            Fee per session will be paid to the expert, once the user submits positive feedback after the session.
</p>
        
        </>
    )
  }
];

const ExpertiseInfoRow: React.FC = () => {
  return (
    <div className="flex gap-3 mt-10 min-w-full">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-xl h-[300px] w-[400px] p-5 shadow hover:shadow-lg transition"
        >
          <h3 className="text-[1.3rem] font-bold mb-2 flex justify-center text-blue-600">{card.title}</h3>
          <p className="text-gray-700 text-lg mt-3">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ExpertiseInfoRow;
