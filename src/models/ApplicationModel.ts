import mongoose, { Document, Schema } from "mongoose";
import { IJob } from "./JobModel";

export interface IApplication extends Document {
  job: string | IJob
  fullName: string;
  email: string;
  phone: string;
  resume: string;
  coverLetter?: string;
  skills?: string[];
  availability?: string;
  accessibilityRequirements?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ApplicationSchema: Schema = new Schema<IApplication>(
  {
    job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    resume: { type: String, required: true },
    coverLetter: { type: String },
    skills: { type: [String] },
    availability: { type: String },
    accessibilityRequirements: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Application ||
  mongoose.model<IApplication>("Application", ApplicationSchema);
