import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../redux/booksSlice";
import BookCard from "./ManageProducts/BookCard";

const BrowseBooks = () => {
  const dispatch = useDispatch();
  const { books, isLoading, error, currentPage, totalPages, totalCount } = useSelector(
    (state) => state.books
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    dispatch(fetchBooks({ page: 1 }));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(
      fetchBooks({
        page: 1,
        search: searchTerm,
        minPrice: minPrice || null,
        maxPrice: maxPrice || null,
      })
    );
  };

  const handlePageChange = (page) => {
    dispatch(
      fetchBooks({
        page,
        search: searchTerm,
        minPrice: minPrice || null,
        maxPrice: maxPrice || null,
      })
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Browse Books</h1>

        {/* Filters Section */}
        <div className="p-6 shadow-lg rounded-lg flex flex-col sm:flex-row items-center gap-4 mb-6 bg-gray-800">
          <input
            type="text"
            placeholder="Search by title, author, or description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 flex-1 text-black"
          />
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-32 text-black"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-32 text-black"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Search
          </button>
        </div>

        {isLoading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-600">Error: {error}</p>}

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books && books.length > 0 ? (
            books.map((book) => (
              <BookCard key={book.id} book={book} isLoading={isLoading} />
            ))
          ) : (
            <p className="text-center text-gray-600">No books found</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page}
                disabled={currentPage === page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={`px-4 py-2 rounded-lg text-white ${
                  currentPage === page + 1
                    ? "bg-blue-600"
                    : "bg-gray-600 hover:bg-blue-600"
                } transition duration-300`}
              >
                {page + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseBooks;
