import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';  // Import Skeleton for loading state

// React.memo prevents unnecessary re-renders
const BookCard = React.memo(({ book, isLoading }) => {
  // If data is still loading, display skeleton loader
  if (isLoading) {
    return (
      <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden p-4">
        <Skeleton height={200} width="100%" />
        <div className="mt-4">
          <Skeleton height={30} width="80%" />
          <Skeleton height={20} width="60%" />
          <Skeleton height={15} width="90%" />
          <Skeleton height={25} width="50%" />
        </div>
      </div>
    );
  }

  // Format the date to display it properly
  const formattedDate = new Date(book.created_at).toLocaleDateString();

  // Once data is loaded, render the actual book details
  return (
    <div className="bg-gradient-to-b from-gray-700 to-gray-800 text-gray-200 shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105">
      <img
        src={`http://127.0.0.1:8000/manage_p${book.image}`}
        alt={book.title}
        loading="lazy"  // Lazy load images for performance
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold text-yellow-400">{book.title}</h2>
        <p className="text-gray-300">Author: <span className="font-semibold">{book.author}</span></p>
        <p className="text-lg font-bold text-green-400 mt-4">${book.price}</p>
        
        {/* Added Posted by section */}
        <div className="text-gray-400 text-sm mt-4">
          <span className="font-semibold text-yellow-500">Posted by:</span> {book.user.first_name} {book.user.last_name}
          <span className="ml-2 text-gray-500">on {formattedDate}</span>
        </div>
        
        <Link to={`/books/${book.id}`}>
          <button className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
});

export default BookCard;
