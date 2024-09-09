import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => (window.location.href = "/")}>
        GalacticPathFinder
      </div>
      <div className="navbar-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link
          to="/tutorial"
          className={location.pathname === "/tutorial" ? "active" : ""}
        >
          Tutorial
        </Link>
        <Link
          to="/about-us"
          className={location.pathname === "/about-us" ? "active" : ""}
        >
          About Us
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
