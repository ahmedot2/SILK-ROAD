import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { WagmiProvider } from "./providers/WagmiProvider";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </WagmiProvider>
  </React.StrictMode>,
);
