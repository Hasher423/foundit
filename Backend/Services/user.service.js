import User from '../Models/User.schema.js';
import jwt from 'jsonwebtoken';

export const findOrCreateUser = async ({ email, displayName, picture, providerId, user_id }) => {
    let user = await User.findOne({ email });

    if (user) {
        if (providerId) {
            const hasProvider = user.providers.some(p => p.providerId === providerId);
            if (!hasProvider) {
                user.providers.push({ providerId, uid: user_id });
                await user.save();
            }
        }
    } else {
        const providers = providerId ? [{ providerId, uid: user_id }] : [];
        user = await User.create({
            email,
            name: displayName,
            avatar: picture,
            providers,
        });
    }

    return user;
};

export const generateToken = (user) => {
    const { uid, email } = user;
    return jwt.sign({ uid, email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TIMEOUT,
    });
};
