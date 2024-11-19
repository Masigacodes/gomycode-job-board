import { dbConnect } from "@/lib/mongoose/db-connect";
import { ICompany } from "@/models/CompanyModel";
import { JobModel } from "@/models/JobModel";
import React from "react";

export default async function SingleJobPage({ params }: any) {
  const { slug } = await params;
  await dbConnect();
  const job = await JobModel.findOne({ _id: slug }).populate("company");
  if (!job) return <div>Job not found</div>;
  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-200 mb-3 hover:underline">
        {job.title}
      </h2>
      <p className="text-gray-200">
        <span className="font-semibold">Company:</span>{" "}
        {(job.company as ICompany).name}
      </p>
      <p className="text-gray-200">
        <span className="font-semibold">Location:</span> {job.location}
      </p>
      <p className="text-gray-200">
        <span className="font-semibold">Job Type:</span> {job.jobType}
      </p>
      <p className="text-gray-200">
        <span className="font-semibold">Disability Friendly:</span>{" "}
        {job.disabilityFriendly ? "Yes" : "No"}
      </p>
    </div>
  );
}
