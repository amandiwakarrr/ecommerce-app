import mongoose from 'mongoose'
// connects  backend to MongoDB
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${mongoose.connection.host}`)
    } catch (error) {
        console.error("MongoBD connection failed: ", error.message);
        process.exit(1);
    }
}
