import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '@/config/config';
import socket from '../../config/socket'; // Import the socket instance

interface MessageProps {
    avatarSrc: string;
    username: string;
    message: string;
    timestamp: string;
}

const Message: React.FC<MessageProps> = ({ avatarSrc, username, message, timestamp }) => (
    <div className="flex items-center mb-2">
        <img className="w-8 h-8 rounded-full mr-2" src={avatarSrc} alt="User Avatar" />
        <div className="font-medium">{username}</div>
        <div
            className="bg-white rounded-lg p-2 shadow mb-2 max-w-sm"
            dangerouslySetInnerHTML={{ __html: message }} // Render message as HTML
        />
        <div className="text-xs text-gray-500 ml-2">{new Date(timestamp).toLocaleString()}</div>
    </div>
);

interface ChatInputProps {
    onSend: (message: string) => void;
    onSendMeetingLink: () => void; // Add callback for meeting link
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, onSendMeetingLink }) => {
    const [message, setMessage] = useState('');


    const handleSendMessage = () => {
        onSend(message);
        setMessage('');
    };

    const handleSendMeetingLink = () => {
        onSendMeetingLink();
        // setMeetingLink('');
    };

    return (
        <div className="bg-gray-100 px-4 py-2">
            <div className="flex flex-col">
                <div className="flex items-center mb-2">
                    <input
                        className="w-full border rounded-full py-2 px-4 mr-2"
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
                        onClick={handleSendMessage}
                    >
                        Send
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4  rounded-full"
                        onClick={handleSendMeetingLink}
                    >
                        Send
                    </button>
                </div>
                <div className="flex items-center">
                    {/* <input
                        className="w-full border rounded-full py-2 px-4 mr-2"
                        type="text"
                        placeholder="Enter meeting link..."
                        value={meetingLink}
                        onChange={(e) => setMeetingLink(e.target.value)}
                    /> */}

                </div>
            </div>
        </div>
    );
};

interface ChatBoxProps {
    userAvatarSrc: string;
    userId: number;
    onSelectMentor: (mentorId: number) => void;
    selectedMentorIds: any;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ userAvatarSrc, userId, onSelectMentor }) => {
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [mentors, setMentors] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [selectedMentorId, setSelectedMentorId] = useState<number | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [data, setData] = useState<any>({});

    useEffect(() => {
        const degree = localStorage.getItem('degree') || "{}";
        setData(JSON.parse(degree));
    }, []);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${baseURL}/assigned_mentors`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setMentors(response.data.assigned_mentors);
            } catch (error) {
                console.error('Error fetching mentors:', error);
            }
        };

        fetchMentors();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${baseURL}/assigned_users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setUsers(response.data.assigned_users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const selectedId = selectedMentorId || selectedUserId;
        if (selectedId) {
            // const room = `${Math.min(data?.user_id, selectedId)}_${Math.max(data?.user_id, selectedId)}`;
            socket.emit('join_room', { sender_id: data?.user_id, receiver_id: selectedId });

            socket.emit('get_messages', { sender_id: data?.user_id, receiver_id: selectedId });

            socket.on('message_history', (data) => {
                setMessages(data.messages.map((msg: any) => ({
                    ...msg,
                    avatarSrc: msg.sender_id === userId ? userAvatarSrc : 'https://picsum.photos/50/50',
                    username: msg.sender_id === userId ? 'You' : `User ${msg.sender_id}`,
                    timestamp: msg.timestamp,
                })));
            });

            socket.on('message_error', (error) => {
                console.error('Error fetching messages:', error);
            });

            return () => {
                socket.off('message_history');
                socket.off('message_error');
            };
        }
    }, [selectedMentorId, selectedUserId]);

    useEffect(() => {
        socket.on('receive_message', (data: any) => {
            const { sender_id, message, timestamp } = data;
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    avatarSrc: sender_id === userId ? userAvatarSrc : 'https://picsum.photos/50/50',
                    username: sender_id === userId ? 'You' : `User ${sender_id}`,
                    message,
                    timestamp,
                },
            ]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, []);

    const handleSend = (message: string) => {
        const selectedId = selectedMentorId || selectedUserId;
        if (!selectedId) {
            console.error('No recipient selected to send message to.');
            return;
        }

        socket.emit('send_message', {
            sender_id: data?.user_id,
            receiver_id: selectedId,
            message,
        });
    };

    const handleSendMeetingLink = () => {
        const selectedId = selectedMentorId || selectedUserId;
        if (!selectedId) {
            console.error('No recipient selected to send message to.');
            return;
        }

        // Find the selected mentor's name
        const selectedMentor = mentors.find(mentor => mentor.id === selectedMentorId);
        const mentorName = selectedMentor ? selectedMentor.mentor_name : 'meeting';

        const randomNumber = Math.floor(Math.random() * 10000);
        const meetingLink = `meeting/${randomNumber}-${mentorName}`;
        const clickableLink = `<a style="color: blue; font-weight: bold;"  href="${meetingLink}" target="_blank" rel="noopener noreferrer">Click on the Meeting link: ${meetingLink}</a>`;

        socket.emit('send_message', {
            sender_id: data?.user_id,
            receiver_id: selectedId,
            message: clickableLink,
        });
    };

    const handleMentorSelect = (mentorId: number) => {
        setSelectedMentorId(mentorId);
        setSelectedUserId(null);
        onSelectMentor(mentorId);
    };

    const handleUserSelect = (userId: number) => {
        setSelectedUserId(userId);
        setSelectedMentorId(null);
        onSelectMentor(userId);
    };

    return (
        <div className="h-[40rem] flex">
            <div className="w-1/4 bg-gray-100 p-2 overflow-y-scroll">
                <h2 className="font-bold mb-2">Mentors</h2>
                {mentors.map((mentor) => (
                    <div key={mentor.id} className="mb-2 p-2 border rounded" onClick={() => handleMentorSelect(mentor.id)}>
                        <div className="font-medium">{mentor.mentor_name}</div>
                        <div>{mentor.stream_name}</div>
                        <div>{mentor.id}</div>
                    </div>
                ))}
                <h2 className="font-bold mb-2">Users</h2>
                {users.map((user) => (
                    <div key={user.id} className="mb-2 p-2 border rounded" onClick={() => handleUserSelect(user.id)}>
                        <div className="font-medium">{user.username}</div>
                    </div>
                ))}
            </div>
            <div className="flex-1 flex flex-col">
                <div className="bg-gray-200 flex-1 overflow-y-scroll px-4 py-2">
                    {messages.map((msg, index) => (
                        <Message key={index} {...msg} />
                    ))}
                </div>
                <ChatInput onSend={handleSend} onSendMeetingLink={handleSendMeetingLink} />
            </div>
        </div>
    );
};
