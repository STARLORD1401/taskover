import express from "express";
import cors from "cors";
import index from "./routes/index.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.TASKOVER_URI).then(
  app.listen(process.env.PORT, () => {
    console.log(
      `Connected to MongoDB and listening on port: ${process.env.PORT}`
    );
  })
);
app.use(express.json());
app.use("/", index);
app.use("*", (req, res) => res.status(404).json({ ERROR: "Not Found" }));
export default app;
