import { Request, Response } from "express";
import { pool } from "../db/db";
export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
  
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(result.rows[0]);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  
  const result = await pool.query(
    "UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *",
    [title, completed, id]
  );
  
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(result.rows[0]);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [id]);
  
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json({ message: "Task deleted", task: result.rows[0] });
};