import { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router';
import { Host } from '../../../oasis/host';

const HostPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const hostRef = useRef<Host | null>(null);

  // Ensure the same `Host` instance is used
  if (!hostRef.current) {
    hostRef.current = new Host();
  }

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    // Attach event listener
    const eventHandler = (data: any) => {
      // handle event logic here
    };

    host.on("eventTriggered", eventHandler);

    // Cleanup on unmount
    return () => {
      host.off("eventTriggered", eventHandler);
    };
  }, []);
  

  return (
    <Outlet context={{ roomCode, setRoomCode, host: hostRef.current }} />
  );
};

export default HostPage;
