import { ICompany } from "@/models/CompanyModel";

export const companies: Omit<ICompany, '_id' | 'jobCount' | 'jobListings'>[] = [
  {
    name: 'Tech Innovators',
    description: 'A leading tech company specializing in innovative software solutions.',
  },
  {
    name: 'Green Earth Solutions',
    description: 'An environmental company focused on sustainability and eco-friendly initiatives.',
  },
  {
    name: 'Global Consulting Group',
    description: 'A global consulting firm providing business solutions to top companies.',
  },
  {
    name: 'Data Inc',
    description: 'A data-driven company providing advanced analytics and machine learning solutions.',
  },
  {
    name: 'Tech Corp',
    description: 'A tech corporation developing cutting-edge hardware and software products.',
  },
];
