import mongoose from "mongoose";
import { ImageModal } from "../allModules";

const ImageSchema = new mongoose.Schema(
    {
        images: [
            {
                location: { type: String, required: true },
            },
        ],
    },
    {
        timestamps: true,
    });

export const ImageModel = mongoose.model("images", ImageSchema);