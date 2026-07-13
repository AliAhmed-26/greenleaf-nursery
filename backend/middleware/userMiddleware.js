import jwt from "jsonwebtoken"

const auth_middleware = (req, res, next) => {
    const auth_header = req.header("Authorization") // to verify that user is logged in
    if (!auth_header) {
        return res.status(401).json({
            message: "Unauthoried"
        })
    }

    const filtered_token = auth_header.split(" ")[1] // to generate token from "Bearer {{token}}"

    try {
        const verification = jwt.verify(filtered_token, process.env.JWT_Access_SECRET)
        req.user = verification
        next()

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            message: error.message
        });
    }

}

export default auth_middleware