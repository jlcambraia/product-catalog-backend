import express from "express";
import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../controllers/products.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.delete("/:productId", deleteProduct);

export default router;
