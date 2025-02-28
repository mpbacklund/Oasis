import React from "react";
import { Player } from "./types";

type PlayerTileProps = {
  number: number;
  player: Player | null; // This can be null if no player is assigned to the tile
  onKick: (playerName: string) => void;
};

const PlayerTile: React.FC<PlayerTileProps> = ({ number, player, onKick }) => (
  <div
    className={`w-full h-full bg-blue-500 text-white text-2xl flex items-center justify-center rounded-lg group relative
      ${player ? "hover:bg-blue-800" : ""}`}
  >
    <div className="flex flex-col items-center justify-center">
      <div>{player ? player.name : number}</div>

      {/* Show the "Kick" button only if there is a player */}
      {player && (
        <button 
            className="absolute bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onKick(player.id)} // call onKick when we click the kick button
        >
          Kick
        </button>
      )}
    </div>
  </div>
);

export default PlayerTile;
