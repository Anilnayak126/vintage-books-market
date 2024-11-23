import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchUserProfile } from '../../redux/authSlice';
import { FaUser, FaHistory, FaBook, FaHeart, FaCog } from 'react-icons/fa';
import MyBooks from './ManageProducts/MyBooks';
import MyWishlist from './Wishlist';

const MyAccount = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const isAuthenticated = Boolean(localStorage.getItem('accessToken'));
  
  const [redirected, setRedirected] = useState(false);
  const [loadingRedirect, setLoadingRedirect] = useState(true); // Add a state to handle redirection loading

  useEffect(() => {
    if (!isAuthenticated && !redirected) {
      setRedirected(true); 
      navigate('/login');
      setLoadingRedirect(true);  
    } else {
      setLoadingRedirect(false); 
    }
  }, [isAuthenticated, navigate, redirected]);


  useEffect(() => {
    if (!loadingRedirect) { 
      dispatch(fetchUserProfile());
    }
  }, [dispatch, location.key, loadingRedirect]);

  useEffect(() => {
    const handleStorageChange = () => {
      dispatch(fetchUserProfile());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch]);

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  // if (loading || loadingRedirect) {
  //   return <div className="text-gray-200">Loading...</div>;  
  // }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen text-gray-200 p-8 flex flex-col md:flex-row md:space-x-8">
      <aside className="w-full md:w-1/4 bg-gray-800 p-4 rounded-lg mb-6 md:mb-0">
        <ul className="space-y-4">
          <li 
            onClick={() => setActiveSection('profile')}
            className={`flex items-center cursor-pointer p-3 rounded-lg transition-all duration-300 ${
              activeSection === 'profile' ? 'bg-yellow-500 text-black' : 'hover:bg-yellow-500 hover:text-black'
            }`}
          >
            <FaUser className="mr-3" /> Profile Information
          </li>
          <li 
            onClick={() => setActiveSection('orders')}
            className={`flex items-center cursor-pointer p-3 rounded-lg transition-all duration-300 ${
              activeSection === 'orders' ? 'bg-yellow-500 text-black' : 'hover:bg-yellow-500 hover:text-black'
            }`}
          >
            <FaHistory className="mr-3" /> Order History
          </li>
          <li 
            onClick={() => setActiveSection('listedBooks')}
            className={`flex items-center cursor-pointer p-3 rounded-lg transition-all duration-300 ${
              activeSection === 'listedBooks' ? 'bg-yellow-500 text-black' : 'hover:bg-yellow-500 hover:text-black'
            }`}
          >
            <FaBook className="mr-3" /> Listed Books
          </li>
          <li 
            onClick={() => setActiveSection('wishlist')}
            className={`flex items-center cursor-pointer p-3 rounded-lg transition-all duration-300 ${
              activeSection === 'wishlist' ? 'bg-yellow-500 text-black' : 'hover:bg-yellow-500 hover:text-black'
            }`}
          >
            <FaHeart className="mr-3" /> Wishlist
          </li>
          <li 
            onClick={() => setActiveSection('settings')}
            className={`flex items-center cursor-pointer p-3 rounded-lg transition-all duration-300 ${
              activeSection === 'settings' ? 'bg-yellow-500 text-black' : 'hover:bg-yellow-500 hover:text-black'
            }`}
          >
            <FaCog className="mr-3" /> Settings
          </li>
        </ul>
      </aside>

      <div className="w-full md:w-3/4 bg-gray-800 p-6 rounded-lg">
        {activeSection === 'profile' && user && (
          <div>
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Profile Information</h2>
            <img src={`http://127.0.0.1:8000/userDetails${user.user_profile.profile_image}`} alt="Profile" className="w-24 h-24 rounded-full mb-4 shadow-md border-2 border-yellow-400" />
            <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.user_profile.phone_number}</p>
            <p><strong>Address:</strong> {user.user_profile.address}</p>
            <button onClick={handleEditProfile} className="mt-4 bg-yellow-500 text-black py-2 px-4 rounded-lg">Edit Profile</button>
          </div>
        )}

        {activeSection === 'orders' && (
          <div>
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Order History</h2>
            <p>No orders yet. Start browsing!</p>
          </div>
        )}

        {activeSection === 'listedBooks' && <MyBooks />} 

        {activeSection === 'wishlist' && (
          <div>
            
            <MyWishlist/>
          </div>
        )}

        {activeSection === 'settings' && (
          <div>
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Settings</h2>
            <button onClick={handleChangePassword} className="bg-red-500 text-white py-2 px-4 rounded-lg">Change Password</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
