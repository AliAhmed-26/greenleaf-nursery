export const check_role = (req, res, next) => {
    if (req.user.role === "user") {
        return res.status(403).json({
            message: "Access Denied rolee"
        });
    }
    console.log(req.user.role)
    next();
};