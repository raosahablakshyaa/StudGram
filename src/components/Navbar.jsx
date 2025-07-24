import React, { useState } from 'react'

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        };
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <nav
      className={`fixed w-full top-0 left-0 z-50 backdrop-blur-md flex justify-between items-center px-6 py-4 border-b transition-all duration-300 ${
        isDarkMode
          ? 'bg-gray-800/80 border-gray-700/50 shadow-lg shadow-purple-500/10'
          : 'bg-white/80 border-gray-200/50 shadow-lg shadow-sky-500/10'
      }`}
    >
      {/* Logo */}
      <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-sky-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
        Studgram
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4 text-sm md:text-base">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12 ${
            isDarkMode
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-gray-900'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white'
          }`}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <NavItem href="/home" isActive>
          Home
        </NavItem>
        <NavItem href="/messages">Messages</NavItem>
        <NavItem href="/profile">Profile</NavItem>
        <NavItem
          href="/help"
          className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
            isDarkMode
              ? 'bg-gradient-to-r from-sky-600 to-purple-600 hover:from-sky-500 hover:to-purple-500 text-white shadow-lg'
              : 'bg-gradient-to-r from-sky-100 to-purple-100 hover:from-sky-200 hover:to-purple-200 text-sky-700 shadow-md'
          }`}
        >
          Help
        </NavItem>
        <NavItem
          href="/login"
          className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
            isDarkMode
              ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white shadow-lg'
              : 'bg-gradient-to-r from-red-100 to-pink-100 hover:from-red-200 hover:to-pink-200 text-red-700 shadow-md'
          }`}
        >
          Logout
        </NavItem>
      </div>

      {/* Hamburger Icon for Mobile */}
      <button
        className="md:hidden text-2xl p-2 focus:outline-none transition-transform"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? '✖️' : '☰'}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`absolute top-full left-0 w-full px-6 py-4 border-t mt-2 shadow-md backdrop-blur-md ${
            isDarkMode
              ? 'bg-gray-800/90 border-gray-700 text-white'
              : 'bg-white/90 border-gray-200 text-black'
          } flex flex-col space-y-3 md:hidden`}
        >
          <button
            onClick={toggleDarkMode}
            className={`p-2 w-fit rounded-full self-start transition-all duration-300 transform hover:scale-110 hover:rotate-12 ${
              isDarkMode
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-gray-900'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white'
            }`}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <NavItem href="/home" isActive>
            Home
          </NavItem>
          <NavItem href="/messages">Messages</NavItem>
          <NavItem href="/profile">Profile</NavItem>
          <NavItem href="/help">Help</NavItem>
          <NavItem href="/login">Logout</NavItem>
        </div>
      )}
    </nav>
    </div>
  )
}

export default Navbar
