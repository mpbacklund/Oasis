import React from "react";

type PlayerTileProps = {
  number: number;
  playerName: string | null; // This can be null if no player is assigned to the tile
  onKick: (playerName: string) => void;
};

const PlayerTile: React.FC<PlayerTileProps> = ({ number, playerName, onKick }) => (
  <div
    className={`w-full h-full bg-blue-500 text-white text-2xl flex items-center justify-center rounded-lg group relative
      ${playerName ? "hover:bg-blue-800" : ""}`}
  >
    <div className="flex flex-col items-center justify-center">
      <div>{playerName ? playerName : number}</div>

      {/* Show the "Kick" button only if there is a player */}
      {playerName && (
        <button 
            className="absolute bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onKick(playerName)} // call onKick when we click the kick button
        >
          Kick
        </button>
      )}
    </div>
  </div>
);

export default PlayerTile;
