import mongoose, { mongo } from "mongoose";
const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
            minlength: 2,
            maxlength: 50,
        },
        email: {
            type: String,
            required: [true, "Email is required."],
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email address.",
            ],
        },
        subject: {
            type: String,
            required: [true, "Subject is required."],
            trim: true,
            enum: [
                "order",
                "shipping",
                "return",
                "payment",
                "other",
            ],
        },
        message: {
            type: String,
            required: [true, "Message is required."],
            trim: true,
            minlength: 10,
            maxlength: 2000,
        },
        status: {
            type: String,
            enum: ["New", "In Progress", "Resolved"],
            default: "New",
        },
    },
    { timestamps: true }
)

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;