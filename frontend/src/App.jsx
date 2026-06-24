import React, { useState, useEffect } from 'react';
import api from './services/api';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import SearchBar from './components/SearchBar';
import './index.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const fetchDepartments = async () => {
    try {
      const response = await api.get('/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await api.get(`/employees?name=${searchQuery}`);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
    // eslint-disable-next-line
  }, []);

  const handleSearch = () => {
    fetchEmployees();
  };

  return (
    <div className="app-container">
      <div className="grid-container">
        <div className="left-panel">
          <EmployeeForm 
            fetchEmployees={fetchEmployees} 
            departments={departments} 
            employeeToEdit={employeeToEdit}
            setEmployeeToEdit={setEmployeeToEdit}
          />
          <SearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            onSearch={handleSearch} 
          />
        </div>
        <div className="right-panel">
          <EmployeeList 
            employees={employees} 
            fetchEmployees={fetchEmployees}
            setEmployeeToEdit={setEmployeeToEdit}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
