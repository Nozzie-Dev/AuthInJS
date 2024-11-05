import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:5000/api/login', { email, password });

      // Store token and user info in localStorage
      localStorage.setItem('token', response.data.token);
        
      localStorage.setItem('email', email);  

      // Navigate to profile page
      navigate('/profile'); 

    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Log In</h1>
        {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-2 border border-gray-300 rounded focus:outline-none" 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-2 border border-gray-300 rounded focus:outline-none" 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button 
            type="submit" 
            className="w-full py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600 text-sm">
          Don't have an account? <Link to="/" className="text-yellow-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
