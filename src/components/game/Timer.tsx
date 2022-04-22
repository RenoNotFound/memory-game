import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./game.css";

interface TimerProps {
  time: number;
  score: number;
}

interface State {
  time: number;
  seconds: number;
  minutes: number;
}

const Timer: React.FC<TimerProps> = ({ time, score }) => {
  const navigate = useNavigate();

  const [state, setState] = useState<State>({
    time,
    seconds: time - Math.floor((time - 1) / 60) * 60 - 1,
    minutes: Math.floor((time - 1) / 60),
  });

  useEffect(() => {
    if (state.time === 0) {
      setTimeout(() => {
        navigate(`/score?points=${score}`);
      }, 1000);
    }
    setTimeout(() => {
      if (state.time === 0) {
        return;
      }

      setState({
        time: state.time - 1,
        seconds: state.time - Math.floor((state.time - 1) / 60) * 60 - 1,
        minutes: Math.floor((state.time - 1) / 60),
      });
    }, 1000);
  }, [navigate, state.time, score]);

  return (
    <div className="col-3">{`${state.minutes}: ${
      state.seconds < 10 ? `0${state.seconds}` : `${state.seconds}`
    }`}</div>
  );
};

export default Timer;
