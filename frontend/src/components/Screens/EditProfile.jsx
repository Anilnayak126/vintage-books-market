import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile, editProfile } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    address: '',
    profile_image: null,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { loading: reduxLoading, error: reduxError, successMessage: reduxSuccessMessage } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user) {
      setProfileData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone_number: user.user_profile?.phone_number || '',
        address: user.user_profile?.address || '',
        profile_image: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfileData((prevData) => ({
      ...prevData,
      profile_image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setError('');

    try {
      const formData = new FormData();
      for (let key in profileData) {
        formData.append(key, profileData[key]);
      }
      await dispatch(editProfile(formData)).unwrap();
      setSuccessMessage('Profile updated successfully!');
      dispatch(fetchUserProfile());
      navigate('/account');
    } catch (err) {
      setError('An error occurred while updating the profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center text-gray-200 p-8">
      <div className="w-full max-w-3xl bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-8 text-white">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 font-medium">First Name</label>
              <input
                type="text"
                name="first_name"
                value={profileData.first_name}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label className="block text-gray-300 font-medium">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={profileData.last_name}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              disabled
              className="w-full p-3 mt-2 border border-gray-600 rounded-md bg-gray-700 cursor-not-allowed text-gray-400"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={profileData.phone_number}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium">Address</label>
            <textarea
              name="address"
              value={profileData.address}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 mt-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-300 font-medium">Profile Image</label>
            <input
              type="file"
              name="profile_image"
              onChange={handleFileChange}
              className="w-full p-3 mt-2 border border-gray-600 rounded-md text-gray-300"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading || reduxLoading}
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              {loading || reduxLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>

        {successMessage || reduxSuccessMessage ? (
          <p className="mt-4 text-green-500 text-center">{successMessage || reduxSuccessMessage}</p>
        ) : null}

        {error || reduxError ? (
          <p className="mt-4 text-red-500 text-center">{error || reduxError}</p>
        ) : null}
      </div>
    </div>
  );
};

export default EditProfile;
