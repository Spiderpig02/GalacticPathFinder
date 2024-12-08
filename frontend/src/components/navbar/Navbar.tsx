import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [shouldHaveSolidColour, setShouldHaveSolidColour] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    handleResize(); // Check initial width
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (
      location.pathname === "/about-us" ||
      location.pathname === "/algorithms"
    ) {
      setShouldHaveSolidColour(true);
    } else {
      setShouldHaveSolidColour(false);
    }
  }, [location.pathname]);

  if (isMobile) {
    return <></>;
  }

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
          to="/algorithms"
          className={location.pathname === "/algorithms" ? "active" : ""}
        >
          Algorithms
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
