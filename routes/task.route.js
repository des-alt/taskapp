const express = require("express");
const Tasks = require("../models/task.module.js");
const routes = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller.js");

// import all controllers
// import SessionController from './app/controllers/SessionController';

// Add routes
routes.get("/", getTasks);
routes.get("/:id", getTask);
routes.post("/", createTask);
routes.put("/:id", updateTask);
routes.delete("/:id", deleteTask);

module.exports = routes;
