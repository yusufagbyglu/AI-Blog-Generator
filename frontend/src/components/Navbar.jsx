import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">AI Blog Generator</Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link>
          <Link to="/generator" className="text-gray-600 hover:text-gray-800">Create</Link>
          <Link to="/articles" className="text-gray-600 hover:text-gray-800">My Articles</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;