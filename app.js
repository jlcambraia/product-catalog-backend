import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import productsRouter from "./routes/products.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();
const { PORT = "3001", MONGO_URL, INTERNAL_API_KEY } = process.env;
if (!MONGO_URL) throw new Error("MONGO_URL must be configured");
if (!INTERNAL_API_KEY) console.warn("INTERNAL_API_KEY not set: product write endpoints are disabled (read-only demo)");

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ methods: ["GET", "HEAD", "OPTIONS"] }));
app.use(express.json({ limit: "32kb" }));
app.use("/products", productsRouter);
app.use(errorHandler);

try {
  await mongoose.connect(MONGO_URL);
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));
} catch (error) {
  console.error("Database connection failed", error);
  process.exitCode = 1;
  await mongoose.disconnect();
}
