import { describe, it, expect, vi, beforeEach } from "vitest";
import mongoose from "mongoose";

vi.mock("../models/product.js", () => ({
  default: {
    create: vi.fn(),
    findOneAndUpdate: vi.fn(),
    exists: vi.fn(),
    findByIdAndDelete: vi.fn(),
  },
}));
import Product from "../models/product.js";
import { createProduct, updateProductStock, deleteProduct } from "../controllers/products.js";

const id = new mongoose.Types.ObjectId().toString();
function response() {
  return { statusCode: 200, status(code) { this.statusCode = code; return this; }, json(data) { this.body = data; return this; } };
}
beforeEach(() => vi.clearAllMocks());

describe("product input validation", () => {
  it("accepts initial stock zero", async () => {
    const input = { name: "Chair", price: 10, description: "Nice chair", image: "https://example.com/a.png", category: "MÓVEIS", stock: 0 };
    Product.create.mockResolvedValue(input);
    const res = response();
    await createProduct({ body: input }, res);
    expect(res.statusCode).toBe(201);
    expect(Product.create).toHaveBeenCalledWith(input);
  });
  it("rejects fractional stock", async () => {
    const res = response();
    await createProduct({ body: { stock: 0.5 } }, res);
    expect(res.statusCode).toBe(400);
  });
  it("rejects invalid ID before database access", async () => {
    const res = response();
    await deleteProduct({ params: { productId: "invalid" } }, res);
    expect(res.statusCode).toBe(400);
    expect(Product.findByIdAndDelete).not.toHaveBeenCalled();
  });
});
describe("atomic stock consumption", () => {
  it("uses a conditional atomic decrement", async () => {
    Product.findOneAndUpdate.mockResolvedValue({ stock: 3 });
    const res = response();
    await updateProductStock({ params: { productId: id }, body: { stock: 2 } }, res);
    expect(res.statusCode).toBe(200);
    expect(Product.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: id, stock: { $gte: 2 } },
      { $inc: { stock: -2 } },
      { new: true, runValidators: true }
    );
  });
  it("returns 409 for insufficient stock", async () => {
    Product.findOneAndUpdate.mockResolvedValue(null);
    Product.exists.mockResolvedValue({ _id: id });
    const res = response();
    await updateProductStock({ params: { productId: id }, body: { stock: 9 } }, res);
    expect(res.statusCode).toBe(409);
  });
  it("rejects fractional consumption", async () => {
    const res = response();
    await updateProductStock({ params: { productId: id }, body: { stock: 1.5 } }, res);
    expect(res.statusCode).toBe(400);
  });
});
