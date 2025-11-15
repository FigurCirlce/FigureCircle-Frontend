// 
import React from "react";
import { X } from "lucide-react";



export interface MilestoneData {
  check_id: number;
  check_meeting_id: number;
  created_at: string;         // "Tue, 11 Nov 2025 08:39:30 GMT"
  history_count: number;
  latest_milestone?: LatestMilestone; // optional if backend might not send it
  [key: string]: any;         // fallback for any extra fields you didn't list
}

export interface LatestMilestone {
  id?: number;
  title?: string;
  stage?: string;
  status?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;

  // handles any other backend fields
  [key: string]: any;
}



interface MilestonePopupProps {
  isOpen: boolean;
  onClose: () => void;
  MilestoneData: MilestoneData;
}

function convertDateTime(datetimeStr: string | number | Date): string {
  const dateObj = new Date(datetimeStr);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  let hours = dateObj.getHours();
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const time = `${hours}:${minutes} ${ampm}`;
  const formattedDate = `${day}/${month}/${year}`;
  return `${formattedDate} ${time}`;
}

const MilestonePopup: React.FC<MilestonePopupProps> = ({ isOpen, onClose, MilestoneData }) => {
  if (!isOpen) return null;

  const getProgressColor = (rating: number) => {
    if (rating >= 4) return "text-green-600 bg-green-100";
    if (rating >= 3) return "text-yellow-600 bg-yellow-100";
    if (rating >= 1) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };
console.log("MilestoneData----",MilestoneData);
  

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
       <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      
      { Object.keys(MilestoneData).length === 0?<div className="bg-white rounded-lg shadow-xl max-w-xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b"> 
          <p className="text-red-500">
            No Milestone submitted for this meeting yet!!
          </p>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button></div></div>:
          
          (
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            Milestone Details - Meeting ID: {MilestoneData.check_meeting_id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="border rounded-lg p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-700">History Count
:</span>
                  <span
                    className={`px-3 py-1 rounded-full font-medium ${getProgressColor(
                    MilestoneData.history_count

                    )}`}
                  >
                    {MilestoneData.history_count
} 
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-gray-700 text-lg">Latest Milestone:</span>
                  <p className="text-gray-600 mt-1"><span className="text-md ">Description-</span> {MilestoneData?.latest_milestone?.description

}</p>
         
          <p className="text-gray-600 mt-1"><span className="text-md ">Milestone-</span>{MilestoneData?.latest_milestone?.milestone


}</p>   
     <p className="text-gray-600 mt-1"><span className="text-md ">Expected Completion Date-</span>{MilestoneData?.latest_milestone?.expectedCompletionDate

}</p> 
    </div>

                <div>
                  <span className="font-semibold text-gray-700">Created:</span>
                  <p className="text-gray-600">{convertDateTime(MilestoneData.created_at)}</p>
                </div>

                {/* <div>
                  <span className="font-semibold text-gray-700">Feedback ID:</span>
                  <p className="text-gray-600">{item.feedback_id}</p>
                </div> */}
              </div>

             
            </div>
          </div>
        </div>
      </div>
     )}
    </div>
  );
};

export default MilestonePopup;
