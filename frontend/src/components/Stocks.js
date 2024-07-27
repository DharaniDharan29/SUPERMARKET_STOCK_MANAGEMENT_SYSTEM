import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function Stocks() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/get_categories')
      .then(response => setCategories(response.data.categories))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (category) {
      axios.get(`http://localhost:5000/stocks/${category}`)
        .then(response => setItems(response.data.items))
        .catch(error => console.log(error));
    }
  }, [category]);

  const handleNavigate = (cat) => {
    navigate(`/stocks/${cat}`); // Navigate to the specified category route
  };

  const handleNavigateStocks = () => {
    navigate('/admin'); // Navigate to /stocks
  };

  return (
    <div>
      <div className="top-right-button">
        <button className="admin-button" onClick={handleNavigateStocks}>Stocks</button>
      </div>
      <div className="center-buttons">
        {categories.map(cat => (
          <button key={cat} className="circle-button" onClick={() => handleNavigate(cat)}>{cat}</button>
        ))}
      </div>
      {category && (
        <div className="table-container">
          <table className="stock-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Stocks;
