require("dotenv").config();
require("./database");

const express = require("express");
const router = require("./routes/routes");

const app = express();

app.get("/", (_, res) => {
  res.json({ message: "Server is up and running..." });
});

// middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes

app.use("/api/v1", router);

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server is up and running...");
});
