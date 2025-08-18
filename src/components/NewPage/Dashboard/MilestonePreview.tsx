import React from "react";

interface Milestone {
  title: string;
  date: string;
  status: string;
  description: string;
}

const sampleMilestones: Milestone[] = [
  {
    title: "Milestone 1: Research Phase",
    date: "Aug 12 - Aug 19, 2025",
    status: "Not Started",
    description: "Initial research & requirement gathering with expert.",
  },
  {
    title: "Milestone 2: Development Phase",
    date: "Aug 20 - Sep 05, 2025",
    status: "Not Started",
    description: "Implementation of agreed scope with periodic check-ins.",
  },
  {
    title: "Milestone 3: Final Review & Delivery",
    date: "Sep 06 - Sep 10, 2025",
    status: "Not Started",
    description: "Final QA, review, and handover of deliverables.",
  },
];

const MilestonePreview: React.FC = () => {
  return (
    <div className="bg-white py-6 rounded-xl shadow-xl">
      <h2 className="text-xl font-bold text-center mb-4">
        Milestones (Sample Preview)
      </h2>
        <p className="text-center text-xs text-gray-500 italic my-2">
        This is a sample preview. Your real milestones will appear here once an
        expert is hired.
      </p>

      {/* Scrollable Container */}
      <div className="relative max-w-4xl mx-auto max-h-[400px] overflow-y-auto pr-4">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full" />

        {sampleMilestones.map((milestone, index) => (
          <div
            key={index}
            className={`mb-6 flex justify-between items-center w-full ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <div className="w-5/12" />

            {/* Timeline Circle */}
            <div className="z-10 flex items-center justify-center w-6 h-6 bg-white border-4 border-indigo-500 rounded-full" />

            {/* Milestone Card */}
            <div className="w-5/12 bg-gray-100 rounded-lg shadow p-4">
              <h3 className="text-sm font-semibold">{milestone.title}</h3>
              <p className="text-xs text-gray-500">{milestone.date}</p>
              <p className="text-xs text-indigo-600 mt-1">
                Status: {milestone.status}
              </p>
              <p className="text-xs text-gray-700 mt-1">
                {milestone.description}
              </p>
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default MilestonePreview;
