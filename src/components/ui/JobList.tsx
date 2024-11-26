import React, { useEffect, useState } from 'react';
import Link from 'next/link';

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/jobs');
        if (!res.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Unable to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-8">Job Listings</h1>
      {loading ? (
        <div className="text-center">
          <p className="text-gray-600">Loading jobs...</p>
          {/* Add a simple spinner */}
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 mx-auto mt-4"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs available at the moment.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-md rounded-lg p-6 border-t-4 border-green-400 hover:shadow-lg transition-all"
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

              {/* Button to navigate to the application form */}
              <Link href={`/apply?jobId=${job.id}&jobTitle=${encodeURIComponent(job.title)}`} passHref>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all">
                  Apply Now
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
