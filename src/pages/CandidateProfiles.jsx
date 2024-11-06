import React, { useState } from 'react';
import './CandidateProfiles.css';

function CandidateProfiles() {
  const [profiles, setProfiles] = useState([
    { candidate_id: 1, fullname: 'John Doe', address: '123 Main St', phone_no: '123-456-7890' },
    { candidate_id: 2, fullname: 'Jane Smith', address: '456 Elm St', phone_no: '987-654-3210' }
  ]);
  const [newProfile, setNewProfile] = useState({ candidate_id: '', fullname: '', address: '', phone_no: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  
  const handleChange = (e) => {
    setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
  };

  
  const handleSave = () => {
    if (editingIndex !== null) {
      const updatedProfiles = [...profiles];
      updatedProfiles[editingIndex] = newProfile;
      setProfiles(updatedProfiles);
      setEditingIndex(null);
    } else {
      setProfiles([...profiles, { ...newProfile, candidate_id: profiles.length + 1 }]);
    }
    setNewProfile({ candidate_id: '', fullname: '', address: '', phone_no: '' });
  };

  
  const handleEdit = (index) => {
    setNewProfile(profiles[index]);
    setEditingIndex(index);
  };

  
  const handleDelete = (index) => {
    setProfiles(profiles.filter((_, i) => i !== index));
  };

  return (
    <div className="candidate-profiles-container">
      <h2>Candidate Profiles</h2>
      
    
      <table className="profiles-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Address</th>
            <th>Phone No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile, index) => (
            <tr key={index}>
              <td>{profile.candidate_id}</td>
              <td>{profile.fullname}</td>
              <td>{profile.address}</td>
              <td>{profile.phone_no}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form to add or edit a candidate profile */}
      <div className="profile-form">
        <h3>{editingIndex !== null ? 'Edit Profile' : 'Add Profile'}</h3>
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={newProfile.fullname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newProfile.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone_no"
          placeholder="Phone Number"
          value={newProfile.phone_no}
          onChange={handleChange}
        />
        <button onClick={handleSave}>{editingIndex !== null ? 'Update' : 'Add'} Profile</button>
      </div>
    </div>
  );
}

export default CandidateProfiles;