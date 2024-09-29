import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from 'path';
import route from "./routes/ResidenceRoute.js";
// Import routes
import registerRoutes from './routes/register.js';
import authRoutes from './routes/auth.js';
import refreshRoutes from './routes/refresh.js';
import logoutRoutes from './routes/logout.js';
import userRoutes from './routes/api/users.js';
import userRoute from "./routes/userRoute.js";

// import userRoutes from "./routes/userRoute.js";
// import('dotenv').config();
// const express = import('express');
const app = express();
// const path = import('path');
// const cors = import('cors');
// const corsOptions = import('./config/corsOptions');
// import corsOptions from './config/corsOptions.js'; 

// const { logger } = import('./middleware/logEvents');
// const errorHandler = import('./middleware/errorHandler');
// const verifyJWT = import('./middleware/verifyJWT');
// // const cookieParser = import('cookie-parser');
// const credentials = import('./middleware/credentials');


// ES Module syntax
// import { logger } from './middleware/logEvents.js';
// import {errorHandler} from './middleware/errorHandler.js';
// import {verifyJWT} from './middleware/verifyJWT.js';
// import cookieParser from 'cookie-parser'; // Uncomment if you need it
import {credentials} from './middleware/credentials.js';


// const mongoose = import('mongoose');
// const connectDB = import('./config/dbConn');

const PORT = process.env.PORT || 8000; 
const DB_URL = process.env.DB_URL;


dotenv.config();


app.use(cors());


// added
// app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials importment
app.use(credentials);

// Cross Origin Resource Sharing
// app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
// app.use('/', express.static(path.join(__dirname, '/public')));

// routes
// app.use('/', import('./routes/root'));
// app.use('/register', import('./routes/register'));
// app.use('/auth', import('./routes/auth'));
// app.use('/refresh', import('./routes/refresh'));
// app.use('/logout', import('./routes/logout'));

// app.use(verifyJWT);
// app.use('/users', import('./routes/api/users'));

// Routes
app.use('/', route); // Adjust as necessary
app.use('/register', registerRoutes); // Use the imported routes
app.use('/auth', authRoutes);
app.use('/refresh', refreshRoutes);
app.use('/logout', logoutRoutes);
// app.use(verifyJWT); // Verify JWT for protected routes
app.use("/api", route);
app.use('/users', userRoutes); // Use the imported routes
app.use("/api/users", userRoute); 
const __dirname = path.resolve();

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

// app.use(errorHandler);





mongoose
	.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connected to MongoDB");


		app.listen(PORT, () => {
			console.log(`Server is running on Port: ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB:", error.message);
	});

