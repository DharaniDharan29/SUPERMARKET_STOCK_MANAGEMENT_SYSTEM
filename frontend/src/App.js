import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './components/AdminPage';
import Bill from './components/Bill';
import Customers from './components/Customers';
import Stocks from './components/Stocks';
import Suppliers from './components/Suppliers';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/stocks/:category" element={<Stocks />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
