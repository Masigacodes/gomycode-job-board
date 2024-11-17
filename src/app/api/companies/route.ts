import { dbConnect } from "@/lib/mongoose/db-connect";
import { CompanyModel } from "@/models/CompanyModel";
import { JobModel } from "@/models/JobModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const companyJobs = await JobModel.find({}).populate("company");
    console.log(companyJobs);
    const fetchedCompanies = await CompanyModel.find({});
    return NextResponse.json(fetchedCompanies);
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

    // Parse the request body to get the Company data
    const body = await req.json();

    // Create a new Company instance
    // const newCompany = new CompanyModel(body);

    // Save the new Company to the database
    const savedCompany = await CompanyModel.insertMany(Array.isArray(body) ? body : [body]); // CompanyModel.create(body);
    if (!savedCompany)
      return NextResponse.json(
        { message: "error creating Company" },
        { status: 500 }
      );
    // Return the saved Company as a JSON response
    return NextResponse.json(savedCompany, { status: 201 });
  } catch (error: any) {
    // Return an error message if something goes wrong
    return NextResponse.json(
      { message: "An error has occurred: " + error.message },
      { status: 500 }
    );
  }
}
