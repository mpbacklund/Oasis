import { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router';
import { Host } from '../../../oasis/host';
import { Player } from '../games/bank/components/types';



const HostPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const hostRef = useRef<Host | null>(null);
  const [players, setPlayers] = useState<(Player | null)[]>([])

  // Ensure the same `Host` instance is used
  if (!hostRef.current) {
    hostRef.current = new Host();
    console.log(hostRef)
  }

  return (
    <Outlet context={{ roomCode, setRoomCode, host: hostRef.current, players, setPlayers }} />
  );
};

export default HostPage;
