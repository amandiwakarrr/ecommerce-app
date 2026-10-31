import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: string,
            unique: true,
            required: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 15,
        },
        password: {
            type: String,
            minlength: 8,
            required: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        }
    }
)

const User = mongoose.model("User", UserSchema);
export default User;