const express = require("express")
require("dotenv").config()
require("../database")

const app = express();

app.listen(process.env.SERVER_PORT, () => {
    console.log("Server is running...")
})
