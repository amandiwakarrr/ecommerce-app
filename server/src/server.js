import express from 'express';
import dotenv from "dotenv";
// Your frontend needs permission to communicate with your backend.
// We configure that permission later using cors().
import cors from "cors";
import connectDB from './config/db.js';
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cartRoutes from "./routes/cartRoutes.js"

// load environment variables
dotenv.config();
console.log({
    cloudNameLoaded: Boolean(process.env.CLOUDINARY_CLOUD_NAME),
    apiKeyLoaded: Boolean(process.env.CLOUDINARY_API_KEY),
    apiSecretLoaded: Boolean(process.env.CLOUDINARY_API_SECRET)
});

// initialize express
const app = express();

// port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

// app.get() defines a GET endpoint.
// req represents the incoming request.
// res represents the response we send back.
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "E-commerce API is running",
    });
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed: ", error.message);
        process.exit(1);
    }
};
startServer();