import { useState, useEffect, createContext } from 'react'
import { NavLink, Outlet } from 'react-router'
import { io } from "socket.io-client";
import gamesData from '../games/games.json'

export const SocketContext = createContext(null);

const HostConnection = () => {
    useEffect(() => {
        // Connect to the Socket.IO server
        const socket = io("http://localhost:3000");
    
        // Listen for the "hello" event
        socket.on("hello", (data) => {
          console.log(data)
    
          socket.emit("hello", "world");
        });
    
        // Clean up the socket connection when the component unmounts
        return () => {
          socket.disconnect();
          console.log("disconnected")
        };
      }, []);

  return (
    <>
        <Outlet />
    </>
  );
}

export default HostConnection