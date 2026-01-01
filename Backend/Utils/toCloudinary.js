import cloudinary from './cloudinary.js';

export const uploadToCloudinary = async (buffer) => {
    return await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { resource_type: "auto", folder: "foundit" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        ).end(buffer);
    });
};