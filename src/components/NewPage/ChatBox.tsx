import React, { useState } from "react";
import { X, Send } from "lucide-react";
import { MessagesSquare } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: "user" | "mentor";
}

const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setOpen(!open);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), text: input, sender: "user" }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Button */}
      {!open && (
        <button 
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
          onClick={toggleChat}
        >
          <MessagesSquare/>
        </button>
      )}

      {/* Chat Box */}
      {open && (
        <div className="w-72 h-96 bg-white shadow-lg rounded-lg flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center bg-blue-600 text-white p-3">
            <span>Chat</span>
            <button onClick={toggleChat}><X className="w-5 h-5" /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user" ? "bg-blue-100 self-end" : "bg-gray-100 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
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
