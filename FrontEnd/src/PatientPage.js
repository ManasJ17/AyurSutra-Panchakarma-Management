import React from "react";

const PatientPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div style={{ padding: 40 }}>
      <h2>Patient Dashboard (Test Page)</h2>
      <p>Welcome, <b>{user?.name}</b>!</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>This is a <b>test page for patients</b>. You can customize this further.</p>
    </div>
  );
};

export default PatientPage;
