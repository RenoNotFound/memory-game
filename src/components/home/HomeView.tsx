import React from "react";
import { Link } from "react-router-dom";

import "./home.css";

const HomeView: React.FC = (): JSX.Element => {
  return (
    <div className="container welcome-box">
      <h1>Welcome to Cat Pairs!</h1>
      <p className="welcome-box-text">
        Your task is to find the cat pairs and reach the highest possible score.
        Take your time and develop your memory skill with this game, designed
        for the sole purpose of learning and growing!
      </p>
      <Link to="/game">
        <button className="btn-start-game">Start game</button>
      </Link>
    </div>
  );
};

export default HomeView;
