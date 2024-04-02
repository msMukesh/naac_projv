import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import NavBar from "./Navbar";
import "./dashboard.css";
import Cookies from "js-cookie";

const Dashboard = () => {
  const { user, logoutUser } = useUserContext();
  const [userName, setUserName] = useState(""); // State to hold user name

  useEffect(() => {
    if (user) {
      Cookies.set("userName", user.displayName);
      setUserName(user.displayName); // Update userName when user data is available
    }
  }, [user]);

  return (
    <>
      <NavBar logoutUser={logoutUser} />
      <div className="dashboard-container">
        <div className="content">
          <h1>Dashboard</h1>
          <h2>Name: {userName}</h2> {/* Display userName state */}
          <h2>Email: {user.email}</h2>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
