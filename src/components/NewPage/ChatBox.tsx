// import React, { useState } from "react";
// import { X, Send } from "lucide-react";
// import { MessagesSquare } from 'lucide-react';

// interface Message {
//   id: number;
//   text: string;
//   sender: "user" | "mentor";
// }

// const ChatWidget: React.FC = () => {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");

//   const toggleChat = () => setOpen(!open);

//   const sendMessage = () => {
//     if (!input.trim()) return;
//     setMessages([...messages, { id: Date.now(), text: input, sender: "user" }]);
//     setInput("");
//   };

//   // return (
//   //   <div className="">
//   //     {/* Chat Button */}
//   //     {!open && (
//   //       <button 
//   //         className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
//   //         onClick={toggleChat}
//   //       >
//   //         <MessagesSquare/>
//   //       </button>
//   //     )}

//   //     {/* Chat Box */}
//   //     {open && (
//   //       <div className="w-72 h-96 z-1000 bg-white shadow-lg rounded-lg flex flex-col overflow-hidden">
//   //         {/* Header */}
//   //         <div className="flex justify-between items-center bg-blue-600 text-white p-3">
//   //           <span>Chat</span>
//   //           <button onClick={toggleChat}><X className="w-5 h-5" /></button>
//   //         </div>

//   //         {/* Messages */}
//   //         <div className="flex-1 p-3 overflow-y-auto space-y-2">
//   //           {messages.map((msg) => (
//   //             <div
//   //               key={msg.id}
//   //               className={`p-2 rounded-lg max-w-[80%] ${
//   //                 msg.sender === "user" ? "bg-blue-100 self-end" : "bg-gray-100 self-start"
//   //               }`}
//   //             >
//   //               {msg.text}
//   //             </div>
//   //           ))}
//   //         </div>

//   //         {/* Input */}
//   //         <div className="flex p-2 border-t border-gray-200">
//   //           <input
//   //             className="flex-1 px-2 py-1 border rounded-l-lg focus:outline-none"
//   //             type="text"
//   //             placeholder="Type a message..."
//   //             value={input}
//   //             onChange={(e) => setInput(e.target.value)}
//   //             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//   //           />
//   //           <button
//   //             className="bg-blue-600 p-2 rounded-r-lg text-white hover:bg-blue-700"
//   //             onClick={sendMessage}
//   //           >
//   //             <Send className="w-4 h-4" />
//   //           </button>
//   //         </div>
//   //       </div>
//   //     )}
//   //   </div>
//   // );
// return (
//   <div className="relative">
//     {/* Chat Button */}
//     {!open && (
//       <button 
//         className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
//         onClick={toggleChat}
//       >
//         <MessagesSquare/>
//       </button>
//     )}

//     {/* Chat Box */}
//     {open && (
//       <div className="fixed bottom-20 right-10 w-72 h-96 bg-white shadow-2xl rounded-lg flex flex-col overflow-hidden z-50">
//         {/* Header */}
//         <div className="flex justify-between items-center bg-blue-600 text-white p-3">
//           <span>Chat</span>
//           <button onClick={toggleChat}><X className="w-5 h-5" /></button>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 p-3 overflow-y-auto space-y-2">
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`p-2 rounded-lg max-w-[80%] ${
//                 msg.sender === "user" ? "bg-blue-100 self-end" : "bg-gray-100 self-start"
//               }`}
//             >
//               {msg.text}
//             </div>
//           ))}
//         </div>

//         {/* Input */}
//         <div className="flex p-2 border-t border-gray-200">
//           <input
//             className="flex-1 px-2 py-1 border rounded-l-lg focus:outline-none"
//             type="text"
//             placeholder="Type a message..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <button
//             className="bg-blue-600 p-2 rounded-r-lg text-white hover:bg-blue-700"
//             onClick={sendMessage}
//           >
//             <Send className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     )}
//   </div>
// );


// };

// export default ChatWidget;
import React, { useEffect, useState } from "react";
import { X, Send, MessagesSquare } from "lucide-react";
import axios from "axios";
import baseURL from "@/config/config";
import { toast } from "react-toastify";

interface Message {
  id: number;
  text: string;
  sender: "user" | "mentor";
  is_read: boolean,
  mentor_id: null,
  message: string,
  receiver_id: number,
  sender_id: number,
      "timestamp": "2025-11-01T07:20:15.523977"
}

interface ChatWidgetProps {
  mentorName: string;
  isOpen: boolean;
  onToggle: () => void;
  mentorId:string | number;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ mentorName, isOpen, onToggle,mentorId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
 
  const [input, setInput] = useState("");

  const user=localStorage.getItem("user");
  const parsedUser=user?JSON.parse(user):null;
   const notifySuccess = () => toast.success("Message sent successfully!");
  // const handleMessage=()=>{
  //    if (!input.trim()) return;
  //   setMessages([...messages, { id: Date.now(), text: input, sender: "user" }]);
  //   setInput("");
  //   sendMessage();
  // }

  const sendMessage = async() => {
  
    const dataToSend={
       sender_id: parsedUser?.user_id,
    receiver_id: mentorId,
    message: input,
    mentor_id: mentorId
    }

    const res=await axios.post(`${baseURL}/send_message`,dataToSend);
    console.log("res--data",res.data);
    if(res.status==200){
      //notification Message box too
      notifySuccess();
      getMessages( mentorId);
      setInput("");
    }
  };

  const getMessages=async(id:number | string)=>{
     const res=await axios.get(`${baseURL}/get_messages/${parsedUser.user_id}/${id}`);
     console.log("res.dataaa--getMessages",res.data);
     const data=res.data.messages;
     setMessages(data);
  }

  useEffect(()=>{
    getMessages(mentorId);
  },[isOpen]);


  return (
    <div className="relative">
      {/* Chat Button */}
      {!isOpen && (
        <button
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
          onClick={onToggle}
        >
          <MessagesSquare />
        </button>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-20 right-10 w-72 h-96 bg-white shadow-2xl rounded-lg flex flex-col overflow-hidden z-[1000]">
          {/* Header */}
          <div className="flex justify-between items-center bg-blue-600 text-white p-3">
            <span>{mentorName}</span>
            <button onClick={onToggle}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.length === 0 ? (
              <p className="text-gray-400 text-sm text-center mt-10">
                Start chatting with {mentorName}!
              </p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2 rounded-lg max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-blue-100 self-end"
                      : "bg-gray-100 self-start"
                  }`}
                >
                  {msg.message}
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="flex p-2 border-t border-gray-200">
            <input
              className="flex-1 px-2 py-1 border rounded-l-lg focus:outline-none"
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="bg-blue-600 p-2 rounded-r-lg text-white hover:bg-blue-700"
              onClick={sendMessage}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
