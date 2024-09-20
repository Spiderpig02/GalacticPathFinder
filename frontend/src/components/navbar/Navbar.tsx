import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [shouldHaveSolidColour, setShouldHaveSolidColour] = useState(false);

  useEffect(() => {
    if (location.pathname === "/about-us") {
      setShouldHaveSolidColour(true);
    } else {
      setShouldHaveSolidColour(false);
    }
  }, [location.pathname]);

  return (
    <nav className={`navbar ${shouldHaveSolidColour ? "navbar-solid" : ""}`}>
      <div className="navbar-logo">
        <Link to="/" className="navbar-logo-link">
          GalacticPathFinder
        </Link>
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
