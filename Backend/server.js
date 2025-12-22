import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import DbConnection from './Utils/DbConnection.js';
import 'dotenv/config';
import authRouter from './Routes/auth.route.js';
import morgan from 'morgan';

DbConnection();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(morgan('dev'))

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Routes
app.get('/', (req, res) => {
    res.send("Server is working !");
});

app.use('/user/auth', authRouter);

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});
