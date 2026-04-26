import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBooks } from "../../../redux/booksSlice";
import { useNavigate } from "react-router-dom";
import { mediaUrl } from "../../../config/api";

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
    <div className="flex min-h-screen flex-col justify-between p-2 text-gray-200 sm:p-4">
      <div>
        <h1 className="mb-7 text-center text-2xl font-bold text-[color:var(--gold)]">My Listed Books</h1>
        <div className="flex flex-col space-y-3">
          {userBooks.length > 0 ? (
            userBooks.map((book) => (
              <div
                key={book.id}
                className="glass-list-item flex flex-col gap-3 p-3 transition duration-300 ease-in-out sm:flex-row sm:items-center sm:justify-between"
              >
                <img
                  src={mediaUrl('/manage_p', book.image)}
                  alt={book.title}
                  className="h-24 w-20 object-cover sm:mr-3"
                />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h2 className="text-lg font-semibold text-white">{book.title}</h2>
                  </div>
                  <p className="muted-copy text-xs">
                    Created At: {new Date(book.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleManageListedBooks(book.id)}
                  className="px-3 py-2 text-sm font-bold"
                >
                  Manage
                </button>
              </div>
            ))
          ) : (
            <div className="status-panel text-center muted-copy">No books found.</div>
          )}
        </div>
      </div>

      {/* Pagination */}
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
                ? "success-button"
                : "secondary-button"
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

export default MyBooks;
