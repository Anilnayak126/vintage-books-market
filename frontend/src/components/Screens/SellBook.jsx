// components/SellBook.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBook } from '../../redux/booksSlice';
import { useNavigate } from 'react-router-dom';

const SellBook = () => {
  const dispatch = useDispatch();
  const createStatus = useSelector((state) => state.books.createStatus);
  const createError = useSelector((state) => state.books.createError);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookData = new FormData();
    bookData.append('title', formData.title);
    bookData.append('author', formData.author);
    bookData.append('description', formData.description);
    bookData.append('price', formData.price);
    bookData.append('image', formData.image);

    dispatch(createBook(bookData));
    navigate('/browse');
  };

  return (
    <div className="min-h-screen text-gray-200 p-8 flex justify-center items-center">
      <div className="w-full max-w-lg bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6 text-white">Sell Your Book</h1>
        {createStatus === 'failed' && (
          <p className="text-red-500 mb-4 animate__animated animate__shakeX">Error: {createError}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-300">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-300">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-300">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
            disabled={createStatus === 'loading'}
          >
            {createStatus === 'loading' ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellBook;
