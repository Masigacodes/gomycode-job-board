"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  disabilityFriendly: boolean;
}

function JobsForDisabledPeople() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    disabilityFriendly: '',
  });

  useEffect(() => {
    const fetchedJobs = [
      { _id: '1', title: 'Software Engineer', company: 'Safaricom', location: 'Nairobi', jobType: 'Full-time', disabilityFriendly: true },
      { _id: '2', title: 'Data Analyst', company: 'KCB Bank', location: 'Eldoret', jobType: 'Part-time', disabilityFriendly: true },
      { _id: '3', title: 'Customer Support Specialist', company: 'Jumia Kenya', location: 'Kisumu', jobType: 'Full-time', disabilityFriendly: true },
      { _id: '4', title: 'Content Writer', company: 'Kenya Airways', location: 'Nairobi', jobType: 'Part-time', disabilityFriendly: true },
      { _id: '5', title: 'Graphic Designer', company: 'M-KOPA', location: 'Nakuru', jobType: 'Contract', disabilityFriendly: true },
      { _id: '6', title: 'Virtual Assistant', company: 'Andela Kenya', location: 'Isiolo', jobType: 'Full-time', disabilityFriendly: true },
      { _id: '7', title: 'HR Coordinator', company: 'Bamburi Cement', location: 'Mombasa', jobType: 'Full-time', disabilityFriendly: true },
      { _id: '8', title: 'Web Developer', company: 'Twiga Foods', location: 'Kakamega', jobType: 'Full-time', disabilityFriendly: true },
      { _id: '9', title: 'IT Support Technician', company: 'Techno Brain Kenya', location: 'Nakuru', jobType: 'Full-time', disabilityFriendly: true },
      { _id: '10', title: 'Online Tutor', company: 'Lami Insurance', location: 'Remote', jobType: 'Part-time', disabilityFriendly: true },
      { _id: '11', title: 'UX/UI Designer', company: 'Remote Co.', location: 'Remote', jobType: 'Full-time', disabilityFriendly: true },
      { _id: '12', title: 'Project Manager', company: 'Global Solutions', location: 'Remote', jobType: 'Contract', disabilityFriendly: true },
    ];
    setJobs(fetchedJobs);
    setLoading(false);
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.location === '' || job.location === filters.location) &&
      (filters.jobType === '' || job.jobType === filters.jobType) &&
      (filters.disabilityFriendly === '' ||
        job.disabilityFriendly === (filters.disabilityFriendly === 'true'))
    );
  });

  if (loading) {
    return <p className="text-center text-lg font-semibold animate-pulse">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 font-semibold">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/images/working6.jpg')" }}>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 text-white">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gradient bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Jobs for Disabled People
        </h1>

        {/* Filters */}
        <form className="flex flex-wrap gap-6 justify-center items-center mb-8 bg-black bg-opacity-60 p-6 rounded-lg shadow-lg">
          <label className="flex flex-col text-lg font-medium text-white">
            Location:
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="mt-1 p-3 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">All</option>
              <option value="Nairobi">Nairobi</option>
              <option value="Mombasa">Mombasa</option>
              <option value="Nairobi">Isiolo</option>
              <option value="Nairobi">Nakuru</option>
              <option value="Nairobi">Eldoret</option>
              <option value="Nairobi">Kisumu</option>
              <option value="Nairobi">Kakamega</option>
              <option value="Remote">Remote</option>
            </select>
          </label>

          <label className="flex flex-col text-lg font-medium text-white">
            Job Type:
            <select
              name="jobType"
              value={filters.jobType}
              onChange={handleFilterChange}
              className="mt-1 p-3 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">All</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </label>

          <label className="flex flex-col text-lg font-medium text-white">
            Disability Friendly:
            <select
              name="disabilityFriendly"
              value={filters.disabilityFriendly}
              onChange={handleFilterChange}
              className="mt-1 p-3 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">All</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
        </form>

        {/* Job List */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.map((job) => (
            <li
              key={job._id}
              className="p-6 border border-transparent rounded-lg shadow-lg hover:shadow-2xl transition-shadow bg-black bg-opacity-50 backdrop-blur-lg"
            >
              <Link href={`/jobs/${job._id}`}>
                <div>
                  <h2 className="text-2xl font-bold text-blue-200 mb-3 hover:underline">
                    {job.title}
                  </h2>
                  <p className="text-gray-200">
                    <span className="font-semibold">Company:</span> {job.company}
                  </p>
                  <p className="text-gray-200">
                    <span className="font-semibold">Location:</span> {job.location}
                  </p>
                  <p className="text-gray-200">
                    <span className="font-semibold">Job Type:</span> {job.jobType}
                  </p>
                  <p className="text-gray-200">
                    <span className="font-semibold">Disability Friendly:</span>{' '}
                    {job.disabilityFriendly ? 'Yes' : 'No'}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default JobsForDisabledPeople;
