import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => (window.location.href = "/")}>
        GalacticPathFinder
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/tutorial">Tutorial</Link>
        <Link to="/about-us">About Us</Link>
      </div>
    </nav>
  );
};

export default Navbar;
