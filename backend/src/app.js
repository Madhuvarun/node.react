require("dotenv").config();
require("./database");

const express = require("express");
const cors = require("cors");
const router = require("./routes/routes");

const app = express();

app.get("/", (_, res) => {
  res.json({ message: "Server is up and running..." });
});

// middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// routes

app.use("/api/v1", router);

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server is up and running...");
});
