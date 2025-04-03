require("dotenv").config();
require("./database");

const express = require("express");

const app = express();

app.get("/", (_, res) => {
  res.json({ message: "Server is up and running..." });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server is up and running...");
});
