import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie"; // Import Cookies from js-cookie
import "./dashboard.css";
import axios from "axios";

const NavBar = ({ logoutUser }) => {


  const sendUserNameToServer = async (userName) => {
    console.log("frontend username" + userName);
  
    try {
      const response = await axios.post("http://localhost:5000/storeUsername", {
        userName: userName
      });
  
      if (!response.ok) {
        throw new Error("Failed to send username to server");
      }
      
      console.log("Username sent successfully");
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleLogout = () => {
    // Delete the cookie "userName"
    Cookies.remove("userName");
    // Call the logoutUser function if provided
    if (logoutUser) {
      logoutUser();
    }
  };
// Retrieve and send username when the component renders
const userName = Cookies.get("userName");
if (userName) {
  console.log("frontend"+userName);

  sendUserNameToServer(userName);
}
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