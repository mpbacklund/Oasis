import { useState, useEffect } from 'react'
import { NavLink, useOutletContext, useNavigate } from 'react-router'
import { Player } from '../../../oasis/player';

type OutletContextType = {
  roomCode: string;
  setRoomCode: (code: string) => void;
  player: Player | null;
};

const PlayerStart = () => {
  const { setRoomCode, roomCode, player } = useOutletContext<OutletContextType>();
  const [name, setName] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (!player) return;
    const eventHandler = (data: any) => {
      const message = data.message;
      if (message === "joinedRoom") {
        navigate(`../${data.game}`)
      }
      if (message === "connected") {
        player.joinRoom(roomCode, name);
      }
    };

    player.on("event", eventHandler);

    return () => {
      player.off("event", eventHandler);
    };
  }, [player, roomCode, name]);

  const onRoomCodeChange = (e) => {
      setRoomCode(e.target.value);
  }

  const onNameChange = (e) => {
      setName(e.target.value);
  }

  const joinGame = () => {
    if (!player) {
      console.error("player is null.");
      return;
    }
    player.connectToServer();
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
          <h2 className="text-2xl font-semibold mb-8">Join a Game</h2>
          {/* Buttons */}
          <div className="space-y-4">
            <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Room Code" 
                onChange={onRoomCodeChange}
            />
            <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Player Name" 
                onChange={onNameChange}

            />
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={joinGame}
            >
                Join Game
            </button>
          </div>
        </div>
      </main>
    </div>
    </>
  );
}

export default PlayerStart