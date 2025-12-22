import User from '../Models/User.schema.js';
import jwt from 'jsonwebtoken';

export const findOrCreateUser = async ({ email, name, picture, id }) => {
    let user = await User.findOne({ email });
    if (!user) {
        user = await User.create({ email, name, avatar: picture, googleId: id });
    }
    return user;
};

export const generateToken = (user) => {
    const { _id, email } = user;
    return jwt.sign({ _id, email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TIMEOUT,
    });
};
