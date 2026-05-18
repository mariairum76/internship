import express from "express";
import pool from "./db/db";

const app = express();

app.use(express.json());

// HOME TEST
app.get("/", (req, res) => {
  res.send("API Running");
});

// GET ALL TASKS
app.get("/tasks", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks");
  res.json(result.rows);
});

// GET SINGLE TASK
app.get("/tasks/:id", async (req, res) => {

  const { id } = req.params;

  const result = await pool.query(
    "SELECT * FROM tasks WHERE id=$1",
    [id]
  );

  res.json(result.rows[0]);
});

// CREATE TASK
app.post("/tasks", async (req, res) => {

  const { title, completed } = req.body;

  const result = await pool.query(
    "INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *",
    [title, completed]
  );

  res.json(result.rows[0]);
});

// UPDATE TASK
app.put("/tasks/:id", async (req, res) => {

  const { id } = req.params;

  const { title, completed } = req.body;

  const result = await pool.query(
    "UPDATE tasks SET title=$1, completed=$2 WHERE id=$3 RETURNING *",
    [title, completed, id]
  );

  res.json(result.rows[0]);
});


// DELETE TASK
app.delete("/tasks/:id", async (req, res) => {

  const { id } = req.params;

  await pool.query(
    "DELETE FROM tasks WHERE id=$1",
    [id]
  );

  res.json({
    message: "Task deleted"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});