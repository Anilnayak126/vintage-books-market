// Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { FaHome, FaBook, FaPlus, FaUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa'; // Import Font Awesome icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-black text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        
      <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500 text-transparent bg-clip-text">
  Vintage Book Market
</Link>


        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden" onClick={toggleMenu}>
          <button className="focus:outline-none">
            <span className={`block w-6 h-1 bg-white mb-1 transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-1 bg-white mb-1 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-1 bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Links and Icons */}
        <div className={`md:flex md:items-center space-y-4 md:space-y-0 md:space-x-6 absolute md:static top-16 left-0 right-0 bg-black md:bg-transparent p-4 md:p-0 transition-all duration-300 ease-in-out ${isOpen ? 'flex flex-col' : 'hidden md:flex'}`}>
          
          <Link to="/" className="flex items-center px-3 py-2 rounded-md hover:bg-yellow-500 hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105" onClick={() => setIsOpen(false)}>
            <FaHome className="mr-2" /> Home
          </Link>

          <Link to="/browse" className="flex items-center px-3 py-2 rounded-md hover:bg-yellow-500 hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105" onClick={() => setIsOpen(false)}>
            <FaBook className="mr-2" /> Browse Books
          </Link>

          <Link to="/sell" className="flex items-center px-3 py-2 rounded-md hover:bg-yellow-500 hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105" onClick={() => setIsOpen(false)}>
            <FaPlus className="mr-2" /> Sell a Book
          </Link>

          <Link to="/account" className="flex items-center px-3 py-2 rounded-md hover:bg-yellow-500 hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105" onClick={() => setIsOpen(false)}>
            <FaUser className="mr-2" /> My Account
          </Link>

          <Link to="/cart" className="flex items-center px-3 py-2 rounded-md hover:bg-yellow-500 hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105" onClick={() => setIsOpen(false)}>
            <FaShoppingCart className="mr-2" /> Cart
          </Link>

          {/* User or Login Link */}
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-yellow-400">Welcome, {user.first_name}!</span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center px-3 py-2 rounded-md hover:bg-red-500 hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:text-yellow-400 transition duration-300" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
