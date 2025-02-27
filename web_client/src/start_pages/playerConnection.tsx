import { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router';
import { Player } from '../../../oasis/player'

const PlayerPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const playerRef = useRef<Player | null>(null);

  // Ensure the same `Host` instance is used
  if (!playerRef.current) {
    playerRef.current = new Player();
    console.log(playerRef)
  }

  return (
    <Outlet context={{ roomCode, setRoomCode, player: playerRef.current}} />
  );
};

export default PlayerPage;
