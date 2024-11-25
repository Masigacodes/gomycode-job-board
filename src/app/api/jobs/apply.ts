import { NextApiRequest, NextApiResponse } from 'next';

// Custom middleware to handle any pre-processing or validation
const customMiddleware = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  // Example of validating request method
  if (req.method !== 'POST') {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    return;
  }

  // Call next middleware or handler if validation passes
  next();
};

// Your API route handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Call your custom middleware
  customMiddleware(req, res, () => {
    // Custom logic to handle POST request
    if (req.method === 'POST') {
      const { fullName, email, phone } = req.body;

      // Example: Handle incoming data (validate, save, etc.)
      if (!fullName || !email || !phone) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Simulate successful form submission
      res.status(200).json({ message: 'Application submitted successfully' });
    }
  });
};

export default handler;
