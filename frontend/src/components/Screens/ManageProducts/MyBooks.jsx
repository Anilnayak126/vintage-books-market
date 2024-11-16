import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBooks } from "../../../redux/booksSlice";
import { useNavigate } from "react-router-dom";

const MyBooks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userBooks, isLoading, error, totalPages, currentPage } = useSelector(
    (state) => state.books
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUserBooks({ page }));
  }, [dispatch, page]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleManageListedBooks = (id) => {
    navigate(`/manage_books/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between text-gray-200 p-6">
      <div>
        <h1 className="text-3xl font-bold text-center mb-6 text-white">My Listed Books</h1>
        <div className="flex flex-col space-y-4">
          {userBooks.length > 0 ? (
            userBooks.map((book, index) => (
              <div
                key={book.id}
                className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
              >
                <img
                  src={`http://127.0.0.1:8000/manage_p${book.image}`}
                  alt={book.title}
                  className="w-24 h-36 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h2 className="text-lg font-semibold text-white">{book.title}</h2>
                    <span className="text-gray-400 font-medium">#{index + 1}</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Created At: {new Date(book.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleManageListedBooks(book.id)}
                  className="py-1 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
                >
                  Manage
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400">No books found.</div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-1">
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
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300"
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

export default MyBooks;
