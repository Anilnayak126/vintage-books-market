import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchUserProfile } from '../../redux/authSlice';
import { FaUser, FaHistory, FaBook, FaHeart, FaCog } from 'react-icons/fa';
import MyBooks from './ManageProducts/MyBooks';
import MyWishlist from './Wishlist';
import { mediaUrl } from '../../config/api';

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
    return <div className="glass-page-center text-[color:var(--rose)]">Error: {error}</div>;
  }

  return (
    <div className="glass-page flex flex-col gap-6 text-gray-200 md:flex-row">
      <aside className="glass-panel mb-6 w-full p-4 md:mb-0 md:w-1/4">
        <ul className="space-y-4">
          <li
            onClick={() => setActiveSection('profile')}
            className={`flex items-center cursor-pointer p-3 rounded-lg transition-all duration-300 ${
              activeSection === 'profile' ? 'bg-white/15 text-white' : 'hover:bg-white/10 hover:text-white'
            }`}
          >
            <FaUser className="mr-3" /> Profile Information
          </li>

          <li
            onClick={() => setActiveSection('listedBooks')}
            className={`flex items-center cursor-pointer p-3 rounded-lg transition-all duration-300 ${
              activeSection === 'listedBooks' ? 'bg-white/15 text-white' : 'hover:bg-white/10 hover:text-white'
            }`}
          >
            <FaBook className="mr-3" /> Listed Books
          </li>
          <li
            onClick={() => setActiveSection('wishlist')}
            className={`flex items-center cursor-pointer p-3 rounded-lg transition-all duration-300 ${
              activeSection === 'wishlist' ? 'bg-white/15 text-white' : 'hover:bg-white/10 hover:text-white'
            }`}
          >
            <FaHeart className="mr-3" /> Wishlist
          </li>
          <li
            onClick={() => setActiveSection('settings')}
            className={`flex items-center cursor-pointer p-3 rounded-lg transition-all duration-300 ${
              activeSection === 'settings' ? 'bg-white/15 text-white' : 'hover:bg-white/10 hover:text-white'
            }`}
          >
            <FaCog className="mr-3" /> Settings
          </li>
        </ul>
      </aside>

      <div className="glass-panel w-full p-6 md:w-3/4">
        {activeSection === 'profile' && user && (
          <div>
            <h2 className="mb-4 text-2xl font-bold text-[color:var(--gold)]">Profile Information</h2>
            <img src={mediaUrl('/userDetails', user.user_profile.profile_image)} alt="Profile" className="mb-4 h-24 w-24 rounded-full border-2 border-[color:var(--gold)] object-cover shadow-md" />
            <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.user_profile.phone_number}</p>
            <p><strong>Address:</strong> {user.user_profile.address}</p>
            <button onClick={handleEditProfile} className="mt-4 px-4 py-2 font-bold">Edit Profile</button>
          </div>
        )}

        {activeSection === 'orders' && (
          <div>
            <h2 className="mb-4 text-2xl font-bold text-[color:var(--gold)]">Order History</h2>
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
            <h2 className="mb-4 text-2xl font-bold text-[color:var(--gold)]">Settings</h2>
            <button onClick={handleChangePassword} className="danger-button px-4 py-2 font-bold">Change Password</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
