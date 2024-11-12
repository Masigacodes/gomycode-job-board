'use client';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-500">
          <Link href="/">
            JobBoard
          </Link>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/jobs" className="text-gray-700 hover:text-blue-500">
            Jobs
          </Link>
          <Link href="/companies" className="text-gray-700 hover:text-blue-500">
            Companies
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-500">
            About Us
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-500">
            Contact
          </Link>
        </div>
        
        {/* Authentication Buttons */}
        <div className="space-x-4">
          <Link href="/login">
            <button className="px-4 py-2 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
