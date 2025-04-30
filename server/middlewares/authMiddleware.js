import jwt from "jsonwebtoken";

// Extract the JWT token from the request header.
// Verify it’s valid.
// Decode it to get the user ID.
// Attach the user ID to the request object for use in the controller.
// Protect routes that need authentication

// user authentication middleware
const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = token_decode.id;
        next()
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export default authUser;