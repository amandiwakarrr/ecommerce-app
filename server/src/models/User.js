import mongoose from "mongoose";
const addressSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        addressLine: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        state: {
            type: String,
            trim: true,
        },
        postalCode: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
            default: "India",
        },
        addressType: {
            type: String,
            enum: ["Home", "Work", "Other"],
            default: "Home",
        },
        isDefault: {
            type: Boolean,
            default: false,
        },
    },
    { _id: true }
);

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address."],
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false,
        },
        phone: {
            type: String,
            trim: true,
            default: "",
        },
        profileImage: {
            type: String,
            default: "",
        },
        dateOfBirth: {
            type: Date,
            default: null,
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other", "Prefer not to say"],
            default: "Prefer not to say",
        },
        addresses: {
            type: [addressSchema],
            default: [],
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        otpHash: {
            type: String,
            default: null,
            select: false,
        },

        otpExpiresAt: {
            type: Date,
            default: null,
            select: false,
        },

        otpAttempts: {
            type: Number,
            default: 0,
            select: false,
        },

        otpSentAt: {
            type: Date,
            default: null,
            select: false,
        },
        lastLogin: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
export default User;
