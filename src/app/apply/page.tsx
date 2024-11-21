import JobApplicationForm from '@/components/ui/JobApplicationForm';
import React from 'react';

const ApplyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Apply for a Job</h1>
      <JobApplicationForm />
    </div>
  );
};

export default ApplyPage;
