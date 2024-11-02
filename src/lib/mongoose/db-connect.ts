// Import the mongoose library for connecting to MongoDB
import mongoose from "mongoose";

// Define an asynchronous function to connect to the database
export async function dbConnect() {
  try {
    // Attempt to connect to the MongoDB database using the URI from environment variables
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Db connected successfully"); // Log a success message if connection is successful
  } catch (error: any) {
    // Log an error message if there is an issue with the connection
    console.log("Db connection Error : " + error.message);
  }
}
