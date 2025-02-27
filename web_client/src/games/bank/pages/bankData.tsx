import { useState, useEffect } from 'react'
import { NavLink, Outlet, useOutletContext } from 'react-router'
import { Socket } from "socket.io-client";
import gamesData from '../games/games.json'
import BankLobby from './bankLobby';
import { Host } from '../../../../../oasis/host'
import { Player } from '../components/types';

type OutletContextType = {
  roomCode: string;
  setRoomCode: (code: string) => void;
  host: Host | null;
  players: (Player | null)[];
  setPlayers: React.Dispatch<React.SetStateAction<(Player | null)[]>>;
};

enum GameStates {
  Lobby = "Lobby",
}

const BankData = () => {
  const { roomCode, host, players, setPlayers } = useOutletContext<OutletContextType>();

  const [gameState, setGameState] = useState<GameStates>(GameStates.Lobby);
  const maxPlayers = 8;

  // set up event listeners in useEffect
  useEffect(() => {
    if (!host) return;
    // Attach event listener
    const eventHandler = (data: any) => {
      console.log(data)
      const message = data.message;
      if (message === "playerConnected") {
        onJoin(data.playerID, data.playerName);
      }
    };

    host.on("event", eventHandler);

    // Cleanup on unmount
    return () => {
      host.off("event", eventHandler);
    };
  }, []);

  const onJoin = (playerID: string, playerName: string) => {
    // Check if player already exists
    if (players.some(p => p?.id === playerID)) {
      console.log("Player already exists");
      return;
    }
  
    setPlayers(prevPlayers => {
      if (prevPlayers.length >= maxPlayers) {
        console.log("Lobby is full");
        return prevPlayers; // Prevent adding more than maxPlayers
      }
  
      return [...prevPlayers, { id: playerID, name: playerName, connected: true }];
    });

    console.log(players)
  };

  return (
    <>
      <BankLobby roomCode={roomCode} players={players} maxPlayers={8} host={host}/>
    </>
  );
}

export default BankData