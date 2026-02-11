import React, { useState, useEffect, useCallback } from 'react';

const AttendanceModal = ({ emp, onClose }) => {
  const [status, setStatus] = useState('Present');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Use the live URL if deployed, otherwise localhost
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Requirement: View attendance records for each employee
  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/attendance/${emp.id}`);
      if (!res.ok) throw new Error("Could not fetch attendance records.");
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      setError(err.message);
    }
  }, [emp.id, API_URL]);

  useEffect(() => { 
    fetchHistory(); 
  }, [fetchHistory]);

  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employee_id: emp.id, date, status })
      });

      const data = await res.json();
      if (res.ok) {
        fetchHistory(); // Requirement: Mark and then View updated records
      } else {
        setError(data.error || "Failed to mark attendance.");
      }
    } catch (err) {
      setError("Server error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content card">
        <h3>Attendance: {emp.name}</h3>
        
        {/* Requirement: Meaningful UI states (Error) */}
        {error && <p className="error-message" style={{color: 'red'}}>{error}</p>}
        
        <div className="form-group" style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
          <button onClick={handleSave} disabled={loading} className="btn-attendance">
            {loading ? 'Saving...' : 'Mark Status'}
          </button>
        </div>

        <hr />
        <h4>Past Records</h4>
        {/* Requirement: Meaningful UI states (Empty) */}
        {history.length === 0 ? (
          <p className="empty-state" style={{padding: '20px 0'}}>No attendance records found for this employee.</p>
        ) : (
          <ul className="attendance-history" style={{maxHeight: '200px', overflowY: 'auto', textAlign: 'left'}}>
            {history.map((record, index) => (
              <li key={index} style={{padding: '5px 0', borderBottom: '1px solid #eee'}}>
                <strong>{record.date}</strong>: <span style={{color: record.status === 'Present' ? 'green' : 'red'}}>{record.status}</span>
              </li>
            ))}
          </ul>
        )}
        <button onClick={onClose} className="btn-secondary" style={{marginTop: '20px'}}>Close</button>
      </div>
    </div>
  );
};

export default AttendanceModal;