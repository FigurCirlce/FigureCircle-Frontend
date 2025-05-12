// src/components/Chat.tsx
import React, { useEffect, useState } from 'react';
import socket from '../../config/socket';
// import { ChatMessage } from '../types';



interface ChatMessage {
    senderId: number;
    receiverId: number;
    message: string;
    timestamp: string;
}

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        socket.on('receive_message', (message: ChatMessage) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, []);

    const handleSendMessage = () => {
        if (input.trim()) {
            const newMessage: ChatMessage = {
                senderId: 2, // Replace with actual sender ID
                receiverId: 1, // Replace with actual receiver ID
                message: input,
                timestamp: new Date().toISOString(),
            };
            socket.emit('send_message', newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setInput('');
        }
    };

    return (
        <div>
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className="chat-message">
                        <strong>{msg.senderId}</strong>: {msg.message}
                        <div className="timestamp">{msg.timestamp}</div>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
