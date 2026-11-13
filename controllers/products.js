import mongoose from "mongoose";
import Produto from "../models/product.js";

const validId = (id) => mongoose.isValidObjectId(id);
const validationMessage = "Invalid product data";

export const getProducts = async (_req, res) => {
  try { return res.json({ data: await Produto.find() }); }
  catch (err) { console.error(err); return res.status(500).json({ message: "Unable to load products" }); }
};

export const createProduct = async (req, res) => {
  const { name, price, description, image, category, stock } = req.body ?? {};
  if (typeof name !== "string" || typeof description !== "string" || typeof image !== "string" ||
      typeof category !== "string" || typeof price !== "number" || !Number.isFinite(price) ||
      !Number.isSafeInteger(stock) || stock < 0) {
    return res.status(400).json({ message: validationMessage });
  }
  try {
    const product = await Produto.create({ name, price, description, image, category, stock });
    return res.status(201).json({ data: product });
  } catch (err) {
    if (err.name === "ValidationError") return res.status(400).json({ message: validationMessage });
    console.error(err);
    return res.status(500).json({ message: "Unable to create product" });
  }
};

export const deleteProduct = async (req, res) => {
  if (!validId(req.params.productId)) return res.status(400).json({ message: "Invalid product ID" });
  try {
    const deleted = await Produto.findByIdAndDelete(req.params.productId);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    return res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to delete product" });
  }
};

export const updateProductStock = async (req, res) => {
  const { productId } = req.params;
  const quantity = req.body?.stock;
  if (!validId(productId)) return res.status(400).json({ message: "Invalid product ID" });
  if (!Number.isSafeInteger(quantity) || quantity <= 0) {
    return res.status(400).json({ message: "Consumption must be a positive integer" });
  }
  try {
    const updated = await Produto.findOneAndUpdate(
      { _id: productId, stock: { $gte: quantity } },
      { $inc: { stock: -quantity } },
      { new: true, runValidators: true }
    );
    if (updated) return res.json({ data: updated });
    const exists = await Produto.exists({ _id: productId });
    return res.status(exists ? 409 : 404).json({ message: exists ? "Insufficient stock" : "Product not found" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to update stock" });
  }
};
