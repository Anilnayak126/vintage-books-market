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

  if (bookDetailsStatus === 'loading') return <div className="glass-page-center muted-copy">Loading...</div>;

  return (
    <div className="glass-page-center text-gray-200">
      <div className="glass-panel w-full max-w-lg p-6">
        <h1 className="section-title mb-6 text-center text-3xl">Manage Book</h1>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="mb-2 block text-lg font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              className="px-4 py-3"
              required
            />
          </div>

          {/* Author Input */}
          <div>
            <label className="mb-2 block text-lg font-medium">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author's name"
              className="px-4 py-3"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleUpdate}
              className="w-full py-3 font-bold"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="danger-button w-full py-3 font-bold"
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
