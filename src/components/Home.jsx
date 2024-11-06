import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <button onClick={() => navigate('/candidate-profiles')} className="home-button">
        Candidate Profiles
      </button>
      <button onClick={() => navigate('/organize-election')} className="home-button">
        Organize Election
      </button>
      <button onClick={() => navigate('/user-profiles')} className="home-button">
        User Profiles
      </button>
      <button onClick={() => navigate('/election-results')} className="home-button">
        Election Results
      </button>
      <button onClick={() => navigate('/election-history')} className="home-button">
        Election History
      </button>
    </div>
  );
}

export default Home;