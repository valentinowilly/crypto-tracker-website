import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CurrencyProvider } from "./context/CurrencyContext.jsx";
import { WatchlistProvider } from "./context/WatchlistContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CurrencyProvider>
      <WatchlistProvider>
        <App />
      </WatchlistProvider>
    </CurrencyProvider>
  </StrictMode>,
);
