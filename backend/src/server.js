const express = require("express")
require("dotenv").config()
require("./database")
const router = require("./routes/routes")

const app = express();

app.use("/api", router)
app.listen(process.env.SERVER_PORT, () => {
    console.log("Server is running...")
})
