import express, { urlencoded } from 'express';
import dotevn from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import userRoutes from './routes/User.routes.js';


const app = express();
const PORT = process.env.PORT || 3000;
dotevn.config();

app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(cookieParser());
connectDB();

app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});