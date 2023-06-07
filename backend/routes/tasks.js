import express from "express";
import Cors from "cors";
import taskController from "../controllers/Tasks.js";
var router = express.Router();
router.use(express.json());
router.use(Cors());
router.post("/create-task", taskController.createTask);
export default router;
