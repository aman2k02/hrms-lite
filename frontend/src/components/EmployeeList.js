import React, { useState } from 'react'; 
import AttendanceModal from './AttendanceModal'; 

const EmployeeList = ({ employees, onRefresh }) => {
  // Requirement: Add state inside the component function
  const [selectedEmp, setSelectedEmp] = useState(null);

  const handleDelete = async (id) => {
    // Requirement: Delete an employee with confirmation
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await fetch(`http://localhost:5000/api/employees/${id}`, { method: 'DELETE' });
      onRefresh();
    }
  };

  return (
    <div className="card">
      <h2>Employee Records</h2>
      
      {/* Requirement: Meaningful UI state (Empty) */}
      {employees.length === 0 ? (
        <p className="empty-state">No employees registered yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.emp_id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>
                  {/* Requirement: Mark/View Attendance button */}
                  <button 
                    onClick={() => setSelectedEmp(emp)} 
                    className="btn-attendance"
                  >
                    Attendance
                  </button>
                  <button 
                    onClick={() => handleDelete(emp.id)} 
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Requirement: Attendance Management Modal */}
      {selectedEmp && (
        <AttendanceModal 
          emp={selectedEmp} 
          onClose={() => setSelectedEmp(null)} 
        />
      )}
    </div>
  );
};

export default EmployeeList;