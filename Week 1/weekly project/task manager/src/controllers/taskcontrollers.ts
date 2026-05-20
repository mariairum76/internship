import { Request, Response } from "express";
import pool from "../db/db";

// GET ALL TASKS
export const getTasks = async (
  req: Request,
  res: Response
) => {

  const result = await pool.query(
    "SELECT * FROM tasks"
  );

  res.json(result.rows);
};

// GET SINGLE TASK
export const getTaskById = async (
  req: Request,
  res: Response
) => {

  const { id } = req.params;

  const result = await pool.query(
    "SELECT * FROM tasks WHERE id=$1",
    [id]
  );

  res.json(result.rows[0]);
};

// CREATE TASK
export const createTask = async (
  req: Request,
  res: Response
) => {

  const { title, completed } = req.body;

  const result = await pool.query(
    "INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *",
    [title, completed]
  );

  res.json(result.rows[0]);
};

// UPDATE TASK
export const updateTask = async (
  req: Request,
  res: Response
) => {

  const { id } = req.params;

  const { title, completed } = req.body;

  const result = await pool.query(
    "UPDATE tasks SET title=$1, completed=$2 WHERE id=$3 RETURNING *",
    [title, completed, id]
  );

  res.json(result.rows[0]);
};

// DELETE TASK
export const deleteTask = async (
  req: Request,
  res: Response
) => {

  const { id } = req.params;

  await pool.query(
    "DELETE FROM tasks WHERE id=$1",
    [id]
  );

  res.json({
    message: "Task deleted"
  });
};