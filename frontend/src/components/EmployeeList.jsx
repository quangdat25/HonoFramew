import React from 'react';
import api from '../services/api';

const EmployeeList = ({ employees, fetchEmployees, setEmployeeToEdit }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await api.delete(`/employees/${id}`);
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  return (
    <div className="card table-container">
      <div className="card-header bg-primary">
        <h3>Employee List</h3>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Salary</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Department</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((emp, index) => (
                  <tr key={emp._id}>
                    <td>{index + 1}</td>
                    <td>{emp.name}</td>
                    <td>{emp.salary}</td>
                    <td>
                      <span className={`badge ${emp.gender ? 'badge-male' : 'badge-female'}`}>
                        {emp.gender ? 'Male' : 'Female'}
                      </span>
                    </td>
                    <td>{emp.dob}</td>
                    <td>{emp.depId?.depName || 'N/A'}</td>
                    <td>{emp.depId?.location || 'N/A'}</td>
                    <td>
                      <button className="btn btn-warning btn-sm" onClick={() => setEmployeeToEdit(emp)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(emp._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted">No employees found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
