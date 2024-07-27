import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Bill.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function Bill() {
  const [categories, setCategories] = useState([]);
  const [billItems, setBillItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    axios.get('http://localhost:5000/get_categories')
      .then(response => setCategories(response.data.categories))
      .catch(error => console.log(error));
  }, []);

  const handleAddItem = () => {
    const item = { name: itemName, category, quantity, price };
    setBillItems([...billItems, item]);
    setTotalAmount(totalAmount + (quantity * price));
    setItemName('');
    setCategory('');
    setQuantity(1);
    setPrice(0);
  };

  const handleDownloadBill = () => {
    const billData = {
      name: customerName,
      phone: customerPhone,
      items: billItems,
    };
    axios.post('http://localhost:5000/download', billData)
      .then(response => {
        if (response.data.success) {
          alert('Bill stored successfully');
          // Clear fields after successful bill storage
          setCustomerName('');
          setCustomerPhone('');
          setBillItems([]);
          setTotalAmount(0);
        } else {
          alert('Failed to store the bill');
        }
      })
      .catch(error => console.log(error));
  };

  const handleItemChange = () => {
    if (itemName && category) {
      axios.get('http://localhost:5000/get_price', { params: { name: itemName, category } })
        .then(response => {
          setPrice(response.data.price);
        })
        .catch(error => {
          setPrice(0);
          console.log(error);
        });
    } else {
      setPrice(0);
    }
  };

  useEffect(() => {
    handleItemChange();
  }, [itemName, category]);

  const handleAdminButtonClick = () => {
    navigate('/admin'); // Navigate to '/admin' when the button is clicked
  };

  return (
    <div className="bill-page">
      <div className="admin-button-container">
        <button className="admin-button" onClick={handleAdminButtonClick}>Admin</button>
      </div>
      <div className="left-panel">
        <h2>Customer Details</h2>
        <form id="customerDetailsForm">
          <label htmlFor="customerName">Name:</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
          <label htmlFor="customerPhone">Phone Number:</label>
          <input
            type="text"
            id="customerPhone"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            required
          />
        </form>

        <h2>Add Item to Bill</h2>
        <form id="addItemForm">
          <label htmlFor="itemName">Item Name:</label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />
          <label htmlFor="price">Price (per unit):</label>
          <input
            type="number"
            id="price"
            value={price}
            readOnly
          />
          <button type="button" onClick={handleAddItem}>Add Item</button>
        </form>
      </div>
      <div className="right-panel">
        <h2>Billing Details</h2>
        <div id="billSection">
          <div id="customerInfo">
            <p>Name: <span id="displayCustomerName">{customerName}</span></p>
            <p>Phone Number: <span id="displayCustomerPhone">{customerPhone}</span></p>
          </div>
          <div className="table-container">
            <table id="billTable">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody id="billList">
                {billItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>₹{parseFloat(item.price).toFixed(2)}</td>
                    <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p id="totalAmountText">Total Amount: <span id="totalAmountValue">₹{totalAmount.toFixed(2)}</span></p>
          <button onClick={handleDownloadBill}>Download Bill</button>
        </div>
      </div>
    </div>
  );
}

export default Bill;
