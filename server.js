import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";

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

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const notes = await getTodos();
    return res.status(200).json(notes);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("server error");
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const notes = await getTodosById(id);
    return res.status(200).json(notes);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("server error");
  }
});

app.post("/", async (req, res) => {
  const { task, completed } = req.body;
  try {
    const notes = await createTodo(task, completed);
    return res.status(200).json(notes);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("server error");
  }
});

app.listen(8000, () => {
  console.log("server listening at post 8000");
});

process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection.");

  server.close(() => {
    process.exit(1); // Exit with failure code
  });
});
