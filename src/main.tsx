import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { TempoDevtools } from "tempo-devtools";
import { testSupabaseConnection } from "./lib/supabase-test";

// Initialize Tempo
TempoDevtools.init();

// Test Supabase connection
testSupabaseConnection().then((success) => {
  if (success) {
    console.log("✅ Backend is ready");
  } else {
    console.error("❌ Backend setup failed");
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
