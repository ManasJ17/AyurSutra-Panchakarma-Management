import React, { useState } from 'react';
import axios from 'axios';
import './AuthCard.css';

const API_URL = 'http://localhost:5000/api/auth';

const initialPatient = { name: '', email: '', phone: '', password: '' };
const initialHospital = { name: '', email: '', phone: '', password: '', address: '', city: '', state: '', pincode: '', servicesOffered: '' };

function AuthCard({ setUser, setView, role, setRole }) {
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState(role === 'patient' ? initialPatient : initialHospital);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRoleChange = (r) => {
    setRole(r);
    setForm(r === 'patient' ? initialPatient : initialHospital);
    setError('');
    setSuccess('');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (isLogin) {
        const res = await axios.post(`${API_URL}/login`, { ...form, role });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        // Redirect based on role
        if (res.data.user.role === 'patient') {
          setView('patient');
        } else if (res.data.user.role === 'practitioner') {
          setView('hospital');
        } else {
          setView('welcome');
        }
      } else {
        const payload = { ...form, role };
        if (role === 'hospital' || role === 'practitioner') {
          payload.servicesOffered = form.servicesOffered.split(',').map(s => s.trim());
        }
        await axios.post(`${API_URL}/register`, payload);
        setSuccess('Registration successful! You can now log in.');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="auth-card">
      <div className="role-toggle">
        <button className={role === 'patient' ? 'active' : ''} onClick={() => handleRoleChange('patient')}>Patient</button>
        <button className={role === 'practitioner' ? 'active' : ''} onClick={() => handleRoleChange('practitioner')}>Hospital/Practitioner</button>
      </div>
      <h2>{isLogin ? 'Login' : 'Register'} as {role === 'patient' ? 'Patient' : 'Hospital/Practitioner'}</h2>
      <form onSubmit={handleSubmit}>
        {isLogin ? (
          <>
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          </>
        ) : (
          <>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            {role === 'practitioner' && (
              <>
                <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
                <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
                <input name="state" placeholder="State" value={form.state} onChange={handleChange} required />
                <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required />
                <input name="servicesOffered" placeholder="Services Offered (comma separated)" value={form.servicesOffered} onChange={handleChange} required />
              </>
            )}
          </>
        )}
        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}
        <button type="submit" disabled={loading}>{loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}</button>
      </form>
      <div className="toggle-link">
        {isLogin ? (
          <span>Don't have an account? <button onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }}>Register</button></span>
        ) : (
          <span>Already have an account? <button onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }}>Login</button></span>
        )}
      </div>
    </div>
  );
}

export default AuthCard;
