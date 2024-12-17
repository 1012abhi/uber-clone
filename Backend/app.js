import express from "express";
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors';
import connectDB from './db/db.js'

connectDB();
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});




export {app}
