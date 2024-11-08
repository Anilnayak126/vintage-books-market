// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-yellow-400">
          Vintage Book Market
        </Link>

        {/* Hamburger Icon */}
        <div className="md:hidden" onClick={toggleMenu}>
          <button
            className={`hamburger ${isOpen ? 'open' : ''} focus:outline-none`}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`flex-col md:flex-row md:flex md:items-center space-y-4 md:space-y-0 md:space-x-4 absolute md:static top-16 left-0 right-0 md:top-auto bg-gray-800 md:bg-transparent p-4 md:p-0 ${
            isOpen ? 'flex' : 'hidden'
          }`}
        >
          <Link
            to="/"
            className="hover:text-yellow-400 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/browse"
            className="hover:text-yellow-400 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Browse Books
          </Link>
          <Link
            to="/sell"
            className="hover:text-yellow-400 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Sell a Book
          </Link>
          <Link
            to="/account"
            className="hover:text-yellow-400 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            My Account
          </Link>
          <Link
            to="/cart"
            className="hover:text-yellow-400 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
