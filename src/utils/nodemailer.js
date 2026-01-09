import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Use 16-char Gmail app password here
  },
});


export default transporter;