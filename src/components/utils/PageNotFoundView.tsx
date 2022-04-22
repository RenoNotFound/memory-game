import React from "react";
import { Link } from "react-router-dom";

const PageNotFoundView: React.FC = (): JSX.Element => {
  return (
    <div className="container page-not-found-container">
      <p>Page not found!</p>
      <p>Let's get back to the homepage or start a new game!</p>
      <div className="buttons-container">
        <Link to="/">
          <button className="btn-start-game">
            <i className="fa fa-home fa-xl" aria-hidden="true"></i> Home
          </button>
        </Link>
        <Link to="/game">
          <button className="btn-start-game">
            <i className="fa fa-refresh fa-xl" aria-hidden="true"></i> New game
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFoundView;
