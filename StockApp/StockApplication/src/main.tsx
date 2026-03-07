import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { StockProvider } from "./context/StockContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StockProvider>
      <App />
    </StockProvider>
  </React.StrictMode>
);