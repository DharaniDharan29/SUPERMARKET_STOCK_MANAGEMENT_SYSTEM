// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import cartImage from '../cart.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('admin');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, type }),
        });
        const data = await response.json();
        if (data.success) {
            navigate('/admin');
        } else {
            alert('Username or password is incorrect');
        }
    };

    return (
        <div className="login-container">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Welcome To Our Restaurant</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group radio-buttons">
                            <label>Login As</label>
                            <div>
                                <input
                                    type="radio"
                                    id="admin"
                                    name="type"
                                    value="admin"
                                    checked={type === 'admin'}
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                />
                                <label htmlFor="admin">Admin</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="user"
                                    name="type"
                                    value="user"
                                    checked={type === 'user'}
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                />
                                <label htmlFor="user">User</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
            <div className="moving-image">
                <img src={cartImage} alt="Cart" className="moving-cart" />
            </div>
        </div>
    );
};

export default Login;
