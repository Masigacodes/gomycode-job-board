"use client"; // Ensure this is at the top

import React, { useState } from 'react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter: string;
  skills: string[];
  availability: string;
  accessibilityRequirements: string;
}

const JobApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    skills: [],
    availability: '',
    accessibilityRequirements: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.resume) newErrors.resume = 'Please upload your resume';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure correct type handling for the input
    const skillsArray = e.target.value.split(',').map(skill => skill.trim());
    setFormData({ ...formData, skills: skillsArray });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted', formData);
      // Add API call here
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-8">
          Job Application Form
        </h2>
        
        <p className="text-lg text-center text-gray-600 mb-8">
          Apply for an exciting role with us! Please fill in the details below.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-2">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability</label>
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Availability</option>
                <option value="immediately">Immediately</option>
                <option value="1-2 weeks">1-2 weeks</option>
                <option value="1 month">1 month</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Upload Resume</label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleFileChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.resume && <p className="text-red-500 text-sm mt-2">{errors.resume}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">Cover Letter</label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              rows={4}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills.join(', ')}
              onChange={handleSkillsChange} // Fixed event type
              className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter skills separated by commas"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="accessibilityRequirements" className="block text-sm font-medium text-gray-700">Accessibility Requirements</label>
            <textarea
              id="accessibilityRequirements"
              name="accessibilityRequirements"
              value={formData.accessibilityRequirements}
              onChange={handleChange}
              rows={3}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;
