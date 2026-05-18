import express from "express";
import pool from "../db/db";

const router = express.Router();

/**
 * CREATE TASK
 */
router.post("/tasks", async (req, res) => {
  const { title } = req.body;

  const result = await pool.query(
    "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
    [title]
  );

  res.status(201).json(result.rows[0]);
});

/**
 * GET ALL TASKS
 */
router.get("/tasks", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks");
  res.json(result.rows);
});

/**
 * GET SINGLE TASK
 */
router.get("/tasks/:id", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE id = $1",
    [req.params.id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(result.rows[0]);
});

/**
 * UPDATE TASK
 */
router.put("/tasks/:id", async (req, res) => {
  const { title } = req.body;

  const result = await pool.query(
    "UPDATE tasks SET title = $1 WHERE id = $2 RETURNING *",
    [title, req.params.id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(result.rows[0]);
});

/**
 * DELETE TASK
 */
router.delete("/tasks/:id", async (req, res) => {
  const result = await pool.query(
    "DELETE FROM tasks WHERE id = $1 RETURNING *",
    [req.params.id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json({ message: "Task deleted successfully" });
});



import express from "express";
import { 
  getAllTasks, 
  createTask, 
  getTaskById, 
  updateTask, 
  deleteTask 
} from "../controllers/taskcontrollers";

const router = express.Router();

router.get("/", (req, res) => getAllTasks(req, res));
router.post("/", (req, res) => createTask(req, res));
router.get("/:id", (req, res) => getTaskById(req, res));
router.put("/:id", (req, res) => updateTask(req, res));
router.delete("/:id", (req, res) => deleteTask(req, res));
export default router;