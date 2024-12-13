import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import { promises as fs } from "fs";
import { dbConnect } from "@/lib/mongoose/db-connect";
import ApplicationModel from "@/models/ApplicationModel";

// Initialize Multer storage for handling file uploads
const BASE_URL = process.cwd();
const uploadFolder = `${BASE_URL}/public/uploads/`;
const upload = multer({ dest: uploadFolder });

export const POST = async (req: NextRequest) => {
  await dbConnect();

  try {
    // Parse form data including files
    const formData = await req.formData();

    const resumeFile = formData.get("resume") as File;
    if (!resumeFile) {
      return NextResponse.json(
        { error: "Resume is required." },
        { status: 400 }
      );
    }

    // Save the resume file
    const resumePath = `${uploadFolder}${Date.now()}_${resumeFile.name
      .split(" ")
      .join("_")}`;
    await fs.writeFile(resumePath, Buffer.from(await resumeFile.arrayBuffer()));

    // Extract and save other fields
    const applicationData = {
      job: formData.get("job")?.toString() || "",
      fullName: formData.get("fullName")?.toString() || "",

      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      resume: resumePath,
      coverLetter: formData.get("coverLetter")?.toString() || "",
      // skills: formData.get("skills")?.toString() ? JSON.parse(formData.get("skills")!.toString()) : [],
      skills: [],
      availability: formData.get("availability")?.toString() || "",
      accessibilityRequirements:
        formData.get("accessibilityRequirements")?.toString() || "",
    };

    // Save to MongoDB
    const application = new ApplicationModel(applicationData);
    await application.save();

    return NextResponse.json(
      { message: "Application submitted successfully." },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("Error submitting application:", error.message);
    return NextResponse.json(
      { error: "Failed to submit application." },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  // console.log({BASE_URL})
  try {
    await dbConnect();
    const fetchedApplications = await ApplicationModel.find({});
    return NextResponse.json(fetchedApplications);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
