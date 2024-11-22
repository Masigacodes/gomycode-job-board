import { JobModel } from "@/models/JobModel";

export const getJobs = async () => {
  return await JobModel.find();
};

export const createJob = async (jobData: any) => {
  return await JobModel.create(jobData);
};

export const deleteJob = async (id: string) => {
  return await JobModel.findByIdAndDelete(id);
};
