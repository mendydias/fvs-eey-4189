import React, { useState } from 'react';
import './ElectionHistory.css';

function ElectionHistory() {
  // Mock data for past elections
  const [electionHistory] = useState([
    {
      election_id: 1,
      election_name: '2020 Presidential Election',
      date: 'November 3, 2020',
      total_votes: 150000000,
      winner: 'Jane Doe'
    },
    {
      election_id: 2,
      election_name: '2022 Midterm Election',
      date: 'November 8, 2022',
      total_votes: 95000000,
      winner: 'Alice Green'
    },
    {
      election_id: 3,
      election_name: '2024 Local Council Election',
      date: 'May 15, 2024',
      total_votes: 3000000,
      winner: 'John Brown'
    }
  ]);

  return (
    <div className="election-history-container">
      <h2>Election History</h2>
      <table className="history-table">
        <thead>
          <tr>
            <th>Election ID</th>
            <th>Election Name</th>
            <th>Date</th>
            <th>Total Votes</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          {electionHistory.map(election => (
            <tr key={election.election_id}>
              <td>{election.election_id}</td>
              <td>{election.election_name}</td>
              <td>{election.date}</td>
              <td>{election.total_votes.toLocaleString()}</td>
              <td>{election.winner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ElectionHistory;