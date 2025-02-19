import React, { useState } from 'react';
import PlayerTile from '../components/playerLobbyTile';

const NumPlayers = 8; // Adjust this number based on the number of players (4-10)

type TileProps = {
  number: number;
};

const Tile: React.FC<TileProps> = ({ number }) => (
  <div className="w-full h-full bg-blue-500 text-white text-2xl flex items-center justify-center rounded-lg">
    {number}
  </div>
);

const GamePage: React.FC = () => {
  const roomCode = 'ABC123'; // Example room code
  const gameName = 'Bank'; // Example game name
  const [players, setPlayers] = useState<string[]>(Array(NumPlayers).fill('')); // List of player names (empty if no player joined)
  
  const columns = Math.ceil(NumPlayers / 2); // Half the number of players

  const handlePlayerJoin = (playerName: string) => {
    const emptyIndex = players.findIndex(player => player === '');

    if (emptyIndex !== -1) {
      // If there is an empty spot, place the player in that spot
      const updatedPlayers = [...players];
      updatedPlayers[emptyIndex] = playerName;
      setPlayers(updatedPlayers);
    } else {
      console.log("No available spots for new player.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      {/* Top section with room code on the right and game name on the left */}
      <div className="flex justify-between p-4">
        <div className="text-9xl text-white">{roomCode}</div>
        <div className="text-7xl text-white">{gameName}</div>
      </div>

      <div className={`flex-grow grid grid-cols-${columns} grid-rows-2 gap-8 p-10`}>
        {players.map((playerName, index) => (
          <PlayerTile key={index} number={index + 1} playerName={playerName} />
        ))}
      </div>

      {/* Example button to simulate a player joining */}
      <div className="p-4">
        <button
          onClick={() => handlePlayerJoin('Alice')}
          className="bg-green-500 text-white p-2 rounded"
        >
          Join as Alice
        </button>
      </div>
    </div>
  );
};

export default GamePage;