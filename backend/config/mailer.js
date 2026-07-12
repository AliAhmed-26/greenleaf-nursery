import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Creating transporter

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_PASS,
    }


})

export default transporter