import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/authSlice';  

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth); 

 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
    phone_number: '',
    address: '',
    profile_image: null, 
  });

  // State to manage image preview
  const [imagePreview, setImagePreview] = useState(null);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profile_image: file, 
      }));
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match.");
      return;
    }

    
    const data = new FormData();
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('first_name', formData.first_name);
    data.append('last_name', formData.last_name);
    data.append('password', formData.password);
    data.append('confirm_password', formData.confirm_password);
    data.append('phone_number', formData.phone_number);
    data.append('address', formData.address);

   
    if (formData.profile_image) {
      data.append('profile_image', formData.profile_image);
    }
    console.log([...data]);
    
    
    dispatch(register(data));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create an Account</h2>

        {error && <div className="bg-red-200 text-red-800 p-2 rounded mb-4">{error}</div>} {/* Display error */}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* First Name */}
          <div className="mb-4">
            <label className="block text-gray-600">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-gray-600">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-gray-600">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-600">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-600">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Profile Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-600">Profile Image</label>
            <input
              type="file"
              name="profile_image"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {imagePreview && (
              <div className="mt-4 text-center">
                <img src={imagePreview} alt="Image Preview" className="w-32 h-32 object-cover rounded-full mx-auto" />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 mt-4 rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
