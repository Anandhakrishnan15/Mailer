const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv').config();

// Middleware to protect routes and authorize users via JWT token
const protect = async (req, res, next) => {
    try {
        let token;

        // 1. Extract token from Authorization header (format: "Bearer <token>")
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        // 2. If no token found, deny access with 401 Unauthorized
        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        // 3. Verify the JWT token using secret key from environment variables
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // 4. Find the user by ID extracted from decoded token payload, exclude password field for security
        const user = await User.findById(decoded.id).select("-password");

        // 5. If user does not exist, send 404 Not Found
        if (!user) {
            return res.status(404).json({ message: "User not found here" });
        }

        // 6. Attach the user object to the request for downstream middleware/routes
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Catch token verification errors or other exceptions
        console.error("Auth Middleware Error:", error.message);

        // Return 401 Unauthorized if token is invalid or any error occurs
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
};

module.exports = protect;
