"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const JobApplicationForm: React.FC = () => {
  const router = useRouter();
  const jobId =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("jobId")
      : null;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null as File | null,
    coverLetter: "",
    skills: [] as string[],
    availability: "",
    accessibilityRequirements: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Updated handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a FormData object to handle file upload
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("resume", formData.resume as File); // Add file
    data.append("coverLetter", formData.coverLetter);
    data.append("skills", JSON.stringify(formData.skills)); // Convert array to string
    data.append("availability", formData.availability);
    data.append("accessibilityRequirements", formData.accessibilityRequirements);

    try {
      const response = await fetch("/api/job/apply", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Application submitted successfully!");
        router.push("/thank-you"); // Redirect to a thank-you page
      } else {
        const errorData = await response.json();
        alert(`Failed to submit application: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  // Handle skills input change
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: e.target.value.split(",").map((skill) => skill.trim()),
    }));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Job Application Form
      </h2>

      <p className="text-gray-700 text-center mb-6">
        <span className="font-semibold text-blue-600">Job ID:</span> {jobId || "Not specified"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-semibold text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your phone number"
            required
          />
        </div>

        {/* Resume */}
        <div>
          <label
            htmlFor="resume"
            className="block text-sm font-semibold text-gray-700"
          >
            Resume
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={(e) =>
              setFormData({
                ...formData,
                resume: e.target.files ? e.target.files[0] : null,
              })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Cover Letter */}
        <div>
          <label
            htmlFor="coverLetter"
            className="block text-sm font-semibold text-gray-700"
          >
            Cover Letter
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={formData.coverLetter}
            onChange={(e) =>
              setFormData({ ...formData, coverLetter: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write your cover letter here..."
            rows={4}
            required
          ></textarea>
        </div>

        {/* Skills */}
        <div>
          <label
            htmlFor="skills"
            className="block text-sm font-semibold text-gray-700"
          >
            Skills (comma-separated)
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills.join(", ")}
            onChange={handleSkillsChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="E.g., JavaScript, React, Node.js"
            required
          />
        </div>

        {/* Accessibility Requirements */}
        <div>
          <label
            htmlFor="accessibilityRequirements"
            className="block text-sm font-semibold text-gray-700"
          >
            Accessibility Requirements
          </label>
          <textarea
            id="accessibilityRequirements"
            name="accessibilityRequirements"
            value={formData.accessibilityRequirements}
            onChange={(e) =>
              setFormData({
                ...formData,
                accessibilityRequirements: e.target.value,
              })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Mention any specific requirements"
            rows={3}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
