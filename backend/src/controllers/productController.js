const { db } = require("../database");

const getProducts = async (req, res) => {
  res.json({ message: "products" });
};

const productController = {
  getProducts,
};

module.exports = productController;
