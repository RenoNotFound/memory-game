import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

import MainLayout from "./components/main/MainLayout";
import HomeView from "./components/home/HomeView";
import GameView from "./components/game/GameView";
import ScoreView from "./components/score/ScoreView";
import PageNotFoundView from "./components/utils/PageNotFoundView";

const App: React.FC = (): JSX.Element => {
  const mainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      { path: "/", element: <HomeView /> },
      { path: "/game", element: <GameView /> },
      { path: "/score", element: <ScoreView /> },
      { path: "404", element: <PageNotFoundView /> },
    ],
  };

  const routing = useRoutes([mainRoutes]);

  return <>{routing}</>;
};

export default App;
