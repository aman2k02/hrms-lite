import React, { useState } from 'react';

const EmployeeForm = ({ onRefresh }) => {
  const [form, setForm] = useState({ emp_id: '', name: '', email: '', department: '' });

  // 1. DYNAMIC API URL: This reads from Vercel settings if available, 
  // otherwise it defaults to localhost for your personal testing.
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 2. USE THE DYNAMIC URL: We replace the hardcoded 'localhost' link here.
      const res = await fetch(`${API_URL}/api/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setForm({ emp_id: '', name: '', email: '', department: '' });
        onRefresh();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to register employee");
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Could not connect to the server. Is the backend awake?");
    }
  };

  return (
    <div className="card">
      <h2>Register Employee</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Emp ID" value={form.emp_id} onChange={e => setForm({...form, emp_id: e.target.value})} required />
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        <input placeholder="Dept" value={form.department} onChange={e => setForm({...form, department: e.target.value})} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default EmployeeForm;