import { ICompany } from "@/models/CompanyModel";

export const companies: ICompany[] = [
  {
    _id: 1,
    name: 'Tech Innovators',
    description: 'A leading tech company specializing in innovative software solutions.',
    jobCount: 5,
    jobListings: [
    //   { _id: 1, title: 'Software Engineer', description: 'Remote position available, flexible hours' },
    //   { _id: 2, title: 'UX/UI Designer', description: 'Inclusive design team with accessibility expertise' },
    ],
  },
  {
    _id: 2,
    name: 'Green Earth Solutions',
    description: 'An environmental company focused on sustainability and eco-friendly initiatives.',
    jobCount: 3,
    jobListings: [
    //   { _id: 1, title: 'Sustainability Coordinator', description: 'Part-time role, open to flexible accommodations' },
    //   { _id: 2, title: 'Environmental Consultant', description: 'Remote work with accessibility tools provided' },
    ],
  },
  {
    _id: 3,
    name: 'Global Consulting Group',
    description: 'A global consulting firm providing business solutions to top companies.',
    jobCount: 8,
    jobListings: [
    //   { _id: 1, title: 'Project Manager', description: 'Remote position with accessibility equipment provided' },
    //   { _id: 2, title: 'Business Analyst', description: 'Position with flexible working hours for better work-life balance' },
    ],
  },
  {
    _id: 4,
    name: 'Data Inc',
    description: 'A data-driven company providing advanced analytics and machine learning solutions.',
    jobCount: 6,
    jobListings: [
    //   { _id: 1, title: 'Data Scientist', description: 'Inclusive team with work-from-home options and support for disabled employees' },
    //   { _id: 2, title: 'Machine Learning Engineer', description: 'Position includes accommodations and assistive technology' },
    ],
  },
  {
    _id: 5,
    name: 'Tech Corp',
    description: 'A tech corporation developing cutting-edge hardware and software products.',
    jobCount: 7,
    jobListings: [
    //   { _id: 1, title: 'Hardware Engineer', description: 'Flexible work schedule with accessibility tools provided' },
    //   { _id: 2, title: 'Software Developer', description: 'Remote work options and disability support' },
    ],
  },
];
