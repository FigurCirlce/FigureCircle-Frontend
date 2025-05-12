import React, { useState } from 'react';
import axios from 'axios';

const Chat: React.FC = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<{ message: string; source: string }[]>([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = () => {
        if (!message.trim()) {
            return; // If message is blank or only contains whitespace, return early
        }

        setLoading(true);
        axios.post('https://harsh1993-model.hf.space/ai_mentor', { message })
            .then(response => {
                setChatHistory([...chatHistory, { message, source: 'user' }, { message: response.data.response, source: 'mentor' }]);
                setMessage('');
            })
            .catch(error => console.error('Error:', error))
            .finally(() => setLoading(false));
    };

    return (
        <div className="h-[30rem] flex flex-col">
            <div className="bg-gray-200 flex-1 overflow-y-scroll">
                {chatHistory.filter(chat => chat.message.trim() !== '').map((chat, index) => (
                    <div key={index} className={`px-4 py-2 ${chat.source === 'user' ? 'flex justify-end' : 'flex justify-start'}`}>
                        <div className="flex items-center mb-2">
                            {chat.source === 'mentor' && <img className="w-8 h-8 rounded-full mr-2" src="https://picsum.photos/50/50" alt="Mentor Avatar" />}
                            <div className={`bg-white rounded-lg p-2 shadow mb-2 max-w-[32rem] ${chat.source === 'user' ? 'bg-blue-500 text-black' : 'bg-gray-300'}`}>
                                {chat.message}
                            </div>
                            {chat.source === 'user' && <img className="w-8 h-8 rounded-full ml-2" src="https://picsum.photos/50/50" alt="User Avatar" />}
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-gray-100 px-4 py-2">
                <div className="flex items-center">
                    <input
                        className="w-full border rounded-full py-2 px-4 mr-2"
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-black font-medium py-2 px-4 rounded-full"
                        onClick={sendMessage}
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
