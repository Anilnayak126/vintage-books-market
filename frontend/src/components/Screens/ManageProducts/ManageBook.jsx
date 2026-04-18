import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteBook, fetchBookById, fetchBooks, updateBook } from '../../../redux/booksSlice';

const ManageBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookDetails, bookDetailsStatus } = useSelector((state) => state.books);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
  });

  useEffect(() => {
    dispatch(fetchBookById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (bookDetails) {
      setFormData({
        title: bookDetails.title,
        author: bookDetails.author,
      });
    }
  }, [bookDetails]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updateBook({ id, bookData: formData }));
    navigate('/account');
    dispatch(fetchBooks());
  };

  const handleDelete = () => {
    dispatch(deleteBook(id));
    navigate('/account');
    dispatch(fetchBooks());
  };

  if (bookDetailsStatus === 'loading') return <div>Loading...</div>;

  return (
    <div className="min-h-screen text-gray-200 p-8 flex justify-center items-center">
      <div className="w-full max-w-lg bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6 text-white">Manage Book</h1>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300"
              required
            />
          </div>

          {/* Author Input */}
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-300">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author's name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleUpdate}
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-300"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageBook;
