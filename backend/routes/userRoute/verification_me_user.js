import express from "express"
import User from "../../models/userModel.js"
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth_middleware from "../../middleware/userMiddleware.js";
import nodemailer from "nodemailer";
import transporter from "../../config/mailer.js";
import Otp from "../../models/optModel.js";
import { loginLimiter, otpLimiter, registerLimiter } from "../../middleware/rateLimitMiddleware.js";

const router = express.Router()


// <---------- Verification ------->


router.post("/verification", otpLimiter, async (req, res) => {

    const find_otp_obj = await Otp.findOne({
        email: req.body.email
    })

    if (!find_otp_obj) {
        return res.status(404).json({
            message: "OTP not found"
        })
    }


    if (Number(req.body.otp) !== find_otp_obj.otp) {
        return res.status(400).json({
            message: "Otp is incorrect"
        })
    }
    else {


        const bcrypted_password = await bcrypt.hash(req.body.password, 10)

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypted_password
        })

        await Otp.deleteOne({
            email: req.body.email
        })
        
        res.json(
            {
                message: "sign up successfully",
                user
            }
        )


    }
})

router.post("/me", auth_middleware, async (req, res) => {
    const userId = req.user.id
    try {
        const user_me = await User.findById(userId).select("name email role")
        res.json({
            user: user_me,
        });

    } catch (error) {
        res.json({ message: "Cant get" })

    }
});

export default router