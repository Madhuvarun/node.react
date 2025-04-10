const { db } = require("../database");

const getProducts = async (req, res) => {
  const { q } = req.query;
  console.log(req.query);
  const result = await db.query(
    "SELECT * FROM amazon.products WHERE description ILIKE '%' || $1 || '%'",
    [q]
  );

  console.log(result);

  return res.json({ products: result.rows });
};

const productController = {
  getProducts,
};

module.exports = productController;
