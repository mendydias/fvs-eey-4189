import React, { useState } from 'react';
import './OrganizeElection.css';

function OrganizeElection() {
  const [candidateProfiles] = useState([
    { candidate_id: 1, fullname: 'John' },
    { candidate_id: 2, fullname: 'Jane' },
    { candidate_id: 3, fullname: 'Alice' }
  ]);

  const [elections, setElections] = useState([]);
  const [newElection, setNewElection] = useState({ name: '', candidates: [] });

  // Handle changes for the election name input
  const handleElectionNameChange = (e) => {
    setNewElection({ ...newElection, name: e.target.value });
  };

  // Handle changes to selected candidates
  const handleCandidateSelection = (candidateId) => {
    setNewElection((prevElection) => {
      const isSelected = prevElection.candidates.includes(candidateId);
      const updatedCandidates = isSelected
        ? prevElection.candidates.filter(id => id !== candidateId)
        : [...prevElection.candidates, candidateId];

      return { ...prevElection, candidates: updatedCandidates };
    });
  };

  // Add a new election event
  const handleAddElection = () => {
    if (newElection.name && newElection.candidates.length > 0) {
      setElections([...elections, { ...newElection, id: elections.length + 1 }]);
      setNewElection({ name: '', candidates: [] });
    } else {
      alert('Please provide a name and select at least one candidate.');
    }
  };

  return (
    <div className="organize-election-container">
      <h2>Organize Election Events</h2>

      {/* Form to create a new election event */}
      <div className="new-election-form">
        <h3>Create New Election</h3>
        <input
          type="text"
          placeholder="Election Name"
          value={newElection.name}
          onChange={handleElectionNameChange}
        />
        <div className="candidate-selection">
          <h4>Select Candidates</h4>
          {candidateProfiles.map(candidate => (
            <label key={candidate.candidate_id}>
              <input
                type="checkbox"
                checked={newElection.candidates.includes(candidate.candidate_id)}
                onChange={() => handleCandidateSelection(candidate.candidate_id)}
              />
              {candidate.fullname}
            </label>
          ))}
        </div>
        <button onClick={handleAddElection}>Add Election Event</button>
      </div>

      {/* List of existing election events */}
      <div className="election-events-list">
        <h3>Active Election Events</h3>
        {elections.length > 0 ? (
          <ul>
            {elections.map(election => (
              <li key={election.id}>
                <strong>{election.name}</strong>
                <ul>
                  {election.candidates.map(candidateId => {
                    const candidate = candidateProfiles.find(c => c.candidate_id === candidateId);
                    return <li key={candidateId}>{candidate?.fullname}</li>;
                  })}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>No active election events.</p>
        )}
      </div>
    </div>
  );
}

export default OrganizeElection;