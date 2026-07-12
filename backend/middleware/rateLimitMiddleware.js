import rateLimit from "express-rate-limit";

export const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: {
        message: "Too many registrations. Please try later."
    }
});

export const otpLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5,                  // 5 requests
    standardHeaders: true,
    legacyHeaders: false,

    message: {
        message: "Too many OTP attempts. Please try again after 5 minutes."
    }
})

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        message: "Too many login attempts."
    }
});

