import express, { urlencoded } from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
dotenv.config();
import cors from 'cors';
import connectDB from './db/db.js'

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('Hello World');
});


import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js"
import mapsRoutes from "./routes/maps.routes.js"

app.use('/api/users', userRoutes)
app.use('/api/captains', captainRoutes)
app.use('/api/maps', mapsRoutes)

export {app}
