import { dbConnect } from "@/lib/mongoose/db-connect";
import { getCompaniesWithJobs, getCompaniesWithJobs2 } from "@/models/CompanyModel";
import { JobModel } from "@/models/JobModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const fetchedJobs = await JobModel.find({});
    const data = await getCompaniesWithJobs2();
    console.log({data});
    return NextResponse.json(fetchedJobs);
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

    // Save the new Job to the database
    const savedJob = await JobModel.insertMany(Array.isArray(body) ? body : [body]); // JobModel.create(body);();
if(!savedJob) return NextResponse.json({message : "error creating Job"},{status : 500})
    // Return the saved Job as a JSON response
    return NextResponse.json(savedJob, { status: 201 });
  } catch (error: any) {
    // Return an error message if something goes wrong
    return NextResponse.json(
      { message: "An error has occurred: " + error.message },
      { status: 500 }
    );
  }
}
