import { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router'
import { io, Socket } from "socket.io-client";
import gamesData from '../games/games.json'

const HostConnection = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [roomCode, setRoomCode] = useState("");
    
    useEffect(() => {
        // Connect to the Socket.IO server
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        newSocket.on("roomCode", (code) => {
            setRoomCode(code);
        })
    
        // Clean up the socket connection when the component unmounts
        return () => {
            newSocket.disconnect();
        };
      }, []);

  return (
    <>
        <Outlet context={{ socket, roomCode}}/>
    </>
  );
}

export default HostConnection