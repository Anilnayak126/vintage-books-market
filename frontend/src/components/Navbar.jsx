import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice'; // Adjust the path if necessary
import './styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use navigate to redirect after logout

  // Get the user from Redux state
  const user = useSelector((state) => state.auth.user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout()); // This action should clear the user's session in Redux
    navigate('/login'); // Redirect to login page after logging out
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

          {/* Conditionally render user info or login link */}
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-yellow-400">Welcome, {user.username}!</span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="hover:text-yellow-400 transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hover:text-yellow-400 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
