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
    disabilityFriendly: ''
  });

  useEffect(() => {
    axios.get('/api/jobs/disabled')
      .then(response => {
        console.log(response.data);
        setJobs(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value
    });
  };

  const filteredJobs = jobs.filter(job => {
    return (
      (filters.location === '' || job.location === filters.location) &&
      (filters.jobType === '' || job.jobType === filters.jobType) &&
      (filters.disabilityFriendly === '' || job.disabilityFriendly === (filters.disabilityFriendly === 'true'))
    );
  });

  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 font-semibold">Error: {error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Jobs for Disabled People</h1>
      
      <form className="flex flex-col md:flex-row md:justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <label className="flex flex-col text-lg font-medium">
          Location:
          <select 
            name="location" 
            value={filters.location} 
            onChange={handleFilterChange} 
            className="mt-1 p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All</option>
            <option value="New York">New York</option>
            <option value="Chicago">Chicago</option>
            <option value="Los Angeles">Los Angeles</option>
          </select>
        </label>
        
        <label className="flex flex-col text-lg font-medium">
          Job Type:
          <select 
            name="jobType" 
            value={filters.jobType} 
            onChange={handleFilterChange} 
            className="mt-1 p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </label>
        
        <label className="flex flex-col text-lg font-medium">
          Disability Friendly:
          <select 
            name="disabilityFriendly" 
            value={filters.disabilityFriendly} 
            onChange={handleFilterChange} 
            className="mt-1 p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>
      </form>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map(job => (
          <li key={job._id} className="p-6 border rounded-lg shadow hover:shadow-lg transition-shadow bg-white">
            <Link href={`/jobs/${job._id}`}>
              <div>
                <h2 className="text-2xl font-bold text-blue-600 mb-2 hover:underline">{job.title}</h2>
                <p className="text-gray-700">Company: <span className="font-medium">{job.company}</span></p>
                <p className="text-gray-700">Location: <span className="font-medium">{job.location}</span></p>
                <p className="text-gray-700">Job Type: <span className="font-medium">{job.jobType}</span></p>
                <p className="text-gray-700">Disability Friendly: <span className="font-medium">{job.disabilityFriendly ? 'Yes' : 'No'}</span></p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobsForDisabledPeople;
