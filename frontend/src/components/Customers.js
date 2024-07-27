import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetch('http://localhost:5000/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.customers))
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  const handleAdminButtonClick = () => {
    navigate('/admin'); // Navigate to '/admin' when the button is clicked
  };

  return (
    <div>
      <div className="admin-button-container">
        <button className="admin-button" onClick={handleAdminButtonClick}>Admin</button>
      </div>
      <h1 style={{color:'white'}}>Customers</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
