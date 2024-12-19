import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import { promises as fs } from "fs";
import { dbConnect } from "@/lib/mongoose/db-connect";
import ApplicationModel from "@/models/ApplicationModel";
import path from "path";
import { MdsFileUpload } from "mds-file-upload";

// Initialize Multer storage for handling file uploads

const saveResumeFile = async (resumeFile: File): Promise<string> => {
  const uploader = new MdsFileUpload(process.cwd());
  const { success, filename} = await uploader.handleFileUpload(resumeFile);
  if (!success) {
    throw new Error("Failed to save resume file.");
  }
  return filename;
};

const extractApplicationData = (formData: FormData, resumePath: string) => ({
  job: formData.get("job")?.toString() || "",
  fullName: formData.get("fullName")?.toString() || "",
  email: formData.get("email")?.toString() || "",
  phone: formData.get("phone")?.toString() || "",
  resume: resumePath,
  coverLetter: formData.get("coverLetter")?.toString() || "",
  skills: [], // Assuming skills are not being parsed currently
  availability: formData.get("availability")?.toString() || "",
  accessibilityRequirements:
    formData.get("accessibilityRequirements")?.toString() || "",
});

const handleErrorResponse = (error: any, message: string) => {
  console.error(message, error.message);
  return NextResponse.json({ error: message }, { status: 500 });
};

export const POST = async (req: NextRequest) => {
  await dbConnect();

  try {
    const formData = await req.formData();
    const resumeFile = formData.get("resume") as File;

    if (!resumeFile) {
      return NextResponse.json(
        { error: "Resume is required." },
        { status: 400 }
      );
    }

    const resumePath = await saveResumeFile(resumeFile);
    const applicationData = extractApplicationData(formData, resumePath);

    const application = new ApplicationModel(applicationData);
    await application.save();

    return NextResponse.json(
      { message: "Application submitted successfully." },
      { status: 201 }
    );
  } catch (error: any) {
    return handleErrorResponse(error, "Failed to submit application.");
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();
    const fetchedApplications = await ApplicationModel.find({});
    return NextResponse.json(fetchedApplications);
  } catch (error: any) {
    return handleErrorResponse(error, "Failed to fetch applications.");
  }
};
