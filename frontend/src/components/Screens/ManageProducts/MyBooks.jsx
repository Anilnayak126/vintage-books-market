import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBooks } from '../../../redux/booksSlice';
import { useNavigate } from 'react-router-dom';

const MyBooks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userBooks, status, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchUserBooks());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const handleManageListedBooks = (id) => {
    navigate(`/manage_books/${id}`);
  };

  return (
    <div className="min-h-screen  text-gray-200 p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">My Listed Books</h1>
      <div className="flex flex-col space-y-6">
        {userBooks.map((book, index) => (
          <div key={book.id} className="flex items-center justify-between bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
            <img
              src={`http://127.0.0.1:8000/manage_p${book.image}`}
              alt={book.title}
              className="w-32 h-48 object-cover rounded-lg mr-6"
            />
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <h2 className="text-xl font-semibold text-white">{book.title}</h2>
                <span className="text-gray-400 font-medium">#{index + 1}</span> {/* Serial No */}
              </div>
              <p className="text-gray-300">Author: {book.author}</p>
              <p className="text-gray-300">Price: ${book.price}</p>
              <p className="text-gray-400 text-sm mt-2">{book.description}</p>
            </div>
            <button
              onClick={() => handleManageListedBooks(book.id)}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
            >
              Manage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooks;
