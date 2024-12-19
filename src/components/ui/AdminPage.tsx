'use client';
import React, { useState } from 'react';

const AdminPage = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [disabilityFriendly, setDisabilityFriendly] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: jobTitle,
          company,
          location,
          jobType,
          disabilityFriendly,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload job');
      }

      alert('Job uploaded successfully');
      setJobTitle('');
      setCompany('');
      setLocation('');
      setJobType('');
      setDisabilityFriendly(false);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>

      <section>
        <h2>Upload Job</h2>
        <form onSubmit={handleJobSubmit}>
          <div>
            <label>Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Job Type</label>
            <input
              type="text"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Disability Friendly</label>
            <input
              type="checkbox"
              checked={disabilityFriendly}
              onChange={(e) => setDisabilityFriendly(e.target.checked)}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Job'}
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </section>

      <section>
        <h2>Manage Users</h2>
        <button onClick={fetchUsers} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Users'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul>
          {users.map((user: any) => (
            <li key={user._id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPage;