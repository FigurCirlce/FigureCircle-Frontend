import React from "react";
import { X } from "lucide-react";

interface FeedbackData {
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
  feedbackData: FeedbackData[];
  // meetingId: number;
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

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ 
  isOpen, 
  onClose, 
  feedbackData, 

}) => {
  if (!isOpen) return null;

  const getProgressColor = (rating: number) => {
    if (rating >= 80) return "text-green-600 bg-green-100";
    if (rating >= 60) return "text-yellow-600 bg-yellow-100";
    if (rating >= 40) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            Feedback Details - Meeting ID:
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {feedbackData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No feedback data available for this meeting.
            </div>
          ) : (
            <div className="space-y-6">
              {feedbackData.map((feedback, index) => (
                <div key={index} className="border rounded-lg p-6 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-700">Progress Rating:</span>
                        <span className={`px-3 py-1 rounded-full font-medium ${getProgressColor(feedback.progress_rating)}`}>
                          {feedback.progress_rating}%
                        </span>
                      </div>
                      
                      <div>
                        <span className="font-semibold text-gray-700">Milestone:</span>
                        <p className="text-gray-600 mt-1">{feedback.milestone}</p>
                      </div>
                      
                      <div>
                        <span className="font-semibold text-gray-700">Created:</span>
                        <p className="text-gray-600">{convertDateTime(feedback.created_at)}</p>
                      </div>
                      
                      <div>
                        <span className="font-semibold text-gray-700">Feedback ID:</span>
                        <p className="text-gray-600">{feedback.feedback_id}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="font-semibold text-gray-700">Milestone Achieved:</span>
                          <div className="flex items-center mt-1">
                            <span className={`w-3 h-3 rounded-full mr-2 ${
                              feedback.milestone_achieved ? 'bg-green-500' : 'bg-red-500'
                            }`}></span>
                            <span className={`font-medium ${
                              feedback.milestone_achieved ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {feedback.milestone_achieved ? 'Yes' : 'No'}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="font-semibold text-gray-700">Next Steps Identified:</span>
                          <div className="flex items-center mt-1">
                            <span className={`w-3 h-3 rounded-full mr-2 ${
                              feedback.next_steps_identified ? 'bg-green-500' : 'bg-red-500'
                            }`}></span>
                            <span className={`font-medium ${
                              feedback.next_steps_identified ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {feedback.next_steps_identified ? 'Yes' : 'No'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="font-semibold text-gray-700">Mentor Responsibility:</span>
                          <div className="flex items-center mt-1">
                            <span className={`w-3 h-3 rounded-full mr-2 ${
                              feedback.mentor_responsibility ? 'bg-blue-500' : 'bg-gray-400'
                            }`}></span>
                            <span className="text-gray-600">
                              {feedback.mentor_responsibility ? 'Accepted' : 'Not Accepted'}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="font-semibold text-gray-700">User Responsibility:</span>
                          <div className="flex items-center mt-1">
                            <span className={`w-3 h-3 rounded-full mr-2 ${
                              feedback.user_responsibility ? 'bg-blue-500' : 'bg-gray-400'
                            }`}></span>
                            <span className="text-gray-600">
                              {feedback.user_responsibility ? 'Accepted' : 'Not Accepted'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-500 pt-2">
                        <p>Meeting ID: {feedback.check_meeting_id}</p>
                        <p>Mentor ID: {feedback.mentor_id} | User ID: {feedback.user_id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPopup;