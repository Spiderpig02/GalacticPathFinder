import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./pages/homePage/HomePage";
import "../colors.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
);
