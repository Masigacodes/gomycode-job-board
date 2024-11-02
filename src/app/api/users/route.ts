import { dbConnect } from "@/lib/mongoose/db-connect";
import { UserModel } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const fetchedUsers = await UserModel.find({});
    return NextResponse.json(fetchedUsers);
  } catch (error: any) {
    return NextResponse.json(
      { message: "An error has occurred " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body to get the user data
    const body = await req.json();

    // Create a new user instance
    const newUser = new UserModel(body);

    // Save the new user to the database
    const savedUser = await newUser.save();
if(!savedUser) return NextResponse.json({message : "error creating user"},{status : 500})
    // Return the saved user as a JSON response
    return NextResponse.json(savedUser, { status: 201 });
  } catch (error: any) {
    // Return an error message if something goes wrong
    return NextResponse.json(
      { message: "An error has occurred: " + error.message },
      { status: 500 }
    );
  }
}
