import React, { useState } from 'react';
import PlayerTile from '../components/playerLobbyTile';
import { Player } from '../components/types';
import { Host } from '../../../../../oasis/host';

type BankLobbyProps = {
  roomCode: string;
  players: (Player | null)[];
  maxPlayers: number;
  host: Host | null;
};

const GamePage: React.FC<BankLobbyProps> = ({ roomCode, players, maxPlayers, host }) => {
  const gameName = 'Bank'; // Example game name
  
  const columns = Math.ceil(maxPlayers / 2); // Half the number of players

  const handleKick = (playerName: string) => {
    if(host) {
      host.sendMessage({message: "playerKicked", playerName: playerName})
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      {/* Top section with room code on the right and game name on the left */}
      <div className="flex justify-between p-4">
        <div className="text-9xl text-white">{roomCode}</div>
        <div className="text-7xl text-white">{gameName}</div>
      </div>

      <div className={`flex-grow grid grid-cols-${columns} grid-rows-2 gap-8 p-10`}>
        {Array.from({ length: maxPlayers }).map((_, index) => {
          const player = players[index]; // Get the player if available
          return <PlayerTile key={index} number={index + 1} playerName={player ? player.name : null} onKick={handleKick}/>;
        })}
      </div>
    </div>
  );
};

export default GamePage;