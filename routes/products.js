import express from "express";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProductStock,
} from "../controllers/products.js";

const productsRouter = express.Router();

productsRouter.get("/", getProducts);

productsRouter.post("/", createProduct);

productsRouter.delete("/:productId", deleteProduct);

productsRouter.patch("/:productId/stock", updateProductStock);

export default productsRouter;
