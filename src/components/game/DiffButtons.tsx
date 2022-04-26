import React from "react";
import { Levels } from "./GameView";

interface DiffButtonsProps {
  startGame: (difficulty: Levels) => void;
}

const DiffButtons: React.FC<DiffButtonsProps> = ({
  startGame,
}): JSX.Element => {
  return (
    <div className="btn-game-container">
      <button className="btn btn-game" onClick={() => startGame(Levels.easy)}>
        Easy
      </button>
      <button className="btn btn-game" onClick={() => startGame(Levels.medium)}>
        Medium
      </button>
      <button className="btn btn-game" onClick={() => startGame(Levels.hard)}>
        Hard
      </button>
    </div>
  );
};

export default DiffButtons;
