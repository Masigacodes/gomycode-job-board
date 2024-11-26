
import { dbConnect } from "@/lib/mongoose/db-connect";
import ApplicationModel from "@/models/ApplicationModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const fetchedJobApplications = await ApplicationModel.find({}).populate("job");
    return NextResponse.json(fetchedJobApplications);
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

    // Parse the request body to get the Job data
    const body = await req.json();

    // Save the new Application to the database
    const savedApplication = await ApplicationModel.insertMany(Array.isArray(body) ? body : [body]); 
if(!savedApplication) return NextResponse.json({message : "error creating Application"},{status : 500})
    // Return the saved Application as a JSON response
    return NextResponse.json(savedApplication, { status: 201 });
  } catch (error: any) {
    // Return an error message if something goes wrong
    return NextResponse.json(
      { message: "An error has occurred: " + error.message },
      { status: 500 }
    );
  }
}
