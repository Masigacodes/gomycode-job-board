import { dbConnect } from "@/lib/mongoose/db-connect";
import { JobModel } from "@/models/JobModel";
import { NextRequest, NextResponse } from "next/server";

const jobs = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Tech Corp',
      location: 'New York',
      jobType: 'Full-time',
      disabilityFriendly: true,
    },
    {
      id: 2,
      title: 'Data Analyst',
      company: 'Data Inc.',
      location: 'Chicago',
      jobType: 'Part-time',
      disabilityFriendly: false,
    },
    {
        id: 3,
        title: 'Software Developer',
        company: 'Data Inc.',
        location: 'Texas',
        jobType: 'Full-time',
        disabilityFriendly: true,
      },
    // Add more job data here if needed
  ];
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const fetchedJobs = await JobModel.find({});
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

    // Create a new Job instance
    const newJob = new JobModel(body);

    // Save the new Job to the database
    const savedJob = await newJob.save();
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
