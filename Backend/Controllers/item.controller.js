import itemModel from "../Models/item.model.js";
import { runMatchingEngine } from "../Utils/matchingEngine.js";
import { uploadToCloudinary } from "../Utils/toCloudinary.js";



export const itemController = async (req, res) => {
    try {
        const { type, title, description, category, date, location, Email } = req.body;
        const coords = req.body.location.split(',').map(coord => parseFloat(coord));
        let uploadedFile;
        // if (!file) return res.status(400).json({ message: "Image is required" });
        if (req.file) {
            uploadedFile = await uploadToCloudinary(req.file.buffer);
        }

        // Create item in one step
        const newItem = await itemModel.create({
            type: type.toUpperCase(),
            title,
            description,
            category,
            location: {
                type: "Point",
                coordinates: coords, // [lng, lat] as JSON string from frontend
            },
            email: Email,
            Date: new Date(date),
            image: uploadedFile?.secure_url, // Cloudinary URL
            createdBy: '694e17b66aaa33cb72e20be8',
        });

        if (type === 'lost' || 'LOST ' || 'Lost') runMatchingEngine(newItem)
        res.status(201).json({
            success: true,
            message: `${type} item reported successfully`,
            item: newItem,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }

}


export const filterItemsController = async (req, res) => {
    try {
        const { type, category, lng, lat, radius } = req.query;

        let orConditions = [];

        let filter = {};

        if (type) orConditions.push({ type: type.toUpperCase() })
        if (category) orConditions.push({ category });

        filter = orConditions.length ? { $or: orConditions } : {}

        if (lng && lat && radius) {
            filter.location = {
                $near: {
                    $geometry: { type: "Point", coordinates: [lng, lat] },
                    $maxDistance: parseFloat(radius) * 1000, // meters
                },
            };
        }

        const items = await itemModel.find(filter);
        res.status(200).json({ success: true, items });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getItems = async (req, res) => {
    const allItems = await itemModel.find();
    console.log(allItems)

    res.status(200).send({
        message: "Success",
        allItems,
    })
}



export const Search = async (req, res) => {
    const { query } = req.query;

    const result = await itemModel.find({
        $text: { $search: query }
    });

    res.status(200).send({ result })
}