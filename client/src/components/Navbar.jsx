import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <h3>
          <Link to="/">Cipher Key</Link>
        </h3>
      </div>

      {/* Mobile Menu Icon */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link
          to="/"
          className={props.name === "home" ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/passwords"
          className={props.name === "passwords" ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          Passwords
        </Link>
        <Link
          to="/register"
          className={props.name === "register" ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          Register
        </Link>
        <Link
          to="/login"
          className={props.name === "login" ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          Login
        </Link>

        <Link
          to="/logout"
          className={props.name === "logout" ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
