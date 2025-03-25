const {Router} = require("express")
const router = Router();
const userRoutes = require("./userRoutes")

router.use("/user", userRoutes)

module.exports = router;