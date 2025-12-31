import express, { urlencoded } from 'express';
import cors from 'cors';


import cookieParser from 'cookie-parser';
import DbConnection from './Utils/DbConnection.js';
import 'dotenv/config';
import authRouter from './Routes/auth.route.js';
import itemRouter from './Routes/item.route.js'
import morgan from 'morgan';

DbConnection();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URI,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true,
}));


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(morgan('dev'));
app.options("*", cors());


// Routes
app.get('/', (req, res) => {
    res.send("Server is working !");
});



app.use('/user', authRouter);
app.use('/user/access', authRouter);
app.use('/item', itemRouter)

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});
