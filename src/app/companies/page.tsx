'use client';

import Link from 'next/link';
import { ICompany } from '@/models/CompanyModel';
import { companies } from './data';

export default function Companies() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Companies Hiring</h1>

      <p className="text-lg text-center mb-6">
        Discover top companies currently hiring for a variety of roles that are friendly to people with disabilities. Find your next opportunity today!
      </p>

      <div className="w-full max-w-4xl space-y-6">
        {companies.map((company: ICompany) => (
          <div key={company._id as string} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-900">{company.name}</h2>
            <p className="mt-2 text-lg text-gray-700">{company.description}</p>
            <div className="mt-4">
              <Link
                href={`/companies/${company._id}`}
                className="text-blue-600 hover:underline font-medium"
              >
                View {company?.jobCount  || 0} Job{(company?.jobCount || 0) > 1 ? 's' : ''}
              </Link>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-800">Tech Jobs Friendly to Disabilities:</h3>
              <ul className="list-disc pl-5 mt-2">
                {(company?.jobListings || []).map((job) => (
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
