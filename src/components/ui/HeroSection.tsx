// components/HeroSection.tsx
import Image from "next/image";
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-blue-50 py-16">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center">
        {/* Left Side: Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-gray-800 md:text-5xl lg:text-6xl">
            Find Your Next Opportunity
          </h1>
          <p className="mt-4 text-lg text-gray-600 md:text-xl">
            Empowering people of all abilities to discover accessible jobs that fit their strengths.
          </p>
          <div className="mt-6 flex justify-center lg:justify-start">
            <input
              type="text"
              placeholder="Search for jobs..."
              className="w-full max-w-md px-4 py-2 text-lg border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search for jobs"
            />
            <button
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
          <div className="mt-8">
            <p className="text-gray-500">Looking for inclusive roles? Start here!</p>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
          <Image
            width={500}
            height={500}
            priority
            src="/images/Working3.jpg"
            alt="Illustration of job opportunities"
            className="w-full h-full object-cover rounded-lg shadow-lg max-w-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
