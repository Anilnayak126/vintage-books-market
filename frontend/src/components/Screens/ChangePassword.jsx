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
    <div className="glass-page-center text-gray-200">
      <div className="glass-panel w-full max-w-lg p-6">
        <h1 className="section-title mb-6 text-center text-3xl">Change Password</h1>
        <form onSubmit={handleChangePassword}>
          {error && <p className="mb-4 text-[color:var(--rose)] animate__animated animate__shakeX">{error}</p>}
          <div className="mb-4">
            <label className="mb-2 block text-lg font-medium">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter your old password"
              className="px-4 py-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-lg font-medium">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              className="px-4 py-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-lg font-medium">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="px-4 py-3"
              required
            />
          </div>
          <button type="submit" className="w-full py-3 font-bold">
            Submit
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/account" className="text-link">Back to Account</Link>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
