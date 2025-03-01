import { useState, useEffect } from 'react'
import { NavLink, useOutletContext, useNavigate } from 'react-router'
import { Player } from '../components/types';
import { Host } from '../../../../../oasis/host';
import DiceRoll from '../components/diceRoll';

type Props = {
  players: (Player | null)[];
  host: Host| null;
};

const BankHostGameScreen: React.FC<Props> = ({players, host}) => {
  const [roundNumber, setRoundNumber] = useState<number>(1);
  const [roundScore, setRoundScore ] = useState<number>(0);
  const [turnIndex, setTurnIndex] = useState<number>(0);

  const [diceRolling, setDiceRolling] = useState<boolean>(false);
  const maxRounds: number = 20; 

  useEffect(() => {
    if (!host) return;
    // Attach event listener
    const eventHandler = (data: any) => {
      handleGameMessage(data);
    };

    host.on("event", eventHandler);

    // Cleanup on unmount
    return () => {
      host.off("event", eventHandler);
    };
  }, []);

  const handleGameMessage = (data: any) => {
    if(data.message === "diceRoll") {
      setDiceRolling(true);
    }
  };

  const rollDice = () => {

  }

  const passTurn = () => {
    if(players.length >= turnIndex + 1) {
      setTurnIndex(0);
    }
    else {
      setTurnIndex(turnIndex + 1);
    }
    notifyPlayerTurn()
  }
  
  const notifyPlayerTurn = () => {
    if(host) {
      host.sendMessage({message: "playerTurn", playerID: players[turnIndex]?.id});
    }
  }
  
  return (
    <>
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      {/* Round Number at the Top Left */}
      <div className="absolute top-4 left-4 text-3xl font-bold">
        Round {roundNumber} / {maxRounds}
      </div>

      {/* Round Total Score in the Center, Slightly Lower */}
      <div className="mt-24 text-6xl font-bold">{roundScore}</div>
      <div>Round Score</div>

      {/* Player List with Scores */}
      <div className="mt-10 w-full max-w-lg">
        {players.map((player, index) => (
          <div
            key={index}
            className="flex justify-between p-4 bg-gray-800 rounded-lg mb-2"
          >
            <span className="text-2xl">{player?.name}</span>
            <span className="text-2xl font-semibold">{player?.score}</span>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default BankHostGameScreen