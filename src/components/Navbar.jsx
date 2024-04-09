import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./dashboard.css";

const NavBar = ({ logoutUser }) => {
  const sendUserNameToServer = async (userName) => {
    try {
      const response = await axios.post("http://localhost:5000/storeUsername", {
        userName: userName
      });
  
      if (response.status === 200) {
        console.log("Username sent successfully");
      } else {
        throw new Error("Failed to send username to server");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const userName = Cookies.get("userName");
    if (userName) {
      console.log("frontend" + userName);
      sendUserNameToServer(userName);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("userName");
    if (logoutUser) {
      logoutUser();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">NAAC DB</div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/criterion1" className="nav-link">Criterion 1</Link>
        </li>
        <li className="nav-item">
          <Link to="/criterion2" className="nav-link">Criterion 2</Link>
        </li>
        <li className="nav-item">
          <Link to="/criterion3" className="nav-link">Criterion 3</Link>
        </li>
        <li className="nav-item">
          {/* Wrap the logout button with Link component to navigate to home page */}
          <Link to="/" className="logout-btn" onClick={handleLogout}>Log out</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
