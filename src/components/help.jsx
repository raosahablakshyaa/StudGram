import React from 'react';

const Help = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Your response has been recorded!');
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-100 px-4 py-10">
      {}
      <div className="text-center text-2xl sm:text-3xl font-bold text-sky-600 mb-8 sm:mb-10 drop-shadow-sm">
        <h1>Contact Us</h1>
      </div>

      {}
      <div className="w-full max-w-4xl mx-auto bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-2xl px-6 py-8 sm:px-10 sm:py-10 border border-gray-200">
        <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-gray-700">
          Send Us a Message
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          {}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white shadow-sm text-sm sm:text-base"
              placeholder="Enter your name"
              required
            />
          </div>

          {}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white shadow-sm text-sm sm:text-base"
              placeholder="Enter your email"
              required
            />
          </div>

          {}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white shadow-sm text-sm sm:text-base"
              placeholder="Write your message"
              required
            />
          </div>

          {}
          <div className="text-center">
            <button
              type="submit"
              className="bg-sky-400 hover:bg-sky-500 text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-300 text-sm sm:text-base"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Help;
