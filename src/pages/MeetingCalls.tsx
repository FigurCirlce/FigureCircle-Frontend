import { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';
import { useNavigate, useParams } from 'react-router-dom';
import MeetingCall from '@/components/MeetingCall';
//@ts-ignore
import CryptoJS from 'crypto-js';

const MeetingCallHandler = () => {
    const [roomId, setRoomId] = useState('');
    const [password, setPassword] = useState('');
    const [isHost, setIsHost] = useState(false);
    const [joinedRoom, setJoinedRoom] = useState(false);
    const [error, setError] = useState('');
    const [hostPeerId, setHostPeerId] = useState('');
    const navigate = useNavigate();
    const secretKey = 'meetingkeys';
    const peerRef = useRef<Peer | null>(null);

    // Get meeting ID from URL path
    const { id: meetingId, userId: urlUserId } = useParams();

    // Create a peer with the given ID
    const createPeer = (peerId: string): Promise<Peer> => {
        return new Promise((resolve, reject) => {
            console.log('🔄 Creating peer with ID:', peerId);

            const peer = new Peer(peerId, {
                host: '0.peerjs.com',
                secure: true,
                port: 443,
                config: {
                    iceServers: [
                        { urls: 'stun:stun.l.google.com:19302' },
                        { urls: 'stun:stun1.l.google.com:19302' },
                    ]
                },
                debug: 2
            });

            const timeout = setTimeout(() => {
                console.log('❌ Peer creation timeout for:', peerId);
                peer.destroy();
                reject(new Error('Peer creation timeout'));
            }, 15000);

            peer.on('open', (id) => {
                clearTimeout(timeout);
                console.log('✅ Peer opened with ID:', id);
                resolve(peer);
            });

            peer.on('error', (err) => {
                clearTimeout(timeout);
                console.log('❌ Peer error:', err.type, err.message);
                // Don't destroy immediately for unavailable-id, just reject
                if (err.type !== 'unavailable-id') {
                    peer.destroy();
                }
                reject(err);
            });
        });
    };

    useEffect(() => {
        const initializeRoom = async () => {
            try {
                // Get user data from localStorage to determine if mentor
                const userDataStr = localStorage.getItem('user');
                const userData = userDataStr ? JSON.parse(userDataStr) : null;
                const isMentor = userData?.is_mentor === true;

                console.log('=== MEETING INITIALIZATION ===');
                console.log('Meeting ID:', meetingId);
                console.log('URL User ID:', urlUserId);
                console.log('Is Mentor:', isMentor);
                console.log('User ID from storage:', userData?.user_id);

                // Parse URL parameters
                const urlParams = new URLSearchParams(window.location.search);
                const encryptedRoomId = urlParams.get('roomid');
                const encryptedPassword = urlParams.get('password');
                const encryptedStartDate = urlParams.get('start');
                const encryptedEndDate = urlParams.get('end');
                const encryptedTimezone = urlParams.get('timezone');

                if (!encryptedRoomId || !encryptedPassword || !encryptedStartDate || !encryptedEndDate || !encryptedTimezone) {
                    throw new Error('Missing room parameters');
                }

                // Decrypt room credentials
                const decryptedRoomId = CryptoJS.AES.decrypt(encryptedRoomId, secretKey).toString(CryptoJS.enc.Utf8);
                const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, secretKey).toString(CryptoJS.enc.Utf8);

                console.log('Decrypted Room ID:', decryptedRoomId);

                if (!decryptedRoomId || !decryptedPassword) {
                    throw new Error('Invalid room credentials');
                }

                // Create predictable peer IDs based on meeting ID and date
                const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
                const baseRoomId = `meet-${meetingId}-${today}`;

                // MENTOR is always HOST, MENTEE is always PARTICIPANT
                // Host ID is predictable - both parties know it
                const hostId = `${baseRoomId}-host`;

                console.log('Base Room ID:', baseRoomId);
                console.log('Host Peer ID:', hostId);
                console.log('I am:', isMentor ? 'MENTOR (HOST)' : 'MENTEE (PARTICIPANT)');

                let myPeer: Peer;

                if (isMentor) {
                    // MENTOR: Create the host peer
                    console.log('🎯 Creating HOST peer as MENTOR...');

                    try {
                        myPeer = await createPeer(hostId);
                        console.log('✅ MENTOR is now HOST at:', hostId);
                    } catch (hostError: any) {
                        if (hostError.type === 'unavailable-id') {
                            // Host ID already taken - maybe from a previous session
                            // Wait and retry
                            console.log('⚠️ Host ID taken, waiting and retrying...');
                            await new Promise(resolve => setTimeout(resolve, 3000));
                            myPeer = await createPeer(hostId);
                        } else {
                            throw hostError;
                        }
                    }

                    peerRef.current = myPeer;
                    setIsHost(true);

                } else {
                    // MENTEE: Create a participant peer and will call the host
                    const participantId = `${baseRoomId}-mentee-${userData?.user_id || Date.now()}`;
                    console.log('🎯 Creating PARTICIPANT peer as MENTEE:', participantId);

                    // Wait a bit to ensure mentor (host) has time to create their peer
                    console.log('⏳ Waiting 2 seconds for host to be ready...');
                    await new Promise(resolve => setTimeout(resolve, 2000));

                    myPeer = await createPeer(participantId);
                    console.log('✅ MENTEE joined as PARTICIPANT');

                    peerRef.current = myPeer;
                    setIsHost(false);
                }

                setRoomId(decryptedRoomId);
                setPassword(decryptedPassword);
                setHostPeerId(hostId);
                setJoinedRoom(true);

                console.log('=== MEETING SETUP COMPLETE ===');
                console.log('Is Host:', isMentor);
                console.log('Host Peer ID:', hostId);
                console.log('My Peer ID:', peerRef.current?.id);

            } catch (error) {
                console.error('❌ Room initialization error:', error);
                setError(error instanceof Error ? error.message : 'Failed to initialize room');
            }
        };

        initializeRoom();

        return () => {
            if (peerRef.current) {
                console.log('🧹 Cleaning up peer:', peerRef.current.id);
                peerRef.current.destroy();
            }
        };
    }, [meetingId, urlUserId]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [error, navigate]);

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="bg-red-600 text-white p-4 rounded-md shadow-lg">
                    <p>{error}</p>
                    <p className="text-sm mt-2">Redirecting to home in 10 seconds...</p>
                </div>
            </div>
        );
    }

    if (!joinedRoom) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="bg-gray-800 text-white p-4 rounded-md shadow-lg">
                    <p>Connecting to meeting...</p>
                </div>
            </div>
        );
    }

    return (
        <MeetingCall
            roomId={roomId}
            password={password}
            isHost={isHost}
            peer={peerRef.current}
            actualHostId={hostPeerId}
        />
    );
};

export default MeetingCallHandler;