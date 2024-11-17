'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('Submitting...');

    // Simulating a form submission to an API or email service
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' }); // Reset form
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4 animate-fadeIn">
          Contact Us
        </h1>
        <p className="text-lg text-gray-800 mb-6 animate-fadeIn delay-100">
          Have questions or feedback? We&apos;re here to help! Reach out to us, and we will get back to you promptly.
        </p>
      </div>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg border-t-4 border-blue-500 animate-slideIn"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
            placeholder="Write your message here"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              isSubmitting ? 'bg-blue-400 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>

        {formStatus && (
          <div
            className={`mt-4 text-center text-lg font-medium ${
              formStatus.includes('success') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {formStatus}
          </div>
        )}
      </form>

      {/* Additional Content */}
      <div className="mt-8 text-center text-gray-700">
        <p className="text-lg">
          <strong>Email:</strong> ashleymasiga17@gmail.com
        </p>
        <p className="text-lg">
          <strong>Phone:</strong> +1 (555) 123-4567
        </p>
        <p className="text-lg">
          <strong>Address:</strong> 1234 Inclusive Lane, Accessibility City, AB 56789
        </p>
      </div>
    </div>
  );
}
