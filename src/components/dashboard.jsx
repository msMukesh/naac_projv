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
    <div className="dashboardContainer">
      <NavBar logoutUser={logoutUser} />
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <h2>Name: {userName}</h2> {/* Display userName state */}
        <h2>Email: {user.email}</h2>

        <div className="criteria-info">
          <h3>Criterion I: Curricular Aspects</h3>
          <p>Focuses on the design and development of the curriculum.</p>

          <h3>Criterion II: Teaching-Learning and Evaluation</h3>
          <p>Evaluates the quality of teaching, learning, and assessment methods.</p>

          <h3>Criterion III: Research, Innovations, and Extension</h3>
          <p>Promotes research activities, innovation, and extension programs.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
