import { useState, useEffect } from 'react'
import { NavLink, Outlet, useOutletContext } from 'react-router'
import { Socket } from "socket.io-client";
import gamesData from '../games/games.json'
import BankStartScreen from './bankStartScreen';

const BankData = () => {
    const { socket, connected, roomCode } = useOutletContext<{
        socket: Socket,
        roomCode: string
    }>();

    useEffect(() => {
        if (!socket) return;
    
        // Listen for incoming messages from the server
        socket.on("messageFromServer", (message: string) => {
          console.log("Received message:", message);
        });


    
        // Clean up the listener when the component unmounts
        return () => {
          socket.off(); // Remove the event listener
        };
      }, [socket]);

  return (
    <>
        <BankStartScreen />
    </>
  );
}

export default BankData