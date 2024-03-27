import React from "react";
import { Link } from "react-router-dom";
// import Criterion3 from "./Criterion3";
const NavBar = ({ logoutUser }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">NAAC DB</div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/Criterion3" className="nav-link">
            Criterion 3
          </Link>
        </li>
        <li className="nav-item">
          <button className="logout-btn" onClick={logoutUser}>
            Log out
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;
