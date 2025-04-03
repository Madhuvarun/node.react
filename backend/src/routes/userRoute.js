const { Router } = require("express");
const { userController } = require("../controllers/controllers");

const userRouter = Router();

userRouter.post("/signup", userController.userSignUp);
userRouter.post("/signin", userController.userSignIn);

module.exports = userRouter;
