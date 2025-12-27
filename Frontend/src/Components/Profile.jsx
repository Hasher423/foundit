import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Profile = () => {
  const navigate = useNavigate();

  const userData = localStorage.getItem('user');
  const user = userData
    ? JSON.parse(userData)
    : { name: 'Guest', avatar: 'https://via.placeholder.com/150' }; // Fallback

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/logout`, {
        withCredentials: true,
      });

      const { success } = response.data;
      if (success) {
        localStorage.removeItem('user');
        navigate('/signup');
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
      <div className="flex flex-col items-center p-6">
        <img
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4 object-cover"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.name}</h2>
        <p className="text-gray-600 mb-4">Welcome to your profile!</p>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={goToDashboard}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Profile Details</h3>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="text-gray-800">{user.name}</span>
          </li>
          {/* Add more user info if available */}
        </ul>
      </div>
    </div>
  );
};
