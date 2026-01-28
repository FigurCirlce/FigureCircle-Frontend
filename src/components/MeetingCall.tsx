
import { useEffect, useRef, useState } from 'react';
import Peer, { MediaConnection } from 'peerjs';
import { Mic, MicOff, Video, VideoOff, Monitor, PhoneOff, Users, ChevronLeft, ChevronRight, ExternalLink, Target, MessageSquare } from 'lucide-react';
import axios from 'axios';
import baseURL from '@/config/config';
import { toast } from 'react-toastify';
import { useUserContext } from './context/userContext';
import { Maximize, Minimize } from 'lucide-react';
interface MeetingCallProps {
  roomId: string;
  password: string;
  isHost: boolean;
  peer: Peer | null;
  actualHostId?: string; // The actual host peer ID for participant connections
}

interface PeerData {
  stream: MediaStream;
  call: MediaConnection;
}

//@ts-ignore
const MeetingCall = ({ roomId, password, isHost, peer, actualHostId }: MeetingCallProps) => {
  // Use actualHostId for connections if available, otherwise fall back to roomId
  const hostPeerId = actualHostId || roomId;


  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [peers, setPeers] = useState<Map<string, PeerData>>(new Map());
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  //@ts-ignore
  const [participants, setParticipants] = useState<Set<string>>(new Set());
  const peerConnectionsRef = useRef<Map<string, PeerData>>(new Map());
  //@ts-ignore
  const MAX_PARTICIPANTS = 8;
  const [screenSharingStream, setScreenSharingStream] = useState<MediaStream | null>(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenSharingPeerId, setScreenSharingPeerId] = useState<string | null>(null);
  const screenVideoRef = useRef<HTMLVideoElement>(null);
  const [isScreenSharePinned, setIsScreenSharePinned] = useState(false);

  // NEW: Track multiple screen sharers
  const [activeScreenSharers, setActiveScreenSharers] = useState<Set<string>>(new Set());
  const [screenShareStreams, setScreenShareStreams] = useState<Map<string, MediaStream>>(new Map());
  const [displayedScreenShareId, setDisplayedScreenShareId] = useState<string | null>(null);
  const [schudle, setSchudle] = useState<any>();
  const [milestoneUrl, setMilestoneUrl] = useState("");
  const [feedbackUrl, setFeedbackUrl] = useState("");
  const [milestoneUserId, setMilestoneUserId] = useState<number | null>(null);

  // Track remote video enabled states
  const [remoteVideoEnabled, setRemoteVideoEnabled] = useState<Map<string, boolean>>(new Map());
  // Track remote audio enabled states
  const [remoteAudioEnabled, setRemoteAudioEnabled] = useState<Map<string, boolean>>(new Map());

  // Get user name from localStorage
  const [myName, setMyName] = useState<string>('You');
  const [participantName, setParticipantName] = useState<string>('Participant');

  const { setSchedule } = useUserContext();

  // Load user name from localStorage on mount
  useEffect(() => {
    try {
      const userDataStr = localStorage.getItem('user');
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        // Try to get name from different possible fields
        const name = userData?.name || userData?.full_name || userData?.username || 'You';
        setMyName(name);
      }
    } catch (e) {
      console.log('Could not get user name from localStorage');
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    // const pathSegments = url.pathname.split("/").filter(Boolean);
    const pathSegmentUrl = url.pathname + url.search; // Split & remove empty values
    // Split & remove empty values
    // console.log("pathSegments", pathSegmentUrl)
    // const lastSegment = pathSegments[pathSegments.length - 1]; // Get the last segment (e.g., "460")

    const fetchMilestoneData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Token not found!');
        return;
      }
      try {
        const response = await axios.get(`${baseURL}/api/validMeeting`, {
          params: { link: pathSegmentUrl }
          // headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
          console.log("milestone--data", response.data);
          setSchudle(response.data);
          setSchedule(response.data);

          // Set participant name from schedule data
          // If I'm mentor, participant is the student (name). If I'm student, participant is mentor (mentor_name)
          const userDataStr = localStorage.getItem('user');
          const userData = userDataStr ? JSON.parse(userDataStr) : null;
          const isMentor = userData?.is_mentor === true;

          if (isMentor) {
            setParticipantName(response.data?.name || 'Mentee');
          } else {
            setParticipantName(response.data?.mentor_name || 'Mentor');
          }
        } else {
          // if (lastSegment) {
          //   setMilestoneUrl(`/milestoneform/${lastSegment}`);
          // }
          console.log('No milestones found.');
        }
      } catch (error) {
        console.log('Failed to fetch milestone data.');
        console.error('Error fetching milestones:', error);
      } finally {
        // setLoading(false);
      }
    };
    fetchMilestoneData();


  }, []);

  useEffect(() => {

    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split("/").filter(Boolean);
    // Split & remove empty values
    // console.log("pathSegments", pathSegmentUrl)
    const lastSegment = pathSegments[pathSegments.length - 2]; // Get the last segment (e.g., "460")
    const userIdSegment = Number(pathSegments[pathSegments.length - 1]);
    setMilestoneUserId(userIdSegment);
    const fetchvalidationmiletone = async () => {
      const token = localStorage.getItem('token');

      console.log("schudle====>", schudle);

      if (!token) {
        toast.error('Token not found!');
        return;
      }
      try {
        const response = await axios.get(`${baseURL}/checkmeeting/milestone`, {
          params: { user_id: schudle?.user_id, mentor_id: schudle?.mentor_id },
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
          // setSchudle(response.data);
          console.log('milestones===>', response.data, response.data.user_id, response.data.mentor_id);
          setMilestoneUrl(`/new-milestone/${response.data.user_id}/${response.data.mentor_id}`);
          // setMilestoneUrl(`/milestoneformAdd/${response.data.user_id}-${response.data.mentor_id}`);
          // setMilestoneUrl(`/new-milestone/$`)
          setFeedbackUrl(`/newFeedback/${lastSegment}`);

        } else {

          console.log('No milestones found.');
        }
      } catch (error) {
        if (lastSegment) {
          console.log(lastSegment);
          //  setMilestoneUrl(`/milestoneform/${lastSegment}`);
          setMilestoneUrl(`/new-milestone/${lastSegment}/${milestoneUserId}`);
          //  setMilestoneUrl(`/new-milestone`);
          setFeedbackUrl(`/newFeedback/${lastSegment}`);
        }
        console.log('Failed to fetch milestone data.');
        console.error('Error fetching milestones:', error);
      } finally {
        // setLoading(false);
      }
    };

    fetchvalidationmiletone();
  }, [schudle]);


  // Initialize local media stream
  useEffect(() => {
    const initializeMedia = async () => {
      let stream: MediaStream | null = null;

      // Try to get video and audio
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        console.log('✅ Got video and audio stream');
      } catch (videoError) {
        console.warn('Video/audio failed, trying audio only:', videoError);

        // Try audio only
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: false,
            audio: true
          });
          console.log('✅ Got audio-only stream');
        } catch (audioError) {
          console.warn('Audio failed too:', audioError);

          // Create a silent audio stream as fallback
          try {
            const audioContext = new AudioContext();
            const oscillator = audioContext.createOscillator();
            const destination = audioContext.createMediaStreamDestination();
            oscillator.connect(destination);
            oscillator.frequency.value = 0; // Silent
            oscillator.start();
            stream = destination.stream;
            console.log('⚠️ Using silent fallback stream');
          } catch (fallbackError) {
            console.error('Could not create any stream:', fallbackError);
          }
        }
      }

      if (stream && localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      if (stream) {
        setLocalStream(stream);
      }

      // ALWAYS set up call handlers, even without a stream
      if (isHost && peer) {
        console.log('🎯 HOST: Setting up call listener');
        peer.on('call', (incomingCall) => {
          console.log('📞 HOST: Received call from:', incomingCall.peer);
          if (stream) {
            incomingCall.answer(stream);
          } else {
            // Answer with no stream if we don't have one
            incomingCall.answer();
          }
          handleIncomingCall(incomingCall);
        });
      }

      // If we're a participant, call the host
      if (!isHost && peer) {
        console.log('📞 PARTICIPANT: Calling host at:', hostPeerId);

        // Wait a bit to ensure host is ready
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
          const call = stream
            ? peer.call(hostPeerId, stream)
            : peer.call(hostPeerId, new MediaStream()); // Call with empty stream if no media

          if (call) {
            console.log('✅ PARTICIPANT: Call initiated to host');
            handleIncomingCall(call);
          } else {
            console.error('❌ PARTICIPANT: peer.call returned null');
          }
        } catch (callError) {
          console.error('❌ PARTICIPANT: Error calling host:', callError);
        }
      }
    };

    if (peer) {
      initializeMedia();
    }

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isHost, peer, hostPeerId]);

  const handleIncomingCall = (call: MediaConnection) => {
    call.on('stream', (remoteStream: MediaStream) => {
      console.log('Received remote stream from:', call.peer);

      setPeers(prev => {
        const newPeers = new Map(prev);
        newPeers.set(call.peer, {
          stream: remoteStream,
          call: call
        });
        return newPeers;
      });

      setParticipants(prev => new Set([...prev, call.peer]));

      // Send our current media state to the new peer so they know our camera/mic status
      if (peer) {
        setTimeout(() => {
          try {
            const conn = peer.connect(call.peer);
            conn.on('open', () => {
              conn.send({
                type: 'mediaState',
                peerId: peer.id,
                videoEnabled: isVideoEnabled,
                audioEnabled: isAudioEnabled
              });
            });
          } catch (error) {
            console.error('Error sending initial media state:', error);
          }
        }, 500); // Small delay to ensure connection is stable
      }
    });

    call.on('close', () => {
      console.log('Call closed with peer:', call.peer);
      setPeers(prev => {
        const newPeers = new Map(prev);
        newPeers.delete(call.peer);
        return newPeers;
      });

      setParticipants(prev => {
        const newParticipants = new Set(prev);
        newParticipants.delete(call.peer);
        return newParticipants;
      });
    });

    call.on('error', (error) => {
      console.error('Call error:', error);
      call.close();
    });
  };

  // Update peer connections ref when peers change
  useEffect(() => {
    peerConnectionsRef.current = peers;
  }, [peers]);

  // Function to notify peers about media state changes
  const notifyPeersAboutMediaState = (videoEnabled: boolean, audioEnabled: boolean) => {
    if (!peer) return;

    peers.forEach(({ call }) => {
      try {
        const conn = peer.connect(call.peer);
        conn.on('open', () => {
          conn.send({
            type: 'mediaState',
            peerId: peer.id,
            videoEnabled,
            audioEnabled
          });
        });
      } catch (error) {
        console.error('Error sending media state:', error);
      }
    });
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
        // Notify peers about audio state change
        notifyPeersAboutMediaState(isVideoEnabled, audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
        // Notify peers about video state change
        notifyPeersAboutMediaState(videoTrack.enabled, isAudioEnabled);
      }
    }
  };

  const endCall = () => {
    // Clean up local media
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }

    // Close all peer connections
    peers.forEach(({ call }) => call.close());

    // Destroy peer connection
    if (peer) {
      peer.destroy();
    }

    // Navigate to dashboard
    // window.location.href = '/';
    window.location.href = '/dashboard';
  };

  const startScreenSharing = async () => {
    try {
      // Request screen sharing stream
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          //@ts-ignore
          cursor: 'always',
          displaySurface: 'monitor' // Minimize browser notification
        },
        audio: false
      });

      // Set local screen sharing state
      setScreenSharingStream(stream);
      setIsScreenSharing(true);
      setScreenSharingPeerId(peer?.id || null);

      // NEW: Auto-pin on screen share start
      setIsScreenSharePinned(true);

      // NEW: Track this as an active screen sharer
      if (peer?.id) {
        setActiveScreenSharers(prev => new Set([...prev, peer.id]));
        setScreenShareStreams(prev => new Map(prev).set(peer.id, stream));
        setDisplayedScreenShareId(peer.id);
      }

      // Set the stream to local screen video
      if (screenVideoRef.current) {
        screenVideoRef.current.srcObject = stream;
      }

      // Share screen with all connected peers
      peers.forEach(({ call }) => {
        try {
          //@ts-ignore
          const screenTrack = stream.getVideoTracks()[0];
          // Create a new peer connection for screen sharing
          //@ts-ignore
          //metadata type should be added
          const screenSharingCall = peer?.call(call.peer, stream, {
            metadata: { type: "screenShare" }
          });

          // Send metadata about screen sharing
          if (peer) {
            const conn = peer.connect(call.peer);
            conn.on('open', () => {
              conn.send({
                type: 'screenShare',
                action: 'start',
                peerId: peer.id
              });
            });
          }
        } catch (error) {
          console.error('Error sharing screen with peer:', error);
        }
      });

      // CRITICAL FIX: Handle screen sharing stop from browser notification
      // This event fires when user clicks "Stop sharing" in the browser notification
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.onended = () => {
        console.log('Screen share stopped from browser notification');

        // Stop all tracks in the screen sharing stream
        stream.getTracks().forEach(track => track.stop());

        // Clear the video element
        if (screenVideoRef.current) {
          screenVideoRef.current.srcObject = null;
        }

        // Reset all screen sharing state
        setScreenSharingStream(null);
        setIsScreenSharing(false);
        setScreenSharingPeerId(null);
        setIsScreenSharePinned(false);

        // Remove from active sharers
        if (peer?.id) {
          setActiveScreenSharers(prev => {
            const newSet = new Set(prev);
            newSet.delete(peer.id);
            return newSet;
          });
          setScreenShareStreams(prev => {
            const newMap = new Map(prev);
            newMap.delete(peer.id);
            return newMap;
          });
          setDisplayedScreenShareId(null);
        }

        // Notify all peers that screen sharing has stopped
        peers.forEach(({ call }) => {
          if (peer) {
            const conn = peer.connect(call.peer);
            conn.on('open', () => {
              conn.send({
                type: 'screenShare',
                action: 'stop',
                peerId: peer.id
              });
            });
          }
        });
      };

    } catch (error) {
      console.error('Error starting screen share:', error);
      setIsScreenSharing(false);
    }
  };

  const stopScreenSharing = () => {
    if (screenSharingStream) {
      // Stop all tracks in the screen sharing stream
      screenSharingStream.getTracks().forEach(track => track.stop());

      // Clear the video element
      if (screenVideoRef.current) {
        screenVideoRef.current.srcObject = null;
      }

      // Reset screen sharing state
      setScreenSharingStream(null);
      setIsScreenSharing(false);
      setScreenSharingPeerId(null);

      // NEW: Remove from active sharers
      if (peer?.id) {
        setActiveScreenSharers(prev => {
          const newSet = new Set(prev);
          newSet.delete(peer.id);
          return newSet;
        });
        setScreenShareStreams(prev => {
          const newMap = new Map(prev);
          newMap.delete(peer.id);
          return newMap;
        });

        // Always clear displayed screen share and unpin when stopping
        setDisplayedScreenShareId(null);
        setIsScreenSharePinned(false);
      }

      // Notify all peers that screen sharing has stopped
      peers.forEach(({ call }) => {
        if (peer) {
          const conn = peer.connect(call.peer);
          conn.on('open', () => {
            conn.send({
              type: 'screenShare',
              action: 'stop',
              peerId: peer.id
            });
          });
        }
      });
    }
  };

  // Handle incoming peer connections
  useEffect(() => {

    if (!peer) return;

    peer.on('connection', (conn) => {
      conn.on('data', (data: any) => {
        if (data.type === 'screenShare') {
          if (data.action === 'start') {
            setScreenSharingPeerId(data.peerId);
            // NEW: Auto-pin when first screen share starts
            setIsScreenSharePinned(true);

            // NEW: Add to active sharers
            setActiveScreenSharers(prev => new Set([...prev, data.peerId]));
            if (!displayedScreenShareId) {
              setDisplayedScreenShareId(data.peerId);
            }
          } else if (data.action === 'stop') {
            // NEW: Remove from active sharers
            setActiveScreenSharers(prev => {
              const newSet = new Set(prev);
              newSet.delete(data.peerId);
              return newSet;
            });
            setScreenShareStreams(prev => {
              const newMap = new Map(prev);
              newMap.delete(data.peerId);
              return newMap;
            });

            // Check if there are any remaining sharers
            const remainingSharers = Array.from(activeScreenSharers).filter(id => id !== data.peerId);
            if (remainingSharers.length > 0) {
              setDisplayedScreenShareId(remainingSharers[0]);
              setScreenSharingPeerId(remainingSharers[0]);
            } else {
              setScreenSharingPeerId(null);
              setIsScreenSharePinned(false);
              setDisplayedScreenShareId(null);
            }
          }
        }
        // Handle media state updates from peers
        else if (data.type === 'mediaState') {
          console.log('Received media state from peer:', data.peerId, 'video:', data.videoEnabled, 'audio:', data.audioEnabled);

          // Update remote video enabled state
          setRemoteVideoEnabled(prev => {
            const newMap = new Map(prev);
            newMap.set(data.peerId, data.videoEnabled);
            return newMap;
          });

          // Update remote audio enabled state
          setRemoteAudioEnabled(prev => {
            const newMap = new Map(prev);
            newMap.set(data.peerId, data.audioEnabled);
            return newMap;
          });
        }
      });
    });

    peer.on('call', (call) => {
      if (localStream) {
        call.answer(localStream);
        call.on('stream', (remoteStream) => {
          // Check if this is a screen sharing stream
          if (call.metadata?.type === 'screenShare') {

            // NEW: Store screen share stream
            setScreenShareStreams(prev => new Map(prev).set(call.peer, remoteStream));
            setActiveScreenSharers(prev => new Set([...prev, call.peer]));

            // Set as displayed if it's the first one
            if (!displayedScreenShareId) {
              setDisplayedScreenShareId(call.peer);
              // Auto-pin on first screen share
              setIsScreenSharePinned(true);
            }

            // Not Setting remoteStream Immediately
            setTimeout(() => {
              if (screenVideoRef.current && call.peer === displayedScreenShareId) {
                screenVideoRef.current.srcObject = remoteStream;
              }
            }, 100);

            setScreenSharingPeerId(call.peer);
          } else {
            // Handle regular video stream
            setPeers(prev => {
              const newPeers = new Map(prev);
              newPeers.set(call.peer, {
                stream: remoteStream,
                call
              });
              return newPeers;
            });
          }
        });
      }
      else {
        console.log("localstream not working--------")
      }
    });
  }, [peer, localStream, screenVideoRef]);

  //setting screen share 
  useEffect(() => {
    if (!screenVideoRef.current) return;

    // Clear screen share if no active sharing
    if (!isScreenSharing && !displayedScreenShareId) {
      screenVideoRef.current.srcObject = null;
      console.log("Screen sharing cleared");
      return;
    }

    // For local screen sharing
    if (isScreenSharing && screenSharingStream && displayedScreenShareId === peer?.id) {
      screenVideoRef.current.srcObject = screenSharingStream;
      console.log("Local screen sharing stream set successfully!");
    }
    // For remote screen sharing
    else if (displayedScreenShareId) {
      const displayedStream = screenShareStreams.get(displayedScreenShareId);
      if (displayedStream) {
        screenVideoRef.current.srcObject = displayedStream;
        console.log("Remote screen sharing stream set successfully!");
      } else {
        // Clear if stream not found
        screenVideoRef.current.srcObject = null;
      }
    }
  }, [isScreenSharing, screenSharingStream, displayedScreenShareId, screenShareStreams, peer?.id]);




  // Function to switch between screen shares
  const switchScreenShare = (peerId: string) => {
    setDisplayedScreenShareId(peerId);
    const stream = screenShareStreams.get(peerId);
    if (stream && screenVideoRef.current) {
      screenVideoRef.current.srcObject = stream;
    }
  };

  // Function to cycle to next screen share
  const cycleToNextScreenShare = () => {
    const sharers = Array.from(activeScreenSharers);
    if (sharers.length <= 1) return;

    const currentIndex = sharers.indexOf(displayedScreenShareId || '');
    const nextIndex = (currentIndex + 1) % sharers.length;
    switchScreenShare(sharers[nextIndex]);
  };

  // Function to cycle to previous screen share
  const cycleToPrevScreenShare = () => {
    const sharers = Array.from(activeScreenSharers);
    if (sharers.length <= 1) return;

    const currentIndex = sharers.indexOf(displayedScreenShareId || '');
    const prevIndex = (currentIndex - 1 + sharers.length) % sharers.length;
    switchScreenShare(sharers[prevIndex]);
  };

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    if (!name) return '?';
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };

  // Generate consistent color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      'from-blue-500 to-blue-700',
      'from-purple-500 to-purple-700',
      'from-green-500 to-green-700',
      'from-pink-500 to-pink-700',
      'from-indigo-500 to-indigo-700',
      'from-teal-500 to-teal-700',
      'from-orange-500 to-orange-700',
      'from-cyan-500 to-cyan-700',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const renderParticipantVideos = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Screen sharing video - Only show in grid when NOT pinned */}
        {(isScreenSharing || screenSharingPeerId) && !isScreenSharePinned && (
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <video
              ref={screenVideoRef}
              autoPlay
              playsInline
              className="w-full h-[240px] object-contain bg-gray-900"
            />
            <div className="absolute top-3 right-3 z-10 flex gap-2">
              {activeScreenSharers.size > 1 && (
                <>
                  <button
                    onClick={cycleToPrevScreenShare}
                    className="p-2 bg-white/90 backdrop-blur rounded-full text-gray-700 hover:bg-white shadow-md transition-all"
                    title="Previous screen share"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={cycleToNextScreenShare}
                    className="p-2 bg-white/90 backdrop-blur rounded-full text-gray-700 hover:bg-white shadow-md transition-all"
                    title="Next screen share"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
              <button
                onClick={() => setIsScreenSharePinned(!isScreenSharePinned)}
                className="p-2 bg-white/90 backdrop-blur rounded-full text-gray-700 hover:bg-white shadow-md transition-all"
              >
                {isScreenSharePinned ? <Minimize size={18} /> : <Maximize size={18} />}
              </button>
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(displayedScreenShareId === peer?.id ? myName : participantName)} flex items-center justify-center text-white text-sm font-bold shadow-lg ring-2 ring-white`}>
                {getInitials(displayedScreenShareId === peer?.id ? myName : participantName)}
              </div>
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                <span className="text-gray-800 text-sm font-medium">
                  📺 {displayedScreenShareId === peer?.id ? `${myName} (You)` : participantName}
                </span>
                {activeScreenSharers.size > 1 && (
                  <span className="ml-2 text-xs bg-blue-500 px-2 py-0.5 rounded-full text-white">
                    {Array.from(activeScreenSharers).indexOf(displayedScreenShareId || '') + 1}/{activeScreenSharers.size}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Local video */}
        <div className={`relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 min-h-[240px] ${(isScreenSharing || screenSharingPeerId) && isScreenSharePinned ? 'absolute top-[23rem] right-10 w-[220px] h-[140px] z-20' : ''}`}>
          {/* Always show avatar placeholder behind video */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${getAvatarColor(myName)} flex items-center justify-center text-white text-4xl font-bold shadow-2xl ring-4 ring-white`}>
              {getInitials(myName)}
            </div>
          </div>
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-[240px] object-cover relative z-10 ${!isVideoEnabled ? 'hidden' : ''}`}
          />
          {/* Status indicators */}
          <div className="absolute top-3 right-3 flex gap-2 z-20">
            {!isAudioEnabled && (
              <div className="p-1.5 bg-red-500 rounded-full shadow-md">
                <MicOff size={14} className="text-white" />
              </div>
            )}
            {!isVideoEnabled && (
              <div className="p-1.5 bg-red-500 rounded-full shadow-md">
                <VideoOff size={14} className="text-white" />
              </div>
            )}
          </div>
          {/* Name badge */}
          <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(myName)} flex items-center justify-center text-white text-sm font-bold shadow-lg ring-2 ring-white`}>
              {getInitials(myName)}
            </div>
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
              <span className="text-gray-800 text-sm font-medium">{myName}</span>
              {isHost && (
                <span className="ml-2 text-xs bg-emerald-500 px-2 py-0.5 rounded-full text-white">Host</span>
              )}
            </div>
          </div>
        </div>

        {/* Remote videos */}
        {
          Array.from(peers.entries()).map(([peerId, { stream }]) => {
            // Check if video track is enabled - use data channel state, default to false (show avatar first)
            const hasVideoEnabled = remoteVideoEnabled.get(peerId) ?? false;
            // Check if audio is enabled - default to true if unknown
            const hasAudioEnabled = remoteAudioEnabled.get(peerId) ?? true;

            return (
              <div key={peerId} className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 min-h-[240px]">
                {/* Always show avatar placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${getAvatarColor(participantName)} flex items-center justify-center text-white text-4xl font-bold shadow-2xl ring-4 ring-white`}>
                    {getInitials(participantName)}
                  </div>
                </div>
                <video
                  autoPlay
                  playsInline
                  className={`w-full h-[240px] object-cover relative z-10 ${!hasVideoEnabled ? 'hidden' : ''}`}
                  ref={video => {
                    if (video && stream) {
                      video.srcObject = stream;

                      // Check if video track is enabled
                      const videoTrack = stream.getVideoTracks()[0];
                      if (videoTrack) {
                        // Update state with current track status
                        const updateRemoteVideoState = () => {
                          setRemoteVideoEnabled(prev => {
                            const newMap = new Map(prev);
                            // Check both enabled property and if track has ended
                            const isEnabled = videoTrack.enabled && videoTrack.readyState === 'live';
                            if (newMap.get(peerId) !== isEnabled) {
                              newMap.set(peerId, isEnabled);
                              return newMap;
                            }
                            return prev;
                          });
                        };

                        // Initial check
                        updateRemoteVideoState();

                        // Listen for track mute/unmute events
                        videoTrack.onmute = () => {
                          setRemoteVideoEnabled(prev => {
                            const newMap = new Map(prev);
                            newMap.set(peerId, false);
                            return newMap;
                          });
                        };

                        videoTrack.onunmute = () => {
                          setRemoteVideoEnabled(prev => {
                            const newMap = new Map(prev);
                            newMap.set(peerId, true);
                            return newMap;
                          });
                        };

                        // Poll for changes as fallback (since enabled property changes don't fire events)
                        const interval = setInterval(updateRemoteVideoState, 500);

                        // Cleanup
                        return () => clearInterval(interval);
                      }
                    }
                  }}
                />
                {/* Name badge */}
                <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(participantName)} flex items-center justify-center text-white text-sm font-bold shadow-lg ring-2 ring-white`}>
                    {getInitials(participantName)}
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                    <span className="text-gray-800 text-sm font-medium">{participantName}</span>
                  </div>
                </div>
                {/* Status indicators */}
                <div className="absolute top-3 right-3 z-20 flex gap-2">
                  {!hasAudioEnabled && (
                    <div className="p-1.5 bg-red-500 rounded-full shadow-md">
                      <MicOff size={14} className="text-white" />
                    </div>
                  )}
                  {!hasVideoEnabled && (
                    <div className="p-1.5 bg-red-500 rounded-full shadow-md">
                      <VideoOff size={14} className="text-white" />
                    </div>
                  )}
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg ring-2 ring-white" title="Connected"></div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 relative">
      <div className="max-w-7xl mx-auto min-h-screen">
        {(isScreenSharing || screenSharingPeerId) && isScreenSharePinned ? (
          <>
            <div className="flex items-center text-gray-700 absolute top-5 z-10 bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow-md">
              <Users className="mr-2" size={20} />
              {/* <span className="font-medium">{participants.size + 1} / {MAX_PARTICIPANTS} participants</span> */}
            </div>
            <div className='flex flex-col gap-3 absolute top-16 right-8 z-10'>
              {/* Milestone Card - Pinned Mode */}
              <a
                href={milestoneUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg border border-blue-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-500 rounded-xl shadow-md">
                    <Target size={18} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-blue-800">Milestone</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600 group-hover:text-blue-800">
                  <span className="text-sm font-medium">Open Link</span>
                  <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              {/* Feedback Card - Pinned Mode */}
              <a
                href={feedbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg border border-purple-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-500 rounded-xl shadow-md">
                    <MessageSquare size={18} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-purple-800">Feedback</span>
                </div>
                <div className="flex items-center gap-2 text-purple-600 group-hover:text-purple-800">
                  <span className="text-sm font-medium">Give Feedback</span>
                  <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>

            {/* Full-screen screen share video for pinned mode */}
            <div className="relative w-full h-screen flex items-center justify-center bg-gray-900">
              <video
                ref={screenVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
              {/* Controls overlay */}
              <div className="absolute top-4 right-4 flex gap-2 z-20">
                {activeScreenSharers.size > 1 && (
                  <>
                    <button
                      onClick={cycleToPrevScreenShare}
                      className="p-3 bg-white/90 backdrop-blur rounded-full text-gray-700 hover:bg-white shadow-lg transition-all"
                      title="Previous screen share"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={cycleToNextScreenShare}
                      className="p-3 bg-white/90 backdrop-blur rounded-full text-gray-700 hover:bg-white shadow-lg transition-all"
                      title="Next screen share"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
                <button
                  onClick={() => setIsScreenSharePinned(false)}
                  className="p-3 bg-white/90 backdrop-blur rounded-full text-gray-700 hover:bg-white shadow-lg transition-all"
                  title="Minimize"
                >
                  <Minimize size={20} />
                </button>
              </div>
              {/* Name badge */}
              <div className="absolute bottom-6 left-6 flex items-center gap-3 z-20">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarColor(displayedScreenShareId === peer?.id ? myName : participantName)} flex items-center justify-center text-white text-lg font-bold shadow-xl ring-4 ring-white`}>
                  {getInitials(displayedScreenShareId === peer?.id ? myName : participantName)}
                </div>
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="text-gray-800 text-base font-medium">
                    📺 {displayedScreenShareId === peer?.id ? `${myName} (You)` : participantName}
                  </span>
                  {activeScreenSharers.size > 1 && (
                    <span className="ml-2 text-sm bg-blue-500 px-2 py-1 rounded-full text-white">
                      {Array.from(activeScreenSharers).indexOf(displayedScreenShareId || '') + 1}/{activeScreenSharers.size}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center text-gray-700 bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow-md">
              <Users className="mr-2" size={20} />
              {/* <span className="font-medium">{participants.size + 1} / {MAX_PARTICIPANTS} participants</span> */}
            </div>

            <div className='flex flex-row items-center gap-3'>
              {/* Milestone Card */}
              <a
                href={milestoneUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg border border-blue-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer min-w-[180px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-500 rounded-xl shadow-md">
                    <Target size={18} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-blue-800">Milestone</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600 group-hover:text-blue-800">
                  <span className="text-sm font-medium">Open Link</span>
                  <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              {/* Feedback Card */}
              <a
                href={feedbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg border border-purple-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer min-w-[180px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-500 rounded-xl shadow-md">
                    <MessageSquare size={18} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-purple-800">Feedback</span>
                </div>
                <div className="flex items-center gap-2 text-purple-600 group-hover:text-purple-800">
                  <span className="text-sm font-medium">Give Feedback</span>
                  <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>

            {/* {(isScreenSharing || screenSharingPeerId) && (
            <div className="text-gray-300">
              <span className="text-sm">
                {screenSharingPeerId === peer?.id ? "You are" : "Participant is"} sharing screen
              </span>
            </div>
          )} */}
          </div>
        )}
        {renderParticipantVideos()}

        {/* Controls */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-4 z-10">
          <div className="max-w-7xl mx-auto flex justify-center space-x-4">
            <button
              onClick={toggleAudio}
              className={`p-4 rounded-full text-white hover:scale-105 transition-transform shadow-lg ${isAudioEnabled ? 'bg-gray-600' : 'bg-red-500'
                }`}
            >
              {isAudioEnabled ? <Mic size={24} /> : <MicOff size={24} />}
            </button>
            <button
              onClick={toggleVideo}
              className={`p-4 rounded-full text-white hover:scale-105 transition-transform shadow-lg ${isVideoEnabled ? 'bg-gray-600' : 'bg-red-500'
                }`}
            >
              {isVideoEnabled ? <Video size={24} /> : <VideoOff size={24} />}
            </button>
            <button
              onClick={isScreenSharing ? stopScreenSharing : startScreenSharing}
              className={`p-4 rounded-full text-white hover:scale-105 transition-transform shadow-lg ${isScreenSharing ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              disabled={!!screenSharingPeerId && screenSharingPeerId !== peer?.id}
            >
              <Monitor size={24} />
            </button>
            <button
              onClick={endCall}
              className="p-4 rounded-full text-white hover:scale-105 transition-transform shadow-lg bg-red-500"
            >
              <PhoneOff size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingCall;