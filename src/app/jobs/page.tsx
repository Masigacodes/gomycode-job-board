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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Jobs for Disabled People</h1>
      <form>
        <label>
          Location:
          <select name="location" value={filters.location} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="New York">New York</option>
            <option value="Chicago">Chicago</option>
            <option value="Los Angeles">Los Angeles</option>
          </select>
        </label>
        <label>
          Job Type:
          <select name="jobType" value={filters.jobType} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </label>
        <label>
          Disability Friendly:
          <select name="disabilityFriendly" value={filters.disabilityFriendly} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>
      </form>
      <ul>
        {filteredJobs.map(job => (
          <li key={job._id}>
            <Link href={`/jobs/${job._id}`}>
              
                <h2>{job.title}</h2>
                <p>Company: {job.company}</p>
                <p>Location: {job.location}</p>
                <p>Job Type: {job.jobType}</p>
                <p>Disability Friendly: {job.disabilityFriendly ? 'Yes' : 'No'}</p>
              
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobsForDisabledPeople;
