import React, { useEffect } from "react";
import { useUserContext } from "../context/userContext";
import NavBar from "./Navbar"; // Import the NavBar component
import "./dashboard.css";
import Cookies from "js-cookie";

const Dashboard = () => {
  const { user, logoutUser } = useUserContext();

  useEffect(() => {
    if (user) {
      Cookies.set("userName", user.displayName);
    }
  }, [user]);

  return (
    <>        <NavBar logoutUser={logoutUser} /> {/* Use NavBar component */}

      <div className="dashboard-container">
        <div className="content">
          <h1>Dashboard</h1>
          <h2>Name: {Cookies.get("userName")}</h2>
          <h2>Email: {user.email}</h2>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
