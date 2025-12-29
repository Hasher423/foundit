import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["LOST", "FOUND"],
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        location: {
            type: {
                type: String,
                enum: ["Point"],
                required: true,
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                required: true,
            },
        },
        image: {
            type: String,
            default: 'https://res.cloudinary.com/djrhycdyu/image/upload/v1766754330/noImageAvailable_o9ihzw.png',
            required: true,
        },
        Date: {
            type: Date,
            requied: true,
        },
        status: {
            type: String,
            enum: ["OPEN", "CLAIMED", "RESOLVED"],
            default: "OPEN",
            index: true, // fast filtering
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        email: {
            type: String,
        }
    },
    { timestamps: true }
);

// Indexes
itemSchema.index({ location: "2dsphere" }); // geospatial
itemSchema.index({ title: "text", category: "text" }); // search

export default mongoose.model("Item", itemSchema);
