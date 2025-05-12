import { useState, useEffect, useRef } from 'react';
import Peer, { DataConnection } from 'peerjs';
import { useNavigate } from 'react-router-dom';
import MeetingCall from '@/components/MeetingCall';
//@ts-ignore
import CryptoJS from 'crypto-js';
//@ts-ignore
import { DateTime } from 'luxon';

//@ts-ignore
interface PeerConnection {
    peer: string;
    conn: DataConnection;
}

const MeetingCallHandler = () => {
    const [roomId, setRoomId] = useState('');
    const [password, setPassword] = useState('');
    const [isHost, setIsHost] = useState(false);
    const [joinedRoom, setJoinedRoom] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const secretKey = 'meetingkeys';
    const peerRef = useRef<Peer | null>(null);
    const connectionAttempts = useRef(0);
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 2000;
    const MAX_RECONNECTION_ATTEMPTS = 5;

    // Function to handle peer connection errors and reconnection
    const handlePeerError = async (peer: Peer, error: Error) => {
        console.error('Peer connection error:', error);

        if (connectionAttempts.current < MAX_RECONNECTION_ATTEMPTS) {
            connectionAttempts.current += 1;
            console.log(`Attempting reconnection ${connectionAttempts.current}/${MAX_RECONNECTION_ATTEMPTS}`);

            try {
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                peer.reconnect();
            } catch (reconnectError) {
                console.error('Reconnection failed:', reconnectError);
                if (connectionAttempts.current === MAX_RECONNECTION_ATTEMPTS) {
                    setError('Failed to connect to the room after multiple attempts');
                }
            }
        } else {
            setError('Connection to room failed');
        }
    };

    // Function to create and setup a new peer connection
    const setupPeer = (peerId: string): Promise<Peer> => {
        return new Promise((resolve, reject) => {
            const peer = new Peer(peerId, {
                host: '0.peerjs.com',
                secure: true,
                port: 443,
                config: {
                    iceServers: [
                        { urls: 'stun:stun.l.google.com:19302' },
                        { urls: 'stun:stun1.l.google.com:19302' },
                        { urls: 'stun:global.stun.twilio.com:3478' }
                    ]
                },
                debug: 2
            });

            const timeout = setTimeout(() => {
                peer.destroy();
                reject(new Error('Peer creation timeout'));
            }, 15000);

            peer.on('open', () => {
                clearTimeout(timeout);
                console.log('Peer connection established:', peerId);
                resolve(peer);
            });

            peer.on('error', (err) => {
                clearTimeout(timeout);
                handlePeerError(peer, err);
                reject(err);
            });

            peer.on('disconnected', () => {
                console.log('Peer disconnected, attempting to reconnect...');
                peer.reconnect();
            });
        });
    };

    // Function to verify room existence
    const verifyRoom = async (roomId: string): Promise<boolean> => {
        try {
            const tempPeerId = `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
            const tempPeer = await setupPeer(tempPeerId);

            return new Promise((resolve) => {
                const conn = tempPeer.connect(roomId, {
                    reliable: true,
                    metadata: { type: 'roomCheck' }
                });

                const timeout = setTimeout(() => {
                    tempPeer.destroy();
                    resolve(false);
                }, 5000);

                conn.on('open', () => {
                    clearTimeout(timeout);
                    tempPeer.destroy();
                    resolve(true);
                });

                conn.on('error', () => {
                    clearTimeout(timeout);
                    tempPeer.destroy();
                    resolve(false);
                });
            });
        } catch {
            return false;
        }
    };

    // Function to handle room connection
    const connectToRoom = async (peer: Peer, hostId: string, password: string): Promise<void> => {
        let attempts = 0;

        while (attempts < MAX_RETRIES) {
            try {
                const conn = peer.connect(hostId, {
                    reliable: true,
                    metadata: {
                        type: 'joinRequest',
                        password: password,
                        timestamp: Date.now()
                    }
                });

                return new Promise((resolve, reject) => {
                    const timeout = setTimeout(() => {
                        conn.close();
                        reject(new Error('Connection timeout'));
                    }, 10000);

                    conn.on('open', () => {
                        clearTimeout(timeout);

                        conn.on('data', (data: any) => {
                            if (data.type === 'roomAccess') {
                                if (data.granted) {
                                    console.log('Room access granted');
                                    resolve();
                                } else {
                                    reject(new Error('Access denied: Invalid password'));
                                }
                            }
                        });
                    });

                    conn.on('error', (err) => {
                        clearTimeout(timeout);
                        reject(err);
                    });
                });
            } catch (error) {
                attempts++;
                if (attempts === MAX_RETRIES) {
                    throw new Error('Failed to connect after maximum retries');
                }
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            }
        }
    };

    useEffect(() => {
        const initializeRoom = async () => {
            try {
                // Parse and validate URL parameters
                const urlParams = new URLSearchParams(window.location.search);
                const encryptedRoomId = urlParams.get('roomid');
                const encryptedPassword = urlParams.get('password');
                const encryptedStartDate = urlParams.get('start');
                const encryptedEndDate = urlParams.get('end');
                const encryptedTimezone = urlParams.get('timezone');

                
                console.log('Encrypted Room encryptedTimezone:', encryptedRoomId,encryptedTimezone,encryptedPassword,encryptedStartDate,encryptedEndDate);

                if (!encryptedRoomId || !encryptedPassword || !encryptedStartDate || !encryptedEndDate || !encryptedTimezone) {
                    throw new Error('Missing room parameters');
                }

                // Decrypt room credentials
                const decryptedRoomId = CryptoJS.AES.decrypt(encryptedRoomId, secretKey).toString(CryptoJS.enc.Utf8);
                const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, secretKey).toString(CryptoJS.enc.Utf8);
                const decryptedStartDate = CryptoJS.AES.decrypt(encryptedStartDate, secretKey).toString(CryptoJS.enc.Utf8);
                const decryptedEndDate = CryptoJS.AES.decrypt(encryptedEndDate, secretKey).toString(CryptoJS.enc.Utf8);
                const decryptedTimezone = encryptedTimezone;

                console.log('Decrypted Room:', decryptedRoomId, decryptedPassword, decryptedStartDate, decryptedEndDate, decryptedTimezone)

                if (!decryptedRoomId || !decryptedPassword || !decryptedStartDate || !decryptedEndDate || !decryptedTimezone) {
                    throw new Error('Invalid room credentials or parameters');
                }

                const meetingStart = DateTime.fromISO(decryptedStartDate, { zone: decryptedTimezone });

                const localTimeInMeetingZone = DateTime.now().setZone(decryptedTimezone);
                console.log('Meeting Start (in meeting timezone):', meetingStart.toISO());
                console.log('Local time converted to meeting timezone:', localTimeInMeetingZone.toISO());

                const isSameDay = meetingStart.toFormat('yyyy-MM-dd') === localTimeInMeetingZone.toFormat('yyyy-MM-dd');
                const isWithin10Min = meetingStart.diff(localTimeInMeetingZone, 'minutes').toObject().minutes! <= 10;

                if (!isSameDay || !isWithin10Min) {
                    throw new Error('Meeting is not yet available. Please check the start date and time.');
                }

                // Parse the decrypted start date
                // const startDate = new Date(decryptedStartDate);
                // const currentDate = new Date();

                if (!isSameDay || !isWithin10Min) {
                    throw new Error('Meeting is not yet available. Please check the start date and time.');
                }

                // Check if the meeting date matches the system date
                // if (
                //     startDate.toDateString() !== currentDate.toDateString() ||
                //     startDate.getTime() - currentDate.getTime() > 10 * 60 * 1000
                // ) {
                //     throw new Error('Meeting is not yet available. Please check the start date and time.');
                // }

                // Check if room exists
                const roomExists = await verifyRoom(decryptedRoomId);

                if (roomExists) {
                    // Join existing room
                    console.log('Room exists, joining as participant');
                    const participantId = `${decryptedRoomId}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
                    const participantPeer = await setupPeer(participantId);

                    await connectToRoom(participantPeer, decryptedRoomId, decryptedPassword);

                    peerRef.current = participantPeer;
                    setRoomId(decryptedRoomId);
                    setPassword(decryptedPassword);
                    setIsHost(false);
                    setJoinedRoom(true);
                } else {
                    // Create new room
                    console.log('Room does not exist, creating as host');
                    const hostPeer = await setupPeer(decryptedRoomId);

                    // Set up host connection handling
                    hostPeer.on('connection', (conn) => {
                        console.log('New connection request from:', conn.peer);

                        conn.on('open', () => {
                            const peerPassword = conn.metadata?.password;

                            if (peerPassword === decryptedPassword) {
                                console.log('Password verified, granting access');
                                conn.send({ type: 'roomAccess', granted: true });
                            } else {
                                console.log('Invalid password, denying access');
                                conn.send({ type: 'roomAccess', granted: false });
                                conn.close();
                            }
                        });
                    });

                    peerRef.current = hostPeer;
                    setRoomId(decryptedRoomId);
                    setPassword(decryptedPassword);
                    setIsHost(true);
                    setJoinedRoom(true);
                }
            } catch (error) {
                console.error('Room initialization error:', error);
                setError(error instanceof Error ? error.message : 'Failed to initialize room');
            }
        };

        initializeRoom();

        return () => {
            if (peerRef.current) {
                peerRef.current.destroy();
            }
        };
    }, []);

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
        />
    );
};

export default MeetingCallHandler;