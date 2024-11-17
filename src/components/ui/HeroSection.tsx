// components/HeroSection.tsx
import Image from "next/image";
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section
      className="bg-blue-50 bg-cover bg-center py-16"
      style={{
        backgroundImage: "url('/images/working5.jpg')",
      }}
    >
      <div className="bg-blue-900 bg-opacity-50 py-16">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center">
          {/* Left Side: Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left text-white">
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl leading-tight">
              Empowering Abilities, Unlocking Potential
            </h1>
            <p className="mt-4 text-lg md:text-xl">
              Connecting individuals with disabilities to inclusive workplaces and opportunities that celebrate their strengths and talents.
            </p>
            <ul className="mt-6 text-left list-disc list-inside">
              <li>Accessible job search tailored to your needs and preferences.</li>
              <li>Guidance on creating professional resumes and portfolios.</li>
              <li>Workplace accommodation resources for seamless transitions.</li>
              <li>Training programs to enhance skills and confidence.</li>
            </ul>
            <div className="mt-8 flex justify-center lg:justify-start">
              <input
                type="text"
                placeholder="Search for accessible jobs..."
                className="w-full max-w-md px-4 py-2 text-lg border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search for accessible jobs"
              />
              <button
                className="bg-yellow-400 text-blue-900 font-semibold px-6 py-2 rounded-r-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Search
              </button>
            </div>
            <div className="mt-8 bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800">
                Why JobBoard for People with Disabilities?
              </h2>
              <p className="text-gray-600 mt-2">
                We believe that inclusion and diversity drive innovation. That&apos;s why we partner with organizations that are committed to building accessible and inclusive workplaces.
              </p>
            </div>
          </div>

          {/* Right Side: Image and Callouts */}
          <div className="lg:w-1/2 mt-10 lg:mt-0 flex flex-col items-center space-y-6">
            <Image
              width={500}
              height={500}
              priority
              src="/images/Working3.jpg"
              alt="Illustration of job opportunities"
              className="w-full h-full object-cover rounded-lg shadow-lg max-w-lg"
            />
            <div className="text-center space-y-4">
              <h2 className="text-xl font-semibold text-white">
                Your Journey Starts Here
              </h2>
              <p className="text-gray-200">
                Explore opportunities across industries, access training, and connect with like-minded professionals.
              </p>
              <div className="flex justify-center space-x-4">
                <div className="bg-green-100 text-green-600 px-4 py-2 rounded-lg">
                  <p>15k+ Job Listings</p>
                </div>
                <div className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-lg">
                  <p>3k+ Inclusive Employers</p>
                </div>
                <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg">
                  <p>10k+ Success Stories</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Section: Testimonials */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white text-center">
            Hear from Our Community
          </h2>
          <div className="mt-8 flex flex-col lg:flex-row justify-center gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
              <p className="text-gray-600">
                &quot;Thanks to JobBoard, I found a company that values my skills and provides accommodations that empower me to succeed.&quot;
              </p>
              <p className="text-blue-500 font-semibold mt-4">- Jane Doe</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
              <p className="text-gray-600">
                &quot;The training resources and support gave me the confidence to transition into a new career path.&quot;
              </p>
              <p className="text-blue-500 font-semibold mt-4">- John Smith</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
