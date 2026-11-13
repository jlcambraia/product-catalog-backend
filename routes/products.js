import express from "express";
import { getProducts, createProduct, deleteProduct, updateProductStock } from "../controllers/products.js";
import { requireInternalKey } from "../middlewares/requireInternalKey.js";

const productsRouter = express.Router();
productsRouter.get("/", getProducts);
productsRouter.post("/", requireInternalKey, createProduct);
productsRouter.delete("/:productId", requireInternalKey, deleteProduct);
productsRouter.patch("/:productId/stock", requireInternalKey, updateProductStock);
export default productsRouter;
