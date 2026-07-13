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

// <---------- Generate a new access token using refresh token ---------->

router.post('/refresh-token', async (req, res) => {

    // Get refresh token stored in browser cookie

    const cookie_refresh_token = req.cookies.refreshToken

    // User is not logged in or cookie has been removed

    if (!cookie_refresh_token) {
        return res.status(401).json({ message: "refresh token not found" })
    }

    let refresh_decoded;

    try {

        // Verify refresh token using the Refresh Secret key
        // If the token is expired or modified, jwt.verify() throws an error.

        refresh_decoded = jwt.verify(cookie_refresh_token, process.env.JWT_Refresh_SECRET)

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired refresh token"
        });
    }

    // Find the user whose id is stored inside the refresh token

    const find_user_refresh_from_db = await User.findById(refresh_decoded.id)

    if (!find_user_refresh_from_db) {
        return res.status(401).json({ message: "user not found refresh" })
    }

    // Compare the cookie refresh token with the one stored in the database.

    if (cookie_refresh_token !== find_user_refresh_from_db.refreshToken) {
        return res.status(401).json({ message: "refresh dont match" })
    }

    // Creating a new access token. The user can now continue making authenticated requests without logging in again.

    const new_access_token = jwt.sign(
        {
            id: refresh_decoded.id,
            role: refresh_decoded.role
        },
        process.env.JWT_Access_SECRET,
        {
            expiresIn: "15m"
        }
    )
    
    // Send the newly generated access token back to the frontend

    res.json({
        message: "new access token formed",
        accessToken: new_access_token
    })



})



// <---------- Logout user ---------->


router.post("/logout", auth_middleware, async (req, res) => {


    try {

        // Find the currently logged-in user

        const user_logout = await User.findById(req.user.id)
        if (!user_logout) {
            return res.status(404).json({ message: "user not found logout" })
        }

        // Remove the refresh token cookie from the browser

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        // Remove the refresh token from the database. After this, even if someone has the old cookie, it can no longer be used to generate new access tokens.

        user_logout.refreshToken = null
        await user_logout.save()
        res.status(200).json({ message: "Logout successfully from backend" })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

export default router