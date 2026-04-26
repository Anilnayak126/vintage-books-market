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
    <div className="glass-page-center text-gray-200">
      <div className="glass-panel w-full max-w-3xl p-8">
        <h1 className="section-title mb-8 text-center text-3xl">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium">First Name</label>
              <input
                type="text"
                name="first_name"
                value={profileData.first_name}
                onChange={handleChange}
                className="mt-2 p-3"
              />
            </div>
            <div>
              <label className="block font-medium">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={profileData.last_name}
                onChange={handleChange}
                className="mt-2 p-3"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              disabled
              className="mt-2 cursor-not-allowed p-3"
            />
          </div>

          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={profileData.phone_number}
              onChange={handleChange}
              className="mt-2 p-3"
            />
          </div>

          <div>
            <label className="block font-medium">Address</label>
            <textarea
              name="address"
              value={profileData.address}
              onChange={handleChange}
              rows="4"
              className="mt-2 p-3"
            ></textarea>
          </div>

          <div>
            <label className="block font-medium">Profile Image</label>
            <input
              type="file"
              name="profile_image"
              onChange={handleFileChange}
              className="mt-2 p-3"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading || reduxLoading}
              className="w-full py-3 font-bold"
            >
              {loading || reduxLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>

        {successMessage || reduxSuccessMessage ? (
          <p className="mt-4 text-center text-[color:var(--green)]">{successMessage || reduxSuccessMessage}</p>
        ) : null}

        {error || reduxError ? (
          <p className="mt-4 text-center text-[color:var(--rose)]">{error || reduxError}</p>
        ) : null}
      </div>
    </div>
  );
};

export default EditProfile;
