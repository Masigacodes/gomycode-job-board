import mongoose, { Document, Schema } from "mongoose";

export interface IApplication extends Document {
  fullName: string;
  email: string;
  phone: string;
  resume: string;
  coverLetter?: string;
  skills?: string[];
  availability?: string;
  accessibilityRequirements?: string;
  submittedAt?: Date;
}

const ApplicationSchema: Schema = new Schema<IApplication>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  resume: { type: String, required: true },
  coverLetter: { type: String },
  skills: { type: [String] },
  availability: { type: String },
  accessibilityRequirements: { type: String },
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Application || mongoose.model<IApplication>("Application", ApplicationSchema);
