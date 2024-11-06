import nodemailer from 'nodemailer';

// Create a transporter object using the SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service provider
  auth: {
    user: process.env.EMAIL_USER, // Email address from environment variables
    pass: process.env.EMAIL_PASS, // Email password from environment variables
  },
});

// Function to send an email
export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to, // Recipient's email address
      subject, // Subject of the email
      html, // HTML content of the email
    };

    // Send the email using the transporter
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};


