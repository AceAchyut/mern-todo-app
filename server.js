const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB (Using your local DB from Task 1)
mongoose.connect("mongodb://127.0.0.1:27017/todo_db")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// 2. Define the Schema (What a task looks like)
const TaskSchema = new mongoose.Schema({
  text: String
});
const Task = mongoose.model("Task", TaskSchema);

// 3. API Route: Add a Task (POST)
app.post("/add", async (req, res) => {
  const newTask = new Task({ text: req.body.text });
  await newTask.save();
  res.json(newTask);
});

// 4. API Route: Get All Tasks (GET)
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// 5. Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));