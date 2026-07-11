import express from "express"
import User from "../models/userModel.js"
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth_middleware from "../middleware/userMiddleware.js";
import nodemailer from "nodemailer";
import transporter from "../config/mailer.js";
import Otp from "../models/optModel.js";

const router = express.Router()


// <----------- Register ------------>

router.post('/register', [
    body("name").notEmpty().withMessage("Name is required")
        .trim().isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),

    body("email").notEmpty().withMessage("Email is required")
        .trim().isEmail().withMessage("Email must be valid"),

    body("password").notEmpty().withMessage("Password is required").trim().isLength({ min: 5 }).withMessage("Password must be at least 5 characters"),


    body("confirm_password").notEmpty().withMessage("Password is required").trim().isLength({ min: 5 }).withMessage("Password must be at least 5 characters")

]

    , async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg
            })
        }

        const existingUser = await User.findOne({
            email: req.body.email
        })

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exist"
            })
        }
        if (req.body.password !== req.body.confirm_password) {
            return res.status(400).json({
                message: "Password must be same"
            })
        }

        // yaha p aaye ga na otp ka sara code

        const otp = Math.floor(100000 + Math.random() * 900000)

        const email_var = req.body.email


        await Otp.deleteOne({
            email: req.body.email
        })


        const create_otp_collection = await Otp.create({
            email: req.body.email,
            otp: otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        })


        await transporter.sendMail({
            from: process.env.EMAIL,
            to: req.body.email,
            subject: "GreenLeaf OTP Verification",
            text: `Your OTP is ${otp}. It expires in 5 minutes.`
        })
        console.log(otp)






        res.json({
            message: "Otp sent successfully",
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
    })




// <---------- Verification ------->


router.post("/verification", async (req, res) => {

    const find_otp_obj = await Otp.findOne({
        email: req.body.email
    })
    console.log("DB OTP", find_otp_obj.otp)

    if (!find_otp_obj) {
        return res.status(404).json({
            message: "OTP not found"
        })
    }

    console.log("req.body.otp", req.body.otp)
    console.log("find_otp_obj.otp", find_otp_obj.otp)



    console.log(req.body);

    console.log(typeof req.body.otp, req.body.otp);




    console.log(typeof find_otp_obj.otp, find_otp_obj.otp);

    if (Number(req.body.otp) !== find_otp_obj.otp) {
        console.log("Reached comparison if");
        return res.status(400).json({
            message: "Otp is incorrect"
        })
    }
    else {
        console.log("Reached comparison else");

        console.log(find_otp_obj)

        const bcrypted_password = await bcrypt.hash(req.body.password, 10)

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypted_password
        })
        console.log("Created successfully")

        const del_otp = await Otp.deleteMany()
        res.json(
            {
                message: "sign up successfully",
                user
            }
        )

    }
})

// <----------- Login ------------>

router.post('/login', [

    body("email").notEmpty().withMessage("Email is required")
        .trim().isEmail().withMessage("Email must be valid"),

    body("password").notEmpty().withMessage("Password is required").trim().isLength({ min: 5 }).withMessage("Password must be at least 5 characters")

], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg
        })
    }


    const existingUser = await User.findOne({
        email: req.body.email
    })

    if (!existingUser) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const compare_pass = await bcrypt.compare(req.body.password, existingUser.password)

    if (!compare_pass) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }


    // <----------- accessToken generation ------------>
    const accessToken = jwt.sign({
        id: existingUser._id,
        role: existingUser.role
    }, process.env.JWT_Access_SECRET, {
        expiresIn: "15m"
    })


    const refreshToken = jwt.sign({
        id: existingUser._id,
        role: existingUser.role
    }, process.env.JWT_Refresh_SECRET,
        {
            expiresIn: "7d"
        }
    )

    existingUser.refreshToken = refreshToken
    await existingUser.save()




    console.log("AccessToken ", accessToken)

    const hiii = res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    console.log(hiii)

    res.json({
        message: "Login successfull",
        accessToken,
    })

})

router.post('/refresh-token', async (req, res) => {
    const cookie_refresh_token = req.cookies.refreshToken
    if (!cookie_refresh_token) {
        return res.status(401).json({ message: "refresh token not found" })
    }
    console.log("correct uerroute.js")

    let refresh_decoded;

    try {
        refresh_decoded = jwt.verify(cookie_refresh_token, process.env.JWT_Refresh_SECRET)

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired refresh token"
        });
    }


    const find_user_refresh_from_db = await User.findById(refresh_decoded.id)

    if (!find_user_refresh_from_db) {
        return res.status(401).json({ message: "user not found refresh" })
    }

    if (cookie_refresh_token !== find_user_refresh_from_db.refreshToken) {
        return res.status(401).json({ message: "refresh dont match" })
    }

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

    console.log("New token sgendkjfdfjkdsjfkjsdkfjljdlfjkjdflk")

    res.json({
        message: "new access token formed",
        accessToken: new_access_token
    })



})



router.get("/test", auth_middleware, (req, res) => {
    res.json({
        message: "accessToken is valid",
        user: req.user
    });
})


router.post("/me", auth_middleware, async (req, res) => {
    const userId = req.user.id
    try {
        const user_me = await User.findById(userId).select("name email role")
        console.log(userId)
        res.json({
            user: user_me,
        });

    } catch (error) {
        res.json({ message: "Cant get" })

    }
});

// <--------- Kuch nahi samjh aa raha ye block ---------->

router.post("/products", auth_middleware, async (req, res) => {
    const { name, price } = req.body;

    const product = {
        name,
        price,
        userId: req.user.id
    };

    res.json({
        message: "Product created",
        product
    });
});

router.post("/logout", auth_middleware, async (req, res) => {


    try {
        const user_logout = await User.findById(req.user.id)
        if (!user_logout) {
            return res.status(404).json({ message: "user not found logout" })
        }

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });
        user_logout.refreshToken = null
        await user_logout.save()
        res.status(401).json({ message: "logout successfullt backend" })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})



router.get("/check-cookie", (req, res) => {
    console.log(req.cookies);
    res.json(req.cookies);
});

// <--------- ---------->

export default router