import mongoose from "mongoose";
const addressSchema = new mongoose.Schema(
    {
        fullname: {
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
        isVarified: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
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
