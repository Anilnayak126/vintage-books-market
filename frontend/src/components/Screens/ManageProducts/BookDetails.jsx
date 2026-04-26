import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookById } from '../../../redux/booksSlice';
import Skeleton from 'react-loading-skeleton';
import { FaWhatsapp, FaEnvelope, FaPhone, FaCartPlus, FaArrowLeft, FaClock, FaHeart } from 'react-icons/fa';
import { addToCart } from '../../../redux/cartSlice';
import { addToWishlist } from '../../../redux/wishlistSlice';  // Import wishlist action
import { mediaUrl } from '../../../config/api';

const BookDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookDetails = useSelector((state) => state.books.bookDetails);
  const bookDetailsStatus = useSelector((state) => state.books.bookDetailsStatus);
  const bookDetailsError = useSelector((state) => state.books.bookDetailsError);
  const isAuthenticated = Boolean(localStorage.getItem('accessToken'));
  const loggedInUser = useSelector((state) => state.auth.user); // Assuming user info is stored in redux after login

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

      if (loggedInUser?.id === bookDetails.user?.id) {
        alert(`Hello ${loggedInUser.first_name} You cannot add your own book to the cart!`);
        return;
      }
      dispatch(addToCart({ book: bookDetails.id, quantity }));
      navigate('/cart');
    }
  };

  const handleAddToWishlist = () => {
    if (loggedInUser?.id === bookDetails.user?.id) {
      alert(`Hello ${loggedInUser.first_name} You cannot add your own book to the WishList!`);
      return;
    }
    else{
      if (bookDetails){

        dispatch(addToWishlist(bookDetails.id));
      }

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
    <div className="glass-page text-gray-200">
      <div className="page-container glass-panel space-y-8 p-6">

        {/* Back Button */}
        <button
          onClick={() => navigate('/browse')}
          className="secondary-button px-4 py-2 font-bold"
        >
          <FaArrowLeft className="mr-2" /> Back to Books
        </button>

        {/* Book Details Section */}
        {bookDetailsStatus === 'loading' ? (
          <Skeleton height={300} width="100%" />
        ) : bookDetailsStatus === 'failed' ? (
          <div className="status-panel text-center text-[color:var(--rose)]">Error: {bookDetailsError}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Book Image */}
            <img
              src={mediaUrl('/manage_p', bookDetails?.image)}
              alt={bookDetails?.title || 'Book Image'}
              className="h-96 w-full rounded-lg object-cover shadow-lg"
              onError={(e) => { e.target.src = '/fallback-image.jpg'; }}
            />

            {/* Book Info */}
            <div className="space-y-4">
              <span className="eyebrow">Book details</span>
              <h1 className="section-title text-4xl">{bookDetails?.title || 'Title not available'}</h1>
              <p className="text-lg muted-copy"><strong className="text-white">Author:</strong> {bookDetails?.author || 'Unknown'}</p>
              <p className="text-lg muted-copy"><strong className="text-white">Description:</strong> {bookDetails?.description || 'No description available'}</p>

              <div className="flex items-center space-x-4">
                <p className="price-chip text-2xl"><strong>Price:</strong> ${bookDetails?.price || 'N/A'}</p>
              </div>
              <p className="muted-copy mt-2 flex items-center text-sm"><FaClock className="mr-2" />Posted: {timeAgo(bookDetails?.created_at)}</p>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mt-6">
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className="secondary-button px-3 py-1"
                >
                  -
                </button>
                <span className="text-xl">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="secondary-button px-3 py-1"
                >
                  +
                </button>
              </div>

              {/* Add to Cart and Wishlist Buttons */}
              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={handleAddToCart}
                  className="success-button w-full px-4 py-3 text-xl font-bold"
                >
                  <FaCartPlus className="mr-2" /> Add to Cart
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className="danger-button w-full px-4 py-3 text-xl font-bold"
                >
                  <FaHeart className="mr-2" /> Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Seller Information */}
        {bookDetails && bookDetails.user && (
          <div className="glass-card mt-8 p-6">
            <h2 className="mb-4 text-2xl font-bold text-[color:var(--gold)]">Seller Information</h2>
            <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0">
              <img
                src={mediaUrl('/userDetails', bookDetails.user.user_profile?.profile_image)}
                alt="User Profile"
                className="h-24 w-24 rounded-full border-2 border-[color:var(--gold)] object-cover shadow-md"
                onError={(e) => { e.target.src = '/fallback-profile.jpg'; }}
              />
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  <strong>Name:</strong> {bookDetails.user?.first_name || ''} {bookDetails.user?.last_name || ''}
                </p>
                <p className="text-lg font-medium flex items-center space-x-2">
                  <FaEnvelope className="text-[color:var(--gold)]" />
                  <a href={`mailto:${bookDetails.user?.email || ''}`} className="text-link">
                    {bookDetails.user?.email || 'Not available'}
                  </a>
                </p>
                <p className="text-lg font-medium flex items-center space-x-2">
                  <FaWhatsapp className="text-[color:var(--green)]" />
                  <a
                    href={`https://wa.me/${bookDetails.user.user_profile?.phone_number || ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                  >
                    WhatsApp
                  </a>
                </p>
                <p className="text-lg font-medium flex items-center space-x-2">
                  <FaPhone className="text-[color:var(--teal)]" /> {bookDetails.user.user_profile?.phone_number || 'Not available'}
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
