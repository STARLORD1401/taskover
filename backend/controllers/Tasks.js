import express from "express";
import Cors from "cors";
import Tasks from "../models/Tasks.js";
var router = express.Router();
router.use(express.json());
router.use(Cors());

const createTask = router.post("/create-task", async (req, res) => {
  var task = { ...req.body, user_id: req.user._id };
  try {
    const Task = new Tasks(task);
    await Task.save();
    res.send(Task).status(201);
  } catch (err) {
    console.log("Create task error:", err);
    res.status(500).send("Create task error");
  }
});
const getTasks = router.get("/get-tasks", async (req, res) => {
  try {
    const tasks = await Tasks.find({ user_id: req.user._id });
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send("No tasks found");
  }
});
const updateTask = router.put("/update-task", async (req, res) => {
  var task = req.body.task;
  task = await Tasks.findByIdAndUpdate(
    task._id,
    {
      title: task.title,
      description: task.description,
      completed: task.completed,
    },
    { new: true, upsert: true }
  );
  res.status(200).send(task);
});
const deleteTask = router.put("/delete-task", async (req, res) => {
  const task_id = req.body.task._id;
  try {
    await Tasks.findByIdAndDelete(task_id);
    res.status(200).send("Task deleted successfully!");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
export default { createTask, getTasks, updateTask, deleteTask };
