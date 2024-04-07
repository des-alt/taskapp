const Tasks = require("../models/task.model");

const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.status(200).json(tasks);
    console.log(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Tasks.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
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
};

const deleteTask = async (req, res) => {
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
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
