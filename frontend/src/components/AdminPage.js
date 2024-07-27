import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const AdminPage = () => {
  const navigate = useNavigate();
  const [view, setView] = useState(null);

  const handleViewChange = (newView) => {
    setView(view === newView ? null : newView);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-page">
      <nav className="navbar">
        <ul>
          <li onClick={() => handleViewChange('about')}>About</li>
          <li onClick={() => handleViewChange('contact')}>Contact</li>
        </ul>
      </nav>
      <div className="content">
        {view === 'about' && (
          <div className="about">
            <h2>About</h2>
            <p>This is the about section.</p>
          </div>
        )}
        {view === 'contact' && (
          <div className="contact">
            <h2>Contact</h2>
            <p>This is the contact section.</p>
          </div>
        )}
      </div>
      <div className="center-buttons">
        <button className="circle-button" onClick={() => handleNavigation('/stocks')}>
          Stocks
        </button>
        <button className="circle-button" onClick={() => handleNavigation('/suppliers')}>
          Supplier
        </button>
        <button className="circle-button" onClick={() => handleNavigation('/bill')}>
          Bill
        </button>
        <button className="circle-button" onClick={() => handleNavigation('/customers')}>
          Customers
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
