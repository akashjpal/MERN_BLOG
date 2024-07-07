import express from "express";
import { pool } from "./dbConfig/dbConfig.js";
import bodyParser from "body-parser";
import cors from "cors";

const conn = await pool.getConnection();

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Middleware to parse JSON request bodies

app.get("/check", async (req, res) => {
  try {
    const [rows] = await conn.query("SELECT * FROM User;");
    console.log(rows);
    console.log("Got the result");
    conn.release();
    res.send("Hello World!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to the database");
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const [rows1] = await conn.query("SELECT * FROM User WHERE username = ?", [
      username,
    ]);
    if (rows1.length > 0) {
      res
        .status(409)
        .send("Username already exists, please choose another one");
      return;
    }
    await conn.query("INSERT INTO User ( username, password) VALUES (?, ?)", [
      username,
      password,
    ]);
    conn.release();
    res.send(`Received registration details: ${username} / ${password}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to the database");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await conn.query(
      "SELECT * FROM User WHERE username = ? AND password = ?",
      [username, password]
    );
    if (rows.length === 0) {
      res.status(401).send("Invalid login details");
      return;
    }

    res.send(`Received login details: ${username} / ${password}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to the database");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
