import React, { useState } from 'react';
import './ElectionResults.css';

function ElectionResults() {
  // Mock election results data from previously organized elections
  const [electionResults] = useState([
    {
      election_id: 1,
      election_name: '2024 Presidential Election',
      candidates: [
        { candidate_id: 1, fullname: 'John Doe', votes: 3500 },
        { candidate_id: 2, fullname: 'Jane Smith', votes: 2700 },
        { candidate_id: 3, fullname: 'Alice Brown', votes: 1800 }
      ]
    },
    {
      election_id: 2,
      election_name: '2024 Local Council Election',
      candidates: [
        { candidate_id: 4, fullname: 'Bob White', votes: 2100 },
        { candidate_id: 5, fullname: 'Mary Green', votes: 2500 }
      ]
    }
  ]);

  return (
    <div className="election-results-container">
      <h2>Election Results</h2>

      {electionResults.map(election => (
        <div key={election.election_id} className="election-results-section">
          <h3>{election.election_name}</h3>
          <table className="results-table">
            <thead>
              <tr>
                <th>Candidate ID</th>
                <th>Full Name</th>
                <th>Votes</th>
              </tr>
            </thead>
            <tbody>
              {election.candidates.map(candidate => (
                <tr key={candidate.candidate_id}>
                  <td>{candidate.candidate_id}</td>
                  <td>{candidate.fullname}</td>
                  <td>{candidate.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default ElectionResults;