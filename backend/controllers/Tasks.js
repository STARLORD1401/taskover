import express from "express";
import Cors from "cors";
import Tasks from "../models/Tasks.js";
var router = express.Router();
router.use(express.json());
router.use(Cors());
const createTask = router.post("/create-task", async (req, res) => {
  const newTask = req.body;
  console.log(newTask);
});
export default { createTask };
