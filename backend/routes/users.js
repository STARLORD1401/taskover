import express from "express";
import Cors from "cors";
import userController from "../controllers/Users.js";

var router = express.Router();
router.use(express.json());
router.use(Cors());
router.post("/register", userController.register);
router.post("/login", userController.login);
export default router;
