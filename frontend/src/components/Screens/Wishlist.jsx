import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlistItems, removeFromWishlist } from '../../redux/wishlistSlice';
import { Link } from 'react-router-dom';

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
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between text-gray-200 p-4">
      <div>
        <h1 className="text-2xl font-semibold text-center mb-7 text-yellow-400">My Wishlist</h1>
        <div className="flex flex-col space-y-3">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-800 p-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
              >
                <img
                  src={`http://127.0.0.1:8000/manage_p${item.bookdetails.image}`}
                  alt={item.bookdetails.title}
                  className="w-20 h-30 object-cover rounded-lg mr-3"
                />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h2 className="text-lg font-semibold text-white">{item.bookdetails.title}</h2>
                    <p className="text-gray-300 text-xs">₹{item.bookdetails.price}</p>
                  </div>
                  <p className="text-gray-300 text-xs">
                    Added At: {new Date(item.added_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(removeFromWishlist(item.bookdetails.id))}
                  className="py-1 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-300"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>
              Your wishlist is empty.{' '}
              <Link to="/browse" className="text-yellow-500">
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
          className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
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
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-300'
            } hover:bg-blue-600 focus:outline-none transition-all duration-300`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(page + 1)}
          className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyWishlist;
