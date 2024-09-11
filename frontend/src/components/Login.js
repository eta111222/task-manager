import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css'; 

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5005/auth/login', {
        email,
        password,
      });
      const token = response.data.token;
      onLogin(token);
      navigate('/tasks'); 
    } catch (error) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="register-container">  
      <div className="form-container">  
        <h2 className="form-title">Please log in</h2>  
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">  
            <label>Email address</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">  
            <label>Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">log in</button>  
        </form>
      </div>
    </div>
  );
};

export default Login;
