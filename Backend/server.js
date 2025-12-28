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

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(morgan('dev'))
console.log(process.env.FRONTEND_URI)
app.use(cors({
    origin: process.env.FRONTEND_URI,
    credentials: true
}));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URI);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});


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
