const { Router } = require("express");
const userRouter = require("../routes/userRoute");

const router = Router();

router.use("/user", userRouter);

module.exports = router;
