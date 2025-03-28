import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
const pool = mysql.createPool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "myapp",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function connectToDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL successfully");
    connection.release();
  } catch (err) {
    console.error("Failed to connect to MySQL:", err);
    // Implement a retry mechanism
    setTimeout(connectToDatabase, 5000);
  }
}

// Initial connection attempt
connectToDatabase();

app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1+1 AS result");
    res.send(`Hello World! Simple MySQL calculation result: ${rows[0].result}`);
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).send("Error querying MySQL");
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await pool.end();
  process.exit();
});
