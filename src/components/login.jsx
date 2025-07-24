import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'anurag@gmail.com' && password === 'anuragpandey@123') {
      alert('Logged in successfully');
      navigate('/home');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-100 flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-2xl px-6 sm:px-10 py-10 w-full max-w-sm sm:max-w-md border border-gray-200 transition-all">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-sky-600 mb-6 sm:mb-8 drop-shadow-sm">
          Welcome Back to <span className="text-purple-500">ADFLUENCE</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
          {}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email</label>
            <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-sky-300">
              <FaEnvelope className="text-sky-400 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                required
                className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-400 text-sm"
              />
            </div>
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Password</label>
            <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-sky-300">
              <FaLock className="text-sky-400 mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
                required
                className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-400 text-sm"
              />
            </div>
          </div>

          {}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center text-xs sm:text-sm text-gray-600 gap-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox text-sky-500" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-sky-500 font-medium hover:underline text-right">
              Forgot password?
            </a>
          </div>

          {}
          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded-full shadow-md transition-all text-sm sm:text-base"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          Don't have an account?{' '}
          <a href="#" className="text-sky-500 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
