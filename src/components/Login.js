// components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './Login.css'; // You'll create this for styling

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });
      
      if (response.data.success) {
        localStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>SpamGuard</h1>
        <h2>Detect and prevent spam emails with AI technology</h2>
      </div>
      
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}
          
          <input
            type="text"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <button type="submit" className="login-button">
            Log In
          </button>
          
          <div className="divider"></div>
          
          <button 
            type="button" 
            className="create-account-button"
            onClick={() => alert('Registration will be added later')}
          >
            Create New Account
          </button>
        </form>
        
        <p className="create-page-text">
          <a href="#">Forgot password?</a>
        </p>
      </div>
    </div>
  );
};

export default Login;