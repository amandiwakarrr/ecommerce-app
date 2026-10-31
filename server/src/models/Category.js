import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowecase: true,
        },
        style: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
        },
        image: {
            type: String,
            default: "",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model("Category", CategorySchema);
export default Category;