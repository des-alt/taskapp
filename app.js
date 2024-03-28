const http = require("http");
const mongoose = require("mongoose");
const Tasks = require("./models/product.module");
const express = require("express");
require("dotenv").config();

const app = express();

//middleware for json
app.use(express.json());
//middleware for urlencoded
app.use(express.urlencoded({ extended: false }));

//home
app.get("/", function (request, response) {
  response.send("<h1>Чо ты тут забыл?<h1>");
});

//all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//single task
app.get("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//CREATE task
app.post("/api/tasks", async (req, res) => {
  try {
    const task = await Tasks.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//UPDATE task
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findByIdAndUpdate(id, req.body);
    if (!task) {
      return res.status(404).json.apply({ message: "Task not found" });
    }
    const updatedTask = await Tasks.findById(id);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//DELETE a task

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json.apply({ message: "Task not found" });
    }
    res.status(200).json({ message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000);

//connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@taskmanagerapp.bywnyh2.mongodb.net/tasks?retryWrites=true&w=majority&appName=TaskManagerApp`
  )
  .then(() => console.log("Connection Success"))
  .catch((err) => console.log(`Error connection to DB: ${err}`));
