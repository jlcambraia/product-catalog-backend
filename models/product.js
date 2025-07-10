import mongoose from "mongoose";
import validator from "validator";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlenght: 30,
    },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: (v) => {
          return v >= 0;
        },
        message: "O preço deve ser maior ou igual a zero",
      },
    },
    description: {
      type: String,
      required: true,
      minlength: 2,
      maxlenght: 300,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isURL(v, { require_protocol: true }),
      },
    },
    category: {
      type: String,
      enum: ["ACESSÓRIOS", "MÓVEIS", "ELETRÔNICOS", "ROUPAS", "OUTROS"],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      validate: {
        validator: (v) => {
          return v >= 0;
        },
        message: "O estoque deve ser maior ou igual a zero",
      },
    },
  },
  { versionKey: false }
);

const Produto = mongoose.model("product", productSchema);

export default Produto;
