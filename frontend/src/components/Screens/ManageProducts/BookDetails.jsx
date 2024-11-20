import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookById } from '../../../redux/booksSlice';
import Skeleton from 'react-loading-skeleton';
import { FaWhatsapp, FaEnvelope, FaPhone, FaCartPlus, FaArrowLeft, FaClock, FaHeart } from 'react-icons/fa';
import { addToCart } from '../../../redux/cartSlice';
import { addToWishlist } from '../../../redux/wishlistSlice';  // Import wishlist action

const BookDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookDetails = useSelector((state) => state.books.bookDetails);
  const bookDetailsStatus = useSelector((state) => state.books.bookDetailsStatus);
  const bookDetailsError = useSelector((state) => state.books.bookDetailsError);
  const isAuthenticated = Boolean(localStorage.getItem('accessToken'));

  const [redirected, setRedirected] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!isAuthenticated && !redirected) {
      navigate('/login');
      setRedirected(true);
    }
  }, [isAuthenticated, navigate, redirected]);

  useEffect(() => {
    if (id && isAuthenticated) {
      dispatch(fetchBookById(id));
    }
  }, [dispatch, id, isAuthenticated]);

  const handleAddToCart = () => {
    if (bookDetails) {
      dispatch(addToCart({ book: bookDetails.id, quantity }));
      navigate('/cart');
    }
  };

  const handleAddToWishlist = () => {
    if (bookDetails) {
      dispatch(addToWishlist(bookDetails.id)); // Dispatch to wishlist
    }
  };

  const timeAgo = (dateString) => {
    const now = new Date();
    const createdAt = new Date(dateString);
    if (isNaN(createdAt)) return 'Invalid date';

    const seconds = Math.floor((now - createdAt) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) return `${interval} years ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    return `${seconds} seconds ago`;
  };

  return (
    <div className="min-h-screen py-8 text-gray-200">
      <div className="max-w-6xl mx-auto p-6 bg-gradient-to-b from-gray-800 to-gray-700 shadow-xl rounded-lg space-y-8">

        {/* Back Button */}
        <button
          onClick={() => navigate('/browse')}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          <FaArrowLeft className="mr-2" /> Back to Books
        </button>

        {/* Book Details Section */}
        {bookDetailsStatus === 'loading' ? (
          <Skeleton height={300} width="100%" />
        ) : bookDetailsStatus === 'failed' ? (
          <div className="text-center text-red-500">Error: {bookDetailsError}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Book Image */}
            <img
              src={`http://127.0.0.1:8000/manage_p${bookDetails?.image || ''}`}
              alt={bookDetails?.title || 'Book Image'}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
              onError={(e) => { e.target.src = '/fallback-image.jpg'; }}
            />

            {/* Book Info */}
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold text-yellow-400">{bookDetails?.title || 'Title not available'}</h1>
              <p className="text-lg text-gray-300"><strong>Author:</strong> {bookDetails?.author || 'Unknown'}</p>
              <p className="text-lg text-gray-300"><strong>Description:</strong> {bookDetails?.description || 'No description available'}</p>

              <div className="flex items-center space-x-4">
                <p className="text-2xl font-semibold text-green-500"><strong>Price:</strong> ${bookDetails?.price || 'N/A'}</p>
              </div>
              <p className="flex items-center text-sm text-gray-400 mt-2"><FaClock className="mr-2" />Posted: {timeAgo(bookDetails?.created_at)}</p>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mt-6">
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  -
                </button>
                <span className="text-xl">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  +
                </button>
              </div>

              {/* Add to Cart and Wishlist Buttons */}
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center w-full justify-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 text-xl"
                >
                  <FaCartPlus className="mr-2" /> Add to Cart
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className="flex items-center w-full justify-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-300 text-xl"
                >
                  <FaHeart className="mr-2" /> Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Seller Information */}
        {bookDetails && bookDetails.user && (
          <div className="p-6 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Seller Information</h2>
            <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0">
              <img
                src={`http://127.0.0.1:8000/userDetails${bookDetails.user.user_profile?.profile_image || ''}`}
                alt="User Profile"
                className="w-24 h-24 rounded-full border-2 border-yellow-400 shadow-md"
                onError={(e) => { e.target.src = '/fallback-profile.jpg'; }}
              />
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  <strong>Name:</strong> {bookDetails.user?.first_name || ''} {bookDetails.user?.last_name || ''}
                </p>
                <p className="text-lg font-medium flex items-center space-x-2">
                  <FaEnvelope className="text-yellow-400" />
                  <a href={`mailto:${bookDetails.user?.email || ''}`} className="text-blue-400 hover:text-blue-600">
                    {bookDetails.user?.email || 'Not available'}
                  </a>
                </p>
                <p className="text-lg font-medium flex items-center space-x-2">
                  <FaWhatsapp className="text-green-500" />
                  <a
                    href={`https://wa.me/${bookDetails.user.user_profile?.phone_number || ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-600"
                  >
                    WhatsApp
                  </a>
                </p>
                <p className="text-lg font-medium flex items-center space-x-2">
                  <FaPhone className="text-blue-400" /> {bookDetails.user.user_profile?.phone_number || 'Not available'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
