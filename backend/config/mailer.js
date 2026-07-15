// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// // Creating transporter

// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
//     connectionTimeout: 10000,
// });

// export default transporter



import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const transporter = {
  sendMail: async ({ from, to, subject, html, text }) => {
    const { data, error } = await resend.emails.send({
      from: from || "GreenLeaf Nursery <onboarding@resend.dev>",
      to,
      subject,
      html: html || text,
    });

    if (error) {
      throw new Error(error.message || "Failed to send email via Resend");
    }

    return data;
  },
};

export default transporter;