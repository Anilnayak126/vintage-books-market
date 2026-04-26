import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

    if (!username || !password) {
      setError('Both fields are required!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await dispatch(login({ username, password }));
      navigate('/');
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Login failed. Please try again.');
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-page-center">
      <div className="glass-panel w-full max-w-sm p-8 animate-fade-in-down">
        <h2 className="section-title mb-6 text-center text-3xl">Login</h2>

        {error && (
          <div className="mb-4 text-center text-[color:var(--rose)]">
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-fade-in-up">
              <div className="glass-panel max-w-sm p-6 text-white">
                <p>{error}</p>
                <button
                  onClick={() => setError('')}
                  className="danger-button mt-4 px-4 py-2 font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="mb-2 block text-lg font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-3"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-lg font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 font-bold ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="muted-copy text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-link">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
