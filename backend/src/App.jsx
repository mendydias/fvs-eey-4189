import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CandidateProfiles from './pages/CandidateProfiles';
import OrganizeElection from './pages/OrganizeElection';
import UserProfiles from './pages/UserProfiles';
import ElectionResults from './pages/ElectionResults';
import ElectionHistory from './pages/ElectionHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/candidate-profiles" element={<CandidateProfiles />} />
        <Route path="/organize-election" element={<OrganizeElection />} />
        <Route path="/user-profiles" element={<UserProfiles />} />
        <Route path="/election-results" element={<ElectionResults />} />
        <Route path="/election-history" element={<ElectionHistory />} />
      </Routes>
    </Router>
  );
}

export default App;