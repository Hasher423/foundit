import User from "../Models/User.schema.js";
import { findOrCreateUser, generateToken } from "../Services/user.service.js";
import { oauth2Client } from "../Utils/googleConfig.js";
import axios from 'axios'
import jwt from 'jsonwebtoken'
export const AuthController = async (req, res) => {
        try {
                const { code } = req.query;
                const googleRes = await oauth2Client.getToken(code);
                oauth2Client.setCredentials(googleRes.tokens);

                const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);

                const user = await findOrCreateUser(userRes.data);
                const token = generateToken(user);

                res.cookie('token', token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'lax',
                        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                });

                return res.json({
                        sucess: true,
                        token,
                        user
                })
        } catch (err) {
                console.log(err)
                res.status(500).json({
                        message: 'Internal Server Error !'
                })
        }
}


export const isloggedIn = (req, res) => {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ loggedIn: false });

        try {
                const user = jwt.verify(token, process.env.JWT_SECRET);
                res.json({ loggedIn: true, user });
        } catch {
                res.status(401).json({ loggedIn: false });
        }
}

export const logOut = (req, res) => {
        res.clearCookie('token', {
                httpOnly: true,
                secure: true,
                sameSite: 'lax'
        });
        res.json({ success: true, message: 'Logged out successfully' });
}