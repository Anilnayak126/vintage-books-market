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
    <div className="glass-page">
      <div className="page-container">
        <div className="mb-8">
          <span className="eyebrow mb-3">Marketplace</span>
          <h1 className="section-title text-3xl sm:text-4xl">Browse Books</h1>
          <p className="muted-copy mt-3 max-w-2xl">
            Search rare, classic, and reader-loved books from sellers who care about the details.
          </p>
        </div>

        {/* Filters Section */}
        <div className="glass-panel mb-8 flex flex-col items-stretch gap-4 p-5 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search by title, author, or description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 sm:flex-1"
          />
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="px-4 py-3 sm:w-32"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="px-4 py-3 sm:w-32"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 font-bold"
          >
            Search
          </button>
        </div>

        {isLoading && <p className="status-panel text-center muted-copy">Loading books...</p>}
        {error && <p className="status-panel text-center text-[color:var(--rose)]">Error: {error}</p>}

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books && books.length > 0 ? (
            books.map((book) => (
              <BookCard key={book.id} book={book} isLoading={isLoading} />
            ))
          ) : (
            <p className="status-panel text-center muted-copy sm:col-span-2 lg:col-span-3">No books found</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page}
                disabled={currentPage === page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={`px-4 py-2 font-bold ${
                  currentPage === page + 1
                    ? "success-button"
                    : "secondary-button"
                }`}
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
