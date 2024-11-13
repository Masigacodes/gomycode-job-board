import  { Document, Schema, Model, model, models } from "mongoose";

// Define the TypeScript interface for User
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role?: string; // Optional field, could be 'user', 'admin', etc.
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose schema for User
const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user", // Default role can be "user"
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create and export the User model
export const UserModel: Model<IUser> = models.User || model<IUser>("User", UserSchema);
