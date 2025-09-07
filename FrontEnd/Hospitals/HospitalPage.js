import React from "react";

const HospitalPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div style={{ padding: 40 }}>
      <h2>Hospital/Practitioner Dashboard (Test Page)</h2>
      <p>Welcome, <b>{user?.name}</b>!</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>This is a <b>test page for hospitals/practitioners</b>. You can customize this further.</p>
    </div>
  );
};

export default HospitalPage;
