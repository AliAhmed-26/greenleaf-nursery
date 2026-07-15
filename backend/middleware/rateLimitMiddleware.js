import rateLimit from "express-rate-limit";

// <-------- Register Limiter ---------->

export const registerLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 3,
    message: {
        message: "Too many registrations. Please try again after 5 minutes."
    }
});

// <-------- Otp Limiter ---------->

export const otpLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
    max: 3,                  
    standardHeaders: true,
    legacyHeaders: false,

    message: {
        message: "Too many OTP attempts. Please try again after 5 minutes."
    }
})

// <-------- Login Limiter ---------->

export const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: {
        message: "Too many login attempts. Please try again after 5 minutes."
    }
});

