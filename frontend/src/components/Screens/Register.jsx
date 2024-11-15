import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    dispatch(register(data));
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-8">
      <div className="w-full max-w-4xl bg-gradient-to-b from-gray-700 to-gray-800 p-8 rounded-lg shadow-lg animate-fade-in-down border border-gray-600">
        <h2 className="text-4xl font-bold text-center text-white mb-8">Create an Account</h2>

        {error && (
          <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center animate-fade-in-up">
            <div className="bg-white p-6 rounded-lg shadow-lg text-black">
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => dispatch({ type: 'auth/clearError' })}
                className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-4 rounded-lg transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-300 font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                className="w-full px-4 py-3 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
                className="w-full px-4 py-3 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black transition-all duration-300"
              /> 
            </div>

            <div>
              <label className="block text-gray-300 font-medium">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
                className="w-full px-4 py-3 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-300 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className="w-full px-4 py-3 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-300 font-medium">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="w-full px-4 py-3 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black transition-all duration-300"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 font-medium">Profile Image</label>
            <input
              type="file"
              name="profile_image"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full px-4 py-3 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black transition-all duration-300"
            />
            {imagePreview && (
              <div className="mt-4 text-center">
                <img src={imagePreview} alt="Image Preview" className="w-24 h-24 object-cover rounded-full mx-auto border-4 border-yellow-500" />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link to={"/login"} className="text-blue-400 hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
