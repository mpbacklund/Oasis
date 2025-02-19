import React from "react";

type PlayerTileProps = {
    number: number;
    playerName: string | null; // This can be null if no player is assigned to the tile
};

const PlayerTile: React.FC<PlayerTileProps> = ({ number, playerName }) => (
    <div className="w-full h-full bg-blue-500 hover:bg-blue-600 text-white text-2xl flex items-center justify-center rounded-lg group relative">
        <div className="flex flex-col items-center justify-center">
            <div>{playerName ? playerName : number}</div>

            {/* Button that appears on hover */}
            <button className="absolute bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Kick
            </button>
        </div>
    </div>
);

export default PlayerTile;
