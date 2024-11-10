import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice'; 

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!username || !password) {
      setError('Both fields are required!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      
      await dispatch(login({ username, password }));
      navigate('/home'); 
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        // Check if the error message exists in the response
        setError(err.response.data.message || 'Login failed. Please try again.');
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>

        {error && (
          <div className="text-red-500 text-center mb-4">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p>{error}</p>
                <button
                  onClick={() => setError('')}
                  className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-4 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-yellow-500 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
