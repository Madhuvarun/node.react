const {Client} = require("pg")

const db = new Client({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME
})

const connectDB = async () => {
    try {
        await db.connect();
        console.log("Connected to DB...");
    } 

    catch(err) {
        console.log("Error connecting to DB ", err);
    }
    
}

connectDB();

module.exports = db;