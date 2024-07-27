import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom
import './Suppliers.css'; // Import your CSS file for styling

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        // Function to fetch suppliers data from backend
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/suppliers');
                setSuppliers(response.data.suppliers);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };

        // Call the function to fetch suppliers when the component mounts
        fetchSuppliers();
    }, []); // Empty dependency array ensures this effect runs only once

    const handleAdminButtonClick = () => {
        navigate('/admin'); // Navigate to '/admin' when the button is clicked
    };

    return (
        <div className="suppliers-container">
            <div className="admin-button-container">
                <button className="admin-button" onClick={handleAdminButtonClick}>Admin</button>
            </div>
            <h2>Suppliers</h2>
            <table className="suppliers-table">
                <thead>
                    <tr>
                        <th>Supplier Name</th>
                        <th>Shop Name</th>
                        <th>Address</th>
                        <th>Mobile</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier, index) => (
                        <tr key={index}>
                            <td>{supplier.supplierName}</td>
                            <td>{supplier.shopName}</td>
                            <td>{supplier.address}</td>
                            <td>{supplier.mobile}</td>
                            <td>{supplier.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Suppliers;
