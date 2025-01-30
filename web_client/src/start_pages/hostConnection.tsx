import { useState } from 'react';
import { Outlet } from 'react-router';
import { Socket } from 'socket.io-client';

const HostConnection = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomCode, setRoomCode] = useState("");

  const storeSocket = (newSocket: Socket) => {
    setSocket(newSocket);
  };

  return (
    <Outlet context={{ storeSocket, roomCode, setRoomCode }} />
  );
};

export default HostConnection;
