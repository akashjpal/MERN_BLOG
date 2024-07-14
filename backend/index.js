import express from "express";
import { pool } from "./dbConfig/dbConfig.js";
import bodyParser from "body-parser";
import cors from "cors";
import { connectMindsDB } from "./dbConfig/mindsdbConfig.js";
import MindsDB from "mindsdb-js-sdk";
import mysql from "mysql2/promise";

const conn = await pool.getConnection();

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Middleware to parse JSON request bodies

connectMindsDB();

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

app.post("/create", async (req, res) => {
  try {
    const { content, UId } = req.body;
    console.log(content, UId);
    const res2 = await conn.query(
      "INSERT INTO Blogs (Content, UId,CreatedAt) VALUES (?, ?,?)",
      [content, UId, new Date()]
    );
    conn.release();
    return res.json({
      message: "Blog created successfully",
      status: 201,
      BId: res2[0].insertId,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      message: "Error creating blog",
      status: 401,
    });
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
      return res.json({
        message: "User already exists",
        status: 409,
      });
    }

    const res2 = await conn.query(
      "INSERT INTO User ( username, password) VALUES (?, ?)",
      [username, password]
    );
    conn.release();

    return res.json({
      message: "User created successfully",
      status: 201,
      UId: res2[0].insertId,
    });
  } catch (err) {
    console.error(err);

    return res.json({
      message: "Error created user",
      status: 401,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(username, password);

    const [rows] = await conn.query(
      "SELECT * FROM User WHERE username = ? AND password = ?",
      [username, password]
    );

    console.log(rows);

    await conn.release();
    if (rows.length === 0) {
      return res.json({
        message: "User does not exists",
        status: 401,
      });
    }
    console.log("Login successful");

    return res.json({
      message: "Logged In successfully",
      status: 201,
      UId: rows[0].UId,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      message: "Error logging in",
      status: 401,
    });
  }
});

app.get("/blogs", async (req, res) => {
  try {
    const [rows] = await conn.query(
      "SELECT Blogs.*, User.* FROM Blogs INNER JOIN User ON Blogs.UId = User.UId"
    );
    console.log(rows);
    conn.release();
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.json({
      message: "Error fetching blogs",
      status: 401,
    });
  }
});

app.post("/predict", async (req, res) => {
  try {
    const { question } = req.body;

    console.log(question);

    // Ensure query is provided
    if (!question) {
      return res.status(400).json({
        message: "question is required",
      });
    }

    const query = `SELECT question, answer FROM google_gemini_model WHERE question = '${question}'`;

    const queryResult = await MindsDB.default.SQL.runQuery(query);

    console.log(queryResult.rows);

    res.json({
      message: "Prediction successful",
      data: queryResult.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error making prediction",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
