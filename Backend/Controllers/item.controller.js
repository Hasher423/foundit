import itemModel from "../Models/item.model.js";



export const itemController = async (req, res) => {
    try {
        const { type, title, description, category, date, location } = req.body;
        const file = req.file;
        const coords = req.body.location.split(',').map(coord => parseFloat(coord));

        // if (!file) return res.status(400).json({ message: "Image is required" });

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
            Date: new Date(date),
            image: file?.path, // Cloudinary URL
            createdBy: '694e17b66aaa33cb72e20be8',
        });
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
        console.log(items)
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