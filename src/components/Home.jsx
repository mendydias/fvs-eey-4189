import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Election Management System</h1>
      <div className="button-grid">
        <Link to="/candidate-profiles" className="home-button">Candidate Profiles</Link>
        <Link to="/organize-election" className="home-button">Organize Election</Link>
        <Link to="/user-profiles" className="home-button">User Profiles</Link>
        <Link to="/election-results" className="home-button">Election Results</Link>
        <Link to="/election-history" className="home-button">Election History</Link>
      </div>
    </div>
  );
}

export default Home;