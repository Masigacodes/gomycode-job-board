import { compare, hash } from "bcryptjs";
import { Document, Schema, Model, model, models } from "mongoose";

// Define the TypeScript interface for User
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role?: string; // Optional field, could be 'user', 'admin', etc.
  createdAt: Date;
  updatedAt: Date;
  image?: string;
  _id: string;
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
      enum: ["user", "admin"], // Allow only these roles
    },
    image: {
      type: String,
      default: "", // Optional image
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Hash password before saving user
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified
  try {
    const hashedPassword = await hash(this.password, 10); // Hash the password with salt
    this.password = hashedPassword; // Save the hashed password
    next();
  } catch (err) {
    next(err as Error);
  }
});

// Compare password function (for login)
UserSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await compare(enteredPassword, this.password); // Compare the entered password with the hashed one
};

// Create and export the User model
export const UserModel: Model<IUser> = models.User || model<IUser>("User", UserSchema);

// Helper methods for CRUD operations and role management

// Fetch all users (admin function)
export const getUsers = async () => {
  try {
    return await UserModel.find().exec(); // Get all users
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

// Fetch a user by email (admin function)
export const getUserByEmail = async (email: string) => {
  try {
    return await UserModel.findOne({ email }).exec();
  } catch (error) {
    throw new Error("Error fetching user by email");
  }
};

// Fetch a user by ID (admin function)
export const getUserById = async (userId: string) => {
  try {
    return await UserModel.findById(userId).exec();
  } catch (error) {
    throw new Error("Error fetching user by ID");
  }
};

// Update user role (admin function)
export const updateUserRole = async (userId: string, role: string) => {
  try {
    const user = await UserModel.findByIdAndUpdate(userId, { role }, { new: true }).exec();
    return user;
  } catch (error) {
    throw new Error("Error updating user role");
  }
};

// Delete user (admin function)
export const deleteUser = async (userId: string) => {
  try {
    await UserModel.findByIdAndDelete(userId).exec(); // Delete a user by ID
    return { message: "User deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting user");
  }
};
