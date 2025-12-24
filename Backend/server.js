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
console.log(process.env.FRONTEND_URI)
app.use(cors({
    origin: process.env.FRONTEND_URI,
    credentials: true
}));



app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store'); // for CDNs/proxies
  next();
});


// Routes
app.get('/', (req, res) => {
    res.send("Server is working !");
});

app.use('/user/auth', authRouter);

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});
