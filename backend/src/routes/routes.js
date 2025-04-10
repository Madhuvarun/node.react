const { Router } = require("express");
const userRouter = require("../routes/userRoute");
const productRouter = require("../routes/productRoute");

const router = Router();

router.use("/user", userRouter);
router.use("/product", productRouter);

module.exports = router;
