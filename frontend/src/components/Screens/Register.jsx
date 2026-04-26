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
    <div className="glass-page-center">
      <div className="glass-panel w-full max-w-4xl p-8 animate-fade-in-down">
        <h2 className="section-title mb-8 text-center text-4xl">Create an Account</h2>

        {error && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-fade-in-up">
            <div className="glass-panel max-w-sm p-6 text-white">
              <p className="text-[color:var(--rose)]">{error}</p>
              <button
                onClick={() => dispatch({ type: 'auth/clearError' })}
                className="mt-4 px-4 py-2 font-bold"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                className="mt-2 px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="mt-2 px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-medium">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
                className="mt-2 px-4 py-3"
              /> 
            </div>

            <div>
              <label className="block font-medium">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
                className="mt-2 px-4 py-3"
              />
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="mt-2 px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className="mt-2 px-4 py-3"
              />
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block font-medium">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="mt-2 px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="mt-2 px-4 py-3"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-medium">Profile Image</label>
            <input
              type="file"
              name="profile_image"
              onChange={handleImageChange}
              accept="image/*"
              className="mt-2 px-4 py-3"
            />
            {imagePreview && (
              <div className="mt-4 text-center">
                <img src={imagePreview} alt="Image Preview" className="mx-auto h-24 w-24 rounded-full border-4 border-[color:var(--gold)] object-cover" />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-bold ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="muted-copy text-sm">
            Already have an account?{' '}
            <Link to={"/login"} className="text-link">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
