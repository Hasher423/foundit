import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa'; // Assuming react-icons installed: npm install react-icons

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : { avatar: 'https://via.placeholder.com/40', name: 'Guest' };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/">
        <h1 className="text-2xl font-BBHBartle text-blue-600 hover:text-blue-800 transition-colors">FindIt</h1>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden font-NeueMachina md:flex items-center space-x-6">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">Dashboard</Link>
        <Link to="/reported-items" className="text-gray-700 hover:text-blue-600 transition-colors">Reported Items</Link>
        <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition-colors">Profile</Link>
        {userData && (
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
          >
            <FaSignOutAlt className="mr-1" /> Logout
          </button>
        )}
      </nav>

      {/* Profile Avatar (Desktop) */}
      <div className="hidden md:flex items-center  ">
        <Link to="/profile" className="flex items-center space-x-2">
          <img
            src={user.avatar}
            alt={`${user.name}'s avatar`}
            className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover hover:opacity-90 transition-opacity"
          />
          <span className="text-gray-800 font-BBHBartle">{user.name}</span>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden text-gray-700 focus:outline-none" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-50">
          <ul className="flex flex-col items-center font-NeueMachina space-y-4 py-4">
            <li>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={toggleMenu}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/reported-items" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={toggleMenu}>
                Reported Items
              </Link>
            </li>
            <li>
              <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={toggleMenu}>
                Profile
              </Link>
            </li>
            {userData && (
              <li>
                <button
                  onClick={() => { handleLogout(); toggleMenu(); }}
                  className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
                >
                  <FaSignOutAlt className="mr-1" /> Logout
                </button>
              </li>
            )}
            <li className="flex font-BBHBartle items-center space-x-2 pt-2 border-t border-gray-200 w-full justify-center">
              <img
                src={user.avatar}
                alt={`${user.name}'s avatar`}
                className="w-8 h-8 rounded-full border-2 border-blue-500 object-cover"
              />
              <span className="text-gray-800 font-medium">{user.name}</span>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;