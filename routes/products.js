import express from "express";
import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../controllers/products.js";

const productsRouter = express.Router();

productsRouter.get("/", getProducts);

productsRouter.post("/", createProduct);

productsRouter.delete("/:productId", deleteProduct);

export default productsRouter;
