const {Router} = require("express")
const {createUser, loginUser} = require("../controllers/userController")

const userRouter = Router();

userRouter.post("/signup", createUser)
userRouter.post("/signin", loginUser)

module.exports = userRouter;