import Link from 'next/link';
import { FC } from 'react';

const Navbar: FC = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <span className="text-2xl font-semibold text-blue-600 cursor-pointer">Job Board</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/">
            <span className="text-gray-800 hover:text-blue-600 cursor-pointer">Home</span>
          </Link>
          <Link href="/about">
            <span className="text-gray-800 hover:text-blue-600 cursor-pointer">About</span>
          </Link>
          <Link href="/training">
            <span className="text-gray-800 hover:text-blue-600 cursor-pointer">Training</span>
          </Link>
          <Link href="/solutions">
            <span className="text-gray-800 hover:text-blue-600 cursor-pointer">Solutions</span>
          </Link>
          <Link href="/resources">
            <span className="text-gray-800 hover:text-blue-600 cursor-pointer">Resources</span>
          </Link>
          <Link href="/community">
            <span className="text-gray-800 hover:text-blue-600 cursor-pointer">Community</span>
          </Link>
          <Link href="/contact">
            <span className="text-gray-800 hover:text-blue-600 cursor-pointer">Contact</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
