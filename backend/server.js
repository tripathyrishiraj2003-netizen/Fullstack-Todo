const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

// GET tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST task
app.post("/tasks", (req, res) => {
  tasks.push(req.body.task);
  res.json({ message: "Task added" });
});

// DELETE task
app.delete("/tasks/:index", (req, res) => {
  tasks.splice(req.params.index, 1);
  res.json({ message: "Task deleted" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});