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
    <div className="glass-page-center text-gray-200">
      <div className="glass-panel w-full max-w-lg p-6">
        <h1 className="section-title mb-6 text-center text-3xl">Sell Your Book</h1>
        {createStatus === 'failed' && (
          <p className="mb-4 text-[color:var(--rose)] animate__animated animate__shakeX">Error: {createError}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-lg font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              className="px-4 py-3"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-lg font-medium">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author's name"
              className="px-4 py-3"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-lg font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter book description"
              className="px-4 py-3"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-lg font-medium">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter book price"
              className="px-4 py-3"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-lg font-medium">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="px-4 py-3"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-bold"
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
