import React from "react";
import ReactDom from "react-dom";
import { AdminProvider } from "./contexts/AdminContext";
import { GameProvider } from "./contexts/GameContext";

import App from "./App";

ReactDom.render(
  <AdminProvider>
    <GameProvider>
      <App />
    </GameProvider>
  </AdminProvider>,
  document.querySelector("#root")
);
