import express from "express";
import Cors from "cors";
import Tasks from "../models/Tasks.js";
var router = express.Router();
router.use(express.json());
router.use(Cors());

const createTask = router.post("/create-task", async (req, res) => {
  const task = req.body.task;
  task.user_id = req.user._id;
  console.log(task);
  try {
    const Task = new Tasks(task);
    await Task.save();
    res.send(`Task ${task.title} created successfully!`).status(201);
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
  const task = req.body.task;
  const updatedTask = await Tasks.findByIdAndUpdate(
    task._id,
    {
      title: task.title,
      description: task.description,
      completed: task.completed,
    },
    { new: true, upsert: true }
  );
  res.status(200).send({ updatedTask });
});
export default { createTask, getTasks, updateTask };
