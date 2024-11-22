import { createJob, deleteJob, getJobs } from '@/models/JobModel';
import { NextResponse } from 'next/server';

export async function GET() {
  const jobs = await getJobs(); // Fetch jobs from the database
  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  const jobData = await req.json();
  const newJob = await createJob(jobData); // Add a new job to the database
  return NextResponse.json(newJob);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await deleteJob(id); // Delete a job by ID
  return NextResponse.json({ success: true });
}
