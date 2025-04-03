const { Client } = require("pg");
const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function connectToDB() {
  try {
    await db.connect();
    console.log("Database is up and running...");
  } catch (err) {
    console.log("Database connection failed...");
  }
}

connectToDB();

module.exports = {
  db,
};
