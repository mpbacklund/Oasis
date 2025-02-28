import React, { useState, useEffect } from 'react';
import { Player } from '../../../../../oasis/player';
import { NavLink, useNavigate, useOutletContext } from 'react-router'

import BankPlayerScreen from './bankPlayerScreen';

type OutletContextType = {
  roomCode: string;
  setRoomCode: (code: string) => void;
  player: Player | null;
};

enum GameStates {
  Lobby = "Lobby",
  MyTurn = "MyTurn",
  NotMyTurn = "NotMyTurn"
}

const BankPlayerData = () => {
  const { player } = useOutletContext<OutletContextType>();
  let navigate = useNavigate();

  // initialize gamestate as Lobby
  const [gameState, setGameState] = useState<GameStates>(GameStates.Lobby);

    // set up event listeners in useEffect
    useEffect(() => {
      if (!player) return;
      // Attach event listener
      const eventHandler = (data: any) => {
        handleGameMessage(data);
      };
  
      player.on("event", eventHandler);
  
      // Cleanup on unmount
      return () => {
        player.off("event", eventHandler);
      };
    }, []);
  
    const handleGameMessage = (data: any) => {
      const message = data.message;
      console.log(data);
      if(message === "kicked") {
        navigate("/")
        // TODO: add a "Youve been kicked message"
      };
      if (message === "playerConnected") {
        
      }
    };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <BankPlayerScreen />
      </div>
    </>
  );
}

export default BankPlayerData;