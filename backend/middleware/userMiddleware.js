import jwt from "jsonwebtoken"

const auth_middleware = (req, res, next) => {
    const auth_header = req.header("Authorization")
    if (!auth_header) {
        return res.status(401).json({
            message: "Unauthoried"
        })
    }

    const filtered_token = auth_header.split(" ")[1]
    console.log(filtered_token)
    try {
        const verification = jwt.verify(filtered_token, process.env.JWT_Access_SECRET)
        req.user = verification
        // console.log("Verification", verification)
        next()

    } catch (error) {
    console.log(error);

    return res.status(401).json({
        message: error.message
    });
}

}

export default auth_middleware