import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import route from "./routes/ResidenceRoute.js";
import userRoutes from "./routes/userRoute.js";


const app = express();


dotenv.config();


app.use(express.json());
app.use(cookieParser());
app.use(cors());


const PORT = process.env.PORT || 8000; 
const DB_URL = process.env.DB_URL;

mongoose
	.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connected to MongoDB");


		app.listen(PORT, () => {
			console.log(`Server is running on Port: ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB:", error.message);
	});


app.use("/api", route);
app.use("/api/users", userRoutes); 


app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something went wrong!");
});
