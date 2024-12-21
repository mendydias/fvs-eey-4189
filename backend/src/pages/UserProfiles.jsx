import React, { useState } from 'react';
import './UserProfiles.css';

function UserProfiles() {
  const [profiles, setProfiles] = useState([
    { user_id: 1, name: 'Alice', email: 'alice@example.com', phone_no: '55' },
    { user_id: 2, name: 'Bob', email: 'bob@example.com', phone_no: '555' }
  ]);
  const [newProfile, setNewProfile] = useState({ user_id: '', name: '', email: '', phone_no: '' });
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
      setProfiles([...profiles, { ...newProfile, user_id: profiles.length + 1 }]);
    }
    setNewProfile({ user_id: '', name: '', email: '', phone_no: '' });
  };

  
  const handleEdit = (index) => {
    setNewProfile(profiles[index]);
    setEditingIndex(index);
  };

  
  const handleDelete = (index) => {
    setProfiles(profiles.filter((_, i) => i !== index));
  };

  return (
    <div className="user-profiles-container">
      <h2>User Profiles</h2>

    
      <table className="profiles-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile, index) => (
            <tr key={index}>
              <td>{profile.user_id}</td>
              <td>{profile.name}</td>
              <td>{profile.email}</td>
              <td>{profile.phone_no}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      <div className="profile-form">
        <h3>{editingIndex !== null ? 'Edit Profile' : 'Add Profile'}</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newProfile.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newProfile.email}
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

export default UserProfiles;