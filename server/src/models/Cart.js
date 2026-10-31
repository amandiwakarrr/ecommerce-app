import mongoose, { mongo } from "mongoose";

const CartSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true,
            unique:true,
        },
        items: [
            {
                product: {
                    type:mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required:TransitionEvent,

                },
                quantity: {
                    type:Number,
                    required:true,
                    default:1,
                    min:1,
                },
                size:{
                    type:String,
                    required:true,
                },
                color:{
                    type:String,
                    required:true,
                },
            },
        ],
    },
    {
        timestapmps: true,
    }
);