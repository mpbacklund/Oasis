import { useState, useEffect } from 'react'
import { NavLink, Outlet, useOutletContext } from 'react-router'
import { Socket } from "socket.io-client";
import gamesData from '../games/games.json'
import BankStartScreen from './bankStartScreen';
import { Host } from '../../../../oasis/host'

type OutletContextType = {
  roomCode: string;
  setRoomCode: (code: string) => void;
  host: Host | null;
};

enum GameStates {
  Lobby = "Lobby",
}

const BankData = () => {
  const { roomCode, setRoomCode, host } = useOutletContext<OutletContextType>();
  const [gameState, setGameState] = useState<GameStates>(GameStates.Lobby);

  useEffect(() => {
    if (!host) return;
    // Attach event listener
    const eventHandler = (data: any) => {
      console.log(data)
    };

    host.on("eventTriggered", eventHandler);

    // Cleanup on unmount
    return () => {
      host.off("eventTriggered", eventHandler);
    };
  }, []);

  return (
    <>
      <h1> Bank Data Screen</h1>
      <BankStartScreen />
    </>
  );
}

export default BankData