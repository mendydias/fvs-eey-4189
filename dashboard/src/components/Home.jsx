import React from "react";
import "./Home.css";
import { NavLink } from "react-router";

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Election Management System</h1>
      <div className="button-grid">
        <NavLink to="/candidate-profiles" className="home-button">
          Candidate Profiles
        </NavLink>
        <NavLink to="/organize-election" className="home-button">
          Organize Election
        </NavLink>
        <NavLink to="/user-profiles" className="home-button">
          User Profiles
        </NavLink>
        <NavLink to="/election-results" className="home-button">
          Election Results
        </NavLink>
        <NavLink to="/election-history" className="home-button">
          Election History
        </NavLink>
      </div>
    </div>
  );
}

export default Home;
