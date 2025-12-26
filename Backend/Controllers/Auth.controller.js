        import User from "../Models/User.schema.js";
        import { findOrCreateUser, generateToken } from "../Services/user.service.js";
        import jwt from 'jsonwebtoken';
        import { admin } from '../Utils/firebaseAdmin.js';


        const verifyFirebaseToken = async (firebaseToken) => {

                if (!firebaseToken) return ({ messae: 'Token not Found !' });

                try {
                        const decoded = await admin.auth().verifyIdToken(firebaseToken);
                        return decoded;
                } catch (err) {
                        console.log(err)
                        return null;
                }
        }



        export const AuthController = async (req, res) => {
                try {
                        const firebaseToken = req.headers.authorization?.split(' ')[1];

                        const userInfo = await verifyFirebaseToken(firebaseToken);
                        const userRecord = await admin.auth().getUser(userInfo.uid);
                        const displayName = userRecord.displayName;
                        if (!userInfo) return res.status(401).json({ message: 'invalid Firebase Token' })
                        console.log(userInfo.firebase?.sign_in_provider)
                        const { email, name, picture, user_id } = userInfo;
                        
                        const user = await findOrCreateUser({ email, displayName, picture, providerId: userInfo.firebase?.sign_in_provider, user_id })
                        const token = generateToken({ uid: user_id, email });

                        res.cookie('token', token, {
                                httpOnly: true,
                                secure: true,
                                sameSite: 'none',
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
                        sameSite: 'none'
                });
                res.json({ success: true, message: 'Logged out successfully' });
        }