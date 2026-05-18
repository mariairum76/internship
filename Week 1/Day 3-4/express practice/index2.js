const express = require("express");
const pool = require("./db");

const app = express();

app.get("/users", async (req, res) => {

  const result = await pool.query(
    "SELECT * FROM users"
  );

  res.json(result.rows);
});

app.listen(3000, () => {
  console.log("Server running");
});