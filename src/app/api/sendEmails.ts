
import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '../../lib/nodemailer/mailer'; // Adjust the path if necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { to, subject, html } = req.body;

    try {
      await sendEmail(to, subject, html);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Failed to send email:', error);
      res.status(500).json({ message: 'Failed to send email' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}