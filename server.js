import express from "express";
import { getTodos, getTodosById, createTodo } from "./database.js";

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
