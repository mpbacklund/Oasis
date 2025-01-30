import { useState, useEffect } from 'react'
import { NavLink, useOutletContext, useNavigate } from 'react-router'
import { Socket } from "socket.io-client";
import gamesData from '../games/games.json'

const HostStart = () => {
  let navigate = useNavigate();
  const { storeSocket, } = useOutletContext<{ 
    emitMessage: (event: string, message: any) => void;
    messages: string[];
    roomCode: string;
  }>();

  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  useEffect(() => {
    // Create and initialize the socket connection
    const newSocket = io("http://localhost:3000");

    // Pass the socket reference back to the parent
    storeSocket(newSocket);

    // Clean up the socket connection when the child unmounts
    return () => {
      newSocket.disconnect();
    };
  }, [storeSocket]);

  const handleSelect = (game: string) => {
    setSelectedGame(game);
  };

  const gameStart = () => {
    // TODO: do some error handling and stuff here to make sure selectedGame exists
    emitMessage("gameSelected", selectedGame);
    //navigate(`/host/${selectedGame}`)
  }

  return (
    <>
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col">
      {/* Top Bar */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">GameHub</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
          <h2 className="text-2xl font-semibold mb-8">Create a Game</h2>
          {/* Buttons */}
          <div className="space-y-4">
          <div className="relative w-full max-w-xs mx-auto">
            {/* Dropdown Container */}
            <select
                onChange={(e) => handleSelect(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="" disabled selected>Select a Game</option>
                {gamesData.map((game, index) => (
                <option key={index} value={game.name}>
                    {game.name}
                </option>
                ))}
            </select>
            </div>

        
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={gameStart}
            >
                Create Room
            </button>
          </div>
        </div>
      </main>
    </div>
    </>
  );
}

export default HostStart