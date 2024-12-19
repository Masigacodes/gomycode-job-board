import { Document, Schema, Model, model, models } from "mongoose";
import { ICompany } from "./CompanyModel";

// Define the TypeScript interface for Job
export interface IJob extends Document {
  title: string;
  company?: string | ICompany;
  location?: string;
  jobType?: string;
  disabilityFriendly?: boolean;
  description: string;
  requirements?: string;
  attachments?: string;
  salary?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Mongoose schema for Job
const JobSchema: Schema<IJob> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      lowercase: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    disabilityFriendly: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    attachments: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create and export the Job model
export const JobModel: Model<IJob> = models.Job || model<IJob>("Job", JobSchema);

// Add custom helper functions for CRUD operations
export const getJobs = async () => {
  try {
    return await JobModel.find().populate('company').exec(); // Get all jobs and populate the company data
  } catch (error) {
    throw new Error('Error fetching jobs');
  }
};

export const getJobById = async (jobId: string) => {
  try {
    return await JobModel.findById(jobId).populate('company').exec(); // Get job by ID with populated company data
  } catch (error) {
    throw new Error('Error fetching job by ID');
  }
};

export const createJob = async (jobData: IJob) => {
  try {
    const newJob = new JobModel(jobData);
    return await newJob.save(); // Create a new job post
  } catch (error) {
    throw new Error('Error creating job');
  }
};

export const updateJob = async (jobId: string, jobData: Partial<IJob>) => {
  try {
    return await JobModel.findByIdAndUpdate(jobId, jobData, { new: true }).populate('company').exec(); // Update job details
  } catch (error) {
    throw new Error('Error updating job');
  }
};

export const deleteJob = async (jobId: string) => {
  try {
    return await JobModel.findByIdAndDelete(jobId); // Delete a job by ID
  } catch (error) {
    throw new Error('Error deleting job');
  }
};
