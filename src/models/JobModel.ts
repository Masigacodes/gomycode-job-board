import  { Document, Schema, Model, model, models } from "mongoose";

// Define the TypeScript interface for Job
export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  jobType: string;
  disabilityFriendly: boolean; 
  createdAt: Date;
  updatedAt: Date;
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
      type: String,
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
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create and export the Job model
export const JobModel: Model<IJob> = models.Job || model<IJob>("Job", JobSchema);
