
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useParams } from 'react-router-dom';

const JitsiMeetComponent = () => {
  const { id } = useParams<{ id: string }>(); 
  const roomName = id || "defaultRoom"; 
  const domain = "meet.jit.si";

  return (
    <div style={{ height: "100vh", display: "grid", flexDirection: "column" }}>
      <JitsiMeeting
        roomName={roomName}
        //@ts-ignore
        displayName={"swapnil"}
        domain={domain}
        containerStyles={{ display: "flex", flex: 1 }}
      />
    </div>
  );
};

export default JitsiMeetComponent;
