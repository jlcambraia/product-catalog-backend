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
  const { stock } = req.body;

  if (typeof stock !== "number" || stock < 0) {
    return res.status(400).send({ message: "O estoque fornecido é inválido" });
  }

  try {
    const updatedProduct = await Produto.findByIdAndUpdate(
      productId,
      { stock },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }

    res.send({ data: updatedProduct });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
