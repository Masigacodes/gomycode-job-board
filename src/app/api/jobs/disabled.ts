// src/pages/api/jobs/disabled.ts

import { NextApiRequest, NextApiResponse } from 'next';

const jobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Corp',
    location: 'New York',
    jobType: 'Full-time',
    disabilityFriendly: true,
  },
  {
    id: 2,
    title: 'Data Analyst',
    company: 'Data Inc.',
    location: 'Chicago',
    jobType: 'Part-time',
    disabilityFriendly: false,
  },
  // Add more job data here if needed
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // This is where you can handle GET requests to fetch job data
    res.status(200).json(jobs);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
