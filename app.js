import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import productsRouter from "./routes/products.js";

dotenv.config();

const { PORT, MONGO_URL } = process.env;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use(express.json());

mongoose.connect(MONGO_URL);

app.use("/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
