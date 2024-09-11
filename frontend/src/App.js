import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TaskList from './components/TaskList';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/register" element={<Register />} /> 
        <Route 
          path="/login" 
          element={token ? <Navigate to="/tasks" /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/tasks" 
          element={token ? <TaskList token={token} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;

