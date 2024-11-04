import React from 'react';
import Logo from '../assets/Logo.png';
import Image from '../assets/Image.png';
import Google from '../assets/Google.png';

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      {/* Page Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg flex h-5/6">
        
        {/* Logo in the top-left corner */}
        <img src={Logo} alt="Logo" className="absolute top-4 left-4 w-20 h-12" />

        {/* Left Side - Sign Up Form */}
        <div className="w-1/2 p-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">SIGN UP</h1>
            <p className="text-gray-500 mt-1">Create an account to get started.</p>
          </div>
          
          {/* Continue with Google Button */}
          <button className="flex items-center justify-center w-full py-2 mb-3 border border-gray-300 rounded hover:bg-gray-100">
            <img src={Google} alt="Google Icon" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>
          
          {/* Divider */}
          <div className="flex items-center my-3">
            <span className="border-t border-gray-300 flex-grow"></span>
            <span className="px-3 text-gray-400">Or</span>
            <span className="border-t border-gray-300 flex-grow"></span>
          </div>
          
          {/* Form Inputs */}
          <form className="space-y-3">
            <input type="text" placeholder="Name" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-300" />
            <input type="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-300" />
            <input type="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-300" />
            
            <div className="flex items-center mt-2">
              <input type="checkbox" id="rememberMe" className="mr-2" />
              <label htmlFor="rememberMe" className="text-gray-600 text-sm">Remember Me</label>
            </div>
            
            {/* Register Button */}
            <button type="submit" className="w-full py-2 bg-black text-white rounded hover:bg-gray-800">Register</button>
          </form>
          
          {/* Already have an account */}
          <p className="text-center mt-4 text-gray-600 text-sm">
            Already have an account? <a href="/login" className="text-yellow-500 hover:underline">Log in</a>
          </p>
        </div>
        
        {/* Right Side - Image */}
        <div className="w-1/2 flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700 rounded-r-lg">
          <img src={Image} alt="Illustration" className="w-full h-full object-cover rounded-r-lg" />
        </div>
        
      </div>
    </div>
  );
};

export default SignUpPage;
