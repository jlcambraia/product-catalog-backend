import Produto from "../models/product.js";

export const getProducts = async (req, res) => {
  try {
    const allProducts = await Produto.find();
    res.send({ data: allProducts });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, description, image, category, stock } = req.body;

  if (!name || !price || !description || !image || !category || !stock) {
    return res
      .status(400)
      .send({ message: "Os dados fornecidos são inválidos" });
  }

  try {
    const newProduct = await Produto.create({
      name,
      price,
      description,
      image,
      category,
      stock,
    });
    res.send({ data: newProduct });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const deleted = await Produto.findByIdAndDelete(productId);

    if (!deleted) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }

    res.status(200).send({ message: "Produto deletado com sucesso" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updateProductStock = async (req, res) => {
  const { productId } = req.params;
  let { stock } = req.body;

  stock = Number(stock);

  if (isNaN(stock) || stock <= 0) {
    return res
      .status(400)
      .send({ message: "Quantidade inválida para consumo." });
  }

  try {
    const product = await Produto.findById(productId);

    if (!product) {
      return res.status(404).send({ message: "Produto não encontrado." });
    }

    if (product.stock < stock) {
      return res.status(400).send({
        message: `Estoque insuficiente. Atual: ${product.stock}, solicitado: ${stock}`,
      });
    }

    product.stock -= stock;

    const updatedProduct = await product.save();

    res.send({ data: updatedProduct });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
