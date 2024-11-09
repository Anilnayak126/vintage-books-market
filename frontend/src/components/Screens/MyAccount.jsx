// src/pages/MyAccount.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyAccount = () => {
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      
      
      <div className="flex">
        <aside className="w-1/4 bg-gray-200 p-4 rounded-lg mr-6">
          <ul className="space-y-4">
            <li onClick={() => setActiveSection('profile')} className={`cursor-pointer ${activeSection === 'profile' ? 'font-bold' : ''}`}>
              Profile Information
            </li>
            <li onClick={() => setActiveSection('orders')} className={`cursor-pointer ${activeSection === 'orders' ? 'font-bold' : ''}`}>
              Order History
            </li>
            <li onClick={() => setActiveSection('listedBooks')} className={`cursor-pointer ${activeSection === 'listedBooks' ? 'font-bold' : ''}`}>
              Listed Books
            </li>
            <li onClick={() => setActiveSection('wishlist')} className={`cursor-pointer ${activeSection === 'wishlist' ? 'font-bold' : ''}`}>
              Wishlist
            </li>
            <li onClick={() => setActiveSection('settings')} className={`cursor-pointer ${activeSection === 'settings' ? 'font-bold' : ''}`}>
              Settings
            </li>
          </ul>
        </aside>

        {/* Main Content Area */}
        <div className="w-3/4">
          {activeSection === 'profile' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
            
              <p>Name: John Doe</p>
              <p>Email: johndoe@example.com</p>
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Edit Profile</button>
            </div>
          )}

          {activeSection === 'orders' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Order History</h2>
              
              <p>No orders yet. Start browsing!</p>
            </div>
          )}

          {activeSection === 'listedBooks' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Listed Books</h2>
              
              <p>No books listed for sale. <Link to="/sell" className="text-blue-500">List a book now</Link>.</p>
            </div>
          )}

          {activeSection === 'wishlist' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Wishlist</h2>
              
              <p>Your wishlist is empty. <Link to="/browse" className="text-blue-500">Browse books</Link>.</p>
            </div>
          )}

          {activeSection === 'settings' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Settings</h2>
             
              <button className="bg-red-500 text-white py-2 px-4 rounded">Change Password</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
