// src/pages/Cart.js
// import React from 'react';

// const Cart = () => {
//   return <div className="p-8">Your shopping cart.</div>;
// };

// export default Cart;

// Register.js

import React, { useState } from 'react';
import api from '../../api';

const Cart = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone_number: '',
    address: '',
    profile_image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', formData.username);
    data.append('password', formData.password);
    data.append('email', formData.email);
    data.append('user_profile.phone_number', formData.phone_number);
    data.append('user_profile.address', formData.address);
    if (formData.profile_image) {
      data.append('user_profile.profile_image', formData.profile_image);
    }

    try {
      await api.post('userDetails/register/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('User registered successfully!');
    } catch (error) {
      console.error('Registration failed:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" onChange={handleChange} placeholder="Username" required />
      <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
      <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
      <input type="text" name="phone_number" onChange={handleChange} placeholder="Phone Number" />
      <textarea name="address" onChange={handleChange} placeholder="Address"></textarea>
      <input type="file" name="profile_image" onChange={handleFileChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Cart;
