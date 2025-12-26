import express from 'express'
import { userController } from '../Controllers/user.controller';
import { authMiddleware } from '../Middlewares/auth.middleware';
const Router = express.Router();

Router.post('/dashboard',authMiddleware,userController)


export default Router