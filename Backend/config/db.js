const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.AUTH_DATA);

        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB connection error: ${error.message}`);
        process.exit(1); // Stop the app if DB connection fails
    }
};

// MongoDB Connection Events
mongoose.connection.on("connected", () => {
    console.log("✅ Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
    console.error(`❌ Mongoose connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ Mongoose disconnected");
});

// Graceful Shutdown
process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("🔌 Mongoose connection closed on app termination");
    process.exit(0);
});

module.exports = connectDB;
