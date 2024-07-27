import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/stocks">Stocks</Link>
        </li>
        <li>
          <Link to="/supplier">Supplier</Link>
        </li>
        <li>
          <Link to="/bill">Bill</Link>
        </li>
        <li>
          <Link to="/customers">Customers</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
