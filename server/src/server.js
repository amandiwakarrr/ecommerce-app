import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL
}));

app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "E-commerce backend is running"
    });
});

// Start server after database connection
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();