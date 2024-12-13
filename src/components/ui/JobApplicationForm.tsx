// app/apply/page.tsx
"use client";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

// Define Zod schema
const applicationSchema = z.object({
  // job: z.string().min(1, "JobId  is required"),
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  resume: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Resume is required"),
  coverLetter: z.string().optional(),
  skills: z.array(z.string()).optional(),
  availability: z.string().optional(),
  accessibilityRequirements: z.string().optional(),
});

type ApplicationFormInputs = z.infer<typeof applicationSchema>;
const ApplicationForm = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("job"); // Retrieves the jobId parameter from the URL

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationFormInputs>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit: SubmitHandler<ApplicationFormInputs> = async (data) => {
    if (!jobId) {
      console.error("Job ID is missing from the URL.");
      return;
    }

    setLoading(true);
    setSuccessMessage("");

    try {
      const formData = new FormData();
      formData.append("job", jobId);
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("resume", data.resume);
      if (data.coverLetter) formData.append("coverLetter", data.coverLetter);
      if (data.skills) formData.append("skills", JSON.stringify(data.skills));
      if (data.availability) formData.append("availability", data.availability);
      if (data.accessibilityRequirements) {
        formData.append(
          "accessibilityRequirements",
          data.accessibilityRequirements
        );
      }

      await axios.post("/api/jobs/apply", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Application submitted successfully!");
      reset();
    } catch (error) {
      console.error("Failed to submit application:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6">Job Application</h1>

      {successMessage && (
        <p className="mb-4 text-green-600">{successMessage}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-red-600 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-600 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Resume</label>
          <input
            type="file"
            className="w-full border p-2 rounded"
            {...register("resume")}
          />
          {errors.resume && (
            <p className="text-red-600 text-sm">{errors.resume.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cover Letter</label>
          <textarea
            className="w-full border p-2 rounded"
            {...register("coverLetter")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Skills</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Comma-separated skills (e.g., React, TypeScript)"
            {...register("skills")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Availability</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            {...register("availability")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Accessibility Requirements
          </label>
          <textarea
            className="w-full border p-2 rounded"
            {...register("accessibilityRequirements")}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
