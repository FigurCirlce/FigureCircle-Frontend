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
    const [waitingForMentor, setWaitingForMentor] = useState(false);
    const [waitingAttempts, setWaitingAttempts] = useState(0);
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

                    // CRITICAL: Wait for mentor (host) to be available before joining
                    console.log('⏳ Waiting for mentor to join the call...');
                    setWaitingForMentor(true);
                    let mentorAvailable = false;
                    let attempts = 0;
                    const maxAttempts = 30; // 30 seconds max wait time

                    // Poll to check if mentor's peer ID is available
                    while (!mentorAvailable && attempts < maxAttempts) {
                        setWaitingAttempts(attempts + 1);
                        try {
                            // Create a temporary peer to check if host exists
                            const tempPeer = new Peer({
                                host: '0.peerjs.com',
                                secure: true,
                                port: 443,
                            });

                            await new Promise<void>((resolve) => {
                                tempPeer.on('open', () => {
                                    // Try to connect to the host
                                    const testConn = tempPeer.connect(hostId);

                                    testConn.on('open', () => {
                                        console.log('✅ Mentor is available!');
                                        mentorAvailable = true;
                                        setWaitingForMentor(false);
                                        testConn.close();
                                        tempPeer.destroy();
                                        resolve();
                                    });

                                    testConn.on('error', () => {
                                        console.log(`Attempt ${attempts + 1}: Mentor not available yet...`);
                                        testConn.close();
                                        tempPeer.destroy();
                                        resolve();
                                    });

                                    // Timeout for this attempt
                                    setTimeout(() => {
                                        if (!mentorAvailable) {
                                            testConn.close();
                                            tempPeer.destroy();
                                            resolve();
                                        }
                                    }, 1000);
                                });
                            });

                        } catch (checkError) {
                            console.log('Error checking mentor availability:', checkError);
                        }

                        if (!mentorAvailable) {
                            await new Promise(resolve => setTimeout(resolve, 1000));
                            attempts++;
                        }
                    }
                    setWaitingForMentor(false);

                    if (!mentorAvailable) {
                        throw new Error('Mentor has not joined yet. Please try again in some time.');
                    }

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
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                <div className="bg-gray-800/80 backdrop-blur-sm text-white p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full mx-4">
                    {waitingForMentor ? (
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center animate-pulse">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold mb-3">Waiting for Mentor</h2>
                            <p className="text-gray-400 mb-4">
                                Your mentor hasn't joined the meeting yet. Please wait or try again in a few moments.
                            </p>
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                <span className="ml-2">Checking... ({waitingAttempts}/30)</span>
                            </div>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm"
                            >
                                Go Back to Dashboard
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-lg">Connecting to meeting...</p>
                        </div>
                    )}
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