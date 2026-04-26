import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlistItems, removeFromWishlist } from '../../redux/wishlistSlice';
import { Link } from 'react-router-dom';
import { mediaUrl } from '../../config/api';

const MyWishlist = () => {
  const dispatch = useDispatch();
  const { items, status, error, totalPages, currentPage, next, previous } = useSelector(
    (state) => state.wishlist
  );

  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    dispatch(fetchWishlistItems({ page }));
  }, [dispatch, page]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage); 
    }
  };

  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div className="status-panel text-[color:var(--rose)]">Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col justify-between p-2 text-gray-200 sm:p-4">
      <div>
        <h1 className="mb-7 text-center text-2xl font-bold text-[color:var(--gold)]">My Wishlist</h1>
        <div className="flex flex-col space-y-3">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="glass-list-item flex flex-col gap-3 p-3 transition duration-300 ease-in-out sm:flex-row sm:items-center sm:justify-between"
              >
                <img
                  src={mediaUrl('/manage_p', item.bookdetails.image)}
                  alt={item.bookdetails.title}
                  className="h-24 w-20 object-cover sm:mr-3"
                />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h2 className="text-lg font-semibold text-white">{item.bookdetails.title}</h2>
                    <p className="price-chip text-xs">${item.bookdetails.price}</p>
                  </div>
                  <p className="muted-copy text-xs">
                    Added At: {new Date(item.added_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(removeFromWishlist(item.bookdetails.id))}
                  className="danger-button px-3 py-2 text-sm font-bold"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="status-panel muted-copy">
              Your wishlist is empty.{' '}
              <Link to="/browse" className="text-link">
                Browse books
              </Link>
              .
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center mb-10 space-x-1">
        <button
          onClick={() => handlePageChange(page - 1)}
          className="secondary-button px-3 py-1"
          disabled={page === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded-lg text-sm ${
              page === index + 1
                ? 'success-button'
                : 'secondary-button'
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(page + 1)}
          className="secondary-button px-3 py-1"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyWishlist;
