import nodemailer from 'nodemailer';

// Create a transporter object using the SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service provider (e.g., Gmail)
  auth: {
    user: process.env.EMAIL_USER, // Email address from environment variables
    pass: process.env.EMAIL_PASS, // App password or email password from environment variables
  },
});

// Function to send an email
export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    // Ensure that all necessary fields are provided
    if (!to || !subject || !html) {
      throw new Error('Missing required fields: to, subject, or html.');
    }

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to, // Recipient's email address
      subject, // Subject of the email
      html, // HTML content of the email
    };

    // Optional: Log mailOptions for debugging (make sure not to log sensitive data in production)
    console.log('Sending email with the following details:', mailOptions);

    // Send the email using the transporter
    const res = await transporter.sendMail(mailOptions);
    console.log(res)
    // console.log('Email sent successfully');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: { message: string } | any) {
    // Log detailed error message for debugging
    console.error('Error sending email:', error);

    // Throw a custom error message
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
