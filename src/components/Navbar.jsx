import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie"; // Import Cookies from js-cookie
import "./dashboard.css";

const NavBar = ({ logoutUser }) => {

  const handleLogout = () => {
    // Delete the cookie "userName"
    Cookies.remove("userName");
    // Call the logoutUser function if provided
    if (logoutUser) {
      logoutUser();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">NAAC DB</div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/Criterion1" className="nav-link">
            Criterion 1
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Criterion2" className="nav-link">
            Criterion 2
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Criterion3" className="nav-link">
            Criterion 3
          </Link>
        </li>
        <li className="nav-item">
          <button className="logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
