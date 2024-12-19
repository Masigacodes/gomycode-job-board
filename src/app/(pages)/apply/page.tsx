"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";

const JobApplicationForm: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [jobId, setJobId] = useState<string | null>(null);

  useEffect(() => {
    const id = params.get("jobId");
    setJobId(id);
    if (!id) {
      router.push("/jobs");
    }
  }, [params, router]);

  const [formData, setFormData] = useState({
    job: jobId || null,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobId) {
      setErrors({ jobId: "Job ID is required" });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("job", jobId);
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("coverLetter", formData.coverLetter);
    formDataToSend.append("availability", formData.availability);
    formDataToSend.append(
      "accessibilityRequirements",
      formData.accessibilityRequirements
    );
    formData.skills.forEach((skill) => formDataToSend.append("skills", skill));
    if (formData.resume) {
      formDataToSend.append("resume", formData.resume);
    }

    try {
      const response = await fetch("/api/jobs/apply", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Application submitted successfully!");
        router.push("/"); // Redirect to home or a confirmation page
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors || {});
        alert("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Job Application Form
      </h2>
      <p className="text-gray-700 text-center mb-6">
        <span className="font-semibold text-blue-600">Job ID:</span>{" "}
        {jobId || "Not specified"}
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields */}
        {/* ... */}
      </form>
    </div>
  );
};

// Wrapping the component in Suspense
const SuspenseWrapper: React.FC = () => {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <JobApplicationForm />
    </Suspense>
  );
};

export default SuspenseWrapper;
