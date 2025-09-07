import React, { useState } from 'react';
import axios from 'axios';
import './Welcome.css';

const API_URL = 'http://localhost:5000/api/auth';

function Welcome({ user, setView }) {
  const [protectedMsg, setProtectedMsg] = useState('');
  const [error, setError] = useState('');

  const testProtected = async () => {
    setError('');
    setProtectedMsg('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/protected`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProtectedMsg(res.data.message + ' | User: ' + JSON.stringify(res.data.user));
    } catch (err) {
      setError(err.response?.data?.message || 'Error accessing protected route');
    }
  };

  return (
    <div className="welcome-card">
      <h2>Welcome, {user.name}!</h2>
      <p>Your role: <b>{user.role}</b></p>
      <button onClick={testProtected}>Test Protected API Route</button>
      {protectedMsg && <div className="success-msg">{protectedMsg}</div>}
      {error && <div className="error-msg">{error}</div>}
      <button className="logout-btn" onClick={() => { localStorage.removeItem('token'); setView('auth'); }}>Logout</button>
    </div>
  );
}

export default Welcome;
