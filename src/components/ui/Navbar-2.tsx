'use client';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-white tracking-wide">
          <Link href="/">
            JobBoard
          </Link>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {["Jobs", "Companies", "About Us", "Contact"].map((item, index) => (
            <Link 
              key={index} 
              href={`/${item.split(" ")[0].toLowerCase().replace(" ", "")}`}
              className="text-white font-medium hover:text-yellow-300 transition duration-200"
            >
              {item}
            </Link>
          ))}
        </div>
        
        {/* Authentication Buttons */}
        <div className="space-x-4">
          <Link href="/login">
            <button className="px-4 py-2 text-blue-500 bg-white font-semibold border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 bg-yellow-400 text-blue-900 font-semibold rounded-md hover:bg-yellow-500 hover:text-white transition">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
