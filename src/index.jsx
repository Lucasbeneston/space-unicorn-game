import React from "react";
import ReactDOM from "react-dom";
import InformationsGameProvider from "./contexts/InformationsGameProvider";
import App from "./App";

import "./fonts/ARCADECLASSIC.TTF";

ReactDOM.render(
  <React.StrictMode>
    <InformationsGameProvider>
      <App />
    </InformationsGameProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
