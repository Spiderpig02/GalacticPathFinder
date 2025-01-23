import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import "../colors.css";
import HomePage from "./pages/homePage/HomePage";
import AboutUs from "./pages/aboutUsPage/AboutUsPage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import TutorialPage from "./pages/tutorialPage/TutorialPage";
import Navbar from "./components/navbar/Navbar";
import AlgorithmsPage from "./pages/algorithms/AlgorithmsPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      {" "}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/tutorial" element={<TutorialPage />} />
          <Route path="/algorithms" element={<AlgorithmsPage />} />
          <Route path="*" element={<NotFoundPage />} />{" "}
          {/* 404 Not Found Route */}
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
