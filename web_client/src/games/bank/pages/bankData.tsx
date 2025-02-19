import { useState, useEffect } from 'react'
import { NavLink, Outlet, useOutletContext } from 'react-router'
import { Socket } from "socket.io-client";
import gamesData from '../games/games.json'
import BankLobby from './bankLobby';
import { Host } from '../../../../../oasis/host'

type OutletContextType = {
  roomCode: string;
  setRoomCode: (code: string) => void;
  host: Host | null;
};

enum GameStates {
  Lobby = "Lobby",
}

const BankData = () => {
  const { roomCode, host } = useOutletContext<OutletContextType>();
  const [gameState, setGameState] = useState<GameStates>(GameStates.Lobby);

  // set up event listeners in useEffect
  useEffect(() => {
    if (!host) return;
    // Attach event listener
    const eventHandler = (data: any) => {
      console.log(data)
    };

    host.on("event", eventHandler);

    // Cleanup on unmount
    return () => {
      host.off("event", eventHandler);
    };
  }, []);

  return (
    <>
      <BankLobby />
    </>
  );
}

export default BankData