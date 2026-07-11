import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_PASS,
    }


})

console.log(process.env.EMAIL);
console.log(process.env.EMAIL_APP_PASS.length);
export default transporter