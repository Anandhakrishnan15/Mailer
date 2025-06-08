const User = require('../models/User');

// ========================================
// 🔍 Controller to Get Logged-In User Info
// ========================================
const getUserInfo = async (req, res) => {
    console.log("getUserInfo route hit");

    try {
        // 1. Find the user by ID (req.user is set by the 'protect' middleware)
        const user = await User.findById(req.user._id).select("-password"); // Exclude password for security

        // 2. If user not found, return 400 Bad Request
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // 3. Send user data as JSON response
        res.json(user);
    } catch (error) {
        // 4. Log server errors and send 500 Internal Server Error response
        console.error("User Info Error:", error.message);
        res.status(500).json({ message: "Server error while fetching user info" });
    }
};

module.exports = { getUserInfo };
