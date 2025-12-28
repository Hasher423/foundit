import express from 'express'
import { authMiddleware } from '../Middlewares/auth.middleware.js';
import { upload } from '../Utils/multerCloudinary.js';
import { itemController, filterItemsController, getItems, Search } from '../Controllers/item.controller.js';
const   Router = express.Router();

Router.options('/report', (req, res) => res.sendStatus(200));
Router.post('/report',  upload.single('image'), itemController)
Router.get('/filter', filterItemsController);
Router.get('/getItems',getItems)
Router.get('/search',Search)

export default Router