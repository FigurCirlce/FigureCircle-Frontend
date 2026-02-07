// 
import React from "react";
import { X } from "lucide-react";
import { JSX } from "react/jsx-runtime";


interface FeedbackData {
  map(arg0: (item: any) => JSX.Element): React.ReactNode;
  check_id: number;
  check_meeting_id: number;
  created_at: string;
  feedback_id: number;
  mentor_id: number;
  mentor_responsibility: boolean;
  milestone: string;
  milestone_achieved: boolean;
  next_steps_identified: boolean;
  progress_rating: number;
  user_id: number;
  user_responsibility: boolean;
}


interface FeedbackPopupProps {
  isOpen: boolean;
  onClose: () => void;
  feedbackData: FeedbackData;
  userId:number;
  userType:string
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

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ isOpen, onClose, feedbackData ,userId,userType}) => {
  if (!isOpen) return null;

  const getProgressColor = (rating: number) => {
    if (rating >= 4) return "text-green-600 bg-green-100";
    if (rating >= 3) return "text-yellow-600 bg-yellow-100";
    if (rating >= 1) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };
console.log("feedbackData----",feedbackData);
  

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
       <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      
      { Object.keys(feedbackData).length === 0? <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
                  <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative"> 
                     <button
                      onClick={onClose}
                      className="absolute top-4 right-4 text-gray-500"
                    >
                      <X size={22} />
                    </button>
          <p className="text-center text-slate-600 text-sm">
            No feedback submitted for this meeting yet.
          </p>
         </div>
          
           
          
          
          </div>:(feedbackData.map((item:any)=>(
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {Number(item.check_id)===Number(userId)?'Your Feedback':userType?'Mentee Feedback':'Mentor Feedback'} 
            {/* Details - Meeting ID: {item.check_meeting_id} */}
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
                  <span className="font-semibold text-gray-700">Progress Rating:</span>
                  <span
                    className={`px-3 py-1 rounded-full font-medium ${getProgressColor(
                    item.progress_rating
                    )}`}
                  >
                    {item.progress_rating} 🌟
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">Milestone:</span>
                  <p className="text-gray-600 mt-1">{item.milestone}</p>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">Created:</span>
                  <p className="text-gray-600">{convertDateTime(item.created_at)}</p>
                </div>

                {/* <div>
                  <span className="font-semibold text-gray-700">Feedback ID:</span>
                  <p className="text-gray-600">{item.feedback_id}</p>
                </div> */}
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold text-gray-700">Milestone Achieved:</span>
                    <div className="flex items-center mt-1">
                      <span
                        className={`w-3 h-3 rounded-full mr-2 ${
                          item.milestone_achieved ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></span>
                      <span
                        className={`font-medium ${
                        item.milestone_achieved ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {item.milestone_achieved ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-700">Next Steps Identified:</span>
                    <div className="flex items-center mt-1">
                      <span
                        className={`w-3 h-3 rounded-full mr-2 ${
                          item.next_steps_identified ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></span>
                      <span
                        className={`font-medium ${
                        item.next_steps_identified ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {item.next_steps_identified ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold text-gray-700">Mentor Responsibility:</span>
                    <div className="flex items-center mt-1">
                      <span
                        className={`w-3 h-3 rounded-full mr-2 ${
                        item.mentor_responsibility ? "bg-blue-500" : "bg-gray-400"
                        }`}
                      ></span>
                      <span className="text-gray-600">
                        {item.mentor_responsibility ? "Accepted" : "Not Accepted"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-700">User Responsibility:</span>
                    <div className="flex items-center mt-1">
                      <span
                        className={`w-3 h-3 rounded-full mr-2 ${
                          item.user_responsibility ? "bg-blue-500" : "bg-gray-400"
                        }`}
                      ></span>
                      <span className="text-gray-600">
                        {item.user_responsibility ? "Accepted" : "Not Accepted"}
                      </span>
                    </div>
                  </div>
                </div> */}

                {/* <div className="text-sm text-gray-500 pt-2">
                  <p>Meeting ID: {item.check_meeting_id}</p>
                  <p>Mentor ID: {item.mentor_id} | User ID: {item.user_id}</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
     ) ))}
    </div>
  );
};

export default FeedbackPopup;
