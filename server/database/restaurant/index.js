import mongoose from "mongoose";

const RestaurentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    maplocation: { type: String, required: true },
    cuisine: [String],
    restaurentTimings: String,
    contactNumber: Number,
    website: Number,
    popularDishes: [String],
    avrageCost: Number,
    amenties: [String],     //amenties = facilities
    menuImages: {
        type: mongoose.Types.ObjectId,
        ref: "images",
    },
    menu: {
        type: mongoose.Types.ObjectId,
        ref: "menus",
    },
    reviews: [{
        type: mongoose.Types.ObjectId,
        ref: "reviews",
    }],
    photos: { type: mongoose.Types.ObjectId, ref: "images" },
}, {
    timestamps: true,
})

export const RestaurentModel = mongoose.model("resturants", RestaurentSchema)