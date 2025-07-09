import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/products.js";

dotenv.config();

const { PORT, MONGO_URL } = process.env;

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(MONGO_URL);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
