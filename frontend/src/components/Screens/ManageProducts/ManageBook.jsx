import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchBookById, updateBook, deleteBook } from '../slices/booksSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteBook, fetchBookById, fetchBooks, updateBook } from '../../../redux/booksSlice';

const ManageBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookDetails, bookDetailsStatus } = useSelector((state) => state.books);
  const [formData, setFormData] = useState({ title: '', author: '' });

  useEffect(() => {
    dispatch(fetchBookById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (bookDetails) {
      setFormData({ title: bookDetails.title, author: bookDetails.author });
    }
  }, [bookDetails]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updateBook({ id, bookData: formData }));
    navigate('/account');
    dispatch(fetchBooks())
  };

  const handleDelete = () => {
    dispatch(deleteBook(id));
    navigate('/account');
    dispatch(fetchBooks())
  };

  if (bookDetailsStatus === 'loading') return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Book</h2>
      <div className="mb-4">
        <label className="block text-sm font-semibold">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded-md"
        />
      </div>
      <div className="flex space-x-4">
        <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-md">Update</button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
      </div>
    </div>
  );
};

export default ManageBook;
