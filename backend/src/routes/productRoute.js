const { Router } = require("express");
const { productController } = require("../controllers/controllers");

const productRouter = Router();

productRouter.get("/search", productController.getProducts);
