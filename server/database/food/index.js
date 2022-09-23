import mongoose from "mongoose";

const FoodModal = new mongoose.Schema(
    {
        name: { type: string, required: true },
        descript: { type: string, required: true },
        isVeg: { type: Boolean, required: true },
        isContainsEgg: { type: Boolean, required: true },
        catagory: { type: string, required: true },
        photo: {
            type: mongoose.Types.ObjectId,
            ref: "imanges",
        },
        prices: { type: Number, required: true },
        addOnes: [{
            type: mongoose.Types.ObjectId,
            ref: "foods",
        },],
        restaurant: {
            type: mongoose.Types.ObjectId,
            ref: "restaurants",
            required: true,
        }
    },
    {
        timestamps: true,
    })