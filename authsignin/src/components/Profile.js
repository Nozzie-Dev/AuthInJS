import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in by looking for token in localStorage
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    if (!token) {
      // If no token found, redirect to login page (user is not authenticated)
      window.location.href = '/login';
    } else {
      // Set user information from localStorage
      setUser({ name, email });
    }
  }, []);

  // If user data is still not available, display loading message
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Profile</h1>
        
        <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>

        <h3 className="text-3xl font-semibold text-gray-800 mb-4">Hooray, login Successful!!!</h3>

        {/* Logout - Return to signup */}
        <button 
          onClick={() => {
            localStorage.removeItem('token'); 
            localStorage.removeItem('name'); 
            localStorage.removeItem('email');
            window.location.href = '/'; // Redirect to login/signup page
          }} 
          className="w-full py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
