// components/JobList.tsx
import React, { useEffect, useState } from 'react';

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  jobType: string;
  disabilityFriendly: boolean;
};

const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-8">Job Listings</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white shadow-md rounded-lg p-6 border-t-4
            border-green-400 hover:shadow-lg transition-all"
          >
            <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
            <p className="text-gray-500">{job.company}</p>
            <p className="text-gray-600 mt-2">{job.location}</p>
            <p className="text-gray-700">{job.jobType}</p>
            <div className="mt-4">
              {job.disabilityFriendly ? (
                <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                  Disability Friendly
                </span>
              ) : (
                <span className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold">
                  Not Disability Friendly
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
