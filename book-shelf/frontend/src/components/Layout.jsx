import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBook, FaBars, FaTimes } from "react-icons/fa";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-x-2">
            <FaBook className="text-3xl animate-pulse" />
            <span className="text-2xl font-bold tracking-tight">BookShelf</span>
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-x-6">
            <Link to="/" className="text-lg font-medium hover:text-indigo-200 transition-colors duration-300">
              Home
            </Link>
            <Link to="/about" className="text-lg font-medium hover:text-indigo-200 transition-colors duration-300">
              About Us
            </Link>
            <Link to="/contact" className="text-lg font-medium hover:text-indigo-200 transition-colors duration-300">
              Contact
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <button className="md:hidden text-2xl" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-indigo-600 px-4 py-2 flex flex-col gap-y-2">
            <Link to="/" className="text-lg font-medium hover:text-indigo-200 transition-colors duration-300" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/about" className="text-lg font-medium hover:text-indigo-200 transition-colors duration-300" onClick={toggleMenu}>
              About Us
            </Link>
            <Link to="/contact" className="text-lg font-medium hover:text-indigo-200 transition-colors duration-300" onClick={toggleMenu}>
              Contact
            </Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-y-4">
          <div className="flex items-center gap-x-2">
            <FaBook className="text-xl animate-pulse" />
            <span className="text-lg font-medium">BookShelf © {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-x-6">
            <Link to="/about" className="text-sm hover:text-indigo-300 transition-colors duration-300">
              About Us
            </Link>
            <Link to="/contact" className="text-sm hover:text-indigo-300 transition-colors duration-300">
              Contact
            </Link>
          </div>
          <div className="text-sm text-gray-400">
            Designed with ❤️ by the BookShelf Team
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;