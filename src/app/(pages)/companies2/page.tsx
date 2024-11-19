'use client';

import Link from 'next/link';

const companies = [
  {
    id: 1,
    name: 'Tech Innovators',
    description: 'A leading tech company specializing in innovative software solutions.',
    jobCount: 5,
    jobListings: [
      { id: 1, title: 'Software Engineer', description: 'Remote position available, flexible hours' },
      { id: 2, title: 'UX/UI Designer', description: 'Inclusive design team with accessibility expertise' },
    ],
  },
  {
    id: 2,
    name: 'Green Earth Solutions',
    description: 'An environmental company focused on sustainability and eco-friendly initiatives.',
    jobCount: 3,
    jobListings: [
      { id: 1, title: 'Sustainability Coordinator', description: 'Part-time role, open to flexible accommodations' },
      { id: 2, title: 'Environmental Consultant', description: 'Remote work with accessibility tools provided' },
    ],
  },
  {
    id: 3,
    name: 'Global Consulting Group',
    description: 'A global consulting firm providing business solutions to top companies.',
    jobCount: 8,
    jobListings: [
      { id: 1, title: 'Project Manager', description: 'Remote position with accessibility equipment provided' },
      { id: 2, title: 'Business Analyst', description: 'Position with flexible working hours for better work-life balance' },
    ],
  },
  {
    id: 4,
    name: 'Data Inc',
    description: 'A data-driven company providing advanced analytics and machine learning solutions.',
    jobCount: 6,
    jobListings: [
      { id: 1, title: 'Data Scientist', description: 'Inclusive team with work-from-home options and support for disabled employees' },
      { id: 2, title: 'Machine Learning Engineer', description: 'Position includes accommodations and assistive technology' },
    ],
  },
  {
    id: 5,
    name: 'Tech Corp',
    description: 'A tech corporation developing cutting-edge hardware and software products.',
    jobCount: 7,
    jobListings: [
      { id: 1, title: 'Hardware Engineer', description: 'Flexible work schedule with accessibility tools provided' },
      { id: 2, title: 'Software Developer', description: 'Remote work options and disability support' },
    ],
  },
];

export default function Companies() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Companies Hiring</h1>

      <p className="text-lg text-center mb-6">
        Discover top companies currently hiring for a variety of roles that are friendly to people with disabilities. Find your next opportunity today!
      </p>

      <div className="w-full max-w-4xl space-y-6">
        {companies.map((company) => (
          <div key={company.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-900">{company.name}</h2>
            <p className="mt-2 text-lg text-gray-700">{company.description}</p>
            <div className="mt-4">
              <Link
                href={`/companies/${company.id}`}
                className="text-blue-600 hover:underline font-medium"
              >
                View {company.jobCount} Job{company.jobCount > 1 ? 's' : ''}
              </Link>
            </div>

            {/* List of Tech Jobs Friendly to Disabled Candidates */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-800">Tech Jobs Friendly to Disabilities:</h3>
              <ul className="list-disc pl-5 mt-2">
                {company.jobListings.map((job) => (
                  <li key={job.id} className="text-lg text-gray-700">
                    <strong>{job.title}:</strong> {job.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
