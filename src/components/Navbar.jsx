import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const NavBar = ({ logoutUser }) => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 900);
  const [isNavOpen, setIsNavOpen] = useState(false); // State to manage navbar collapse

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

    const handleWindowResize = () => {
      setIsWideScreen(window.innerWidth > 900);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("userName");
    if (logoutUser) {
      logoutUser();
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen); // Toggle the state
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container"> {/* Container to center the navbar */}
        <Link to="/" className="navbar-brand">NAAC DB</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNav} // Call toggleNav function on button click
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto"> {/* Move the navbar items to the right */}
          <li className="nav-item">
              <Link to="/NaacReport" className="nav-link">Naac Report </Link>
            </li>
            <li className="nav-item">
              <Link to="/criterion1" className="nav-link">Criterion 1</Link>
            </li>
            <li className="nav-item">
              <Link to="/criterion2" className="nav-link">Criterion 2</Link>
            </li>
            <li className="nav-item">
              <Link to="/criterion3" className="nav-link">Criterion 3</Link>
            </li>
            <li className="nav-item" tyle={{ marginTop: "10px" }}>
  <Link
    to="/"
    className="btn btn-outline-secondary" // Add Bootstrap button classes
    onClick={handleLogout}
    style={{ textDecoration: "none" }} // Remove default hyperlink underline
  >
    Log out
  </Link>
</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;




