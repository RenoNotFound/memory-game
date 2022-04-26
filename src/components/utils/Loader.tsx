import React from "react";

const Loader: React.FC = (): JSX.Element => {
  return (
    <button className="btn btn-game">
      <i className="fa fa-spinner fa-spin fa-xl" aria-hidden="true"></i>
    </button>
  );
};

export default Loader;
