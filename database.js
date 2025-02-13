import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import { get } from "http";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

export const getTodos = async () => {
  const [rows] = await pool.query("SELECT * FROM todo");
  return rows;
};

export const getTodosById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM todo WHERE id = ?", [id]);
  return rows[0];
};

export const createTodo = async (task, completed) => {
  const [res] = await pool.query(
    "INSERT INTO todo (task, completed) VALUES(?, ?)",
    [task, completed]
  );
  const id = res.insertId;
  return getTodosById(id);
};
