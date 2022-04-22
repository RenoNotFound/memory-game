import React from "react";
import { Link, useSearchParams } from "react-router-dom";

import "./score.css";

const ScoreView: React.FC = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const points: number | null = Number(searchParams.get("points"));

  const renderScores = () => {
    return (
      <div className="center-container score-container">
        <span className="points">{points} points</span>
        <p>
          {points > 8
            ? "High score!!"
            : points > 4
            ? "Almost there! Keep practising!"
            : "No worries! Let's try again!"}
        </p>
        <div className="buttons-container">
          <Link to="/">
            <button className="btn btn-score">
              <i className="fa fa-home fa-xl" aria-hidden="true"></i> Home
            </button>
          </Link>
          <Link to="/game">
            <button className="btn btn-score">
              <i className="fa fa-refresh fa-xl" aria-hidden="true"></i> New
              game
            </button>
          </Link>
        </div>
      </div>
    );
  };

  return <>{renderScores()}</>;
};

export default ScoreView;
