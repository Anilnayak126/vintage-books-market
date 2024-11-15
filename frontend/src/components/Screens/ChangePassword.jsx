import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, logout } from '../../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const { successMessage, errorMessage } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const resultAction = await dispatch(changePassword({ oldPassword, newPassword, confirmPassword }));

    if (changePassword.fulfilled.match(resultAction)) {
      alert(successMessage || "Password changed successfully");
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError(null);
      dispatch(logout());
      navigate('/login');
    } else {
      setError(errorMessage || "Password change failed.");
    }
  };

  return (
    <div className="min-h-screen  text-gray-200 p-8 flex justify-center items-center">
      <div className="w-full max-w-lg bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6 text-white">Change Password</h1>
        <form onSubmit={handleChangePassword}>
          {error && <p className="text-red-500 mb-4 animate__animated animate__shakeX">{error}</p>}
          <div className="mb-4">
            <label className="block mb-2 text-lg font-medium text-gray-300">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-lg font-medium text-gray-300">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-lg font-medium text-gray-300">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300"
              required
            />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300">
            Submit
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/account" className="text-blue-500 hover:underline">Back to Account</Link>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
