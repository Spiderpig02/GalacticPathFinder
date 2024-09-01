import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import "../colors.css";
import HomePage from "./pages/homePage/HomePage";
import AboutUs from "./pages/aboutUs/AboutUs"; // Example for About Us page
import NotFoundPage from "./pages/notFound/NotFoundPage"; // Example for a 404 page

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="*" element={<NotFoundPage />} /> {/* 404 Not Found Route */}
      </Routes>
    </Router>
  </React.StrictMode>
);
