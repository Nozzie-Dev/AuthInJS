import React, { useState } from 'react';
import axios from 'axios';
import Logo from '../assets/Logo.png';
import Image from '../assets/Image.png';
import GoogleIcon from '../assets/Google.png';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignUpPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // Initialize useNavigate for programmatic navigation
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      setMessage('Registration successful!');
      setError('');

      // After successful registration, navigate to the login page
      navigate('/login'); // Redirect to the login page

    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      setMessage('');
    }
  };

  // Handle Google OAuth success
  const handleGoogleSuccess = async (response) => {
    try {
      const { credential } = response; // Google token
      const { data } = await axios.post('http://localhost:5000/api/google-login', { token: credential });
      setMessage('Google login successful!');
      setError('');
      navigate('/login'); // Redirect to the login page after successful Google login
    } catch (err) {
      console.log("Error details:", err);
      setError('Google login failed, please try again.');
      setMessage('');
    }
  };

  // Handle Google OAuth error
  const handleGoogleError = (error) => {
    setError('Google login failed, please try again.');
    setMessage('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg flex h-5/6">
        <img src={Logo} alt="Logo" className="absolute top-4 left-4 w-20 h-12" />

        <div className="w-1/2 p-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">SIGN UP</h1>
            <p className="text-gray-500 mt-1">Create an account to get started.</p>
          </div>

          {/* Continue with Google */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            shape="pill"
            theme="outline"
            text="continue_with"
            width="full"
            logo_alignment="left"
            className="flex items-center justify-center w-full py-2 mb-3 border border-gray-300 rounded hover:bg-gray-100"
          >
            <img src={GoogleIcon} alt="Google Icon" className="w-5 h-5 mr-2" />
            Continue with Google
          </GoogleLogin>

          <div className="flex items-center my-3">
            <span className="border-t border-gray-300 flex-grow"></span>
            <span className="px-3 text-gray-400">Or</span>
            <span className="border-t border-gray-300 flex-grow"></span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" name="name" placeholder="Name" className="w-full p-2 border border-gray-300 rounded focus:outline-none" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded focus:outline-none" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded focus:outline-none" onChange={handleChange} required />

            <div className="flex items-center mt-2">
              <input type="checkbox" id="rememberMe" className="mr-2" />
              <label htmlFor="rememberMe" className="text-gray-600 text-sm">Remember Me</label>
            </div>

            <button type="submit" className="w-full py-2 bg-black text-white rounded hover:bg-gray-800">Register</button>
          </form>

          <p className="text-center mt-4 text-gray-600 text-sm">
            Already have an account? <a href="/login" className="text-yellow-500 hover:underline">Log in</a>
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700 rounded-r-lg">
          <img src={Image} alt="Illustration" className="w-full h-full object-cover rounded-r-lg" />
        </div>
      </div>

      {message && <div className="fixed bottom-4 left-4 bg-green-500 text-white py-2 px-4 rounded">{message}</div>}
      {error && <div className="fixed bottom-4 left-4 bg-red-500 text-white py-2 px-4 rounded">{error}</div>}
    </div>
  );
};

export default SignUpPage;
