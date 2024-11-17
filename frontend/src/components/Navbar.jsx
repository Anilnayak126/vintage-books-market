import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { motion } from 'framer-motion';

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
    <motion.nav
      className="bg-black/60 backdrop-blur-lg text-white p-4 shadow-lg sticky top-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500"
        >
          Vintage Book Market
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden" onClick={toggleMenu}>
          <button className="focus:outline-none">
            <span
              className={`block w-6 h-1 bg-white mb-1 transition-transform duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-1 bg-white mb-1 transition-opacity duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-1 bg-white transition-transform duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Links and User Section */}
        <div
          className={`md:flex md:items-center space-y-4 md:space-y-0 md:space-x-6 absolute md:static top-16 left-0 right-0 bg-black/60 md:bg-transparent p-4 md:p-0 backdrop-blur-lg transition-all duration-300 ease-in-out ${
            isOpen ? 'flex flex-col' : 'hidden md:flex'
          }`}
        >
          <Link
            to="/"
            className="px-3 py-2 rounded-md hover:bg-yellow-500 hover:bg-opacity-30 hover:text-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/browse"
            className="px-3 py-2 rounded-md hover:bg-yellow-500 hover:bg-opacity-30 hover:text-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => setIsOpen(false)}
          >
            Browse Books
          </Link>

          <Link
            to="/sell"
            className="px-3 py-2 rounded-md hover:bg-yellow-500 hover:bg-opacity-30 hover:text-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => setIsOpen(false)}
          >
            Sell a Book
          </Link>

          <Link
            to="/account"
            className="px-3 py-2 rounded-md hover:bg-yellow-500 hover:bg-opacity-30 hover:text-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => setIsOpen(false)}
          >
            My Account
          </Link>

          <Link
            to="/cart"
            className="px-3 py-2 rounded-md hover:bg-yellow-500 hover:bg-opacity-30 hover:text-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => setIsOpen(false)}
          >
            Cart
          </Link>

          {/* User or Login Section */}
          {user ? (
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <span className="text-yellow-400 text-lg sm:text-xl">
                Welcome, {user.first_name}!
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="px-3 py-2 rounded-md hover:bg-red-500 hover:bg-opacity-30 hover:text-red-400 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Logout
              </button>
            </motion.div>
          ) : (
            <Link
              to="/login"
              className="hover:text-yellow-400 text-lg sm:text-xl transition duration-300 transform hover:scale-105"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
