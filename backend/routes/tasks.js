import express from "express";
import Cors from "cors";
import taskController from "../controllers/Tasks.js";
import requireAuth from "../middleware/requireAuth.js";

var router = express.Router();
router.use(express.json());
router.use(Cors());
router.use(requireAuth);
router.post("/create-task", taskController.createTask);
router.get("/get-tasks", taskController.getTasks);
router.put("/update-task", taskController.updateTask);
router.put("/delete-task", taskController.deleteTask);
export default router;
