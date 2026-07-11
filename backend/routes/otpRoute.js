// import express from "express";
// const router = express.Router();

// router.post('/send-otp',async () => {
    
// })

// export default router


// router.post('/register', [
//     body("name").notEmpty().withMessage("Name is required")
//         .trim().isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),

//     body("email").notEmpty().withMessage("Email is required")
//         .trim().isEmail().withMessage("Email must be valid"),

//     body("password").notEmpty().withMessage("Password is required").trim().isLength({ min: 5 }).withMessage("Password must be at least 5 characters"),


//     body("confirm_password").notEmpty().withMessage("Password is required").trim().isLength({ min: 5 }).withMessage("Password must be at least 5 characters")

// ]

//     , async (req, res) => {
//         const errors = validationResult(req);

//         if (!errors.isEmpty()) {
//             return res.status(400).json({
//                 message: errors.array()[0].msg
//             })
//         }

//         const existingUser = await User.findOne({
//             email: req.body.email
//         })

//         if (existingUser) {
//             return res.status(400).json({
//                 message: "Email already exist"
//             })
//         }
//         if (req.body.password !== req.body.confirm_password) {
//             return res.status(400).json({
//                 message:"Password must be same"
//             })
//         }

//         const bcrypted_password = await bcrypt.hash(req.body.password, 10)

//         const user = await User.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: bcrypted_password
//         })
//         res.json(user)
//         console.log("Created successfully")
//     })