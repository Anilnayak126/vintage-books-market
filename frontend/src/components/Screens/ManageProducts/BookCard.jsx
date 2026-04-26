import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';  // Import Skeleton for loading state
import { mediaUrl } from '../../../config/api';

// React.memo prevents unnecessary re-renders
const BookCard = React.memo(({ book, isLoading }) => {
  // If data is still loading, display skeleton loader
  if (isLoading) {
    return (
      <div className="glass-card overflow-hidden p-4">
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
    <article className="glass-card overflow-hidden text-gray-200">
      <img
        src={mediaUrl('/manage_p', book.image)}
        alt={book.title}
        loading="lazy"  // Lazy load images for performance
        className="h-56 w-full object-cover"
      />
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-white">{book.title}</h2>
        <p className="muted-copy">Author: <span className="font-semibold text-white">{book.author}</span></p>
        <p className="price-chip mt-4">${book.price}</p>
        
        {/* Added Posted by section */}
        <div className="muted-copy mt-4 text-sm">
          <span className="font-semibold text-[color:var(--gold)]">Posted by:</span> {book.user.first_name} {book.user.last_name}
          <span className="ml-2 text-white/50">on {formattedDate}</span>
        </div>
        
        <Link to={`/books/${book.id}`} className="block no-underline">
          <button className="mt-4 w-full px-4 py-3 font-bold">
            View Details
          </button>
        </Link>
      </div>
    </article>
  );
});

export default BookCard;
