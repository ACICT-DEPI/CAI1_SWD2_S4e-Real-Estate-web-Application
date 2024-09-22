import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import route from "./routes/ResidenceRoute.js"

const app=express();
app.use(express.json())
app.use(cookieParser())
app.use(cors())
dotenv.config();
const PORT=process.env.PORT;
const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`server is running on Port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log("Error connecting to MongoDB");
  });

  app.use("/api", route);