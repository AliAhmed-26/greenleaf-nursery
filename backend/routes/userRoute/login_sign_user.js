import express from "express"
import User from "../../models/userModel.js"
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import transporter from "../../config/mailer.js";
import Otp from "../../models/optModel.js";
import { loginLimiter, registerLimiter } from "../../middleware/rateLimitMiddleware.js";

const router = express.Router()


// <----------- Register ------------>

router.post('/register',
    registerLimiter, // Limit repeated registration requests
    [

        // <----- Validations -----> 

        body("name").notEmpty().withMessage("Name is required")
            .trim().isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),

        body("email").notEmpty().withMessage("Email is required")
            .trim().isEmail().withMessage("Email must be valid"),

        body("password").notEmpty().withMessage("Password is required").trim().isLength({ min: 5 }).withMessage("Password must be at least 5 characters"),


        body("confirm_password").notEmpty().withMessage("Password is required").trim().isLength({ min: 5 }).withMessage("Password must be at least 5 characters")

    ]

    , async (req, res) => {

        // Check validation errors

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg
            })
        }

        // Check whether the email is already registered

        const existingUser = await User.findOne({
            email: req.body.email
        })

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exist"
            })
        }

        // Make sure both passwords match

        if (req.body.password !== req.body.confirm_password) {
            return res.status(400).json({
                message: "Password must be same"
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000)

        const email_var = req.body.email

        // Remove any previous OTP for this email so only one valid OTP exists at a time.

        await Otp.deleteOne({
            email: req.body.email
        })


        const create_otp_collection = await Otp.create({
            email: req.body.email,
            otp: otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        })

        // Send OTP to the user's email

        await transporter.sendMail({
            // from: process.env.EMAIL,
            to: req.body.email,
            subject: "GreenLeaf OTP Verification",
            text: `Your OTP is ${otp}. It expires in 5 minutes.`
        })






        res.json({
            message: "Otp sent successfully",
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
    })



// <----------- Login ------------>

router.post('/login',
    loginLimiter,  // Limit repeated registration requests
    [

        // Validations

        body("email").notEmpty().withMessage("Email is required")
            .trim().isEmail().withMessage("Email must be valid"),

        body("password").notEmpty().withMessage("Password is required").trim().isLength({ min: 5 }).withMessage("Password must be at least 5 characters")

    ], async (req, res) => {

        // Find user by email

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg
            })
        }

        // Find user by email

        const existingUser = await User.findOne({
            email: req.body.email
        })

        if (!existingUser) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        // Compare entered password with hashed password

        const compare_pass = await bcrypt.compare(req.body.password, existingUser.password)

        if (!compare_pass) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        // Generate a short-lived access token

        const accessToken = jwt.sign({
            id: existingUser._id,
            role: existingUser.role
        }, process.env.JWT_Access_SECRET, {
            expiresIn: "15m"
        })

        // Generate a long-lived refresh token

        const refreshToken = jwt.sign({
            id: existingUser._id,
            role: existingUser.role
        }, process.env.JWT_Refresh_SECRET,
            {
                expiresIn: "7d"
            }
        )

        // Save refresh token in the database

        existingUser.refreshToken = refreshToken
        await existingUser.save()


        // Store refresh token in an HttpOnly cookie so JavaScript cannot access it.


         res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // Send access token to the frontend

        res.json({
            message: "Login successfull",
            accessToken,
        })

    })


export default router