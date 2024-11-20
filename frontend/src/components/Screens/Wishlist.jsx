import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlistItems, removeFromWishlist } from "../../redux/wishlistSlice";
import { Link } from "react-router-dom";



const MyWishlist = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlistItems());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleRemoveFromWishlist = (bookId) => {
    dispatch(removeFromWishlist(bookId));
  };

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
                  onClick={() => handleRemoveFromWishlist(item.bookdetails.id)} 
                  className="py-1 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-300"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>Your wishlist is empty. <Link to="/browse" className="text-yellow-500">Browse books</Link>.</p>

          )}
        </div>
      </div>
    </div>
  );
};

export default MyWishlist;
