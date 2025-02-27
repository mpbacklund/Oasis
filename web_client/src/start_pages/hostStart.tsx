import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate, redirect } from 'react-router';
import { Host } from '../../../oasis/host';
import { gameModes, GameMode } from '../../../gameMode';

type OutletContextType = {
  roomCode: string;
  setRoomCode: (code: string) => void;
  host: Host | null;
};

const HostStart = () => {
  const { setRoomCode, host } = useOutletContext<OutletContextType>();
  let navigate = useNavigate();

  const [selectedGame, setSelectedGame] = useState<GameMode | null>(null);

  // Fix: Get correct GameMode object instead of just setting the string name
  const handleSelect = (gameName: string) => {
    const gameMode = Object.values(gameModes).find(game => game.name === gameName) || null;
    setSelectedGame(gameMode);
  };

  useEffect(() => {
    if (!host) return;
    const eventHandler = (data: any) => {
      const message = data.message;
      console.log(message);
      if (message === "roomCreated") {
        setRoomCode(data.roomCode);
        console.log(data.roomCode);
        navigate(`../${selectedGame?.name}`);
      }
    };

    host.on("event", eventHandler);

    return () => {
      host.off("event", eventHandler);
    };
  }, [host, selectedGame]);

  const gameStart = () => {
    if (!selectedGame || !host) {
      console.error("Game not selected or host is null.");
      return;
    }

    host.connectToServer();
    host.createRoom(selectedGame); // Fix: Pass the selectedGame object
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col">
      {/* Top Bar */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">GameHub</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
          <h2 className="text-2xl font-semibold mb-8">Create a Game</h2>

          {/* Game Selection Dropdown */}
          <div className="relative w-full max-w-xs mx-auto">
            <select
              value={selectedGame ? selectedGame.name : ""}
              onChange={(e) => handleSelect(e.target.value)} // Update to use `e.target.value`
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select a Game</option>
              {Object.values(gameModes).map((game, index) => (
                <option key={index} value={game.name}>
                  {game.name}
                </option>
              ))}
            </select>
          </div>

          {/* Create Room Button */}
          <button
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            onClick={gameStart}
          >
            Create Room
          </button>
        </div>
      </main>
    </div>
  );
};

export default HostStart;