import mongoose from "mongoose";
import validator from "validator";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true, minlength: 2, maxlength: 300 },
  image: { type: String, required: true, validate: { validator: (v) => validator.isURL(v, { require_protocol: true }) } },
  category: { type: String, enum: ["ACESSÓRIOS", "MÓVEIS", "ELETRÔNICOS", "ROUPAS", "OUTROS"], required: true },
  stock: { type: Number, required: true, min: 0, validate: { validator: Number.isSafeInteger, message: "Stock must be a nonnegative integer" } },
}, { versionKey: false });
export default mongoose.model("product", productSchema);
