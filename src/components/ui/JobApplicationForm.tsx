"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const jobApplicationSchema = z.object({
  fullName: z.string().nonempty("Full Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().nonempty("Phone number is required"),
  coverLetter: z.string().optional(),
  skills: z
    .string()
    .nonempty("Skills are required")
    .transform((value) => value.split(",").map((skill) => skill.trim())),
  availability: z.enum(["immediately", "1-2 weeks", "1 month"], {
    errorMap: () => ({ message: "Select a valid availability option" }),
  }),
  accessibilityRequirements: z.string().optional(),
});

type JobApplicationFormValues = z.infer<typeof jobApplicationSchema>;

const JobApplicationForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<JobApplicationFormValues>({
    resolver: zodResolver(jobApplicationSchema),
  });

  const onSubmit = async (data: JobApplicationFormValues) => {
    try {
      const response = await axios.post("/api/jobs/apply", data);
      if (response.status === 200) {
        alert("Application submitted successfully!");
      } else {
        alert("Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-8">
          Job Application Form
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                {...register("fullName")}
                type="text"
                id="fullName"
                className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-2">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                {...register("phone")}
                type="tel"
                id="phone"
                className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-2">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                Availability
              </label>
              <select
                {...register("availability")}
                id="availability"
                className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Availability</option>
                <option value="immediately">Immediately</option>
                <option value="1-2 weeks">1-2 weeks</option>
                <option value="1 month">1 month</option>
              </select>
              {errors.availability && (
                <p className="text-red-500 text-sm mt-2">{errors.availability.message}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
              Cover Letter
            </label>
            <textarea
              {...register("coverLetter")}
              id="coverLetter"
              rows={4}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <input
              {...register("skills")}
              type="text"
              id="skills"
              placeholder="Enter skills separated by commas"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.skills && (
              <p className="text-red-500 text-sm mt-2">{errors.skills.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="accessibilityRequirements"
              className="block text-sm font-medium text-gray-700"
            >
              Accessibility Requirements
            </label>
            <textarea
              {...register("accessibilityRequirements")}
              id="accessibilityRequirements"
              rows={3}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;
