import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());


// option 1 Allo All origins with default of cors(*)
// option 2 allow custom Origins
app.use(
    cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type'],
}
));

// Root Route
app.get('/', (request, response) => {
    return response.status(200).send("Welcome To MERN Stack Project");
});

app.use('/books', booksRoute); // Fixed spacing issue in app.use

// MongoDB Connection
mongoose
    .connect(mongoDBURL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
        console.log('App is connected to database');
    })
    .catch((error) => {
        console.log(error.message);
    });
