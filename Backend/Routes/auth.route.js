import express from 'express'
import { AuthController, isloggedIn, logOut } from '../Controllers/Auth.controller.js';
const Router = express.Router();

Router.post('/auth',AuthController)
Router.get('/isloggedIn',isloggedIn)
Router.get('/logout',logOut)


export default Router