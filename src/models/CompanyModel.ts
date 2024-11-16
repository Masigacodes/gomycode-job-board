import mongoose, { Schema, model, models, mongo } from "mongoose";
import { IJob } from "./JobModel";

export interface ICompany {
  _id: mongo.ObjectId | string | number;
  name: string;
  description: string;
  location?: string;
  createdAt?: Date;
  updatedAt?: Date;
  jobCount?: number;
  jobListings?: IJob[];
}
const CompanySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    location: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export const CompanyModel = models.Company || model("Company", CompanySchema);

export const getCompaniesWithJobs = async () => {
  try {
    const companiesWithJobs = await CompanyModel.aggregate([
      {
        $lookup: {
          from: "job", // The name of the JobListing collection
          localField: "_id", // Company _id
          foreignField: "company", // The reference field in the JobListing collection
          as: "jobs", // Name of the new array field to contain the job listings
        },
      },
      {
        $project: {
          name: 1, // Include company name
          description: 1, // Include company description
          location: 1, // Include company location
          jobs: 1, // Include the array of jobs
        },
      },
    ]);
    return companiesWithJobs;
    // console.log(companiesWithJobs);
  } catch (err) {
    console.error("Error retrieving companies with jobs:", err);
    throw err;
  }
};

const ObjectId = mongoose.Types.ObjectId;

export const getCompaniesWithJobs2 = async () => {
  try {
    const companiesWithJobs = await CompanyModel.aggregate([
      {
        $lookup: {
          from: 'jobs',  // The name of the Jobs collection
          localField: '_id',     // Company _id
          foreignField: 'company',  // The reference field in the JobListing collection
          as: 'jobs'            // Name of the new array field to contain the job listings
        }
      },
      {
        $addFields: {
          jobs: {
            $map: {
              input: '$jobs',
              as: 'job',
              in: {
                $mergeObjects: [
                  '$$job',
                  {
                    company: { $toObjectId: '$$job.company' }  // Cast company field to ObjectId
                  }
                ]
              }
            }
          }
        }
      },
      {
        $project: {
          name: 1,              // Include company name
          description: 1,       // Include company description
          location: 1,          // Include company location
          jobs: 1               // Include the array of jobs
        }
      }
    ]);
return companiesWithJobs
    console.log(companiesWithJobs);
  } catch (err) {
    console.error('Error retrieving companies with jobs:', err);
    throw err;
  }
};

