
import React, { useState } from 'react';
import AuthCard from './components/AuthCard';
import Welcome from './components/Welcome';
import PatientPage from './PatientPage';
import HospitalPage from './HospitalPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('patient');
  const [view, setView] = useState('auth'); // 'auth', 'welcome', 'patient', 'hospital'

  return (
    <div className="app-bg">
      <div className="centered-container">
        {view === 'auth' && (
          <AuthCard setUser={setUser} setView={setView} role={role} setRole={setRole} />
        )}
        {view === 'welcome' && (
          <Welcome user={user} setView={setView} />
        )}
        {view === 'patient' && <PatientPage />}
        {view === 'hospital' && <HospitalPage />}
      </div>
    </div>
  );
}

export default App;
