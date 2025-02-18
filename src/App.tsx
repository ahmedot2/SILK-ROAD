import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Marketplace from "./components/marketplace";
import RWA from "./components/rwa";
import Raffles from "./components/raffles";
import Exchange from "./components/exchange";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {/* For the tempo routes */}
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/rwa" element={<RWA />} />
        <Route path="/raffles" element={<Raffles />} />
        <Route path="/exchange" element={<Exchange />} />

        {/* Add this before the catchall route */}
        {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
      </Routes>
    </Suspense>
  );
}

export default App;
