import express, { urlencoded } from "express";
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors';
import connectDB from './db/db.js'

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
});


import userRoutes from "./routes/user.routes.js";

app.use('/api/users', userRoutes)

export {app}
