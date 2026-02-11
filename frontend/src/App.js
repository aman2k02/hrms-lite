import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import DailyTracker from './components/dailyStatus'; // Requirement: Track daily attendance

function App() {
  // --- 1. HOOKS (Must be inside the function) ---
  const [employees, setEmployees] = useState([]);
  const [dailyStatus, setDailyStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Requirement: Configuration for Deployment
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // --- 2. LOGIC (Fetch All Employees) ---
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/employees`);
      if (!res.ok) throw new Error("Failed to fetch employees.");
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // --- 3. LOGIC (Fetch Today's Attendance) ---
  const fetchDailyAttendance = useCallback(async () => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const res = await fetch(`${API_URL}/api/attendance/daily/${today}`);
      if (res.ok) {
        const data = await res.json();
        setDailyStatus(data);
      }
    } catch (err) {
      console.error("Tracker fetch failed", err);
    }
  }, [API_URL]);

  // Initial Load
  useEffect(() => { 
    fetchData();
    fetchDailyAttendance();
  }, [fetchData, fetchDailyAttendance]);

  // Function to call after marking attendance to update the tracker
  const handleRefresh = () => {
    fetchData();
    fetchDailyAttendance();
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        {/* Requirement: Track daily attendance overview */}
        <DailyTracker 
          employees={employees} 
          dailyStatus={dailyStatus} 
        />

        <div className="main-layout">
          <EmployeeForm onRefresh={handleRefresh} />
          
          {loading ? (
            <div className="loading-state">Loading HRMS Data...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <EmployeeList 
              employees={employees} 
              onRefresh={handleRefresh} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;