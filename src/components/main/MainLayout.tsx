import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";

const MainLayout: React.FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MainLayout;
