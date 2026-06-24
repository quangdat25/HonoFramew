import React, { useState, useEffect } from 'react';
import api from '../services/api';

const EmployeeForm = ({ fetchEmployees, departments, employeeToEdit, setEmployeeToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    salary: '',
    gender: true, // true for Male, false for Female
    dob: '',
    depId: ''
  });

  useEffect(() => {
    if (employeeToEdit) {
      setFormData({
        name: employeeToEdit.name,
        salary: employeeToEdit.salary,
        gender: employeeToEdit.gender,
        dob: employeeToEdit.dob,
        depId: employeeToEdit.depId?._id || employeeToEdit.depId || ''
      });
    } else {
      setFormData({
        name: '',
        salary: '',
        gender: true,
        dob: '',
        depId: ''
      });
    }
  }, [employeeToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'gender' ? value === 'true' : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.salary || !formData.dob || !formData.depId) {
      alert('Please fill all fields');
      return;
    }

    try {
      if (employeeToEdit) {
        await api.put(`/employees/${employeeToEdit._id}`, formData);
        setEmployeeToEdit(null);
      } else {
        await api.post('/employees', formData);
      }
      setFormData({ name: '', salary: '', gender: true, dob: '', depId: '' });
      fetchEmployees();
    } catch (error) {
      console.error('Error saving employee:', error);
      alert('Error saving employee');
    }
  };

  return (
    <div className="card form-container">
      <div className="card-header bg-primary">
        <h3>{employeeToEdit ? 'Edit Employee' : 'Add New Employee'}</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Enter name..."
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label>Salary</label>
            <input 
              type="number" 
              name="salary" 
              value={formData.salary} 
              onChange={handleChange} 
              placeholder="Enter salary..."
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender.toString()} onChange={handleChange} className="form-control">
              <option value="true">Male</option>
              <option value="false">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input 
              type="date" 
              name="dob" 
              value={formData.dob} 
              onChange={handleChange} 
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select name="depId" value={formData.depId} onChange={handleChange} className="form-control">
              <option value="">-- Select Department --</option>
              {departments.map(dep => (
                <option key={dep._id} value={dep._id}>{dep.depName}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            {employeeToEdit ? 'Update' : 'Add'}
          </button>
          
          {employeeToEdit && (
            <button 
              type="button" 
              className="btn btn-secondary btn-block mt-2" 
              onClick={() => setEmployeeToEdit(null)}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
