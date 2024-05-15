import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import NavBar from "./Navbar";
import "./dashboard.css";
import Cookies from "js-cookie";
import Chatbot from "./Chatbot";

const Dashboard = () => {
  const { user, logoutUser } = useUserContext();
  const [userName, setUserName] = useState(""); 

  useEffect(() => {
    if (user) {
      Cookies.set("userName", user.displayName);
      setUserName(user.displayName); 
    }
  }, [user]);

  return (
    <div className="dashboardContainer">
          <NavBar logoutUser={logoutUser} />

      <div className="dashboard-container">

        <div className="content">
          <h1>Dashboard</h1>
          <h2>Name: {userName}</h2> {/* Display userName state */}
          <h2>Email: {user.email}</h2>
        </div>
      </div>
      <Chatbot></Chatbot>
    </div>
  );
};

export default Dashboard;
